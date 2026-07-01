import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["auto-auctions"];

export const Route = createFileRoute("/auto-auctions")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
