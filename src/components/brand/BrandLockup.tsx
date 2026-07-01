import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  variant?: "dark" | "light";
  className?: string;
  showAttribution?: boolean;
}

/**
 * Temporary wordmark + JMA attribution.
 * Replace the SVG with the final Aucto logo when supplied. The JMA attribution
 * text remains editable. Do NOT recreate the official JMA logo with text.
 */
export function BrandLockup({ variant = "dark", className, showAttribution = true }: BrandLockupProps) {
  const isLight = variant === "light";
  const wordmark = isLight ? "text-white" : "text-ink";
  const attributionLabel = isLight ? "text-white/55" : "text-black/45";
  const logoSrc = isLight ? "/auto-white.png" : "/auto-black.png";
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Link to="/" className="inline-flex items-center gap-2 md:gap-3" aria-label="JMA Auto Auctions home">
        <img
          src={logoSrc}
          alt="JMA Auto Auctions"
          width="112"
          height="64"
          decoding="async"
          className="h-14 w-auto shrink-0 bg-transparent md:h-16"
        />
        <span
          className={cn(
            "font-display text-[1rem] uppercase tracking-[0.04em] leading-none md:text-[1.2rem]",
            wordmark,
          )}
        >
          <span>JMA</span>
          <span className="text-gold">AUTO</span>
          <span>AUCTIONS</span>
        </span>
      </Link>
      {showAttribution && (
        <span className="hidden items-center gap-2 md:flex">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.24em]",
              attributionLabel,
            )}
          >
            Powered by
          </span>
          <a
            href="https://www.jeffmartinauctioneers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
            aria-label="Jeff Martin Auctioneers"
          >
            <img
              src="/jeff-martin.png"
              alt="Jeff Martin Auctioneers"
              width="134"
              height="28"
              loading="lazy"
              decoding="async"
              className={cn(
                "h-7 w-auto object-contain",
                isLight && "brightness-0 invert",
              )}
            />
          </a>
        </span>
      )}
    </div>
  );
}
