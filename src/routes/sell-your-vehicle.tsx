import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["sell-your-vehicle"];

export const Route = createFileRoute("/sell-your-vehicle")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
