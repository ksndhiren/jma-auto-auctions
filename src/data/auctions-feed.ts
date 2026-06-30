/**
 * Live upcoming-auctions feed.
 *
 * Scrapes the JMA auctions page on demand, caches the parsed result in
 * Cloudflare's edge cache (`caches.default`) for an hour, and falls back to
 * local mock data if either the scrape or the cache machinery isn't
 * available (i.e. local dev, or an outage at JMA).
 *
 * Same code path runs at SSR time inside the Worker — no separate cron job
 * or KV namespace required.
 */
import { auctions as mockAuctions } from "@/data/mock";
import type { Auction } from "@/data/types";

const SOURCE_URL = "https://www.jeffmartinauctioneers.com/auctions";
const APOLLO_PREFIX = "window.__APOLLO_STATE__ = ";
const CACHE_KEY = new Request("https://cache.local/upcoming-auctions/v1");
const CACHE_TTL_SECONDS = 60 * 60; // 1h
const AUTO_INCLUDE = ["AUTO", "VEHICLE", "MOTORCYCLE", "UTV"];

interface ScrapedRow {
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

interface ApolloAuction {
  start_time?: string;
  end_time?: string;
  auction_id?: string;
}

export async function getUpcomingAuctions(limit = 4): Promise<Auction[]> {
  const rows = await loadRowsWithCache();
  const live = rows.map(rowToAuction).filter((a): a is Auction => a !== null);
  const ranked = filterAndSort(live, limit);
  if (ranked.length > 0) return ranked;
  return filterAndSort(mockAuctions, limit);
}

async function loadRowsWithCache(): Promise<ScrapedRow[]> {
  const cache = getEdgeCache();
  if (cache) {
    const hit = await cache.match(CACHE_KEY);
    if (hit) {
      try {
        return (await hit.json()) as ScrapedRow[];
      } catch {
        // fall through and re-fetch
      }
    }
  }

  let rows: ScrapedRow[] = [];
  try {
    rows = await scrape();
  } catch {
    return [];
  }

  if (cache && rows.length > 0) {
    await cache.put(
      CACHE_KEY,
      new Response(JSON.stringify(rows), {
        headers: { "cache-control": `public, max-age=${CACHE_TTL_SECONDS}` },
      }),
    );
  }
  return rows;
}

function getEdgeCache(): Cache | null {
  try {
    // `caches.default` exists in the Cloudflare Workers runtime only.
    const g = globalThis as { caches?: { default: Cache } };
    return g.caches?.default ?? null;
  } catch {
    return null;
  }
}

async function scrape(): Promise<ScrapedRow[]> {
  const res = await fetch(SOURCE_URL, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; jma-auto-auctions/1.0; +https://www.jmaautoauctions.com)",
    },
  });
  if (!res.ok) throw new Error(`Source returned ${res.status}`);
  const html = await res.text();
  const items = parseAuctionsFromHtml(html);
  const apollo = extractApolloState(html);
  return items.map((it) => enrichWithApollo(it, apollo)).filter(isAutoAuction);
}

// --- HTML parsing -------------------------------------------------------

function parseAuctionsFromHtml(html: string): ScrapedRow[] {
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
    .map((block): ScrapedRow | null => {
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
    .filter((x): x is ScrapedRow => x !== null);
}

function extractApolloState(html: string): Record<string, ApolloAuction> {
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
            const parsed = JSON.parse(html.slice(objStart, i + 1)) as Record<
              string,
              ApolloAuction
            >;
            const out: Record<string, ApolloAuction> = {};
            for (const [k, v] of Object.entries(parsed)) {
              if (k.startsWith("Auction.") && v?.auction_id) out[v.auction_id] = v;
            }
            return out;
          } catch {
            return {};
          }
        }
      }
    }
  }
  return {};
}

function enrichWithApollo(row: ScrapedRow, apollo: Record<string, ApolloAuction>): ScrapedRow {
  const match = apollo[row.id];
  if (!match) return row;
  return {
    ...row,
    startsAt: match.start_time ?? row.startsAt,
    endsAt: match.end_time ?? row.endsAt,
  };
}

function isAutoAuction(row: ScrapedRow): boolean {
  const t = row.title.toUpperCase();
  return AUTO_INCLUDE.some((kw) => t.includes(kw));
}

// --- Mapping & filtering ------------------------------------------------

function rowToAuction(r: ScrapedRow): Auction | null {
  if (!r.startsAt || !r.endsAt) return null;
  const now = Date.now();
  const start = new Date(r.startsAt).getTime();
  const end = new Date(r.endsAt).getTime();
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
    type: normalizeType(r.type),
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

function filterAndSort(items: Auction[], limit: number): Auction[] {
  const now = Date.now();
  return items
    .filter(
      (a) => a.status !== "closed" && (!a.endsAt || new Date(a.endsAt).getTime() > now),
    )
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit);
}

function normalizeType(t: string): Auction["type"] {
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
