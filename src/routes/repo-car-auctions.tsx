import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["repo-car-auctions"];

export const Route = createFileRoute("/repo-car-auctions")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
