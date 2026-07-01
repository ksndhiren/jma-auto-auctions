import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["government-vehicle-auctions"];

export const Route = createFileRoute("/government-vehicle-auctions")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
