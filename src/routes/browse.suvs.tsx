import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages.suvs;

export const Route = createFileRoute("/browse/suvs")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
