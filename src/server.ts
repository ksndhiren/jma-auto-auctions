import "./lib/error-capture";

import { refreshLiveFeedCache } from "./data/auctions-feed";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"}; try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

const ALLOWED_IMAGE_HOSTS = new Set([
  "jeffmartininc.s3.amazonaws.com",
  "auctioneersoftware.s3.amazonaws.com",
  "auctioneersoftware.s3.us-east-1.amazonaws.com",
]);

async function handleImageProxy(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const rawSrc = url.searchParams.get("src");
  if (!rawSrc) return new Response("Missing src", { status: 400 });

  let remote: URL;
  try {
    remote = new URL(rawSrc);
  } catch {
    return new Response("Invalid src", { status: 400 });
  }

  if (!ALLOWED_IMAGE_HOSTS.has(remote.hostname)) {
    return new Response("Host not allowed", { status: 403 });
  }

  const width = clampNumber(url.searchParams.get("w"), 320, 1280, 720);
  const quality = clampNumber(url.searchParams.get("q"), 40, 90, 72);
  const fit = url.searchParams.get("fit") === "cover" ? "cover" : "contain";

  const requestInit: RequestInit & {
    cf?: {
      image?: {
        width: number;
        quality: number;
        fit: "contain" | "cover";
        format: "webp";
        metadata: "none";
        background: string;
      };
    };
  } = {
    headers: { accept: "image/avif,image/webp,image/*,*/*" },
    cf: {
      image: {
        width,
        quality,
        fit,
        format: "webp",
        metadata: "none",
        background: "rgb(255,255,255)",
      },
    },
  };

  let upstream: Response;
  try {
    upstream = await fetch(remote.toString(), requestInit);
  } catch {
    upstream = await fetch(remote.toString(), {
      headers: { accept: "image/*,*/*" },
    });
  }

  if (!upstream.ok) {
    return new Response("Image unavailable", { status: upstream.status });
  }

  const headers = new Headers(upstream.headers);
  headers.set("cache-control", "public, max-age=604800, stale-while-revalidate=2592000");
  headers.set("cross-origin-resource-policy", "cross-origin");
  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}

function clampNumber(
  value: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    if (url.pathname === "/_image") {
      return await handleImageProxy(request);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },

  async scheduled(_event: ScheduledEvent, _env: unknown, ctx: ExecutionContext) {
    // Single-worker weekly refresh: keep featured vehicle data warm without
    // requiring a separate cron Worker. Upcoming auctions still self-refresh
    // on demand through the 5-minute edge-cache path.
    ctx.waitUntil(refreshLiveFeedCache());
  },
};
