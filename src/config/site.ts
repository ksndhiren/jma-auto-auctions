/**
 * Central site configuration.
 * All hard-coded business details live here so they can be updated in one place.
 * Values marked PLACEHOLDER must be confirmed before launch.
 */

export const siteConfig = {
  name: "Aucto Auctions",
  tagline: "Powered by Jeff Martin Auctioneers",
  description:
    "Specialist equipment and asset auctions, professionally managed by Jeff Martin Auctioneers.",
  url: "",
  // PLACEHOLDER — replace with verified numbers/addresses before launch
  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",
  email: "info@auctoauctions.com",
  emailHref: "mailto:info@auctoauctions.com",
  address: {
    line1: "Address line 1",
    line2: "City, State ZIP",
    country: "USA",
  },
  hours: "Monday – Friday · 8:00 AM – 5:00 PM CT",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
  // Stable parent attribution
  parent: {
    name: "Jeff Martin Auctioneers",
    short: "JMA",
    url: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
