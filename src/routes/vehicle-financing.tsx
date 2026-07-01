import { createFileRoute } from "@tanstack/react-router";
import { SeoLandingPage, buildSeoHead } from "@/components/marketing/SeoLandingPage";
import { seoPages } from "@/data/seo-pages";

const page = seoPages["vehicle-financing"];

export const Route = createFileRoute("/vehicle-financing")({
  head: () => buildSeoHead(page),
  component: () => <SeoLandingPage page={page} />,
});
