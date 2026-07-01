import { Link } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { siteConfig } from "@/config/site";
import { FOOTER_MENU } from "@/data/menu";

export function SiteFooter() {
  return (
    <footer className="bg-white text-ink">
      <div className="h-px w-full bg-gold" />
      <div className="mx-auto w-full max-w-[1520px] px-5 py-10 md:px-8 md:py-12 xl:px-10">
        <div className="border-b border-black/10 pb-5">
          <BrandLockup variant="dark" showAttribution={false} />
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {FOOTER_MENU.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.href}
                      className="text-black/65 transition-colors hover:text-gold"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-black/65 transition-colors hover:text-gold"
                >
                  Contact
                </Link>
              </li>
              <li className="flex items-start gap-2 text-black/65">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={siteConfig.phoneHref} className="hover:text-gold">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-black/65">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={siteConfig.emailHref} className="break-all hover:text-gold">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.jeffmartinauctioneers.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 text-center"
            aria-label="Jeff Martin Auctioneers"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/55">
              Powered by
            </span>
            <img
              src="/jeff-martin.png"
              alt="Jeff Martin Auctioneers"
              width="172"
              height="36"
              loading="lazy"
              decoding="async"
              className="h-9 w-auto object-contain"
            />
          </a>
        </div>

        <div className="mt-6 border-t border-black/10 pt-4 text-xs text-black/55">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
