/**
 * Central site configuration.
 * All hard-coded business details live here so they can be updated in one place.
 * Values marked PLACEHOLDER must be confirmed before launch.
 */

export const siteConfig = {
  name: "JMA Auto Auctions",
  tagline: "Powered by Jeff Martin Auctioneers",
  description:
    "Discover upcoming auto auctions, featured vehicle lots, and bidder registration pathways backed by Jeff Martin Auctioneers.",
  url: "https://jma-auto-auctions.kapestrategy.workers.dev",
  phone: "+1 (844) 450 6200",
  phoneHref: "tel:18444506200",
  email: "info@jeffmartinauctioneers.com",
  emailHref: "mailto:info@jeffmartinauctioneers.com",
  address: {
    line1: "Jeff Martin Auctioneers",
    line2: "Bidder support via the main JMA platform",
    country: "USA",
  },
  hours: "Monday – Friday · 8:00 AM – 5:00 PM CT",
  social: {
    facebook: "https://www.facebook.com/JeffMartinAuctioneers/",
    instagram: "https://www.instagram.com/jeffmartinauctioneers/",
    linkedin: "https://www.linkedin.com/company/jeff-martin-auctioneers/",
    youtube: "https://www.youtube.com/",
  },
  // Stable parent attribution
  parent: {
    name: "Jeff Martin Auctioneers",
    short: "JMA",
    url: "https://www.jeffmartinauctioneers.com/",
  },
  platform: {
    auctionsUrl: "https://www.jeffmartinauctioneers.com/auctions",
    lotsUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
  },
} as const;

export type SiteConfig = typeof siteConfig;
