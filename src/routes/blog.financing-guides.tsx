import { createFileRoute } from "@tanstack/react-router";
import { BlogCategoryPage, buildBlogHead } from "@/components/marketing/BlogLandingPage";
import { blogCategoryPages } from "@/data/blog-pages";

const page = blogCategoryPages["financing-guides"];

export const Route = createFileRoute("/blog/financing-guides")({
  head: () => buildBlogHead(page),
  component: () => <BlogCategoryPage page={page} />,
});
