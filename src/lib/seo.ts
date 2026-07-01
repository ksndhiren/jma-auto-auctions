import { siteConfig } from "@/config/site";

type BreadcrumbItem = {
  name: string;
  item: string;
};

const SEGMENT_LABELS: Record<string, string> = {
  auto: "Auto",
  auctions: "Auctions",
  blog: "Blog",
  browse: "Browse",
  cars: "Cars",
  commercial: "Commercial",
  contact: "Contact",
  dealer: "Dealer",
  electric: "Electric",
  financing: "Financing",
  fleet: "Fleet",
  for: "for",
  government: "Government",
  guides: "Guides",
  hybrid: "Hybrid",
  inventory: "Inventory",
  luxury: "Luxury",
  market: "Market",
  marketplace: "Marketplace",
  pickup: "Pickup",
  repo: "Repo",
  sale: "Sale",
  sales: "Sales",
  sedans: "Sedans",
  selling: "Selling",
  suvs: "SUVs",
  terms: "Terms",
  transportation: "Transportation",
  trucks: "Trucks",
  upcoming: "Upcoming",
  used: "Used",
  vans: "Vans",
  vehicle: "Vehicle",
  vehicles: "Vehicles",
};

export function normalizePathname(pathname: string): string {
  const trimmed = pathname.split(/[?#]/, 1)[0] || "/";
  const collapsed = trimmed.replace(/\/{2,}/g, "/");
  if (collapsed === "/") return "/";
  return collapsed.replace(/\/+$/, "") || "/";
}

export function absoluteUrl(pathname: string): string {
  const normalized = normalizePathname(pathname);
  return normalized === "/" ? siteConfig.url : `${siteConfig.url}${normalized}`;
}

export function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .map((part) => SEGMENT_LABELS[part] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function buildBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const normalized = normalizePathname(pathname);
  const items: BreadcrumbItem[] = [{ name: "Home", item: absoluteUrl("/") }];

  if (normalized === "/") return items;

  const segments = normalized.slice(1).split("/");
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      name: humanizeSegment(segment),
      item: absoluteUrl(currentPath),
    });
  }

  return items;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: `${siteConfig.url}/icon-512.png`,
    sameAs: Object.values(siteConfig.social),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.platform.lotsUrl}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/social-preview.png`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Brooklyn",
      addressRegion: "MS",
      postalCode: "39425",
      addressCountry: siteConfig.address.country,
    },
    openingHours: "Mo-Fr 08:00-17:00",
    parentOrganization: {
      "@id": `${siteConfig.url}#organization`,
    },
  };
}

export function buildBreadcrumbSchema(pathname: string) {
  const items = buildBreadcrumbItems(pathname);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildFaqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function buildBlogPostingSchema({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}) {
  const url = absoluteUrl(pathname);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    publisher: {
      "@id": `${siteConfig.url}#organization`,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    inLanguage: "en-US",
    datePublished: "2026-07-01",
    dateModified: "2026-07-01",
    image: `${siteConfig.url}/social-preview.png`,
  };
}
