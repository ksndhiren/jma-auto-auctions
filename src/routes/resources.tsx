import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { articles } from "@/data/mock";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Guides | JMA Auto Auctions" },
      { name: "description", content: "Articles for buyers and sellers on auction registration, bidding, asset preparation, and more." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-20">
        <div className="container-x">
          <Eyebrow>Resources</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">Guides for buyers & sellers.</h1>
        </div>
      </section>
      <Section size="md">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} to="/resources/$slug" params={{ slug: a.slug }} className="group flex flex-col border border-border bg-background p-6 hover:border-ink">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
                For {a.audience === "general" ? "everyone" : `${a.audience}s`} · {a.readTime} min
              </p>
              <h2 className="mt-3 flex-1 font-display text-xl leading-snug text-ink">{a.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink group-hover:text-gold-dark">
                Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
