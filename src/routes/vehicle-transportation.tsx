import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["vehicle-transportation"];

export const Route = createFileRoute("/vehicle-transportation")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
