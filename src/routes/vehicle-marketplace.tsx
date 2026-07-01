import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["vehicle-marketplace"];

export const Route = createFileRoute("/vehicle-marketplace")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
