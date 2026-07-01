import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteConfig } from "@/config/site";

const BASE_URL = siteConfig.url;

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/cars-for-sale", changefreq: "weekly", priority: "0.8" },
          { path: "/used-cars-for-sale", changefreq: "weekly", priority: "0.8" },
          { path: "/auto-auctions", changefreq: "weekly", priority: "0.8" },
          { path: "/upcoming-auto-auctions", changefreq: "weekly", priority: "0.8" },
          { path: "/vehicle-marketplace", changefreq: "weekly", priority: "0.8" },
          { path: "/sell-your-vehicle", changefreq: "weekly", priority: "0.8" },
          { path: "/vehicle-consignment", changefreq: "weekly", priority: "0.8" },
          { path: "/dealer-inventory", changefreq: "weekly", priority: "0.8" },
          { path: "/fleet-vehicles", changefreq: "weekly", priority: "0.8" },
          { path: "/government-vehicle-auctions", changefreq: "weekly", priority: "0.8" },
          { path: "/repo-car-auctions", changefreq: "weekly", priority: "0.8" },
          { path: "/vehicle-financing", changefreq: "weekly", priority: "0.8" },
          { path: "/vehicle-transportation", changefreq: "weekly", priority: "0.8" },
          { path: "/browse/sedans", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/suvs", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/pickup-trucks", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/luxury-cars", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/electric-vehicles", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/hybrid-vehicles", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/vans", changefreq: "weekly", priority: "0.7" },
          { path: "/browse/commercial-vehicles", changefreq: "weekly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/buying-guides", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/selling-guides", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/auto-auction-guides", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/financing-guides", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/transportation-guides", changefreq: "weekly", priority: "0.7" },
          { path: "/blog/market-insights", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
