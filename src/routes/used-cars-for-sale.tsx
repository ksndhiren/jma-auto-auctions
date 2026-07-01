import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["used-cars-for-sale"];

export const Route = createFileRoute("/used-cars-for-sale")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
