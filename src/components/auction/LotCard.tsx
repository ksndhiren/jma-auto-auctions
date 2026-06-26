import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Lot } from "@/data/types";

interface Props {
  lot: Lot;
}

export function LotCard({ lot }: Props) {
  return (
    <Link
      to="/lots/$slug"
      params={{ slug: lot.slug }}
      className="group flex flex-col overflow-hidden border border-border bg-background transition-all hover:border-ink"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={lot.image}
          alt={lot.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-ink px-2 py-1 font-display text-[10px] tracking-wider text-white">
          {lot.lotNumber}
        </span>
        {lot.isDemo && (
          <span className="absolute right-3 top-3 bg-gold/90 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-black">
            Sample
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
          {lot.manufacturer} {lot.year ? `· ${lot.year}` : ""}
        </p>
        <h3 className="mt-1.5 line-clamp-2 font-display text-base leading-snug text-ink">
          {lot.title}
        </h3>
        {lot.location && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3 text-gold" /> {lot.location}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {lot.status === "open" ? "Current Bid" : lot.status === "upcoming" ? "Opening Soon" : "Final"}
            </p>
            {lot.currentBid !== undefined ? (
              <p className="font-display text-lg text-ink">
                ${lot.currentBid.toLocaleString()}
              </p>
            ) : (
              <p className="font-display text-sm text-muted-foreground">—</p>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-gold-dark">
            View ›
          </span>
        </div>
      </div>
    </Link>
  );
}
