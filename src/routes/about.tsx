import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeader, Eyebrow } from "@/components/layout/Section";
import { Cta } from "@/components/ui/cta";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JMA Auto Auctions" },
      { name: "description", content: "JMA Auto Auctions is the auto-focused lead generation and bidder-discovery experience powered by Jeff Martin Auctioneers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const heroBackgroundImage = "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg";

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-black text-white">
        <div className="absolute inset-0">
          <img
            src={heroBackgroundImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-68"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.86)_48%,rgba(0,0,0,0.54)_74%,rgba(0,0,0,0.2)_100%),radial-gradient(circle_at_top_left,rgba(242,169,0,0.12),transparent_24%)]" />
        </div>
        <div className="relative container-x max-w-5xl py-16 md:py-24">
          <Eyebrow tone="light">About</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white md:text-6xl">
            Built to help serious auto buyers move from discovery to bidding with confidence
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            JMA Auto Auctions is the auto-focused discovery layer for {siteConfig.parent.name}. We
            help buyers preview upcoming auto events and vehicle inventory, then route them into
            the main bidding platform when they are ready to act.
          </p>
        </div>
      </section>

      <Section size="md">
        <div className="border border-black/10 bg-bone p-8 md:p-12">
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
              Auction expertise focused on the vehicles buyers are actually searching for.
            </h2>
            <p className="mt-5 text-muted-foreground">
              This site is intentionally narrow: auto auctions, featured inventory, bidder
              education, and stronger handoff to the main JMA website. The experience is built to
              reduce friction, increase trust, and convert interested users into approved bidders.
            </p>
            <p className="mt-4 text-muted-foreground">
              Instead of duplicating the full auction platform, we focus on surfacing the right
              inventory and the right next step at the right time.
            </p>
        </div>
      </Section>

      <Section tone="bone" size="md">
        <SectionHeader eyebrow="What We Stand For" title="Standards every auction is built on." />
        <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Accuracy", d: "Honest descriptions, condition disclosure, and inspection access." },
            { t: "Reach", d: "Targeted marketing to qualified bidders nationwide." },
            { t: "Service", d: "Specialist support before, during, and after every sale." },
            { t: "Reliability", d: "Clear terms, on-time settlement, organised collection." },
          ].map((v) => (
            <div key={v.t} className="bg-background p-8">
              <p className="font-display text-2xl text-gold">·</p>
              <h3 className="mt-3 font-display text-lg text-ink">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" size="md">
        <div className="grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl text-white md:text-4xl">Talk to a specialist.</h2>
            <p className="mt-2 text-white/70">Whether you're buying or selling, our team is one call or message away.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Cta to="/contact" variant="gold">Contact Us</Cta>
            <Cta to="/sell" variant="outline-light">Sell Vehicles</Cta>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
