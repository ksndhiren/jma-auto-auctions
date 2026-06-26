import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gavel, Globe2, ShieldCheck, Users, ChevronRight, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, SectionHeader, Eyebrow } from "@/components/layout/Section";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { LotCard } from "@/components/auction/LotCard";
import { CategoryCard } from "@/components/auction/CategoryCard";
import { Cta } from "@/components/ui/cta";
import { auctions, lots, categories, testimonials, articles } from "@/data/mock";
import { siteConfig } from "@/config/site";
import heroAuction from "@/assets/hero-auction.jpg";
import sellInspection from "@/assets/sell-inspection.jpg";
import aboutAuction from "@/assets/about-auction.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aucto Auctions — Specialist Equipment & Asset Auctions" },
      {
        name: "description",
        content:
          "Buy and sell heavy equipment, trucks, and industrial assets through professionally managed auctions, powered by Jeff Martin Auctioneers.",
      },
      { property: "og:title", content: "Aucto Auctions — Powered by Jeff Martin Auctioneers" },
      {
        property: "og:description",
        content: "Specialist auction platform for equipment, trucks, industrial and agricultural assets.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featuredAuctions = auctions.filter((a) => a.status !== "completed").slice(0, 3);
  const featuredLots = lots.slice(0, 3);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src={heroAuction}
            alt="Rows of construction equipment lined up at a Jeff Martin Auctioneers sale yard at golden hour"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        </div>
        <div className="container-x relative grid min-h-[88vh] grid-cols-1 items-center gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Aucto Auctions · {siteConfig.parent.short}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] text-white md:text-7xl lg:text-[5.5rem]">
              Serious Assets.<br />
              Competitive Bidding.<br />
              <span className="text-gold">Proven Expertise.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80">
              Aucto Auctions connects motivated buyers with quality assets through professionally
              managed auctions, powered by {siteConfig.parent.name}.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Cta to="/auctions" variant="gold" size="lg">View Current Auctions</Cta>
              <Cta to="/sell" variant="outline-light" size="lg">Sell Your Assets</Cta>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-8 text-sm sm:grid-cols-4">
              <TrustItem>Nationwide reach</TrustItem>
              <TrustItem>Online & live auctions</TrustItem>
              <TrustItem>Specialist support</TrustItem>
              <TrustItem>JMA-managed</TrustItem>
            </div>
          </div>
        </div>
      </section>

      {/* AUCTION DISCOVERY */}
      <Section size="lg">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Current & Upcoming"
            title={<>Auctions open now.</>}
            description="Bid online, attend live, or do both — every auction is professionally managed end-to-end."
          />
          <Cta to="/auctions" variant="outline" withArrow size="sm">All Auctions</Cta>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredAuctions.map((a) => <AuctionCard key={a.id} auction={a} />)}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section tone="bone" size="lg">
        <SectionHeader
          eyebrow="Browse by Category"
          title="What we sell."
          description="From single-asset sales to complete plant liquidations, organised by category for fast discovery."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </Section>

      {/* BUYER & SELLER PATHWAYS */}
      <Section size="lg">
        <SectionHeader
          eyebrow="Two Audiences. One Standard."
          title="Built for buyers and sellers."
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <PathwayCard
            kind="Buyers"
            title="Find the assets your operation needs."
            body="Browse current auctions, register, and bid with confidence. Inspect equipment in person or review detailed online listings — then bid live or online."
            steps={["Browse auctions", "Register to bid", "Bid live or online", "Pay & collect"]}
            cta={{ label: "How to Buy", to: "/how-to-buy" }}
            tone="light"
          />
          <PathwayCard
            kind="Sellers"
            title="Reach motivated buyers with proven auction expertise."
            body="From a single piece of equipment to a complete plant, we structure, market, and manage the auction so you can focus on your business."
            steps={["Consultation", "Sale strategy", "Marketing & exposure", "Settlement"]}
            cta={{ label: "Sell With Aucto", to: "/sell" }}
            tone="dark"
          />
        </div>
      </Section>

      {/* WHY CHOOSE */}
      <Section tone="ink" size="lg">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why Aucto"
              title={<>The auction <span className="text-gold">standard.</span></>}
              tone="light"
              description="Decades of auction experience focused on the asset categories you operate every day."
            />
            <div className="mt-10">
              <Cta to="/about" variant="gold">Our Approach</Cta>
            </div>
          </div>
          <div className="grid gap-px bg-white/10 lg:col-span-7 sm:grid-cols-2">
            {[
              { i: Gavel, t: "Professional management", d: "Every auction structured, marketed, and run by an experienced JMA team." },
              { i: Globe2, t: "Nationwide reach", d: "Targeted bidder exposure across the United States and internationally." },
              { i: Users, t: "Buyer & seller support", d: "Specialists on hand before, during, and after the sale." },
              { i: ShieldCheck, t: "Transparent process", d: "Clear terms, accurate descriptions, and reliable settlement." },
            ].map((b) => (
              <div key={b.t} className="bg-ink p-8">
                <b.i className="size-6 text-gold" />
                <h3 className="mt-5 font-display text-lg text-white">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURED LOTS */}
      <Section size="lg">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Featured Lots"
            title="Sample inventory."
            description="Demonstration lots — connect your live auction feed to display real-time inventory."
          />
          <Cta to="/auctions" variant="outline" size="sm">View All Lots</Cta>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLots.map((l) => <LotCard key={l.id} lot={l} />)}
        </div>
      </Section>

      {/* ABOUT JMA */}
      <Section tone="bone" size="lg">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden">
            <img
              src={aboutAuction}
              alt="Auctioneer at a podium addressing bidders during a live auction"
              loading="lazy"
              width={1280}
              height={896}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-gold px-6 py-4">
              <p className="font-display text-2xl text-black">JMA</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-black/70">Auction Standard</p>
            </div>
          </div>
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              Operated by Jeff Martin Auctioneers.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Aucto Auctions is the specialist auction platform of {siteConfig.parent.name}. We
              bring decades of auction expertise across construction, transport, industrial, and
              agricultural assets — combining traditional auction craft with modern online bidding.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Specialist auction teams in every major category",
                "Detailed asset descriptions and inspections",
                "Strong bidder exposure across the United States",
                "Reliable support from consultation through settlement",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-ink">
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Cta to="/about" variant="dark">About JMA</Cta>
            </div>
          </div>
        </div>
      </Section>

      {/* SELLER LEAD GEN */}
      <section className="relative overflow-hidden bg-ink text-white">
        <img
          src={sellInspection}
          alt="JMA team inspecting a wheel loader with a contractor"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-x relative grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Sellers</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl lg:text-6xl">
              Have assets to sell?<br />
              <span className="text-gold">Let's build the right strategy.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              From a single machine to a complete plant liquidation, our auction team helps you
              choose the right format, reach the right bidders, and settle quickly.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end lg:justify-end">
            <Cta to="/sell" variant="gold" size="lg">Request a Consultation</Cta>
            <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-sm text-white/70 hover:text-gold">
              <Phone className="size-4 text-gold" /> Or call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Section size="lg">
        <SectionHeader
          eyebrow="What clients say"
          title="Trust earned, sale by sale."
          description="Placeholder quotes shown — replace with approved client testimonials before launch."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col border border-border bg-bone p-8">
              <Gavel className="size-5 text-gold" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm text-ink">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company} · {t.role}</p>
                {t.isPlaceholder && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-gold-dark">
                    Placeholder — pending approval
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* RESOURCES */}
      <Section tone="bone" size="lg">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Resources"
            title="Buyer & seller guides."
            description="Short reads to help you bid with confidence or prepare assets for auction."
          />
          <Cta to="/resources" variant="outline" size="sm">All Resources</Cta>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to="/resources/$slug"
              params={{ slug: a.slug }}
              className="group flex flex-col border border-border bg-background p-6 transition-colors hover:border-ink"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
                For {a.audience === "general" ? "everyone" : `${a.audience}s`} · {a.readTime} min
              </p>
              <h3 className="mt-3 flex-1 font-display text-lg leading-snug text-ink">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink group-hover:text-gold-dark">
                Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section tone="ink" size="md">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow tone="light">Ready when you are</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
              Ready to buy or sell?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Cta to="/auctions" variant="gold">Explore Auctions</Cta>
            <Cta to="/contact" variant="outline-light">Talk to a Specialist</Cta>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-white/70">
      <span className="size-1.5 rounded-full bg-gold" />
      <span className="text-xs uppercase tracking-[0.12em]">{children}</span>
    </div>
  );
}

function PathwayCard({
  kind,
  title,
  body,
  steps,
  cta,
  tone,
}: {
  kind: string;
  title: string;
  body: string;
  steps: string[];
  cta: { label: string; to: string };
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={
        dark
          ? "relative flex flex-col bg-ink p-10 text-white"
          : "relative flex flex-col border border-border bg-background p-10"
      }
    >
      <Eyebrow tone={dark ? "light" : "default"}>{kind}</Eyebrow>
      <h3 className={`mt-4 font-display text-3xl leading-tight ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h3>
      <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>
        {body}
      </p>
      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`flex items-center gap-3 border-t pt-3 first:border-t-0 first:pt-0 ${
              dark ? "border-white/10" : "border-border"
            }`}
          >
            <span className="font-display text-sm text-gold tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-sm ${dark ? "text-white/90" : "text-ink"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Cta to={cta.to} variant={dark ? "gold" : "dark"}>{cta.label}</Cta>
      </div>
    </div>
  );
}
