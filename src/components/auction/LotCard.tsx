import { MapPin } from "lucide-react";
import type { Lot } from "@/data/types";
import { getOptimizedLotImageUrl } from "@/lib/utils";

interface Props {
  lot: Lot;
}

export function LotCard({ lot }: Props) {
  const imageSrc = getOptimizedLotImageUrl(lot.image);
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
        <div className="aspect-[4/3] overflow-hidden border-b border-black/10 bg-white p-3">
          <img
            src={imageSrc}
            alt={lot.title}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Lot {lot.lotNumber}
            </p>
            <h3 className="mt-2 line-clamp-2 font-display text-base leading-tight text-ink group-hover:text-gold-dark md:text-lg">
              {lot.title}
            </h3>
          </div>
          <span className="shrink-0 border border-black/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
            {lot.status}
          </span>
        </div>

        {lot.auctionName && (
          <p className="mt-3 line-clamp-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
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

        <div className="mt-auto border-t border-black/10 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/55">
              Featured vehicle
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-gold-dark">
              Live on JMA
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
