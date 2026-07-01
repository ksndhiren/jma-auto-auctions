import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["cars-for-sale"];

export const Route = createFileRoute("/cars-for-sale")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
