import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/mock";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <BrandLockup variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              {siteConfig.description} Aucto Auctions is operated by {siteConfig.parent.name},
              bringing decades of auction expertise to every sale.
            </p>
            <div className="mt-8">
              <p className="eyebrow text-white/60">Auction alerts</p>
              <p className="mt-2 text-sm text-white/70">
                Get notified when new auctions go live.
              </p>
              <div className="mt-4 max-w-sm">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-white/60">Buyers</p>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink to="/auctions">All Auctions</FooterLink>
                <FooterLink to="/categories">Categories</FooterLink>
                <FooterLink to="/how-to-buy">How to Buy</FooterLink>
                <FooterLink to="/auction-alerts">Auction Alerts</FooterLink>
                <FooterLink to="/faq">FAQ</FooterLink>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/60">Sellers</p>
              <ul className="mt-4 space-y-3 text-sm">
                <FooterLink to="/sell">Sell Your Assets</FooterLink>
                <FooterLink to="/sell">Request Consultation</FooterLink>
                <FooterLink to="/about">About JMA</FooterLink>
                <FooterLink to="/resources">Resources</FooterLink>
              </ul>
              <p className="eyebrow mt-8 text-white/60">Categories</p>
              <ul className="mt-4 space-y-3 text-sm">
                {categories.slice(0, 4).map((c) => (
                  <FooterLink key={c.slug} to={`/categories/${c.slug}`}>
                    {c.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/60">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a href={siteConfig.phoneHref} className="hover:text-gold">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a href={siteConfig.emailHref} className="hover:text-gold">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <SocialIcon href={siteConfig.social.facebook} label="Facebook">
                  <Facebook className="size-4" />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.instagram} label="Instagram">
                  <Instagram className="size-4" />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                  <Linkedin className="size-4" />
                </SocialIcon>
                <SocialIcon href={siteConfig.social.youtube} label="YouTube">
                  <Youtube className="size-4" />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Operated by {siteConfig.parent.name}.
            All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms & Conditions</Link>
            <Link to="/accessibility" className="hover:text-gold">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-white/70 transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
