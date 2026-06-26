export type AuctionStatus =
  | "upcoming"
  | "open"
  | "live_today"
  | "closing_soon"
  | "completed";

export type AuctionType = "online" | "live" | "hybrid";

export interface Auction {
  id: string;
  slug: string;
  title: string;
  type: AuctionType;
  status: AuctionStatus;
  startsAt: string; // ISO
  endsAt: string; // ISO
  location: string;
  state?: string;
  description: string;
  image: string;
  categories: string[]; // category slugs
  lotCount: number;
  isDemo?: boolean;
}

export interface Lot {
  id: string;
  slug: string;
  lotNumber: string;
  title: string;
  auctionSlug: string;
  category: string; // category slug
  manufacturer?: string;
  model?: string;
  year?: number;
  serialNumber?: string;
  condition?: string;
  hours?: number;
  location?: string;
  description: string;
  specs?: { label: string; value: string }[];
  currentBid?: number;
  status: "upcoming" | "open" | "closed";
  image: string;
  gallery?: string[];
  isDemo?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  activeAuctions?: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQGroup {
  slug: string;
  title: string;
  items: FAQItem[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  audience: "buyer" | "seller" | "general";
  readTime: number;
  image?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company?: string;
  role?: string;
  isPlaceholder: boolean;
}
