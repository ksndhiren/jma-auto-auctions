import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages.vans;

export const Route = createFileRoute("/browse/vans")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
