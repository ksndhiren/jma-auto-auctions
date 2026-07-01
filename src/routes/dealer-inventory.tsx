import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["dealer-inventory"];

export const Route = createFileRoute("/dealer-inventory")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
