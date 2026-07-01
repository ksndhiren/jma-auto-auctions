import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages["hybrid-vehicles"];

export const Route = createFileRoute("/browse/hybrid-vehicles")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
