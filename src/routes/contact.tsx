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
  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-20">
        <div className="container-x">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">Let's talk.</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Buyer assistance, seller consultations, auction-specific support — choose the
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
