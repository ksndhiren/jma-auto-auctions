import type { Auction, Category, Lot, FAQGroup, Article, Testimonial } from "./types";
import heroAuction from "@/assets/hero-auction.jpg";
import catConstruction from "@/assets/cat-construction.jpg";
import catTrucks from "@/assets/cat-trucks.jpg";
import catIndustrial from "@/assets/cat-industrial.jpg";
import catAgriculture from "@/assets/cat-agriculture.jpg";
import lotExcavator from "@/assets/lot-excavator.jpg";
import lotTruck from "@/assets/lot-truck.jpg";
import lotDozer from "@/assets/lot-dozer.jpg";

const inDays = (d: number) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  return date.toISOString();
};

export const categories: Category[] = [
  {
    slug: "construction-equipment",
    name: "Construction Equipment",
    description: "Excavators, loaders, dozers, cranes, and support equipment.",
    image: catConstruction,
    activeAuctions: 4,
  },
  {
    slug: "trucks-trailers",
    name: "Trucks & Trailers",
    description: "Sleeper tractors, day cabs, dump trucks, vans, and trailers.",
    image: catTrucks,
    activeAuctions: 3,
  },
  {
    slug: "industrial-assets",
    name: "Industrial Assets",
    description: "CNC machinery, fabrication, plant assets, and tooling.",
    image: catIndustrial,
    activeAuctions: 2,
  },
  {
    slug: "agriculture",
    name: "Agriculture & Farm",
    description: "Tractors, harvesters, hay equipment, and implements.",
    image: catAgriculture,
    activeAuctions: 2,
  },
];

export const auctions: Auction[] = [
  {
    id: "a-001",
    slug: "regional-equipment-auction-spring",
    title: "Spring Regional Construction Equipment Auction",
    type: "hybrid",
    status: "open",
    startsAt: inDays(-2),
    endsAt: inDays(5),
    location: "Brookhaven, MS",
    state: "MS",
    description:
      "A curated selection of late-model excavators, loaders, and support equipment from regional contractors.",
    image: heroAuction,
    categories: ["construction-equipment", "trucks-trailers"],
    lotCount: 184,
    isDemo: true,
  },
  {
    id: "a-002",
    slug: "fleet-trucks-trailers",
    title: "Fleet Reduction: Trucks & Trailers",
    type: "online",
    status: "closing_soon",
    startsAt: inDays(-7),
    endsAt: inDays(2),
    location: "Dallas, TX",
    state: "TX",
    description:
      "Sleeper tractors, day cabs, and dry van trailers from a regional carrier fleet reduction.",
    image: catTrucks,
    categories: ["trucks-trailers"],
    lotCount: 62,
    isDemo: true,
  },
  {
    id: "a-003",
    slug: "industrial-plant-liquidation",
    title: "Industrial Plant Liquidation",
    type: "live",
    status: "upcoming",
    startsAt: inDays(14),
    endsAt: inDays(14),
    location: "Memphis, TN",
    state: "TN",
    description:
      "Complete plant liquidation including CNC machining centers, fabrication equipment, and material handling.",
    image: catIndustrial,
    categories: ["industrial-assets"],
    lotCount: 240,
    isDemo: true,
  },
  {
    id: "a-004",
    slug: "farm-retirement-mid-south",
    title: "Farm Retirement: Mid-South",
    type: "hybrid",
    status: "upcoming",
    startsAt: inDays(21),
    endsAt: inDays(22),
    location: "Tupelo, MS",
    state: "MS",
    description:
      "Multi-generation row crop operation retirement featuring tractors, combines, and tillage.",
    image: catAgriculture,
    categories: ["agriculture"],
    lotCount: 95,
    isDemo: true,
  },
  {
    id: "a-005",
    slug: "winter-equipment-online",
    title: "Winter Online Equipment Sale",
    type: "online",
    status: "completed",
    startsAt: inDays(-40),
    endsAt: inDays(-30),
    location: "Online",
    description: "Completed online sale — results available on request.",
    image: catConstruction,
    categories: ["construction-equipment"],
    lotCount: 110,
    isDemo: true,
  },
];

export const lots: Lot[] = [
  {
    id: "l-001",
    slug: "cat-336-excavator-2019",
    lotNumber: "Lot 047",
    title: "2019 Caterpillar 336 Hydraulic Excavator",
    auctionSlug: "regional-equipment-auction-spring",
    category: "construction-equipment",
    manufacturer: "Caterpillar",
    model: "336",
    year: 2019,
    serialNumber: "XXX-PLACEHOLDER-001",
    condition: "Used — Operational",
    hours: 4820,
    location: "Brookhaven, MS",
    description:
      "Late-model 36-ton class hydraulic excavator. Auxiliary hydraulics, quick coupler, 42\" digging bucket.",
    specs: [
      { label: "Engine Hours", value: "4,820" },
      { label: "Operating Weight", value: "79,400 lb" },
      { label: "Bucket", value: '42" GP' },
      { label: "Aux. Hydraulics", value: "Yes" },
    ],
    currentBid: 142500,
    status: "open",
    image: lotExcavator,
    isDemo: true,
  },
  {
    id: "l-002",
    slug: "peterbilt-389-sleeper-2020",
    lotNumber: "Lot 112",
    title: "2020 Peterbilt 389 Sleeper Tractor",
    auctionSlug: "fleet-trucks-trailers",
    category: "trucks-trailers",
    manufacturer: "Peterbilt",
    model: "389",
    year: 2020,
    condition: "Used — Fleet Maintained",
    location: "Dallas, TX",
    description: "Cummins X15, 18-speed manual, 70\" sleeper. Single owner fleet history.",
    specs: [
      { label: "Engine", value: "Cummins X15" },
      { label: "Transmission", value: "18-speed manual" },
      { label: "Sleeper", value: '70" Mid-Roof' },
      { label: "Mileage", value: "612,400 mi" },
    ],
    currentBid: 78250,
    status: "open",
    image: lotTruck,
    isDemo: true,
  },
  {
    id: "l-003",
    slug: "cat-950m-wheel-loader-2018",
    lotNumber: "Lot 058",
    title: "2018 Caterpillar 950M Wheel Loader",
    auctionSlug: "regional-equipment-auction-spring",
    category: "construction-equipment",
    manufacturer: "Caterpillar",
    model: "950M",
    year: 2018,
    condition: "Used — Operational",
    hours: 6210,
    location: "Brookhaven, MS",
    description: "GP bucket, ride control, A/C cab. Recent service interval completed.",
    specs: [
      { label: "Engine Hours", value: "6,210" },
      { label: "Bucket", value: "3.5 cu yd" },
      { label: "Ride Control", value: "Yes" },
    ],
    currentBid: 96000,
    status: "open",
    image: lotDozer,
    isDemo: true,
  },
];

export const faqs: FAQGroup[] = [
  {
    slug: "registration",
    title: "Buyer Registration",
    items: [
      {
        q: "How do I register to bid?",
        a: "Create an account, complete identity verification, and submit any required deposit or banking reference. Approval is typically same-business-day.",
      },
      {
        q: "Is there a fee to register?",
        a: "Registration itself is free. Specific auctions may require a refundable deposit — this will be disclosed in the auction terms.",
      },
    ],
  },
  {
    slug: "bidding",
    title: "Bidding",
    items: [
      {
        q: "What is the difference between live, online, and hybrid auctions?",
        a: "Live auctions take place at a physical location. Online auctions run on the bidding platform with timed extensions. Hybrid auctions combine both.",
      },
      {
        q: "What happens if I am the high bidder?",
        a: "You will receive an invoice with payment, collection, and removal instructions within one business day of the auction close.",
      },
    ],
  },
  {
    slug: "payments",
    title: "Payments & Buyer's Premium",
    items: [
      {
        q: "What is the buyer's premium?",
        a: "A buyer's premium is added to the hammer price. The exact percentage is disclosed in each auction's terms — review them before bidding.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Wire transfer is standard. Specific methods are listed in each auction's terms. Personal checks are typically not accepted for high-value lots.",
      },
    ],
  },
  {
    slug: "inspection-collection",
    title: "Inspection, Collection & Shipping",
    items: [
      {
        q: "Can I inspect equipment before bidding?",
        a: "Inspection days are listed on each auction page. You are responsible for inspecting assets and reviewing the descriptions before bidding.",
      },
      {
        q: "Do you arrange shipping?",
        a: "Buyers arrange their own transport. We can provide a list of preferred carriers experienced with heavy equipment.",
      },
    ],
  },
  {
    slug: "selling",
    title: "Selling Assets",
    items: [
      {
        q: "What assets do you sell?",
        a: "Construction and earthmoving equipment, trucks and trailers, industrial machinery, agricultural equipment, and complete plant liquidations.",
      },
      {
        q: "How long does the process take?",
        a: "Most sales are completed within 30–60 days of signing. Larger liquidations may take longer. We will recommend a timeline that maximizes return.",
      },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "how-to-register-for-an-auction",
    title: "How to Register for an Auction",
    excerpt: "A short walkthrough of registration, verification, and bidder approval.",
    body: "Detailed article body placeholder. Edit this in src/data/mock.ts or move into a CMS.",
    audience: "buyer",
    readTime: 4,
  },
  {
    slug: "preparing-business-assets-for-auction",
    title: "Preparing Business Assets for Auction",
    excerpt: "What sellers should do before listing to maximize bidder interest and final price.",
    body: "Detailed article body placeholder.",
    audience: "seller",
    readTime: 6,
  },
  {
    slug: "live-versus-online-auctions",
    title: "Live vs Online Auctions: Which Is Right for Your Assets?",
    excerpt: "How auction format affects exposure, price, and timeline.",
    body: "Detailed article body placeholder.",
    audience: "general",
    readTime: 5,
  },
  {
    slug: "understanding-buyers-premiums",
    title: "Understanding Buyer's Premiums",
    excerpt: "How buyer's premiums work and how to factor them into your bid.",
    body: "Detailed article body placeholder.",
    audience: "buyer",
    readTime: 3,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote: "[Placeholder testimonial. Replace with approved client quote before launch.]",
    name: "Client Name",
    company: "Company Name",
    role: "Role / Industry",
    isPlaceholder: true,
  },
  {
    id: "t-2",
    quote: "[Placeholder testimonial. Replace with approved client quote before launch.]",
    name: "Client Name",
    company: "Company Name",
    role: "Role / Industry",
    isPlaceholder: true,
  },
  {
    id: "t-3",
    quote: "[Placeholder testimonial. Replace with approved client quote before launch.]",
    name: "Client Name",
    company: "Company Name",
    role: "Role / Industry",
    isPlaceholder: true,
  },
];

export function getAuction(slug: string) {
  return auctions.find((a) => a.slug === slug);
}
export function getLot(slug: string) {
  return lots.find((l) => l.slug === slug);
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
export function getLotsByAuction(auctionSlug: string) {
  return lots.filter((l) => l.auctionSlug === auctionSlug);
}
export function getLotsByCategory(catSlug: string) {
  return lots.filter((l) => l.category === catSlug);
}

export const NAV_LINKS = [
  { to: "/auctions", label: "Auctions" },
  { to: "/categories", label: "Categories" },
  { to: "/how-to-buy", label: "How to Buy" },
  { to: "/sell", label: "Sell" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
