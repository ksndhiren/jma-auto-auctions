import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MapPin, AlertTriangle, Phone, Download } from "lucide-react";
import { useEffect } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Cta } from "@/components/ui/cta";
import { getLot, getAuction, lots } from "@/data/mock";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/lots/$slug")({
  loader: ({ params }) => {
    const lot = getLot(params.slug);
    if (!lot) throw notFound();
    return { lot };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.lot;
    return {
      meta: l
        ? [
            { title: `${l.title} | Aucto Auctions` },
            { name: "description", content: l.description },
            { property: "og:title", content: l.title },
            { property: "og:image", content: l.image },
          ]
        : [{ title: "Lot | Aucto Auctions" }],
    };
  },
  component: LotDetail,
  notFoundComponent: () => (
    <SiteShell><Section><h1 className="font-display text-3xl">Lot not found</h1></Section></SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell><Section>
      <h1 className="font-display text-3xl">This lot didn't load</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Cta onClick={reset} variant="dark" className="mt-4">Try again</Cta>
    </Section></SiteShell>
  ),
});

function LotDetail() {
  const { lot } = Route.useLoaderData();
  const auction = getAuction(lot.auctionSlug);
  const related = lots.filter((l) => l.slug !== lot.slug && l.category === lot.category).slice(0, 3);

  useEffect(() => { trackEvent("view_lot", { slug: lot.slug }); }, [lot.slug]);

  return (
    <SiteShell>
      <Section size="md">
        <Link to="/auctions/$slug" params={{ slug: lot.auctionSlug }} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-ink">
          ‹ Back to {auction?.title ?? "auction"}
        </Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-bone">
              <img src={lot.image} alt={lot.title} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 font-display text-xs tracking-wider text-white">
                {lot.lotNumber}
              </span>
              {lot.isDemo && (
                <span className="absolute right-4 top-4 bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
                  Sample inventory
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
              {lot.manufacturer} {lot.year && `· ${lot.year}`}
            </p>
            <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">{lot.title}</h1>
            {lot.location && (
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-gold" /> {lot.location}
              </p>
            )}

            <div className="mt-6 border border-border bg-bone p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {lot.status === "open" ? "Current Bid" : lot.status === "upcoming" ? "Opening Soon" : "Final Price"}
              </p>
              {lot.currentBid !== undefined ? (
                <p className="mt-1 font-display text-4xl text-ink">${lot.currentBid.toLocaleString()}</p>
              ) : (
                <p className="mt-1 font-display text-3xl text-muted-foreground">—</p>
              )}
              <div className="mt-5 space-y-2">
                <Cta variant="gold" size="lg" withArrow onClick={() => trackEvent("register_to_bid", { lot: lot.slug })} className="w-full">
                  Bid on this lot
                </Cta>
                {auction && (
                  <Cta to="/auctions/$slug" variant="outline" size="md" withArrow={false} params={{ slug: auction.slug }} className="w-full">
                    View full auction
                  </Cta>
                )}
              </div>
            </div>

            {lot.specs && lot.specs.length > 0 && (
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {lot.specs.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{s.label}</dt>
                    <dd className="text-sm font-semibold text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl text-ink">Description</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lot.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FactCard label="Condition" value={lot.condition ?? "—"} />
              <FactCard label="Hours / Mileage" value={lot.hours ? `${lot.hours.toLocaleString()} hrs` : "—"} />
              <FactCard label="Serial #" value={lot.serialNumber ?? "—"} />
              <FactCard label="Lot Number" value={lot.lotNumber} />
            </div>

            <div className="mt-10 flex items-start gap-3 border-l-2 border-gold bg-bone p-5 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" />
              <p>
                Buyers are responsible for reviewing all descriptions, inspecting assets where
                possible, and reading the auction terms. Descriptions are provided as a guide and
                are not warranties.
              </p>
            </div>
          </div>
          <aside>
            <h3 className="font-display text-lg text-ink">Need help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Speak with a specialist about this lot.</p>
            <div className="mt-4 space-y-3 text-sm">
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-ink hover:text-gold-dark">
                <Phone className="size-4 text-gold" /> {siteConfig.phone}
              </a>
              <Cta to="/contact" variant="outline" size="sm">Contact a specialist</Cta>
            </div>
            <div className="mt-8">
              <h3 className="font-display text-lg text-ink">Documents</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); trackEvent("download_auction_document", { lot: lot.slug }); }} className="mt-3 flex items-center gap-3 border border-border bg-background p-4 text-sm hover:border-ink">
                <Download className="size-4 text-gold" />
                <span>Inspection sheet (PDF)</span>
              </a>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-border pt-12">
            <h2 className="font-display text-2xl text-ink">Related lots</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {related.map((l) => (
                <Link key={l.id} to="/lots/$slug" params={{ slug: l.slug }} className="group block border border-border bg-background p-4 hover:border-ink">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-dark">{l.lotNumber}</p>
                  <p className="mt-1 line-clamp-2 font-display text-sm text-ink">{l.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-background p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-base text-ink">{value}</p>
    </div>
  );
}
