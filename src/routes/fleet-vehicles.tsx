import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["fleet-vehicles"];

export const Route = createFileRoute("/fleet-vehicles")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
