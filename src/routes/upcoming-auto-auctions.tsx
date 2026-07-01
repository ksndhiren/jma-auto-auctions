import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["upcoming-auto-auctions"];

export const Route = createFileRoute("/upcoming-auto-auctions")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
