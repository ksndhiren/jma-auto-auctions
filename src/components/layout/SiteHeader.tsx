import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Cta } from "@/components/ui/cta";
import { NAV_LINKS } from "@/data/mock";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        scrolled
          ? "border-border bg-background/95 py-2 backdrop-blur"
          : "border-transparent bg-background py-3",
      )}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <BrandLockup className="shrink-0" />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-ink after:scale-x-100" }}
              className="relative whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-ink after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-foreground/70 transition-colors hover:text-ink 2xl:flex"
            aria-label={`Call ${siteConfig.phone}`}
          >
            <Phone className="size-3.5 text-gold" />
            {siteConfig.phone}
          </a>
          <Cta to="/auctions" variant="dark" size="sm" withArrow={false} className="hidden md:inline-flex">
            View Auctions
          </Cta>
          <Cta to="/sell" variant="gold" size="sm" withArrow={false} className="hidden md:inline-flex">
            Sell Assets
          </Cta>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center border border-border-strong text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[57px] z-40 overflow-y-auto bg-ink text-white lg:hidden">
          <div className="container-x flex flex-col gap-6 py-8">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-lg font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="text-gold">›</span>
                </Link>
              ))}
            </nav>
            <div className="grid gap-3 sm:grid-cols-2">
              <Cta to="/auctions" variant="gold" size="lg">
                View Auctions
              </Cta>
              <Cta to="/sell" variant="outline-light" size="lg">
                Sell Assets
              </Cta>
            </div>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 pt-2 text-sm text-white/70"
            >
              <Phone className="size-4 text-gold" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
