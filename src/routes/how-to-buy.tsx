import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeader, Eyebrow } from "@/components/layout/Section";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { Cta } from "@/components/ui/cta";
import { siteConfig } from "@/config/site";
import { faqs } from "@/data/mock";

export const Route = createFileRoute("/how-to-buy")({
  head: () => ({
    meta: [
      { title: "How to Bid | JMA Auto Auctions" },
      { name: "description", content: "Step-by-step guide to reviewing inventory, registering, and bidding through Jeff Martin Auctioneers." },
      { property: "og:title", content: "How to Bid | JMA Auto Auctions" },
    ],
  }),
  component: HowToBuy,
});

const STEPS = [
  { title: "Find an auction", description: "Browse current and upcoming sales. Filter by category, format, or location to find auctions matching what you need." },
  { title: "Review the lots", description: "Each lot has photos, specifications, condition notes, and inspection details. Inspect in person where possible." },
  { title: "Register to bid", description: "Create an account and complete bidder verification. Some sales require a refundable deposit — see the auction terms." },
  { title: "Bid live or online", description: "Place bids in real-time on the bidding platform, or attend live where applicable." },
  { title: "Pay & collect", description: "Settle your invoice promptly via the listed payment methods, then arrange collection within the published window." },
];

function HowToBuy() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-24">
        <div className="container-x max-w-4xl">
          <Eyebrow>For Buyers</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">How to buy at auction.</h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            A clear, step-by-step guide to finding lots, registering, bidding, paying, and
            collecting — whether you're buying online, live, or both.
          </p>
        </div>
      </section>

      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeader
            eyebrow="The Process"
            title={<>From browse <span className="text-gold">to bid</span> to collection.</>}
          />
          <ProcessTimeline steps={STEPS} />
        </div>
      </Section>

      <Section tone="bone" size="md">
        <SectionHeader eyebrow="Common Questions" title="Buyer FAQ." />
        <div className="mt-12">
          <FAQAccordion groups={faqs.filter((g) => ["registration", "bidding", "payments", "inspection-collection"].includes(g.slug))} />
        </div>
      </Section>

      <Section tone="ink" size="md">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl text-white md:text-4xl">Ready to start bidding?</h2>
            <p className="mt-2 text-white/70">Browse auctions, set alerts, or speak to a specialist.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Cta href={siteConfig.platform.auctionsUrl} variant="gold">View Auctions</Cta>
            <Cta to="/auction-alerts" variant="outline-light">Get Alerts</Cta>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
