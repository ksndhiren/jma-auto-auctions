import { MapPin } from "lucide-react";
import type { Lot } from "@/data/types";

interface Props {
  lot: Lot;
}

export function LotCard({ lot }: Props) {
  const closeDate = lot.closesAt
    ? new Date(lot.closesAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <a
      href={lot.externalUrl ?? "https://www.jeffmartinauctioneers.com/all-auction-lots"}
      className="group flex h-full flex-col overflow-hidden border border-black/10 bg-white transition-all hover:border-black hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]"
    >
      {lot.image && (
        <div className="aspect-[16/11] overflow-hidden border-b border-black/10 bg-[#f5f1e8] p-2">
          <img
            src={lot.image}
            alt={lot.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            {lot.lotNumber}
          </p>
          <h3 className="mt-2 line-clamp-2 font-display text-lg leading-tight text-ink group-hover:text-gold-dark">
            {lot.title}
          </h3>
          </div>
          <span className="border border-black/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
            {lot.status}
          </span>
        </div>

        {lot.auctionName && (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
            {lot.auctionName}
          </p>
        )}
        {lot.location && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3 text-gold" /> {lot.location}
          </p>
        )}
        {closeDate && (
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-black/60">
            Auction Closes {closeDate}
          </p>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-black/10 pt-4">
          <div className="border-l-2 border-gold pl-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {lot.currentBid !== undefined ? "Current Bid" : "Opening Bid"}
            </p>
            <p className="mt-1 font-display text-xl text-ink">
              ${(lot.currentBid ?? lot.openingBid ?? 0).toLocaleString()}
            </p>
          </div>
          <div className="flex items-end justify-end">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-gold-dark">
              View on JMA ›
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
