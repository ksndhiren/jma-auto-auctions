import type { Article, Auction, Category, FAQGroup, Lot, Testimonial } from "./types";
import truck1 from "@/assets/live/truck-1.png";
import truck2 from "@/assets/live/truck-2.png";
import truck3 from "@/assets/live/truck-3.png";
import truck4 from "@/assets/live/truck-4.png";

const iso = (value: string) => new Date(value).toISOString();
const auctionImage1 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/2026/6/medium/2RQ7E5bqv471HMTlFU9_JCVs.jpeg";
const auctionImage2 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/2026/6/medium/daZkMOFr-dbOoWgA55PGk6Cz.jpeg";
const auctionImage3 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/2026/6/medium/mrDpaUlP5PJH-qJ4IOhVZGnv.jpeg";
const auctionImage4 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/2026/6/medium/w0yjuFtaxFFSjriWm29XwU-P.jpeg";
const lotImage1 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/0/2026/6/medium/c994730e49686de4cf7d2cc2de947bd6.jpeg";
const lotImage2 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/0/2026/6/medium/3e4edf18adbacd0d24b0352cb7bf8ab6.jpeg";
const lotImage3 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/0/2026/6/medium/408b8fc5f246a9f292a6f9151281f2f3.jpeg";
const lotImage4 =
  "https://auctioneersoftware.s3.us-east-1.amazonaws.com/jmabt/0/2026/6/medium/c451b6711b6d13d1f9290bd6f2c43ead.jpeg";

export const categories: Category[] = [
  {
    slug: "pickup-trucks",
    name: "Pickup Trucks",
    description: "Late-model work trucks, crew cabs, half-ton, three-quarter-ton, and one-ton pickups.",
    image: truck1,
    activeAuctions: 4,
  },
  {
    slug: "fleet-vehicles",
    name: "Fleet Vehicles",
    description: "Municipal, utility, contractor, and rental fleet sell-down inventory.",
    image: truck2,
    activeAuctions: 3,
  },
  {
    slug: "suvs-cars",
    name: "SUVs & Cars",
    description: "Dealer trades, repossessions, and consumer-ready units from active JMA events.",
    image: truck3,
    activeAuctions: 3,
  },
  {
    slug: "vans-commercial",
    name: "Vans & Commercial",
    description: "Cargo vans, service bodies, and road-ready work vehicles with business utility.",
    image: truck4,
    activeAuctions: 2,
  },
];

export const auctions: Auction[] = [
  {
    id: "a-001",
    slug: "hannas-wrecker-service-virtual-vehicle-auction",
    eyebrow: "Current Auction",
    title: "Hanna's Wrecker Service Virtual Vehicle Auction",
    type: "online",
    status: "closing_soon",
    startsAt: iso("2026-06-24T10:00:00-05:00"),
    endsAt: iso("2026-06-27T19:00:00-05:00"),
    location: "Virtual · Mississippi",
    state: "MS",
    description:
      "Browse a fast-moving mix of tow-recovery, insurance, and service-related vehicles in a virtual auction format.",
    image: auctionImage1,
    categories: ["suvs-cars", "pickup-trucks"],
    lotCount: 126,
    externalUrl: "https://www.jeffmartinauctioneers.com/auctions",
  },
  {
    id: "a-002",
    slug: "south-mississippi-auto-auction",
    eyebrow: "Upcoming Auction",
    title: "South Mississippi Auto Auction",
    type: "online",
    status: "upcoming",
    startsAt: iso("2026-07-09T09:00:00-05:00"),
    endsAt: iso("2026-07-10T18:00:00-05:00"),
    location: "Brookhaven, MS",
    state: "MS",
    description:
      "Explore pickups, SUVs, boats, motorcycles, and fleet vehicles scheduled for one of JMA's highest-interest auto sales.",
    image: auctionImage2,
    categories: ["pickup-trucks", "fleet-vehicles", "suvs-cars"],
    lotCount: 2052,
    externalUrl: "https://www.jeffmartinauctioneers.com/auctions",
  },
  {
    id: "a-003",
    slug: "southeast-automobile-auction",
    eyebrow: "Upcoming Auction",
    title: "Southeast Automobile Auction",
    type: "hybrid",
    status: "upcoming",
    startsAt: iso("2026-07-09T10:00:00-05:00"),
    endsAt: iso("2026-07-10T17:30:00-05:00"),
    location: "Pelham, AL",
    state: "AL",
    description:
      "See a broad run of vehicles, trucks, RVs, and commercial units before heading into live bidding on the main JMA platform.",
    image: auctionImage3,
    categories: ["pickup-trucks", "suvs-cars", "vans-commercial"],
    lotCount: 843,
    externalUrl: "https://www.jeffmartinauctioneers.com/auctions",
  },
  {
    id: "a-004",
    slug: "upper-midwest-automobile-auction",
    eyebrow: "Upcoming Auction",
    title: "Upper Midwest Automobile Auction",
    type: "online",
    status: "upcoming",
    startsAt: iso("2026-07-09T09:30:00-05:00"),
    endsAt: iso("2026-07-10T18:30:00-05:00"),
    location: "Medford, MN",
    state: "MN",
    description:
      "Shop contractor pickups, commuter vehicles, and fleet sell-down inventory from the Upper Midwest market.",
    image: auctionImage4,
    categories: ["pickup-trucks", "fleet-vehicles", "suvs-cars"],
    lotCount: 612,
    externalUrl: "https://www.jeffmartinauctioneers.com/auctions",
  },
];

export const lots: Lot[] = [
  {
    id: "l-001",
    slug: "2012-ford-f150-xl-crew-cab-4x2-pickup-50",
    lotNumber: "Lot 50",
    title: "2012 Ford F-150 XL Crew Cab 4x2 Pickup",
    auctionSlug: "south-mississippi-auto-auction",
    auctionName: "South Mississippi Auto Auction",
    category: "pickup-trucks",
    manufacturer: "Ford",
    model: "F-150 XL",
    year: 2012,
    serialNumber: "1FTEX1CM7CFB58858",
    condition: "Used - Work Truck",
    location: "Brookhaven, MS",
    description:
      "Crew cab work truck with straightforward fleet appeal and a quick path to full bidding details on JMA.",
    specs: [
      { label: "VIN", value: "1FTEX1CM7CFB58858" },
      { label: "Body", value: "Crew Cab 4x2 Pickup" },
      { label: "Auction", value: "South Mississippi Auto Auction" },
      { label: "Close Date", value: "Jul 10, 2026" },
    ],
    currentBid: 100,
    openingBid: 100,
    closesAt: iso("2026-07-10T18:00:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "open",
    image: lotImage1,
  },
  {
    id: "l-002",
    slug: "2017-gmc-sierra-double-cab-4x4-pickup-51",
    lotNumber: "Lot 51",
    title: "2017 GMC Sierra Double Cab 4x4 Pickup",
    auctionSlug: "south-mississippi-auto-auction",
    auctionName: "South Mississippi Auto Auction",
    category: "pickup-trucks",
    manufacturer: "GMC",
    model: "Sierra",
    year: 2017,
    serialNumber: "1GTV2LEC1HZ353102",
    condition: "Used - Fleet Maintained",
    location: "Brookhaven, MS",
    description:
      "Late-model 4x4 pickup suited for contractors, fleets, and buyers looking for everyday utility.",
    specs: [
      { label: "VIN", value: "1GTV2LEC1HZ353102" },
      { label: "Drivetrain", value: "4x4" },
      { label: "Cab", value: "Double Cab" },
      { label: "Close Date", value: "Jul 10, 2026" },
    ],
    currentBid: 100,
    openingBid: 100,
    closesAt: iso("2026-07-10T18:00:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "open",
    image: lotImage2,
  },
  {
    id: "l-003",
    slug: "2005-ford-f150-xlt-crew-cab-4x4-pickup-52",
    lotNumber: "Lot 52",
    title: "2005 Ford F-150 XLT Crew Cab 4x4 Pickup",
    auctionSlug: "south-mississippi-auto-auction",
    auctionName: "South Mississippi Auto Auction",
    category: "pickup-trucks",
    manufacturer: "Ford",
    model: "F-150 XLT",
    year: 2005,
    serialNumber: "1FTPW14525FA56468",
    condition: "Used - As Offered",
    location: "Brookhaven, MS",
    description:
      "Value-focused crew cab pickup for buyers comparing practical work-truck options before they bid.",
    specs: [
      { label: "VIN", value: "1FTPW14525FA56468" },
      { label: "Body", value: "Crew Cab 4x4 Pickup" },
      { label: "Status", value: "Bidding Open" },
      { label: "Close Date", value: "Jul 10, 2026" },
    ],
    currentBid: 100,
    openingBid: 100,
    closesAt: iso("2026-07-10T18:00:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "open",
    image: lotImage3,
  },
  {
    id: "l-004",
    slug: "2021-ram-1500-crew-cab-4x2-pickup-2051",
    lotNumber: "Lot 2051",
    title: "2021 Ram 1500 Crew Cab 4x2 Pickup",
    auctionSlug: "south-mississippi-auto-auction",
    auctionName: "South Mississippi Auto Auction",
    category: "fleet-vehicles",
    manufacturer: "Ram",
    model: "1500",
    year: 2021,
    serialNumber: "3C6RR6KT8MG535948",
    condition: "Used - Fleet Maintained",
    location: "Brookhaven, MS",
    description:
      "Newer model Ram pickup for buyers watching cleaner, later-model inventory in the upcoming sale.",
    specs: [
      { label: "VIN", value: "3C6RR6KT8MG535948" },
      { label: "Body", value: "Crew Cab 4x2 Pickup" },
      { label: "Auction", value: "South Mississippi Auto Auction" },
      { label: "Close Date", value: "Jul 21, 2026" },
    ],
    currentBid: 500,
    openingBid: 500,
    closesAt: iso("2026-07-21T18:00:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "open",
    image: lotImage4,
  },
  {
    id: "l-005",
    slug: "2020-ford-f150-xlt-crew-cab-4x4-pickup-2052",
    lotNumber: "Lot 2052",
    title: "2020 Ford F-150 XLT Crew Cab 4x4 Pickup",
    auctionSlug: "southeast-automobile-auction",
    auctionName: "Southeast Automobile Auction",
    category: "pickup-trucks",
    manufacturer: "Ford",
    model: "F-150 XLT",
    year: 2020,
    serialNumber: "1FTEW1E5XLKD64353",
    condition: "Used - Bid Ready",
    location: "Pelham, AL",
    description:
      "Well-equipped late-model F-150 featured for buyers who want a clearer look before jumping into the full lot page.",
    specs: [
      { label: "VIN", value: "1FTEW1E5XLKD64353" },
      { label: "Drivetrain", value: "4x4" },
      { label: "Auction", value: "Southeast Automobile Auction" },
      { label: "Close Date", value: "Jul 21, 2026" },
    ],
    currentBid: 500,
    openingBid: 500,
    closesAt: iso("2026-07-21T18:00:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "open",
    image: truck4,
  },
  {
    id: "l-006",
    slug: "2014-ford-mustang-coupe-preview",
    lotNumber: "Lot 318",
    title: "2014 Ford Mustang Coupe",
    auctionSlug: "upper-midwest-automobile-auction",
    auctionName: "Upper Midwest Automobile Auction",
    category: "suvs-cars",
    manufacturer: "Ford",
    model: "Mustang",
    year: 2014,
    condition: "Used - Preview Unit",
    location: "Medford, MN",
    description:
      "Passenger vehicle example included to widen the browsing mix beyond work trucks and show range across active JMA automotive events.",
    specs: [
      { label: "Category", value: "Cars" },
      { label: "Auction", value: "Upper Midwest Automobile Auction" },
      { label: "Status", value: "Preview" },
      { label: "Bid Start", value: "Jul 9, 2026" },
    ],
    openingBid: 250,
    closesAt: iso("2026-07-10T18:30:00-05:00"),
    externalUrl: "https://www.jeffmartinauctioneers.com/all-auction-lots",
    status: "upcoming",
    image: truck1,
  },
];

export const faqs: FAQGroup[] = [
  {
    slug: "registration",
    title: "Registration & Bidding",
    items: [
      {
        q: "Do I register on this site or on Jeff Martin Auctioneers?",
        a: "This site helps you discover upcoming auto auctions and featured lots. Final bidder registration and bidding happen on the main Jeff Martin Auctioneers platform.",
      },
      {
        q: "Can I view lots before I register?",
        a: "Yes. We intentionally preview upcoming auctions and lot inventory here so buyers can inspect what is available before moving into registration and bidding.",
      },
    ],
  },
  {
    slug: "auction-day",
    title: "Auction Day",
    items: [
      {
        q: "What kinds of auto inventory will appear here?",
        a: "Expect pickup trucks, SUVs, fleet vehicles, repossessions, dealer units, municipal vehicles, and selected commercial vans depending on the event.",
      },
      {
        q: "Do I bid directly on this website?",
        a: "No. This is the lead-generation and discovery site. When you are ready to bid, we route you to the main Jeff Martin Auctioneers experience.",
      },
    ],
  },
  {
    slug: "selling",
    title: "Selling Vehicles",
    items: [
      {
        q: "Who should consign with JMA Auto Auctions?",
        a: "Fleet operators, lenders, dealers, municipalities, tow and recovery firms, rental groups, and business owners who need market exposure and a structured sale process.",
      },
      {
        q: "Why use an auction instead of listing vehicles one by one?",
        a: "Auctions compress the sales timeline, create competitive urgency, and give sellers access to broader bidder demand than private one-off listings.",
      },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "how-to-register-to-bid-at-an-auto-auction",
    title: "How to Register to Bid at a JMA Auto Auction",
    excerpt: "A simple walkthrough from discovery to approved bidder status on the main auction platform.",
    body: "Registration content placeholder.",
    audience: "buyer",
    readTime: 4,
  },
  {
    slug: "what-makes-a-good-fleet-auction-candidate",
    title: "What Makes a Good Fleet Auction Candidate",
    excerpt: "How sellers should think about timing, condition, grouping, and documentation before consigning.",
    body: "Fleet auction preparation placeholder.",
    audience: "seller",
    readTime: 5,
  },
  {
    slug: "why-featured-lots-help-convert-buyers",
    title: "Why Featured Lots Convert More Buyers",
    excerpt: "Using real inventory to create confidence, urgency, and stronger registration intent.",
    body: "Featured lots marketing placeholder.",
    audience: "general",
    readTime: 3,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote: "We use the auto auction preview experience to drive serious bidders into the live platform with much better intent.",
    name: "JMA Registration Team",
    company: "Jeff Martin Auctioneers",
    role: "Bidder Support",
    isPlaceholder: false,
  },
  {
    id: "t-2",
    quote: "The strongest leads are the ones who already saw upcoming inventory, understood the timing, and knew exactly where to go to bid.",
    name: "Auction Marketing",
    company: "Jeff Martin Auctioneers",
    role: "Digital Strategy",
    isPlaceholder: false,
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
  { to: "/how-to-buy", label: "How to Bid" },
  { to: "/sell", label: "Sell Vehicles" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
