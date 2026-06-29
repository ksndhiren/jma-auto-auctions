/**
 * Reads upcoming auctions from the cron Worker's /auctions.json endpoint.
 * Falls back to the local mock data when the feed is unreachable (e.g. local
 * dev) or returns no usable rows.
 */
import { auctions as mockAuctions } from "@/data/mock";
import type { Auction } from "@/data/types";

const DEFAULT_FEED_URL = "https://jma-auto-auctions-cron.workers.dev/auctions.json";

export interface FeedRow {
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

interface FeedResponse {
  auctions: FeedRow[];
  lastSyncAt: string | null;
  count: number;
}

/** Fetch the live feed. Resolves to null on any failure. */
export async function fetchAuctionFeed(
  feedUrl: string = process.env.AUCTIONS_FEED_URL ?? DEFAULT_FEED_URL,
): Promise<FeedResponse | null> {
  try {
    const res = await fetch(feedUrl, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const data = (await res.json()) as FeedResponse;
    if (!Array.isArray(data.auctions)) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Return the next N upcoming auctions in `Auction` shape, suitable for the
 * existing AuctionCard component. Filters out closed/ended items and sorts
 * by startsAt ascending. Falls back to mock data on any failure.
 */
export async function getUpcomingAuctions(limit = 4): Promise<Auction[]> {
  const feed = await fetchAuctionFeed();
  const rows = feed?.auctions ?? [];
  const mapped = rows
    .map((r) => feedRowToAuction(r))
    .filter((a): a is Auction => a !== null);
  const filtered = filterAndSort(mapped, limit);
  if (filtered.length > 0) return filtered;
  // Local dev / outage fallback.
  return filterAndSort(mockAuctions, limit);
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

function feedRowToAuction(r: FeedRow): Auction | null {
  if (!r.startsAt || !r.endsAt) return null;
  const now = Date.now();
  const end = new Date(r.endsAt).getTime();
  const start = new Date(r.startsAt).getTime();
  const status: Auction["status"] =
    end <= now
      ? "closed"
      : start <= now
        ? end - now < 24 * 60 * 60 * 1000
          ? "closing_soon"
          : "open"
        : "upcoming";
  const type = normalizeType(r.type);
  return {
    id: r.id,
    slug: r.slug,
    title: titleCase(r.title),
    eyebrow: r.statusText || undefined,
    type,
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

function normalizeType(t: string): Auction["type"] {
  const v = t.toLowerCase();
  if (v.includes("online")) return "online";
  if (v.includes("hybrid") || v.includes("mixed") || v.includes("simulcast")) return "hybrid";
  return "live";
}

function titleCase(s: string): string {
  // JMA titles are SHOUTY UPPERCASE; convert to Title Case for nicer rendering.
  return s
    .toLowerCase()
    .replace(/\b([a-z])([a-z']*)/g, (_, a, b) => a.toUpperCase() + b)
    .replace(/\b(And|Or|The|At|In|On|Of|For)\b/g, (m) => m.toLowerCase())
    .replace(/^./, (c) => c.toUpperCase());
}
