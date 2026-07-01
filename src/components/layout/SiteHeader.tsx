import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Cta } from "@/components/ui/cta";
import { HEADER_MENU } from "@/data/menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const useTransparentHeader = !scrolled && !open;
  const brandVariant = useTransparentHeader ? "light" : "dark";
  const navTextClass = useTransparentHeader
    ? "text-white/85 hover:text-gold after:bg-gold"
    : "text-foreground/70 hover:text-gold after:bg-gold";
  const menuButtonClass = useTransparentHeader
    ? "border-white/20 text-white"
    : "border-border-strong text-ink";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-200",
        useTransparentHeader
          ? "border-b border-white/10 bg-transparent py-3"
          : "border-b border-black/10 bg-white/95 py-2 backdrop-blur",
        scrolled && "shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between gap-4 px-5 md:px-8 xl:gap-6 xl:px-10">
        <BrandLockup variant={brandVariant} className="shrink-0" />

        <nav className="hidden flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-5" aria-label="Primary">
          {HEADER_MENU.map((item) => {
            const hasChildren = !!item.children?.length;
            return (
              <div key={item.label} className={cn(hasChildren && "group relative")}>
                <NavLink
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors",
                    navTextClass,
                  )}
                >
                  <span>{item.label}</span>
                  {hasChildren ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                </NavLink>
                {hasChildren ? (
                  <div className="invisible absolute left-0 top-full z-30 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[280px] border border-black/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
                      <div className="grid gap-px bg-black/10">
                        {item.children!.map((child) => (
                          <NavLink
                            key={child.label}
                            href={child.href}
                            className="bg-white px-4 py-3 text-sm text-black/82 transition-colors hover:bg-bone hover:text-gold"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn("grid size-10 place-items-center border", menuButtonClass)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 top-[57px] z-40 overflow-y-auto bg-ink text-white xl:hidden">
          <div className="container-x flex flex-col gap-6 py-8">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {HEADER_MENU.map((item) => (
                <MobileMenuRow
                  key={item.label}
                  item={item}
                  expanded={mobileExpanded === item.label}
                  onToggle={() =>
                    setMobileExpanded((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                />
              ))}
            </nav>
            <div className="grid gap-3 sm:grid-cols-2">
              <Cta href={siteConfig.platform.auctionsUrl} variant="gold" size="lg">
                Register to Bid
              </Cta>
              <Cta href={siteConfig.platform.lotsUrl} variant="outline-light" size="lg">
                Browse Inventory
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

function MobileMenuRow({
  item,
  expanded,
  onToggle,
}: {
  item: (typeof HEADER_MENU)[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  const hasChildren = !!item.children?.length;
  if (!hasChildren) {
    return (
      <NavLink
        href={item.href}
        className="flex items-center justify-between border-b border-white/10 py-4 text-lg font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-gold"
      >
        {item.label}
        <span className="text-gold">›</span>
      </NavLink>
    );
  }
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-lg font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-gold"
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 text-gold transition-transform", expanded && "rotate-180")}
        />
      </button>
      {expanded ? (
        <div className="flex flex-col gap-1 pb-3 pl-3">
          <NavLink
            href={item.href}
            className="px-2 py-2 text-sm font-medium uppercase tracking-[0.08em] text-white/75 hover:text-gold"
          >
            {item.label}
          </NavLink>
          {item.children!.map((child) => (
            <NavLink
              key={child.label}
              href={child.href}
              className="px-2 py-2 text-sm text-white/72 transition-colors hover:text-gold"
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}
