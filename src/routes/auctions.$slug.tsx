import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Package, Phone, Mail, Info, FileText, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { LotCard } from "@/components/auction/LotCard";
import { StatusBadge } from "@/components/auction/StatusBadge";
import { Countdown } from "@/components/auction/Countdown";
import { Cta } from "@/components/ui/cta";
import { auctions, getAuction, getLotsByAuction } from "@/data/mock";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

export const Route = createFileRoute("/auctions/$slug")({
  loader: ({ params }) => {
    const auction = getAuction(params.slug);
    if (!auction) throw notFound();
    return { auction };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.auction;
    return {
      meta: a
        ? [
            { title: `${a.title} | Aucto Auctions` },
            { name: "description", content: a.description },
            { property: "og:title", content: a.title },
            { property: "og:description", content: a.description },
            { property: "og:image", content: a.image },
          ]
        : [{ title: "Auction | Aucto Auctions" }],
    };
  },
  component: AuctionDetail,
  notFoundComponent: () => (
    <SiteShell>
      <Section>
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-3 font-display text-4xl">Auction not found</h1>
        <p className="mt-3 text-muted-foreground">Return to browse all current and upcoming sales.</p>
        <div className="mt-6"><Cta to="/auctions" variant="dark">All Auctions</Cta></div>
      </Section>
    </SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell>
      <Section>
        <h1 className="font-display text-3xl">This auction didn't load</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <div className="mt-6"><Cta onClick={reset} variant="dark">Try again</Cta></div>
      </Section>
    </SiteShell>
  ),
});

function AuctionDetail() {
  const { auction } = Route.useLoaderData();
  const lots = getLotsByAuction(auction.slug);
  const related = auctions.filter((a) => a.slug !== auction.slug && a.status !== "completed").slice(0, 3);

  useEffect(() => { trackEvent("view_auction", { slug: auction.slug }); }, [auction.slug]);

  const date = (s: string) => new Date(s).toLocaleString("en-US", {
    month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-ink text-white">
        <div className="container-x py-10 md:py-16">
          <Link to="/auctions" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-gold">
            ‹ Back to auctions
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={auction.status} />
                <span className="border border-white/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">{auction.type}</span>
                {auction.isDemo && <span className="bg-gold/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black">Sample</span>}
              </div>
              <h1 className="mt-5 font-display text-4xl text-white md:text-6xl">{auction.title}</h1>
              <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">{auction.description}</p>
              <div className="mt-8 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
                <DetailTile icon={Calendar} label="Starts" value={date(auction.startsAt)} />
                <DetailTile icon={Clock} label="Ends" value={date(auction.endsAt)} />
                <DetailTile icon={MapPin} label="Location" value={auction.location} />
              </div>
            </div>
            <aside className="lg:col-span-5">
              <div className="border border-white/15 bg-ink/60 p-6 backdrop-blur lg:sticky lg:top-24">
                {auction.status !== "completed" && (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      {auction.status === "upcoming" ? "Begins in" : "Closes in"}
                    </p>
                    <div className="mt-3">
                      <Countdown to={auction.status === "upcoming" ? auction.startsAt : auction.endsAt} />
                    </div>
                  </>
                )}
                <div className="mt-6 space-y-3">
                  <Cta variant="gold" size="lg" withArrow onClick={() => trackEvent("register_to_bid", { auction: auction.slug })} className="w-full">
                    Register to Bid
                  </Cta>
                  <Cta variant="outline-light" size="lg" href="#lots" withArrow={false} className="w-full">
                    View {auction.lotCount} Lots
                  </Cta>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:grid-cols-2">
                  <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold">
                    <Phone className="size-4 text-gold" /> {siteConfig.phone}
                  </a>
                  <a href={siteConfig.emailHref} className="flex items-center gap-2 hover:text-gold">
                    <Mail className="size-4 text-gold" /> Contact
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Important info */}
      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-3">
          <InfoBlock icon={Info} title="Inspection" body="Inspection days are listed below. Buyers are responsible for inspecting assets and reviewing descriptions before bidding." />
          <InfoBlock icon={FileText} title="Terms & Premium" body="A buyer's premium applies. The exact percentage and full terms are disclosed in the auction terms — please review before bidding." />
          <InfoBlock icon={Package} title="Collection" body="Buyers arrange transport. Collection windows and on-site contact details are issued with your post-sale invoice." />
        </div>
      </Section>

      {/* Lots */}
      <Section tone="bone" size="md" id="lots">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Lots in this auction</h2>
          <p className="text-sm text-muted-foreground">{lots.length} of {auction.lotCount} shown</p>
        </div>
        {lots.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lots.map((l) => <LotCard key={l.id} lot={l} />)}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-border bg-background p-10 text-center text-sm text-muted-foreground">
            Lot inventory will appear here once connected to the live auction feed.
          </div>
        )}
      </Section>

      {/* Related */}
      <Section size="md">
        <h2 className="font-display text-2xl text-ink md:text-3xl">Related auctions</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((a) => (
            <Link key={a.id} to="/auctions/$slug" params={{ slug: a.slug }} className="group block border border-border bg-background p-5 hover:border-ink">
              <StatusBadge status={a.status} />
              <h3 className="mt-3 font-display text-lg text-ink group-hover:text-gold-dark">{a.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{a.location}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Sticky mobile CTA */}
      <div className="sticky bottom-0 z-40 grid grid-cols-2 gap-px border-t border-border bg-background lg:hidden">
        <Cta variant="dark" withArrow={false} href="#lots" className="rounded-none">View Lots</Cta>
        <Cta variant="gold" withArrow={false} onClick={() => trackEvent("register_to_bid", { auction: auction.slug })} className="rounded-none">Register</Cta>
      </div>
    </SiteShell>
  );
}

function DetailTile({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-ink p-5">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
        <Icon className="size-3.5 text-gold" /> {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div>
      <Icon className="size-6 text-gold" />
      <h3 className="mt-3 font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
