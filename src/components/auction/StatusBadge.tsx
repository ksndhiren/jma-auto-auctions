import { cn } from "@/lib/utils";
import type { AuctionStatus } from "@/data/types";

const labels: Record<AuctionStatus | "open_lot" | "closed_lot" | "upcoming_lot", string> = {
  upcoming: "Upcoming",
  open: "Open for Bidding",
  live_today: "Live Today",
  closing_soon: "Closing Soon",
  completed: "Completed",
  open_lot: "Open",
  closed_lot: "Closed",
  upcoming_lot: "Upcoming",
};

const styles: Record<string, string> = {
  upcoming: "bg-white text-ink border-border-strong",
  open: "bg-gold text-black border-gold",
  live_today: "bg-ink text-white border-ink",
  closing_soon: "bg-destructive text-white border-destructive",
  completed: "bg-muted text-muted-foreground border-border",
};

interface Props {
  status: AuctionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
        styles[status] ?? styles.upcoming,
        className,
      )}
    >
      {status === "live_today" && <span className="size-1.5 animate-pulse rounded-full bg-gold" />}
      {status === "closing_soon" && <span className="size-1.5 animate-pulse rounded-full bg-white" />}
      {labels[status]}
    </span>
  );
}
