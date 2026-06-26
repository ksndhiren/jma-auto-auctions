import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Cta } from "@/components/ui/cta";
import { getArticle, articles } from "@/data/mock";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.article
      ? [
          { title: `${loaderData.article.title} | Aucto Auctions` },
          { name: "description", content: loaderData.article.excerpt },
          { property: "og:title", content: loaderData.article.title },
        ]
      : [{ title: "Article | Aucto Auctions" }],
  }),
  notFoundComponent: () => (
    <SiteShell><Section><h1 className="font-display text-3xl">Article not found</h1><Cta to="/resources" variant="dark" className="mt-4">All resources</Cta></Section></SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell><Section><h1 className="font-display text-3xl">Couldn't load this article</h1><p className="mt-2 text-muted-foreground">{error.message}</p><Cta onClick={reset} variant="dark" className="mt-4">Try again</Cta></Section></SiteShell>
  ),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <SiteShell>
      <Section size="md">
        <div className="mx-auto max-w-3xl">
          <Link to="/resources" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-ink">‹ All resources</Link>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            For {article.audience === "general" ? "everyone" : `${article.audience}s`} · {article.readTime} min
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
          <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground">
            <p>{article.body}</p>
            <p className="text-muted-foreground">
              This article is a placeholder. Replace with editorial content before launch, or
              connect this route to a CMS.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="bone" size="md">
        <h2 className="font-display text-2xl text-ink">More from our resources</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((a) => (
            <Link key={a.slug} to="/resources/$slug" params={{ slug: a.slug }} className="block border border-border bg-background p-5 hover:border-ink">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">{a.readTime} min read</p>
              <p className="mt-2 font-display text-base text-ink">{a.title}</p>
            </Link>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
