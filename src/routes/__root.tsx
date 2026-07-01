import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import appCss from "../styles.css?url";
import { siteConfig } from "@/config/site";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
  normalizePathname,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black px-4 text-white">
      <div className="max-w-2xl border border-white/12 bg-white/[0.04] p-8 text-center backdrop-blur-sm md:p-10">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="mt-3 font-display text-5xl text-white md:text-6xl">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">
          The page you tried to reach is no longer here, or the URL may have changed. You can go
          back to the homepage, browse current auto auctions, or contact the team directly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-gold-dark"
          >
            Return Home
          </Link>
          <Link
            to="/auto-auctions"
            className="inline-flex min-h-11 items-center justify-center border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
          >
            View Auto Auctions
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white/88 transition-colors hover:border-gold hover:text-gold"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 text-3xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Please try again or head back to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-gold-dark"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-border-strong bg-background px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JMA Auto Auctions | Powered by Jeff Martin Auctioneers" },
      {
        name: "description",
        content:
          "Preview upcoming auto auctions and vehicle inventory, then register and bid on the main Jeff Martin Auctioneers platform.",
      },
      { name: "author", content: "Jeff Martin Auctioneers" },
      { name: "theme-color", content: "#000000" },
      { name: "application-name", content: siteConfig.name },
      { property: "og:title", content: "JMA Auto Auctions" },
      {
        property: "og:description",
        content: "A conversion-focused auto auction discovery site powered by Jeff Martin Auctioneers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:url", content: siteConfig.url },
      { property: "og:image", content: `${siteConfig.url}/social-preview.png` },
      { property: "og:image:secure_url", content: `${siteConfig.url}/social-preview.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "JMA Auto Auctions preview" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JMA Auto Auctions" },
      {
        name: "twitter:description",
        content: "Preview upcoming auto auctions and featured vehicle inventory backed by Jeff Martin Auctioneers.",
      },
      { name: "twitter:image", content: `${siteConfig.url}/social-preview.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const normalizedPathname = normalizePathname(pathname);
  const canonicalUrl = absoluteUrl(normalizedPathname);
  const globalSchemas = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema(normalizedPathname),
  ];

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="robots"
          content={
            normalizedPathname === "/privacy" || normalizedPathname === "/terms"
              ? "noindex,follow"
              : "index,follow"
          }
        />
        {globalSchemas.map((schema, index) => (
          <JsonLd key={index} data={schema} />
        ))}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
