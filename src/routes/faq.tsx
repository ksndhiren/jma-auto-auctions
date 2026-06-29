import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Cta } from "@/components/ui/cta";
import { faqs } from "@/data/mock";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | JMA Auto Auctions" },
      { name: "description", content: "Answers to buyer and seller questions about registration, bidding, payments, inspections, and selling assets at auction." },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-black text-white py-14 md:py-20">
        <div className="container-x">
          <Eyebrow>Help Centre</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">Frequently asked questions.</h1>
        </div>
      </section>
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="FAQ groups" className="space-y-1 border-l border-border pl-4">
              {faqs.map((g) => (
                <a key={g.slug} href={`#${g.slug}`} className="block text-sm text-muted-foreground hover:text-ink">
                  {g.title}
                </a>
              ))}
            </nav>
          </aside>
          <FAQAccordion groups={faqs} />
        </div>
      </Section>
      <Section tone="bone" size="sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-2xl text-ink">Still have a question?</p>
          <Cta to="/contact" variant="dark">Contact Us</Cta>
        </div>
      </Section>
    </SiteShell>
  );
}
