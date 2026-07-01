import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages["luxury-cars"];

export const Route = createFileRoute("/browse/luxury-cars")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
