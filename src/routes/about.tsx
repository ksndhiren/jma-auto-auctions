import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeader, Eyebrow } from "@/components/layout/Section";
import { Cta } from "@/components/ui/cta";
import aboutAuction from "@/assets/about-auction.jpg";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aucto Auctions — Powered by Jeff Martin Auctioneers" },
      { name: "description", content: "Aucto Auctions is the specialist auction platform of Jeff Martin Auctioneers, bringing decades of expertise to equipment, transport, industrial, and agricultural sales." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-24">
        <div className="container-x max-w-4xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">
            Aucto Auctions, operated by {siteConfig.parent.name}.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Aucto Auctions is the specialist auction platform of {siteConfig.parent.name}. We
            combine decades of traditional auction craft with modern online bidding to deliver
            professionally managed sales for buyers and sellers across the country.
          </p>
        </div>
      </section>

      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-2">
          <img src={aboutAuction} alt="Auctioneer addressing bidders at a live sale" className="aspect-[4/3] w-full object-cover" />
          <div>
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
              Auction expertise focused on the assets you operate.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Our auction teams specialize in the asset categories we sell — construction
              equipment, trucks and trailers, industrial machinery, and agricultural equipment.
              That category depth shows in accurate descriptions, targeted marketing, and bidder
              audiences that turn into sale prices.
            </p>
            <p className="mt-4 text-muted-foreground">
              From single-asset sales to multi-state plant liquidations, we structure each
              auction around the seller's goals and the buyers most likely to act.
            </p>
          </div>
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
            <Cta to="/sell" variant="outline-light">Sell Assets</Cta>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
