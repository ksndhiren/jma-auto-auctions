import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { CategoryCard } from "@/components/auction/CategoryCard";
import { categories } from "@/data/mock";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Browse Auction Inventory | Aucto Auctions" },
      { name: "description", content: "Browse auctions by category — construction equipment, trucks and trailers, industrial assets, and agricultural equipment." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-20">
        <div className="container-x">
          <Eyebrow>Categories</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">Asset categories.</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Specialist auction expertise across the asset classes we know best.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </Section>
    </SiteShell>
  );
}
