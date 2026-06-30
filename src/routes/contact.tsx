import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact JMA Auto Auctions" },
      { name: "description", content: "Speak with our auction specialists about buying, selling, or auction-specific support." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const heroBackgroundImage =
    "https://images.pexels.com/photos/5982896/pexels-photo-5982896.jpeg?auto=compress&cs=tinysrgb&w=1600";

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-border bg-black text-white">
        <div className="absolute inset-0">
          <img
            src={heroBackgroundImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-68"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.86)_48%,rgba(0,0,0,0.56)_74%,rgba(0,0,0,0.22)_100%),radial-gradient(circle_at_top_left,rgba(242,169,0,0.12),transparent_24%)]" />
        </div>
        <div className="relative container-x py-16 md:py-24">
          <Eyebrow tone="light">Contact</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.92] tracking-[0.01em] text-white md:text-6xl">
            Talk with the team behind your next auto auction move
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78">
            Buyer assistance, seller consultations, auction-specific support. Choose the
            department that fits and we'll get back within one business day.
          </p>
        </div>
      </section>
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl text-ink">Reach us directly</h2>
            <ul className="mt-6 space-y-5">
              <ContactRow icon={Phone} label="Telephone" value={siteConfig.phone} href={siteConfig.phoneHref} />
              <ContactRow icon={Mail} label="Email" value={siteConfig.email} href={siteConfig.emailHref} />
              <ContactRow icon={MapPin} label="Office" value={`${siteConfig.address.line1}, ${siteConfig.address.line2}`} />
              <ContactRow icon={Clock} label="Hours" value={siteConfig.hours} />
            </ul>
            <p className="mt-8 border-l-2 border-gold bg-bone p-4 text-xs text-muted-foreground">
              For auction-day assistance, please refer to the on-site contact details listed on
              the specific auction page.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const content = (
    <li className="flex items-start gap-4 border-b border-border pb-5">
      <span className="grid size-10 shrink-0 place-items-center border border-border bg-bone">
        <Icon className="size-4 text-gold" />
      </span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-ink">{value}</p>
      </div>
    </li>
  );
  return href ? <a href={href} className="block hover:[&_p.font-semibold]:text-gold-dark">{content}</a> : content;
}
