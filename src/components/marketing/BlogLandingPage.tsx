import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow, Section, SectionHeader } from "@/components/layout/Section";
import { Cta } from "@/components/ui/cta";
import type { PageLink } from "@/components/marketing/SeoLandingPage";
import { buildBlogPostingSchema } from "@/lib/seo";

export interface BlogCategoryPageData {
  slug: string;
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string[];
  topicsTitle: string;
  topicsLead: string;
  topics: string[];
  popularTitle: string;
  popularLead: string;
  popularTopics: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  relatedTitle: string;
  relatedLinks: PageLink[];
  closingTitle: string;
  closingBody: string;
  closingPrimaryCta: PageLink;
  closingSecondaryCta?: PageLink;
}

export interface BlogHubPageData {
  pageTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroBody: string[];
  categoriesTitle: string;
  categories: Array<{ title: string; description: string; to: string }>;
  benefitsTitle: string;
  benefits: Array<{ title: string; description: string }>;
  topicsTitle: string;
  topicsLead: string;
  topics: string[];
  closingTitle: string;
  closingBody: string;
  closingPrimaryCta: PageLink;
  closingSecondaryCta?: PageLink;
}

export function buildBlogHead(page: { pageTitle: string; metaDescription: string }) {
  return {
    meta: [
      { title: `${page.pageTitle} | JMA Auto Auctions` },
      { name: "description", content: page.metaDescription },
      { property: "og:title", content: `${page.pageTitle} | JMA Auto Auctions` },
      { property: "og:description", content: page.metaDescription },
    ],
  };
}

export function BlogCategoryPage({ page }: { page: BlogCategoryPageData }) {
  return (
    <SiteShell>
      <JsonLd
        data={buildBlogPostingSchema({
          title: page.pageTitle,
          description: page.metaDescription,
          pathname: `/blog/${page.slug}`,
        })}
      />
      <BlogHero eyebrow={page.eyebrow} title={page.heroTitle} body={page.heroBody} />

      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <SectionHeader eyebrow="What You'll Find" title={page.topicsTitle} description={page.topicsLead} />
          <BulletGrid items={page.topics} />
        </div>
      </Section>

      <Section tone="surface" size="md">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <SectionHeader eyebrow="Popular Topics" title={page.popularTitle} description={page.popularLead} />
          <BulletGrid items={page.popularTopics} />
        </div>
      </Section>

      <Section tone="bone" size="md">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Why Read These Guides" title={page.benefitsTitle} />
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
        <SectionHeader eyebrow="Related Categories" title={page.relatedTitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {page.relatedLinks.map((link) => (
            <PageLinkCard key={link.label} link={link} />
          ))}
        </div>
      </Section>

      <BlogClosing
        title={page.closingTitle}
        body={page.closingBody}
        primary={page.closingPrimaryCta}
        secondary={page.closingSecondaryCta}
      />
    </SiteShell>
  );
}

export function BlogHubPage({ page }: { page: BlogHubPageData }) {
  return (
    <SiteShell>
      <JsonLd
        data={buildBlogPostingSchema({
          title: page.pageTitle,
          description: page.metaDescription,
          pathname: "/blog",
        })}
      />
      <BlogHero eyebrow={page.eyebrow} title={page.heroTitle} body={page.heroBody} />

      <Section size="md">
        <SectionHeader eyebrow="Browse by Category" title={page.categoriesTitle} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {page.categories.map((category) => (
            <Link
              key={category.title}
              to={category.to}
              className="group border border-border bg-background p-6 transition-colors hover:border-gold hover:bg-bone"
            >
              <p className="font-display text-xl text-ink">{category.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Explore <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="bone" size="md">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Why Read Our Resources" title={page.benefitsTitle} />
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

      <Section tone="surface" size="md">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
          <SectionHeader eyebrow="Popular Topics" title={page.topicsTitle} description={page.topicsLead} />
          <BulletGrid items={page.topics} />
        </div>
      </Section>

      <BlogClosing
        title={page.closingTitle}
        body={page.closingBody}
        primary={page.closingPrimaryCta}
        secondary={page.closingSecondaryCta}
      />
    </SiteShell>
  );
}

function BlogHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,169,0,0.18),transparent_28%),linear-gradient(125deg,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.48),rgba(0,0,0,0.84))]" />
      <div className="container-x relative py-18 md:py-24">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-5xl font-display text-4xl text-white md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-white/74 md:text-lg">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function BulletGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="border border-border bg-background px-4 py-4 text-sm font-medium text-ink">
          {item}
        </div>
      ))}
    </div>
  );
}

function BlogClosing({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: PageLink;
  secondary?: PageLink;
}) {
  return (
    <Section tone="ink" size="md">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <Eyebrow tone="light">Next Step</Eyebrow>
          <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/74 md:text-lg">
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <PageCta link={primary} variant="gold" size="lg" />
          {secondary ? <PageCta link={secondary} variant="outline-light" size="lg" /> : null}
        </div>
      </div>
    </Section>
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
