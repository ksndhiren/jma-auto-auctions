import { createFileRoute } from "@tanstack/react-router";
import { BrowseLandingPage, buildBrowseHead } from "@/components/marketing/BrowseLandingPage";
import { browsePages } from "@/data/browse-pages";

const page = browsePages["commercial-vehicles"];

export const Route = createFileRoute("/browse/commercial-vehicles")({
  head: () => buildBrowseHead(page),
  component: () => <BrowseLandingPage page={page} />,
});
