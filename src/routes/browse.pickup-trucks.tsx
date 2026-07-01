import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages["pickup-trucks"];

export const Route = createFileRoute("/browse/pickup-trucks")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
