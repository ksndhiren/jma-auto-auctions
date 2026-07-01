import { Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow, Section, SectionHeader } from "@/components/layout/Section";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import { Cta } from "@/components/ui/cta";
import type { FAQGroup } from "@/data/types";
import { buildFaqSchema } from "@/lib/seo";

export interface PageLink {
  label: string;
  to?: string;
  href?: string;
}

export interface SeoLandingPageData {
  slug: string;
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string[];
  primaryCta: PageLink;
  secondaryCta: PageLink;
  introTitle: string;
  introBody: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  processTitle: string;
  processSteps: Array<{ title: string; description: string }>;
  relatedTitle: string;
  relatedLinks: PageLink[];
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  closingTitle: string;
  closingBody: string;
  closingPrimaryCta: PageLink;
  closingSecondaryCta?: PageLink;
}

export function buildSeoHead(page: SeoLandingPageData) {
  return {
    meta: [
      { title: `${page.pageTitle} | JMA Auto Auctions` },
      { name: "description", content: page.metaDescription },
      { property: "og:title", content: `${page.pageTitle} | JMA Auto Auctions` },
      { property: "og:description", content: page.metaDescription },
    ],
  };
}

export function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const faqGroups: FAQGroup[] = [
    {
      slug: page.slug,
      title: page.faqTitle,
      items: page.faqs,
    },
  ];

  return (
    <SiteShell>
      <JsonLd data={buildFaqSchema(page.faqs)} />
      <section className="relative overflow-hidden border-b border-white/10 bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.18),transparent_30%),linear-gradient(125deg,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.82))]" />
        <div className="container-x relative grid gap-12 py-18 md:py-24 lg:grid-cols-[minmax(0,1.2fr)_360px] lg:items-end">
          <div>
            <Eyebrow tone="light">{page.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-5xl font-display text-4xl text-white md:text-6xl lg:text-7xl">
              {page.heroTitle}
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-white/74 md:text-lg">
              {page.heroBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PageCta link={page.primaryCta} variant="gold" size="lg" />
              <PageCta link={page.secondaryCta} variant="outline-light" size="lg" />
            </div>
          </div>

          <div className="border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              What You&apos;ll Find
            </p>
            <ul className="mt-6 space-y-4">
              {page.benefits.slice(0, 3).map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <p className="font-display text-lg text-white">{benefit.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/68">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <SectionHeader
            eyebrow={page.pageTitle}
            title={page.introTitle}
            description={page.introBody[0]}
          />
          <div className="border border-border bg-bone p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Why this page matters
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {page.introBody.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="bone" size="md">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Why JMA" title={page.benefitsTitle} />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {page.benefits.map((benefit) => (
              <div key={benefit.title} className="border-l-2 border-gold bg-background p-5">
                <p className="font-display text-lg text-ink">{benefit.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <SectionHeader eyebrow="How It Works" title={page.processTitle} />
          <ProcessTimeline steps={page.processSteps} />
        </div>
      </Section>

      <Section tone="surface" size="md">
        <SectionHeader eyebrow="Explore More" title={page.relatedTitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {page.relatedLinks.map((link) => (
            <PageLinkCard key={link.label} link={link} />
          ))}
        </div>
      </Section>

      <Section size="md">
        <FAQAccordion groups={faqGroups} />
      </Section>

      <Section tone="ink" size="md">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <Eyebrow tone="light">Next Step</Eyebrow>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              {page.closingTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/74 md:text-lg">
              {page.closingBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <PageCta link={page.closingPrimaryCta} variant="gold" size="lg" />
            {page.closingSecondaryCta ? (
              <PageCta link={page.closingSecondaryCta} variant="outline-light" size="lg" />
            ) : null}
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function PageCta({
  link,
  variant,
  size,
}: {
  link: PageLink;
  variant: "gold" | "dark" | "outline" | "outline-light" | "ghost";
  size: "sm" | "md" | "lg";
}) {
  if (link.to) {
    return (
      <Cta to={link.to} variant={variant} size={size}>
        {link.label}
      </Cta>
    );
  }

  return (
    <Cta href={link.href ?? "#"} variant={variant} size={size}>
      {link.label}
    </Cta>
  );
}

function PageLinkCard({ link }: { link: PageLink }) {
  const cardClassName =
    "group flex items-center justify-between gap-4 border border-border bg-background px-5 py-4 transition-colors hover:border-gold hover:bg-bone";

  const inner = (
    <>
      <span className="font-display text-lg text-ink">{link.label}</span>
      <ChevronRight className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
    </>
  );

  if (link.to) {
    return (
      <Link to={link.to} className={cardClassName}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={link.href ?? "#"} className={cardClassName}>
      {inner}
    </a>
  );
}
