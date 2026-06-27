import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  variant?: "dark" | "light";
  className?: string;
  showAttribution?: boolean;
}

const SPOKES = [
  { x1: 44, y1: 24, x2: 47, y2: 24 },
  { x1: 41.321, y1: 34, x2: 43.918, y2: 35.5 },
  { x1: 34, y1: 41.321, x2: 35.5, y2: 43.918 },
  { x1: 24, y1: 44, x2: 24, y2: 47 },
  { x1: 14, y1: 41.321, x2: 12.5, y2: 43.918 },
  { x1: 6.679, y1: 34, x2: 4.082, y2: 35.5 },
  { x1: 4, y1: 24, x2: 1, y2: 24 },
  { x1: 6.679, y1: 14, x2: 4.082, y2: 12.5 },
  { x1: 14, y1: 6.679, x2: 12.5, y2: 4.082 },
  { x1: 24, y1: 4, x2: 24, y2: 1 },
  { x1: 34, y1: 6.679, x2: 35.5, y2: 4.082 },
  { x1: 41.321, y1: 14, x2: 43.918, y2: 12.5 },
] as const;

/**
 * Temporary wordmark + JMA attribution.
 * Replace the SVG with the final Aucto logo when supplied. The JMA attribution
 * text remains editable. Do NOT recreate the official JMA logo with text.
 */
export function BrandLockup({ variant = "dark", className, showAttribution = true }: BrandLockupProps) {
  const color = variant === "dark" ? "text-ink" : "text-white";
  const sub = variant === "dark" ? "text-muted-foreground" : "text-white/60";
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-3", className)} aria-label="JMA Auto Auctions home">
      <Mark variant={variant} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg tracking-tight", color)}>
          JMA<span className="text-gold">·</span>AUTO AUCTIONS
        </span>
        {showAttribution && (
          <span className={cn("mt-1 text-[10px] font-medium uppercase tracking-[0.18em]", sub)}>
            Powered by Jeff Martin Auctioneers
          </span>
        )}
      </span>
    </Link>
  );
}

function Mark({ variant }: { variant: "dark" | "light" }) {
  const stroke = variant === "dark" ? "#000" : "#fff";
  return (
    <svg
      viewBox="0 0 48 48"
      width="36"
      height="36"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="24" cy="24" r="20" stroke={stroke} strokeWidth="2" />
      {SPOKES.map((spoke, i) => (
        <line key={i} {...spoke} stroke={stroke} strokeWidth="2" />
      ))}
      {/* gavel */}
      <rect x="16" y="22" width="14" height="6" rx="1" fill="#F2A900" />
      <rect x="26" y="14" width="4" height="14" fill="#F2A900" />
    </svg>
  );
}
