import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages["electric-vehicles"];

export const Route = createFileRoute("/browse/electric-vehicles")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
