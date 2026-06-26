import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  variant?: "dark" | "light";
  className?: string;
  showAttribution?: boolean;
}

/**
 * Aucto Auctions wordmark + JMA attribution.
 * Replace the SVG with the final Aucto logo when supplied. The JMA attribution
 * text remains editable. Do NOT recreate the official JMA logo with text.
 */
export function BrandLockup({ variant = "dark", className, showAttribution = true }: BrandLockupProps) {
  const color = variant === "dark" ? "text-ink" : "text-white";
  const sub = variant === "dark" ? "text-muted-foreground" : "text-white/60";
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-3", className)} aria-label="Aucto Auctions home">
      <Mark variant={variant} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg tracking-tight", color)}>
          AUCTO<span className="text-gold">·</span>AUCTIONS
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
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 24 + Math.cos(a) * 20;
        const y1 = 24 + Math.sin(a) * 20;
        const x2 = 24 + Math.cos(a) * 23;
        const y2 = 24 + Math.sin(a) * 23;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="2" />;
      })}
      {/* gavel */}
      <rect x="16" y="22" width="14" height="6" rx="1" fill="#F2A900" />
      <rect x="26" y="14" width="4" height="14" fill="#F2A900" />
    </svg>
  );
}
