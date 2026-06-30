import { Calendar, MapPin, Package } from "lucide-react";
import type { Auction } from "@/data/types";
import { Countdown } from "./Countdown";
import { StatusBadge } from "./StatusBadge";

interface Props {
  auction: Auction;
  variant?: "default" | "compact";
}

export function AuctionCard({ auction, variant = "default" }: Props) {
  const date = new Date(auction.startsAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={auction.externalUrl ?? "https://www.jeffmartinauctioneers.com/auctions"}
      className="group flex h-full flex-col overflow-hidden border border-black/10 bg-white transition-all hover:border-black hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]"
    >
      {auction.image && (
        <div className="aspect-[16/9] overflow-hidden border-b border-black/10 bg-black">
          <img
            src={auction.image}
            alt={auction.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {auction.eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                {auction.eyebrow}
              </p>
            )}
            <h3 className="mt-2 line-clamp-2 font-display text-base leading-tight text-ink group-hover:text-gold-dark md:text-lg">
              {auction.title}
            </h3>
          </div>
          <StatusBadge status={auction.status} />
        </div>

        {variant !== "compact" && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {auction.description}
          </p>
        )}

        <dl className="mt-4 grid grid-cols-1 gap-2.5 text-[11px]">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-3 text-gold" />
            <span className="font-semibold text-ink">{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-3 text-gold" />
            <span className="font-semibold text-ink">{auction.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="size-3 text-gold" />
            <span className="font-semibold text-ink">{auction.lotCount} lots</span>
          </div>
        </dl>

        <div className="mt-auto border-t border-black/10 pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {auction.status === "upcoming" ? "Begins in" : "Closes in"}
              </p>
              <div className="mt-1">
                <Countdown
                  to={auction.status === "upcoming" ? auction.startsAt : auction.endsAt}
                  compact
                />
              </div>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors group-hover:text-gold-dark">
              Live on JMA
            </span>
          </div>
          <span className="mt-4 inline-flex w-full items-center justify-center border border-black px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors group-hover:border-gold-dark group-hover:text-gold-dark">
            View Auction
          </span>
        </div>
      </div>
    </a>
  );
}
