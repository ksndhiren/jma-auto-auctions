import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages.sedans;

export const Route = createFileRoute("/browse/sedans")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
