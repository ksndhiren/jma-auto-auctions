import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeader, Eyebrow } from "@/components/layout/Section";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { SellerEnquiryForm } from "@/components/forms/SellerEnquiryForm";
import { Cta } from "@/components/ui/cta";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Vehicles | JMA Auto Auctions" },
      { name: "description", content: "Request a consultation to consign fleet vehicles, pickups, SUVs, repossessions, and commercial units through Jeff Martin Auctioneers." },
      { property: "og:title", content: "Sell Vehicles | JMA Auto Auctions" },
    ],
  }),
  component: SellPage,
});

const STEPS = [
  { title: "Submit your asset information", description: "Tell us what you'd like to sell. A quick form gets the conversation started." },
  { title: "Speak with an auction specialist", description: "We'll discuss your goals, timeline, and the right sale format for your assets." },
  { title: "Receive a recommended sale strategy", description: "A tailored proposal covering format, marketing, expected exposure, and timing." },
  { title: "Prepare and market the assets", description: "Photography, descriptions, and targeted marketing to qualified bidders nationwide." },
  { title: "Conduct the auction", description: "Live, online, or hybrid, managed end-to-end by our experienced auction team." },
  { title: "Settlement & removal", description: "Reliable post-sale settlement, buyer collection coordination, and final reporting." },
];

function SellPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%)]" />
        <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">For Sellers</Eyebrow>
            <h1 className="mt-4 font-display text-4xl text-white md:text-6xl lg:text-7xl">
              Sell your vehicles with <span className="text-gold">proven auction expertise.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              From a handful of fleet pickups to larger seller groups, our auction team structures,
              markets, and manages the sale so you can move inventory efficiently.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta href="#enquiry" variant="gold" size="lg">Request a Consultation</Cta>
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 px-4 py-3 text-sm text-white/80 hover:text-gold">
                <Phone className="size-4 text-gold" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why auction */}
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Why Auction" title="The right format for serious assets." />
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-6 sm:grid-cols-2">
              {[
                { t: "Speed", d: "Move assets in a defined window, not over months on the market." },
                { t: "Transparent pricing", d: "Live competitive bidding sets the market price on sale day." },
                { t: "Bidder reach", d: "Marketing to a curated audience of qualified auto and fleet buyers nationwide." },
                { t: "Single point of contact", d: "Specialist team manages everything from consultation to settlement." },
              ].map((b) => (
                <li key={b.t} className="border-l-2 border-gold pl-4">
                  <p className="font-display text-lg text-ink">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="bone" size="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow="The Process" title={<>From consultation <span className="text-gold">to settlement.</span></>} />
          <ProcessTimeline steps={STEPS} />
        </div>
      </Section>

      {/* What to prepare */}
      <Section size="md">
        <SectionHeader eyebrow="Before You Get in Touch" title="What to have on hand." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "List of assets you'd like to sell (a rough inventory is fine)",
            "Approximate location of the assets",
            "Photos or condition notes where available",
            "Any timing constraints: month-end, year-end, project deadlines",
            "Previous service records or operating hours where relevant",
            "Whether the assets need to remain in use until close to sale",
          ].map((p) => (
            <div key={p} className="flex items-start gap-3 border-l-2 border-gold bg-bone p-5">
              <ChevronRight className="mt-1 size-4 shrink-0 text-gold" />
              <p className="text-sm text-ink">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Form */}
      <Section tone="ink" size="md" id="enquiry">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Seller Enquiry</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Tell us about your assets.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              A specialist will follow up within one business day. No account required.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold">
                <Phone className="size-4 text-gold" /> {siteConfig.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <SellerEnquiryForm />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
