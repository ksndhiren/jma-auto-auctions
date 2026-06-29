/**
 * jma-auto-auctions-cron
 *
 * Scheduled Cloudflare Worker that scrapes the JMA auctions page, filters to
 * auto-only auctions, and writes the result to KV. Also exposes a fetch
 * handler so the main app can read the JSON over HTTP during SSR.
 *
 * Triggers (see wrangler.jsonc):
 *   - "0 6 * * *"  daily   (cheap: no-ops unless a stored auction expired)
 *   - "0 6 * * 1"  weekly  (full re-fetch, catches newly added auctions)
 *
 * Read endpoint:
 *   GET /auctions.json  ->  { auctions, lastSyncAt, sourceUrl, count }
 */

export interface Env {
  AUCTIONS_KV: KVNamespace;
}

const SOURCE_URL = "https://www.jeffmartinauctioneers.com/auctions";
const APOLLO_PREFIX = "window.__APOLLO_STATE__ = ";
const AUCTIONS_KEY = "auctions:current";
const META_KEY = "auctions:meta";
const WEEKLY_CRON = "0 6 * * 1";

// Substring match (case-insensitive). Catches AUTO, AUTOMOBILE plus other
// consumer-vehicle signals that show up in JMA auction titles.
const AUTO_INCLUDE = ["AUTO", "VEHICLE", "MOTORCYCLE", "UTV"];

export interface FeedAuction {
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

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    const isWeekly = event.cron === WEEKLY_CRON;
    const stored = await readStored(env);
    const now = Date.now();
    const anyExpired = stored.auctions.some(
      (a) => a.endsAt && new Date(a.endsAt).getTime() <= now,
    );

    if (!isWeekly && !anyExpired) {
      await env.AUCTIONS_KV.put(
        META_KEY,
        JSON.stringify({ ...stored.meta, lastTickAt: new Date().toISOString(), skipped: true }),
      );
      return;
    }

    ctx.waitUntil(refresh(env));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/auctions.json") {
      const data = await readStored(env);
      return Response.json(
        {
          auctions: data.auctions,
          lastSyncAt: data.meta.lastFullSyncAt ?? null,
          sourceUrl: SOURCE_URL,
          count: data.auctions.length,
        },
        {
          headers: {
            "cache-control": "public, max-age=300, stale-while-revalidate=3600",
            "access-control-allow-origin": "*",
          },
        },
      );
    }
    if (url.pathname === "/refresh" && request.method === "POST") {
      // Manual refresh trigger (protect with auth in production).
      await refresh(env);
      return new Response("ok");
    }
    return new Response("jma-auto-auctions-cron", { status: 200 });
  },
};

async function refresh(env: Env): Promise<void> {
  const html = await fetchSource();
  const items = parseAuctionsFromHtml(html);
  const apollo = extractApolloState(html);
  const enriched = items.map((it) => enrichWithApollo(it, apollo)).filter(isAutoAuction);

  await env.AUCTIONS_KV.put(AUCTIONS_KEY, JSON.stringify(enriched));
  await env.AUCTIONS_KV.put(
    META_KEY,
    JSON.stringify({
      lastFullSyncAt: new Date().toISOString(),
      lastTickAt: new Date().toISOString(),
      sourceUrl: SOURCE_URL,
      count: enriched.length,
    }),
  );
}

async function fetchSource(): Promise<string> {
  const res = await fetch(SOURCE_URL, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; jma-auto-auctions-cron/1.0; +https://www.jmaautoauctions.com)",
    },
    cf: { cacheTtl: 60, cacheEverything: true },
  });
  if (!res.ok) throw new Error(`Source returned ${res.status}`);
  return await res.text();
}

async function readStored(
  env: Env,
): Promise<{ auctions: FeedAuction[]; meta: Record<string, unknown> }> {
  const [auctionsRaw, metaRaw] = await Promise.all([
    env.AUCTIONS_KV.get(AUCTIONS_KEY),
    env.AUCTIONS_KV.get(META_KEY),
  ]);
  return {
    auctions: auctionsRaw ? (JSON.parse(auctionsRaw) as FeedAuction[]) : [],
    meta: metaRaw ? (JSON.parse(metaRaw) as Record<string, unknown>) : {},
  };
}

// --- Parsing -------------------------------------------------------------

function parseAuctionsFromHtml(html: string): FeedAuction[] {
  const blockRe = /<div class="auction\s+[^"]*">[\s\S]*?<\/div><\/div><\/div>/g;
  const blocks = html.match(blockRe) ?? [];
  return blocks
    .map((block): FeedAuction | null => {
      const title = pickText(block, /<p class="auctionTitle">([\s\S]*?)<\/p>/i);
      if (!title) return null;
      const href = pickAttr(block, /<a href="(\/auctions\/[^"]+)"/i);
      if (!href) return null;
      const slug = href.split("/").pop() ?? "";
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
        externalUrl: `https://www.jeffmartinauctioneers.com${href}`,
      };
    })
    .filter((x): x is FeedAuction => x !== null);
}

interface ApolloAuction {
  start_time?: string;
  end_time?: string;
  auction_id?: string;
  auction_status?: number;
}

function extractApolloState(html: string): Record<string, ApolloAuction> {
  const start = html.indexOf(APOLLO_PREFIX);
  if (start === -1) return {};
  const objStart = start + APOLLO_PREFIX.length;
  // Brace-balance scan to find the end of the JSON object.
  let depth = 0,
    inStr = false,
    esc = false;
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
            const parsed = JSON.parse(html.slice(objStart, i + 1)) as Record<string, ApolloAuction>;
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

function enrichWithApollo(
  item: FeedAuction,
  apollo: Record<string, ApolloAuction>,
): FeedAuction {
  const match = apollo[item.id];
  if (!match) return item;
  return {
    ...item,
    startsAt: match.start_time ?? item.startsAt,
    endsAt: match.end_time ?? item.endsAt,
  };
}

function isAutoAuction(item: FeedAuction): boolean {
  const t = item.title.toUpperCase();
  return AUTO_INCLUDE.some((kw) => t.includes(kw));
}

// --- Helpers -------------------------------------------------------------

function pickText(html: string, re: RegExp): string {
  const m = html.match(re);
  if (!m) return "";
  return decodeEntities(stripTags(m[1])).replace(/\s+/g, " ").trim();
}

function pickAttr(html: string, re: RegExp): string {
  const m = html.match(re);
  return m ? m[1] : "";
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
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘");
}
