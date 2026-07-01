import { createFileRoute } from "@tanstack/react-router";
import { BlogCategoryPage, buildBlogHead } from "@/components/marketing/BlogLandingPage";
import { blogCategoryPages } from "@/data/blog-pages";

const page = blogCategoryPages["transportation-guides"];

export const Route = createFileRoute("/blog/transportation-guides")({
  head: () => buildBlogHead(page),
  component: () => <BlogCategoryPage page={page} />,
});
