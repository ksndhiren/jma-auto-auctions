import { createFileRoute } from "@tanstack/react-router";
import { BlogCategoryPage, buildBlogHead } from "@/components/marketing/BlogLandingPage";
import { blogCategoryPages } from "@/data/blog-pages";

const page = blogCategoryPages["auto-auction-guides"];

export const Route = createFileRoute("/blog/auto-auction-guides")({
  head: () => buildBlogHead(page),
  component: () => <BlogCategoryPage page={page} />,
});
