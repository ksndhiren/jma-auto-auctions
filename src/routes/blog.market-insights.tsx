import { createFileRoute } from "@tanstack/react-router";
import { BlogCategoryPage, buildBlogHead } from "@/components/marketing/BlogLandingPage";
import { blogCategoryPages } from "@/data/blog-pages";

const page = blogCategoryPages["market-insights"];

export const Route = createFileRoute("/blog/market-insights")({
  head: () => buildBlogHead(page),
  component: () => <BlogCategoryPage page={page} />,
});
