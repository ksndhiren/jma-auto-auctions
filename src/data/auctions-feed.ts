/**
 * Live upcoming-auctions + featured-lots feed.
 *
 * Scrapes JMA's auctions page and the soonest upcoming auto auction's detail
 * page, caches the parsed result in Cloudflare's edge cache (`caches.default`)
 * for an hour, and falls back to local mock data if either the scrape or the
 * cache machinery isn't available (i.e. local dev or an outage at JMA).
 */
import { auctions as mockAuctions, lots as mockLots } from "@/data/mock";
import type { Auction, Lot } from "@/data/types";

const SOURCE_URL = "https://www.jeffmartinauctioneers.com/auctions";
const APOLLO_PREFIX = "window.__APOLLO_STATE__ = ";
const CACHE_KEY = new Request("https://cache.local/upcoming-feed/v2");
const CACHE_TTL_SECONDS = 60 * 60; // 1h
const AUTO_INCLUDE = ["AUTO", "VEHICLE", "MOTORCYCLE", "UTV"];

interface ScrapedAuctionRow {
  id: string;
  slug: string;
  title: string;
  type: string;
  statusText: string;
  startsAt: string | null;
  endsAt: string | null;
  location: string | null;
  image: string | null;
  externalUrl: string;
}

interface ScrapedLotRow {
  id: string;
  slug: string;
  lotNumber: string;
  title: string;
  description: string;
  auctionId: string;
  auctionTitle: string;
  startsAt: string | null;
  endsAt: string | null;
  location: string | null;
  image: string | null;
  startingBid: number | null;
  currentBid: number | null;
  bidCount: number;
  externalUrl: string;
  status: "upcoming" | "open" | "closed";
}

interface FeedBundle {
  auctions: ScrapedAuctionRow[];
  lots: ScrapedLotRow[];
}

interface ApolloAuction {
  start_time?: string;
  end_time?: string;
  auction_id?: string;
}

interface ApolloLot {
  __typename?: string;
  auction_lot_id?: string;
  auction_id?: string;
  lot_number?: string;
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  starting_bid?: number;
  winning_bid_amount?: number | null;
  bid_count?: number;
  auction_lot_status?: number;
  is_past_end_time?: boolean;
  is_no_sale?: boolean;
  is_bidding_disabled?: boolean;
  is_marketing_lot?: boolean | null;
  lot_location?: {
    city?: string | null;
    state?: { abbreviation?: string };
  };
  primary_image?: { url?: string };
}

// --- Public API --------------------------------------------------------

export async function getUpcomingAuctions(limit = 4): Promise<Auction[]> {
  const feed = await loadFeedWithCache();
  const live = feed.auctions.map(rowToAuction).filter((a): a is Auction => a !== null);
  const ranked = filterAndSortAuctions(live, limit);
  if (ranked.length > 0) return ranked;
  return filterAndSortAuctions(mockAuctions, limit);
}

export async function getFeaturedLots(limit = 4): Promise<Lot[]> {
  const feed = await loadFeedWithCache();
  const live = feed.lots.map(rowToLot);
  if (live.length > 0) return live.slice(0, limit);
  return mockLots.slice(0, limit);
}

// --- Caching ------------------------------------------------------------

async function loadFeedWithCache(): Promise<FeedBundle> {
  const cache = getEdgeCache();
  if (cache) {
    const hit = await cache.match(CACHE_KEY);
    if (hit) {
      try {
        return (await hit.json()) as FeedBundle;
      } catch {
        // fall through and re-fetch
      }
    }
  }

  let bundle: FeedBundle = { auctions: [], lots: [] };
  try {
    bundle = await scrapeAll();
  } catch {
    return bundle;
  }

  if (cache && (bundle.auctions.length > 0 || bundle.lots.length > 0)) {
    await cache.put(
      CACHE_KEY,
      new Response(JSON.stringify(bundle), {
        headers: { "cache-control": `public, max-age=${CACHE_TTL_SECONDS}` },
      }),
    );
  }
  return bundle;
}

function getEdgeCache(): Cache | null {
  try {
    const g = globalThis as { caches?: { default: Cache } };
    return g.caches?.default ?? null;
  } catch {
    return null;
  }
}

// --- Scraping -----------------------------------------------------------

async function scrapeAll(): Promise<FeedBundle> {
  const listHtml = await fetchHtml(SOURCE_URL);
  const auctionRows = parseAuctionsFromHtml(listHtml);
  const apolloList = extractApolloState(listHtml);
  const enriched = auctionRows
    .map((row) => enrichAuctionWithApollo(row, apolloList))
    .filter(isAutoAuction);

  // Sort to find the soonest upcoming auto auction with a usable detail URL.
  const sorted = [...enriched].sort((a, b) => {
    const ta = a.startsAt ? Date.parse(a.startsAt) : Number.POSITIVE_INFINITY;
    const tb = b.startsAt ? Date.parse(b.startsAt) : Number.POSITIVE_INFINITY;
    return ta - tb;
  });

  // For lots, pick the soonest auction hosted on jeffmartinauctioneers.com
  // (Apollo lot state only covers JMA-hosted auctions).
  const lotSource = sorted.find(
    (a) =>
      a.externalUrl.includes("jeffmartinauctioneers.com") &&
      a.endsAt &&
      Date.parse(a.endsAt) > Date.now(),
  );

  let lots: ScrapedLotRow[] = [];
  if (lotSource) {
    try {
      const detailHtml = await fetchHtml(lotSource.externalUrl);
      const detailApollo = extractApolloStateRaw(detailHtml);
      lots = parseLotsFromApollo(detailApollo, lotSource);
    } catch {
      // soft-fail: lots stay empty, auctions still return
    }
  }

  return { auctions: enriched, lots };
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; jma-auto-auctions/1.0; +https://www.jmaautoauctions.com)",
    },
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return await res.text();
}

// --- HTML parsing (auctions list) ---------------------------------------

function parseAuctionsFromHtml(html: string): ScrapedAuctionRow[] {
  const opener = /<div class="auction\s+[^"]*">/g;
  const positions: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = opener.exec(html)) !== null) positions.push(m.index);
  if (positions.length === 0) return [];
  positions.push(html.length);

  const blocks: string[] = [];
  for (let i = 0; i < positions.length - 1; i++) {
    blocks.push(html.slice(positions[i], positions[i + 1]));
  }

  return blocks
    .map((block): ScrapedAuctionRow | null => {
      const title = pickText(block, /<p class="auctionTitle">([\s\S]*?)<\/p>/i);
      if (!title) return null;
      const rawHref = pickAttr(block, /<a[^>]+href="([^"]+)"/i);
      if (!rawHref) return null;
      const externalUrl = normalizeHref(rawHref);
      const pathOnly = externalUrl.replace(/^https?:\/\/[^/]+/, "");
      const slug = pathOnly.split("/").filter(Boolean).pop() ?? "";
      const idMatch = slug.match(/^(\d+)/);
      const id = idMatch ? idMatch[1] : slug;
      const type = pickText(block, /<div class="jmab-auction-type"><strong>([\s\S]*?)<\/strong>/i);
      const statusText = pickText(
        block,
        /<div class="jmab-auctionImageTag"><strong>([\s\S]*?)<\/strong>/i,
      );
      const image = pickAttr(block, /<img[^>]+src="([^"]+)"/i);
      const location = pickText(
        block,
        /<button type="button" class="location-link">([\s\S]*?)<\/button>/i,
      );
      return {
        id,
        slug,
        title,
        type: type || "Auction",
        statusText: statusText || "",
        startsAt: null,
        endsAt: null,
        location: location || null,
        image: image || null,
        externalUrl,
      };
    })
    .filter((x): x is ScrapedAuctionRow => x !== null);
}

// --- Apollo state extraction --------------------------------------------

function extractApolloState(html: string): Record<string, ApolloAuction> {
  const raw = extractApolloStateRaw(html);
  const out: Record<string, ApolloAuction> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith("Auction.") && (v as ApolloAuction)?.auction_id) {
      out[(v as ApolloAuction).auction_id as string] = v as ApolloAuction;
    }
  }
  return out;
}

function extractApolloStateRaw(html: string): Record<string, unknown> {
  const start = html.indexOf(APOLLO_PREFIX);
  if (start === -1) return {};
  const objStart = start + APOLLO_PREFIX.length;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = objStart; i < html.length; i++) {
    const c = html[i];
    if (esc) {
      esc = false;
      continue;
    }
    if (c === "\\") {
      esc = true;
      continue;
    }
    if (c === '"') inStr = !inStr;
    else if (!inStr) {
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          try {
            return JSON.parse(html.slice(objStart, i + 1)) as Record<string, unknown>;
          } catch {
            return {};
          }
        }
      }
    }
  }
  return {};
}

function enrichAuctionWithApollo(
  row: ScrapedAuctionRow,
  apollo: Record<string, ApolloAuction>,
): ScrapedAuctionRow {
  const match = apollo[row.id];
  if (!match) return row;
  return {
    ...row,
    startsAt: match.start_time ?? row.startsAt,
    endsAt: match.end_time ?? row.endsAt,
  };
}

function isAutoAuction(row: ScrapedAuctionRow): boolean {
  const t = row.title.toUpperCase();
  return AUTO_INCLUDE.some((kw) => t.includes(kw));
}

// --- Lots parsing -------------------------------------------------------

function parseLotsFromApollo(
  raw: Record<string, unknown>,
  source: ScrapedAuctionRow,
): ScrapedLotRow[] {
  const now = Date.now();
  const rows: ScrapedLotRow[] = [];
  for (const [k, v] of Object.entries(raw)) {
    if (!k.startsWith("AuctionLot.")) continue;
    const lot = v as ApolloLot;
    if (
      lot.is_past_end_time ||
      lot.is_no_sale ||
      lot.is_bidding_disabled ||
      lot.is_marketing_lot ||
      lot.auction_lot_status !== 100
    ) {
      continue;
    }
    if (!lot.end_time || Date.parse(lot.end_time) <= now) continue;

    const title = stripTags(decodeEntities(lot.title ?? "")).trim();
    if (!title) continue;
    const id = String(lot.auction_lot_id ?? "");
    const lotNumber = String(lot.lot_number ?? "");
    const description = stripTags(decodeEntities(lot.description ?? "")).slice(0, 240);
    const stateAbbr = lot.lot_location?.state?.abbreviation ?? "";
    const city = lot.lot_location?.city ?? "";
    const location = [city, stateAbbr].filter(Boolean).join(", ") || null;
    const image = lot.primary_image?.url ?? null;
    const externalUrl = `${source.externalUrl}/${id}-${slugify(title)}`;

    const startTime = lot.start_time ? Date.parse(lot.start_time) : null;
    const status: ScrapedLotRow["status"] =
      startTime && startTime <= now ? "open" : "upcoming";

    rows.push({
      id,
      slug: `${id}-${slugify(title)}`,
      lotNumber,
      title,
      description,
      auctionId: String(lot.auction_id ?? source.id),
      auctionTitle: source.title,
      startsAt: lot.start_time ?? null,
      endsAt: lot.end_time ?? null,
      location,
      image,
      startingBid: typeof lot.starting_bid === "number" ? lot.starting_bid : null,
      currentBid: typeof lot.winning_bid_amount === "number" ? lot.winning_bid_amount : null,
      bidCount: lot.bid_count ?? 0,
      externalUrl,
      status,
    });
  }
  // Within a single auction every lot shares the same end_time, so closing
  // time isn't a useful sort key. Surface the highest-value items first
  // (vehicles tend to have starting bids in the hundreds-to-thousands;
  // miscellaneous utility lots start at $5).
  rows.sort((a, b) => {
    const sa = a.startingBid ?? 0;
    const sb = b.startingBid ?? 0;
    if (sa !== sb) return sb - sa;
    if (a.bidCount !== b.bidCount) return b.bidCount - a.bidCount;
    return a.lotNumber.localeCompare(b.lotNumber);
  });
  return rows;
}

// --- Mapping to public types --------------------------------------------

function rowToAuction(r: ScrapedAuctionRow): Auction | null {
  if (!r.startsAt || !r.endsAt) return null;
  const now = Date.now();
  const start = Date.parse(r.startsAt);
  const end = Date.parse(r.endsAt);
  const status: Auction["status"] =
    end <= now
      ? "closed"
      : start <= now
        ? end - now < 24 * 60 * 60 * 1000
          ? "closing_soon"
          : "open"
        : "upcoming";
  return {
    id: r.id,
    slug: r.slug,
    title: titleCase(r.title),
    eyebrow: r.statusText || undefined,
    type: normalizeAuctionType(r.type),
    status,
    startsAt: r.startsAt,
    endsAt: r.endsAt,
    location: r.location ?? "",
    description: "",
    image: r.image ?? "",
    categories: [],
    lotCount: 0,
    externalUrl: r.externalUrl,
  };
}

function rowToLot(r: ScrapedLotRow): Lot {
  return {
    id: r.id,
    slug: r.slug,
    lotNumber: r.lotNumber,
    title: titleCase(r.title),
    auctionSlug: r.auctionId,
    auctionName: titleCase(r.auctionTitle),
    category: "vehicles",
    description: r.description,
    currentBid: r.currentBid ?? undefined,
    openingBid: r.startingBid ?? undefined,
    closesAt: r.endsAt ?? undefined,
    location: r.location ?? undefined,
    externalUrl: r.externalUrl,
    status: r.status === "open" ? "open" : "upcoming",
    image: r.image ?? "",
  };
}

function filterAndSortAuctions(items: Auction[], limit: number): Auction[] {
  const now = Date.now();
  return items
    .filter(
      (a) => a.status !== "closed" && (!a.endsAt || new Date(a.endsAt).getTime() > now),
    )
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit);
}

function normalizeAuctionType(t: string): Auction["type"] {
  const v = t.toLowerCase();
  if (v.includes("online")) return "online";
  if (v.includes("hybrid") || v.includes("mixed") || v.includes("simulcast")) return "hybrid";
  return "live";
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])([a-z']*)/g, (_, a, b) => a.toUpperCase() + b)
    .replace(/\b(And|Or|The|At|In|On|Of|For)\b/g, (m) => m.toLowerCase())
    .replace(/^./, (c) => c.toUpperCase());
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// --- Small helpers ------------------------------------------------------

function pickText(html: string, re: RegExp): string {
  const m = html.match(re);
  if (!m) return "";
  return decodeEntities(stripTags(m[1])).replace(/\s+/g, " ").trim();
}

function pickAttr(html: string, re: RegExp): string {
  const m = html.match(re);
  return m ? m[1] : "";
}

function normalizeHref(href: string): string {
  if (href.startsWith("//")) return `https:${href}`;
  if (href.startsWith("http")) return href;
  if (href.startsWith("/")) return `https://www.jeffmartinauctioneers.com${href}`;
  return `https://www.jeffmartinauctioneers.com/${href}`;
}

function stripTags(s: string): string {
  return s.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, "");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}
