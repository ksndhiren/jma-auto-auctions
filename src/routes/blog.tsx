import { createFileRoute } from "@tanstack/react-router";
import { BlogHubPage, buildBlogHead } from "@/components/marketing/BlogLandingPage";
import { blogHubPage } from "@/data/blog-pages";

export const Route = createFileRoute("/blog")({
  head: () => buildBlogHead(blogHubPage),
  component: () => <BlogHubPage page={blogHubPage} />,
});
