import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Package } from "lucide-react";
import type { Auction } from "@/data/types";
import { StatusBadge } from "./StatusBadge";
import { Countdown } from "./Countdown";

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
    <Link
      to="/auctions/$slug"
      params={{ slug: auction.slug }}
      className="group relative flex flex-col overflow-hidden border border-border bg-background transition-all hover:border-ink hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={auction.image}
          alt={auction.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={auction.status} />
        </div>
        <div className="absolute bottom-3 right-3 bg-ink/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {auction.type}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-tight text-ink group-hover:text-gold-dark">
          {auction.title}
        </h3>
        {variant !== "compact" && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{auction.description}</p>
        )}
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-[11px]">
          <div className="flex flex-col">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3 text-gold" /> Date
            </dt>
            <dd className="mt-1 font-semibold text-ink">{date}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3 text-gold" /> Location
            </dt>
            <dd className="mt-1 truncate font-semibold text-ink">{auction.location}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Package className="size-3 text-gold" /> Lots
            </dt>
            <dd className="mt-1 font-semibold text-ink">{auction.lotCount}</dd>
          </div>
        </dl>
        {auction.status !== "completed" && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {auction.status === "upcoming" ? "Begins in" : "Closes in"}
            </span>
            <Countdown
              to={auction.status === "upcoming" ? auction.startsAt : auction.endsAt}
              compact
            />
          </div>
        )}
      </div>
    </Link>
  );
}
