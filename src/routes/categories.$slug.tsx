import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { LotCard } from "@/components/auction/LotCard";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { Cta } from "@/components/ui/cta";
import { auctions, getCategory, getLotsByCategory } from "@/data/mock";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { category: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.category
      ? [
          { title: `${loaderData.category.name} Auctions | JMA Auto Auctions` },
          { name: "description", content: loaderData.category.description },
        ]
      : [{ title: "Category | JMA Auto Auctions" }],
  }),
  notFoundComponent: () => (
    <SiteShell><Section><h1 className="font-display text-3xl">Category not found</h1><Cta to="/categories" variant="dark" className="mt-4">All categories</Cta></Section></SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell><Section><h1 className="font-display text-3xl">Couldn't load this category</h1><p className="mt-2 text-muted-foreground">{error.message}</p><Cta onClick={reset} variant="dark" className="mt-4">Try again</Cta></Section></SiteShell>
  ),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { category } = Route.useLoaderData();
  const catLots = getLotsByCategory(category.slug);
  const catAuctions = auctions.filter((a) => a.categories.includes(category.slug));

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%)]" />
        <div className="container-x relative py-16 md:py-24">
          <Link to="/categories" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-gold">‹ All categories</Link>
          <h1 className="mt-4 font-display text-4xl text-white md:text-6xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/70">{category.description}</p>
        </div>
      </section>

      <Section size="md">
        <h2 className="font-display text-2xl text-ink">Auctions in this category</h2>
        {catAuctions.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {catAuctions.map((a) => <AuctionCard key={a.id} auction={a} />)}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">No active auctions in this category right now.</p>
        )}
      </Section>

      <Section tone="bone" size="md">
        <h2 className="font-display text-2xl text-ink">Featured lots</h2>
        {catLots.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catLots.map((l) => <LotCard key={l.id} lot={l} />)}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">Sample lots will appear here once inventory is connected.</p>
        )}
      </Section>
    </SiteShell>
  );
}
