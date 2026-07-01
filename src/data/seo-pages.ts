import { siteConfig } from "@/config/site";
import type { SeoLandingPageData } from "@/components/marketing/SeoLandingPage";

const inventoryLink = { href: siteConfig.platform.lotsUrl };
const auctionLink = { href: siteConfig.platform.auctionsUrl };
const contactLink = { to: "/contact" };
const sellLink = { to: "/sell-your-vehicle" };

export const seoPages: Record<string, SeoLandingPageData> = {
  "cars-for-sale": {
    slug: "cars-for-sale",
    pageTitle: "Cars for Sale",
    metaDescription:
      "Find quality cars for sale through trusted Jeff Martin Auctioneers inventory, auctions, financing support, and transportation help.",
    eyebrow: "Buyer Services",
    heroTitle: "Find Quality Cars for Sale",
    heroBody: [
      "Looking for quality cars for sale? Jeff Martin Auctioneers helps buyers find used cars through trusted auctions and marketplace listings. Browse vehicles from dealers, fleet operators, businesses, and consignors, all in one place.",
      "Whether you're searching for a daily driver, family vehicle, or affordable second car, finding the right vehicle is simple.",
    ],
    primaryCta: { label: "Browse Inventory", ...inventoryLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Featured Vehicle Inventory",
    introBody: [
      "Explore a regularly updated inventory of used cars from trusted sellers.",
      "Compare different makes, models, conditions, and price ranges to find the vehicle that fits your needs.",
    ],
    benefitsTitle: "Why Buy Through Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Wide Vehicle Selection",
        description: "Browse vehicles from multiple trusted sellers in one marketplace.",
      },
      {
        title: "Trusted Auction Platform",
        description: "Buy through an experienced and established auction company.",
      },
      {
        title: "Competitive Pricing",
        description: "Access vehicles at competitive market prices.",
      },
      {
        title: "Regular Inventory Updates",
        description: "New vehicles are added frequently, giving you more buying opportunities.",
      },
    ],
    processTitle: "How It Works",
    processSteps: [
      {
        title: "Browse Inventory",
        description: "View available cars and upcoming vehicle listings.",
      },
      {
        title: "Compare Vehicles",
        description: "Review vehicle details, condition, and availability.",
      },
      {
        title: "Register or Contact Us",
        description: "Register for an auction or speak with our team for assistance.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize your purchase and arrange pickup or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Used Cars for Sale", to: "/used-cars-for-sale" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can anyone buy a car from Jeff Martin Auctioneers?",
        a: "Many vehicles are available to both individual buyers and businesses. Some auctions may have participation requirements.",
      },
      {
        q: "Are vehicles inspected?",
        a: "Available vehicle details are provided with each listing. Review the listing carefully before purchasing.",
      },
      {
        q: "Is financing available?",
        a: "Yes. Financing options are available for qualifying buyers.",
      },
      {
        q: "Can you arrange transportation?",
        a: "Yes. We can help coordinate vehicle transportation after your purchase.",
      },
    ],
    closingTitle: "Ready to Find Your Next Vehicle?",
    closingBody:
      "Browse our latest inventory or contact our team for help finding the right vehicle. We're here to assist with inventory, upcoming auctions, financing, and transportation.",
    closingPrimaryCta: { label: "Browse Inventory", ...inventoryLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "used-cars-for-sale": {
    slug: "used-cars-for-sale",
    pageTitle: "Used Cars for Sale",
    metaDescription:
      "Shop quality used cars with confidence through Jeff Martin Auctioneers inventory, auctions, financing options, and transportation support.",
    eyebrow: "Pre-Owned Inventory",
    heroTitle: "Shop Quality Used Cars with Confidence",
    heroBody: [
      "Find quality used cars from dealerships, fleet operators, businesses, and consignors, all in one marketplace.",
      "Whether you're looking for a reliable commuter, family sedan, or low-mileage vehicle, Jeff Martin Auctioneers makes it easy to compare available inventory and find the right fit.",
    ],
    primaryCta: { label: "Browse Used Cars", ...inventoryLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Quality Pre-Owned Vehicle Inventory",
    introBody: [
      "Browse a regularly updated selection of used cars in various makes, models, and price ranges.",
      "Each listing includes key vehicle details to help you make an informed buying decision.",
    ],
    benefitsTitle: "Why Buy Used Cars from Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Wide Selection",
        description: "Browse vehicles from trusted sellers across multiple categories.",
      },
      {
        title: "Competitive Pricing",
        description: "Find quality used cars at competitive market prices.",
      },
      {
        title: "Regular Inventory Updates",
        description: "New listings are added frequently, giving you more buying opportunities.",
      },
      {
        title: "Trusted Auction Platform",
        description: "Buy with confidence through an experienced auction company.",
      },
    ],
    processTitle: "How It Works",
    processSteps: [
      {
        title: "Browse Inventory",
        description: "Explore current used car listings and upcoming auctions.",
      },
      {
        title: "Compare Vehicles",
        description: "Review vehicle details, condition, and availability.",
      },
      {
        title: "Register or Contact Us",
        description: "Register for an auction or speak with our team for assistance.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize your purchase and arrange payment, pickup, or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What types of used cars are available?",
        a: "Inventory may include sedans, SUVs, pickup trucks, electric vehicles, luxury cars, vans, and commercial vehicles.",
      },
      {
        q: "Can I buy a used car online?",
        a: "Yes. Browse inventory online before contacting our team or participating in an auction.",
      },
      {
        q: "Is financing available?",
        a: "Yes. Financing options may be available for qualified buyers.",
      },
      {
        q: "Can you arrange transportation?",
        a: "Yes. We can help coordinate transportation after your purchase.",
      },
    ],
    closingTitle: "Find Your Next Used Car Today",
    closingBody:
      "Explore our latest used car inventory or contact our team for help with vehicle selection, financing, transportation, or upcoming auctions.",
    closingPrimaryCta: { label: "Browse Used Cars", ...inventoryLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "auto-auctions": {
    slug: "auto-auctions",
    pageTitle: "Auto Auctions",
    metaDescription:
      "Buy vehicles through trusted auto auctions at Jeff Martin Auctioneers with current listings, registration guidance, and post-sale support.",
    eyebrow: "Auction Buying",
    heroTitle: "Buy Vehicles Through Trusted Auto Auctions",
    heroBody: [
      "Find quality vehicles through trusted auto auctions at Jeff Martin Auctioneers. Browse cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory from dealerships, businesses, financial institutions, and consignors, all in one marketplace.",
      "Whether you're buying one vehicle or multiple units, our auctions offer competitive buying opportunities.",
    ],
    primaryCta: { label: "Browse Auto Auctions", ...auctionLink },
    secondaryCta: { label: "Register to Bid", ...auctionLink },
    introTitle: "Explore Current Auto Auctions",
    introBody: [
      "Browse regularly updated auctions featuring a wide range of vehicle types.",
      "With new inventory added throughout the year, you'll always have fresh opportunities to find the right vehicle.",
    ],
    benefitsTitle: "Why Buy at Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Wide Vehicle Selection",
        description: "Browse inventory from trusted sellers in one marketplace.",
      },
      {
        title: "Competitive Buying Opportunities",
        description: "Find quality vehicles at competitive auction prices.",
      },
      {
        title: "Regular Auction Events",
        description: "New auctions and inventory are added frequently.",
      },
      {
        title: "Trusted Auction Partner",
        description: "Buy with confidence backed by an experienced auction team.",
      },
    ],
    processTitle: "How Auto Auctions Work",
    processSteps: [
      {
        title: "Browse Auctions",
        description: "View current and upcoming vehicle auctions.",
      },
      {
        title: "Register to Bid",
        description: "Complete your registration before participating.",
      },
      {
        title: "Place Your Bids",
        description: "Bid on the vehicles that match your needs.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize payment and arrange pickup or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Used Cars for Sale", to: "/used-cars-for-sale" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can anyone participate in an auto auction?",
        a: "Many auctions are open to both individual buyers and businesses. Some may have registration requirements.",
      },
      {
        q: "What types of vehicles are available?",
        a: "Inventory may include cars, SUVs, pickup trucks, luxury vehicles, fleet vehicles, and commercial vehicles.",
      },
      {
        q: "How do I register?",
        a: "Follow the registration instructions provided with each auction or contact our team for assistance.",
      },
      {
        q: "Can you arrange transportation?",
        a: "Yes. We can help coordinate vehicle transportation after your purchase.",
      },
    ],
    closingTitle: "Start Bidding Today",
    closingBody:
      "Browse current auto auctions, register to bid, or contact our team for help finding the right vehicle.",
    closingPrimaryCta: { label: "Browse Auto Auctions", ...auctionLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "upcoming-auto-auctions": {
    slug: "upcoming-auto-auctions",
    pageTitle: "Upcoming Auto Auctions",
    metaDescription:
      "Stay updated on upcoming auto auctions with regularly refreshed event listings, registration guidance, and vehicle planning support.",
    eyebrow: "Auction Calendar",
    heroTitle: "Stay Updated on Upcoming Auto Auctions",
    heroBody: [
      "Browse upcoming auto auctions featuring cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory.",
      "Whether you're buying for personal use or your business, Jeff Martin Auctioneers helps you find upcoming auction opportunities in one place.",
    ],
    primaryCta: { label: "View Upcoming Auctions", ...auctionLink },
    secondaryCta: { label: "Register for an Auction", ...auctionLink },
    introTitle: "Browse Upcoming Auction Events",
    introBody: [
      "Our auction calendar is updated regularly with new events and vehicle inventory from dealerships, fleet operators, businesses, financial institutions, and consignors.",
      "Review upcoming auctions, plan ahead, and register early to participate.",
    ],
    benefitsTitle: "Why Follow Our Auction Calendar?",
    benefits: [
      {
        title: "Never Miss an Auction",
        description: "Stay informed about newly scheduled auction events.",
      },
      {
        title: "Plan Ahead",
        description: "Review auction dates and prepare before bidding begins.",
      },
      {
        title: "Fresh Inventory",
        description: "Each auction features new vehicles and buying opportunities.",
      },
      {
        title: "Trusted Auction Partner",
        description: "Buy with confidence through an experienced auction company.",
      },
    ],
    processTitle: "How to Participate",
    processSteps: [
      {
        title: "View Upcoming Auctions",
        description: "Browse scheduled auction events and available inventory.",
      },
      {
        title: "Register",
        description: "Complete your registration before the auction.",
      },
      {
        title: "Review Vehicle Listings",
        description: "Compare vehicle details before bidding.",
      },
      {
        title: "Bid & Purchase",
        description: "Place your bids, complete payment, and arrange transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How often are new auctions added?",
        a: "New auction events are scheduled throughout the year. Check back regularly for the latest listings.",
      },
      {
        q: "Can I register before an auction?",
        a: "Yes. Early registration helps ensure you're ready to participate.",
      },
      {
        q: "What vehicles are available?",
        a: "Upcoming auctions may include used cars, SUVs, pickup trucks, luxury vehicles, commercial vehicles, and fleet inventory.",
      },
      {
        q: "Can you arrange transportation?",
        a: "Yes. We can help coordinate transportation after your purchase.",
      },
    ],
    closingTitle: "Get Ready for the Next Auto Auction",
    closingBody:
      "Browse upcoming auto auctions, register to participate, or contact our team for assistance with auction schedules, vehicle inventory, or transportation.",
    closingPrimaryCta: { label: "View Upcoming Auctions", ...auctionLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "vehicle-marketplace": {
    slug: "vehicle-marketplace",
    pageTitle: "Vehicle Marketplace",
    metaDescription:
      "Buy and sell vehicles in one trusted marketplace backed by Jeff Martin Auctioneers, with inventory discovery and seller support in one place.",
    eyebrow: "Buyer & Seller Marketplace",
    heroTitle: "Buy and Sell Vehicles in One Trusted Marketplace",
    heroBody: [
      "Jeff Martin Auctioneers connects buyers and sellers through one trusted vehicle marketplace.",
      "Browse cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory, or list your vehicle for sale, all in one place.",
    ],
    primaryCta: { label: "Browse Vehicles", ...inventoryLink },
    secondaryCta: { label: "Sell Your Vehicle", ...sellLink },
    introTitle: "Explore Available Vehicle Inventory",
    introBody: [
      "Browse vehicles from dealerships, fleet operators, businesses, financial institutions, and private consignors.",
      "With new listings added regularly, buyers have more choices while sellers gain greater exposure.",
    ],
    benefitsTitle: "Why Use the JMA Vehicle Marketplace?",
    benefits: [
      {
        title: "Buy or Sell with Ease",
        description: "Browse available vehicles or list your own inventory in one marketplace.",
      },
      {
        title: "Fresh Inventory",
        description: "New vehicle listings are added regularly.",
      },
      {
        title: "Trusted Auction Experience",
        description: "Backed by years of experience connecting buyers and sellers.",
      },
      {
        title: "Simple Process",
        description: "Search inventory, contact our team, and complete your transaction with confidence.",
      },
    ],
    processTitle: "How Our Marketplace Works",
    processSteps: [
      {
        title: "Browse Listings",
        description: "Explore vehicles across multiple categories.",
      },
      {
        title: "Compare Your Options",
        description: "Review vehicle details and choose the right fit.",
      },
      {
        title: "Contact Our Team",
        description: "Request information or begin the buying or selling process.",
      },
      {
        title: "Complete Your Transaction",
        description: "Finalize your purchase or sale and arrange financing or transportation if needed.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Used Cars for Sale", to: "/used-cars-for-sale" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What types of vehicles are listed?",
        a: "Listings may include cars, SUVs, pickup trucks, luxury vehicles, vans, commercial vehicles, and fleet inventory.",
      },
      {
        q: "Can businesses sell vehicles?",
        a: "Yes. We work with dealerships, businesses, fleet operators, and private sellers.",
      },
      {
        q: "Is the marketplace updated regularly?",
        a: "Yes. New listings are added frequently.",
      },
      {
        q: "Can I finance or transport my purchase?",
        a: "Yes. Financing may be available for qualified buyers, and we can help coordinate transportation.",
      },
    ],
    closingTitle: "Start Buying or Selling Today",
    closingBody:
      "Browse available vehicles or list your own with Jeff Martin Auctioneers. Contact our team to get started.",
    closingPrimaryCta: { label: "Browse Vehicles", ...inventoryLink },
    closingSecondaryCta: { label: "Sell Your Vehicle", ...sellLink },
  },
  "sell-your-vehicle": {
    slug: "sell-your-vehicle",
    pageTitle: "Sell Your Vehicle",
    metaDescription:
      "Sell your vehicle with confidence through Jeff Martin Auctioneers using marketplace exposure, auction support, and hands-on seller guidance.",
    eyebrow: "Seller Services",
    heroTitle: "Sell Your Vehicle with Confidence",
    heroBody: [
      "Jeff Martin Auctioneers helps individuals, dealerships, businesses, and fleet owners sell vehicles through a trusted marketplace and auction platform.",
      "Whether you're selling one vehicle or an entire fleet, we make the process simple and efficient.",
    ],
    primaryCta: { label: "Sell Your Vehicle", ...sellLink },
    secondaryCta: { label: "Request a Vehicle Evaluation", ...contactLink },
    introTitle: "Reach More Qualified Buyers",
    introBody: [
      "Connect with buyers actively searching for cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory.",
      "Our marketplace and auction events help give your vehicle greater visibility.",
    ],
    benefitsTitle: "Why Sell with Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Larger Buyer Network",
        description: "Reach individual buyers, dealerships, and businesses.",
      },
      {
        title: "Simple Selling Process",
        description: "Our team guides you from listing to final sale.",
      },
      {
        title: "Flexible Selling Options",
        description: "Choose the selling method that best fits your needs.",
      },
      {
        title: "Professional Support",
        description: "Receive assistance throughout the transaction.",
      },
    ],
    processTitle: "How to Sell Your Vehicle",
    processSteps: [
      {
        title: "Submit Your Vehicle",
        description: "Share your vehicle details, including make, model, year, and condition.",
      },
      {
        title: "Review Your Options",
        description: "We'll recommend the best selling approach for your vehicle.",
      },
      {
        title: "List Your Vehicle",
        description: "Your vehicle is promoted through our marketplace and auction platform.",
      },
      {
        title: "Complete the Sale",
        description: "Finalize the transaction with support from our team.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Vehicle Consignment", to: "/vehicle-consignment" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What types of vehicles can I sell?",
        a: "We accept cars, SUVs, pickup trucks, luxury vehicles, vans, commercial vehicles, and fleet inventory.",
      },
      {
        q: "Can businesses sell multiple vehicles?",
        a: "Yes. We work with dealerships, businesses, rental companies, and fleet operators.",
      },
      {
        q: "How long does the selling process take?",
        a: "The timeline depends on the vehicle, selling method, and market demand.",
      },
      {
        q: "Do you help with the paperwork?",
        a: "Yes. Our team assists throughout the selling process.",
      },
    ],
    closingTitle: "Ready to Sell Your Vehicle?",
    closingBody:
      "Request a vehicle evaluation or contact our team to discuss the best way to sell your vehicle through Jeff Martin Auctioneers.",
    closingPrimaryCta: { label: "Sell Your Vehicle", ...sellLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "vehicle-consignment": {
    slug: "vehicle-consignment",
    pageTitle: "Vehicle Consignment",
    metaDescription:
      "Sell your vehicle through the JMA consignment program with broader exposure, professional marketing, and guided sale support.",
    eyebrow: "Consignment Services",
    heroTitle: "Sell Your Vehicle Through Our Consignment Program",
    heroBody: [
      "Jeff Martin Auctioneers makes selling your vehicle easier with professional consignment services.",
      "We help individuals, dealerships, businesses, and fleet owners market their vehicles, connect with qualified buyers, and manage the sale from listing to completion.",
    ],
    primaryCta: { label: "Consign Your Vehicle", ...sellLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Why Choose Vehicle Consignment?",
    introBody: [
      "Consigning your vehicle saves time while giving you access to our marketplace, auction network, and experienced team.",
      "Whether you're selling one vehicle or an entire fleet, we help you reach more buyers with less effort.",
    ],
    benefitsTitle: "Benefits of Consigning Your Vehicle",
    benefits: [
      {
        title: "Reach More Buyers",
        description: "Promote your vehicle through our marketplace and auction network.",
      },
      {
        title: "Save Time",
        description: "Let us handle buyer inquiries and the selling process.",
      },
      {
        title: "Professional Marketing",
        description: "Showcase your vehicle with detailed listings and auction exposure.",
      },
      {
        title: "Flexible Selling Options",
        description: "We'll recommend the best strategy based on your vehicle and goals.",
      },
    ],
    processTitle: "How Vehicle Consignment Works",
    processSteps: [
      {
        title: "Submit Your Vehicle",
        description: "Provide details such as make, model, year, mileage, and condition.",
      },
      {
        title: "Review Your Plan",
        description: "We'll discuss pricing and the best selling approach.",
      },
      {
        title: "List Your Vehicle",
        description: "Your vehicle is promoted to qualified buyers.",
      },
      {
        title: "Complete the Sale",
        description: "We'll help finalize the transaction and guide you through the remaining steps.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Sell Your Vehicle", to: "/sell-your-vehicle" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is vehicle consignment?",
        a: "Vehicle consignment allows you to sell your vehicle while Jeff Martin Auctioneers handles the marketing and connects you with buyers.",
      },
      {
        q: "What types of vehicles can be consigned?",
        a: "We accept cars, SUVs, pickup trucks, luxury vehicles, commercial vehicles, and fleet inventory.",
      },
      {
        q: "Do I need to advertise my vehicle?",
        a: "No. We handle the marketing and promotion for you.",
      },
      {
        q: "Can businesses consign multiple vehicles?",
        a: "Yes. We work with dealerships, businesses, rental companies, and fleet owners.",
      },
    ],
    closingTitle: "Ready to Consign Your Vehicle?",
    closingBody:
      "Contact our team to learn more about our vehicle consignment services and start reaching qualified buyers.",
    closingPrimaryCta: { label: "Consign Your Vehicle", ...sellLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "dealer-inventory": {
    slug: "dealer-inventory",
    pageTitle: "Dealer Inventory",
    metaDescription:
      "Browse dealer inventory from trusted sellers through JMA Auto Auctions, including trade-ins, aged units, and wholesale-ready vehicles.",
    eyebrow: "Dealer Solutions",
    heroTitle: "Browse Dealer Inventory from Trusted Sellers",
    heroBody: [
      "Jeff Martin Auctioneers helps buyers discover dealer inventory from established sellers in one streamlined marketplace.",
      "Browse trade-ins, aged units, wholesale-ready vehicles, and dealership surplus across cars, SUVs, pickup trucks, and commercial units.",
    ],
    primaryCta: { label: "Browse Dealer Inventory", ...inventoryLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Explore Dealer Vehicle Listings",
    introBody: [
      "Find dealer inventory sourced from trusted dealerships and remarketing channels.",
      "With regularly updated listings and auction opportunities, buyers can compare vehicles quickly and act when the right inventory appears.",
    ],
    benefitsTitle: "Why Buy Dealer Inventory from Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Trusted Seller Network",
        description: "Browse inventory offered by established dealerships and remarketing partners.",
      },
      {
        title: "Wholesale-Ready Opportunities",
        description: "Access vehicles suited for dealers, resellers, and value-focused buyers.",
      },
      {
        title: "Consistent Inventory Flow",
        description: "New dealer units are added regularly through listings and auction events.",
      },
      {
        title: "Backed by Auction Experience",
        description: "Buy with confidence through an experienced team that understands vehicle remarketing.",
      },
    ],
    processTitle: "How It Works",
    processSteps: [
      {
        title: "Browse Dealer Inventory",
        description: "Review current listings and upcoming dealer-focused auction opportunities.",
      },
      {
        title: "Compare Vehicles",
        description: "Check available condition details, specs, and locations before you decide.",
      },
      {
        title: "Register or Contact Us",
        description: "Register for bidding or speak with our team for help navigating available inventory.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize payment and coordinate pickup, financing, or transportation as needed.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Fleet Vehicles", to: "/fleet-vehicles" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is dealer inventory?",
        a: "Dealer inventory can include trade-ins, aged units, wholesale vehicles, and dealership surplus offered for remarketing.",
      },
      {
        q: "Who can buy dealer inventory?",
        a: "Depending on the listing, dealer inventory may be available to dealerships, businesses, and individual buyers.",
      },
      {
        q: "Are vehicle details available?",
        a: "Yes. Listings include available vehicle information so buyers can review the details before participating.",
      },
      {
        q: "Can I buy multiple units?",
        a: "Yes. Buyers can pursue single-vehicle purchases or multiple units based on availability.",
      },
    ],
    closingTitle: "Find Dealer Inventory That Fits Your Needs",
    closingBody:
      "Browse current dealer inventory or contact our team for help identifying the right vehicles for your business or personal buying goals.",
    closingPrimaryCta: { label: "Browse Dealer Inventory", ...inventoryLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "fleet-vehicles": {
    slug: "fleet-vehicles",
    pageTitle: "Fleet Vehicles",
    metaDescription:
      "Browse fleet vehicles for sale from trusted sellers, including business, rental, municipal, and commercial inventory.",
    eyebrow: "Commercial Inventory",
    heroTitle: "Fleet Vehicles for Sale from Trusted Sellers",
    heroBody: [
      "Browse fleet vehicles from businesses, rental companies, dealerships, government organizations, and commercial fleets.",
      "Whether you're purchasing one vehicle or expanding your fleet, Jeff Martin Auctioneers gives you access to quality inventory at competitive prices.",
    ],
    primaryCta: { label: "Browse Fleet Vehicles", ...inventoryLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Explore Fleet Vehicle Inventory",
    introBody: [
      "Find passenger cars, SUVs, pickup trucks, cargo vans, and commercial vehicles from corporate fleets, rental companies, municipalities, financial institutions, and other trusted sellers.",
      "New inventory is added regularly.",
    ],
    benefitsTitle: "Why Buy Fleet Vehicles from Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Business-Ready Inventory",
        description: "Browse vehicles from commercial and fleet operations.",
      },
      {
        title: "Competitive Pricing",
        description: "Find quality fleet vehicles at competitive prices.",
      },
      {
        title: "Wide Selection",
        description: "Choose from a variety of vehicle types, makes, and model years.",
      },
      {
        title: "Trusted Auction Partner",
        description: "Buy with confidence backed by an experienced auction team.",
      },
    ],
    processTitle: "How It Works",
    processSteps: [
      {
        title: "Browse Fleet Inventory",
        description: "Explore current listings and upcoming auctions.",
      },
      {
        title: "Compare Vehicles",
        description: "Review vehicle details and specifications.",
      },
      {
        title: "Register or Contact Us",
        description: "Register for an auction or speak with our team.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize your purchase and arrange financing or transportation if needed.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Dealer Inventory", to: "/dealer-inventory" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What are fleet vehicles?",
        a: "Fleet vehicles are owned by businesses, rental companies, government agencies, or other organizations.",
      },
      {
        q: "Who can buy fleet vehicles?",
        a: "Depending on the listing, fleet vehicles may be available to businesses, dealerships, and individual buyers.",
      },
      {
        q: "Are vehicle details provided?",
        a: "Yes. Each listing includes available vehicle information for buyers to review.",
      },
      {
        q: "Can I purchase multiple vehicles?",
        a: "Yes. Businesses and dealerships can purchase single or multiple fleet vehicles, subject to availability.",
      },
    ],
    closingTitle: "Find the Right Fleet Vehicles",
    closingBody:
      "Browse available fleet inventory or contact our team for help finding vehicles that meet your business needs.",
    closingPrimaryCta: { label: "Browse Fleet Vehicles", ...inventoryLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "government-vehicle-auctions": {
    slug: "government-vehicle-auctions",
    pageTitle: "Government Vehicle Auctions",
    metaDescription:
      "Buy government vehicles through trusted auctions featuring surplus inventory from federal, state, county, and local agencies.",
    eyebrow: "Public Surplus",
    heroTitle: "Buy Government Vehicles Through Trusted Auctions",
    heroBody: [
      "Browse surplus government vehicles from federal, state, county, and local agencies.",
      "Jeff Martin Auctioneers connects individuals, businesses, and dealerships with government-owned cars, SUVs, pickup trucks, vans, and commercial vehicles through trusted auction events.",
    ],
    primaryCta: { label: "Browse Government Vehicles", ...auctionLink },
    secondaryCta: { label: "Register to Bid", ...auctionLink },
    introTitle: "Explore Government Vehicle Inventory",
    introBody: [
      "Government agencies regularly replace their fleets, creating opportunities to purchase surplus vehicles.",
      "Browse inventory from municipalities, public utilities, transportation departments, and other government organizations, with new auctions added throughout the year.",
    ],
    benefitsTitle: "Why Buy Government Vehicles?",
    benefits: [
      {
        title: "Well-Maintained Fleet Vehicles",
        description: "Many government vehicles follow scheduled maintenance programs.",
      },
      {
        title: "Competitive Pricing",
        description: "Purchase quality used vehicles through trusted auction events.",
      },
      {
        title: "Wide Selection",
        description: "Browse cars, SUVs, pickup trucks, cargo vans, and commercial vehicles.",
      },
      {
        title: "Trusted Auction Partner",
        description: "Buy with confidence through an experienced auction company.",
      },
    ],
    processTitle: "How Government Vehicle Auctions Work",
    processSteps: [
      {
        title: "Browse Auctions",
        description: "View current government vehicle listings and upcoming events.",
      },
      {
        title: "Register to Bid",
        description: "Complete your registration before participating.",
      },
      {
        title: "Place Your Bids",
        description: "Bid on the vehicles that fit your needs.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize payment and arrange pickup or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Fleet Vehicles", to: "/fleet-vehicles" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Who can buy government vehicles?",
        a: "Many government auctions are open to the public, while some may have registration requirements.",
      },
      {
        q: "What types of vehicles are available?",
        a: "Inventory may include sedans, SUVs, pickup trucks, cargo vans, commercial vehicles, and other surplus fleet vehicles.",
      },
      {
        q: "Are government vehicles sold as-is?",
        a: "Yes. Buyers should review the available vehicle information before bidding.",
      },
      {
        q: "Can you arrange transportation?",
        a: "Yes. We can help coordinate transportation after your purchase.",
      },
    ],
    closingTitle: "Browse Upcoming Government Vehicle Auctions",
    closingBody:
      "Explore current government vehicle auctions, register to bid, or contact our team for help finding the right vehicle.",
    closingPrimaryCta: { label: "Browse Government Vehicles", ...auctionLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "repo-car-auctions": {
    slug: "repo-car-auctions",
    pageTitle: "Repo Car Auctions",
    metaDescription:
      "Find repossessed vehicles at trusted auto auctions with regularly updated repo inventory, registration guidance, and transport help.",
    eyebrow: "Lender Inventory",
    heroTitle: "Find Repossessed Vehicles at Trusted Auto Auctions",
    heroBody: [
      "Browse repossessed vehicles from banks, finance companies, and lending institutions through Jeff Martin Auctioneers.",
      "Find cars, SUVs, pickup trucks, luxury vehicles, and commercial vehicles at competitive auction prices. Whether you're buying a personal vehicle or dealership inventory, our auctions make it easy to find the right opportunity.",
    ],
    primaryCta: { label: "Browse Repo Vehicles", ...auctionLink },
    secondaryCta: { label: "Register to Bid", ...auctionLink },
    introTitle: "Explore Repossessed Vehicle Inventory",
    introBody: [
      "Browse regularly updated repo vehicle listings from financial institutions.",
      "New auctions and inventory are added throughout the year.",
    ],
    benefitsTitle: "Why Buy Repo Vehicles from Jeff Martin Auctioneers?",
    benefits: [
      {
        title: "Competitive Pricing",
        description: "Access repossessed vehicles at competitive auction prices.",
      },
      {
        title: "Wide Selection",
        description: "Browse cars, SUVs, pickup trucks, vans, luxury vehicles, and commercial vehicles.",
      },
      {
        title: "Regular Inventory Updates",
        description: "New repo vehicles are added as auctions become available.",
      },
      {
        title: "Trusted Auction Partner",
        description: "Buy with confidence through an experienced auction company.",
      },
    ],
    processTitle: "How Repo Car Auctions Work",
    processSteps: [
      {
        title: "Browse Vehicles",
        description: "Explore current repo listings and upcoming auctions.",
      },
      {
        title: "Register to Bid",
        description: "Complete your registration before participating.",
      },
      {
        title: "Place Your Bids",
        description: "Bid on the vehicles that meet your needs and budget.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize payment and arrange pickup or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Online Auto Auctions", ...auctionLink },
      { label: "Government Vehicle Auctions", to: "/government-vehicle-auctions" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "What is a repossessed vehicle?",
        a: "A repossessed vehicle has been recovered by a lender after a borrower failed to meet the loan terms.",
      },
      {
        q: "Can anyone buy repo vehicles?",
        a: "Many repo auctions are open to individual buyers and businesses. Some may have registration requirements.",
      },
      {
        q: "Are vehicle details provided?",
        a: "Yes. Listings include available vehicle information, and buyers should review all details before bidding.",
      },
      {
        q: "Is financing available?",
        a: "Financing may be available for qualified buyers, and we can also help coordinate transportation after your purchase.",
      },
    ],
    closingTitle: "Start Browsing Repo Car Auctions",
    closingBody:
      "Browse current repo vehicle listings, register to bid, or contact our team for help finding the right vehicle.",
    closingPrimaryCta: { label: "Browse Repo Vehicles", ...auctionLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "vehicle-financing": {
    slug: "vehicle-financing",
    pageTitle: "Vehicle Financing",
    metaDescription:
      "Explore flexible vehicle financing solutions for marketplace and auction purchases through JMA Auto Auctions.",
    eyebrow: "Buyer Support",
    heroTitle: "Flexible Vehicle Financing Solutions for Your Next Purchase",
    heroBody: [
      "Jeff Martin Auctioneers helps qualified buyers explore financing options for cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory.",
      "Whether you're purchasing through our marketplace or an upcoming auction, we can help make the buying process more affordable.",
    ],
    primaryCta: { label: "Apply for Financing", ...contactLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Finance Your Vehicle with Confidence",
    introBody: [
      "Explore financing solutions designed to fit your budget and purchasing goals.",
      "Whether you're buying a personal vehicle or expanding your business fleet, our team will help you understand your available options.",
    ],
    benefitsTitle: "Why Choose JMA Vehicle Financing?",
    benefits: [
      {
        title: "Simple Application Process",
        description: "Get guidance through every step of the financing process.",
      },
      {
        title: "Financing for Multiple Vehicle Types",
        description: "Financing may be available for cars, trucks, SUVs, commercial vehicles, and fleet purchases.",
      },
      {
        title: "Expert Support",
        description: "Our team is available to answer your questions from application to purchase.",
      },
      {
        title: "Complete Buying Solution",
        description: "Finance your vehicle and arrange transportation through one trusted source.",
      },
    ],
    processTitle: "How Vehicle Financing Works",
    processSteps: [
      {
        title: "Choose Your Vehicle",
        description: "Browse available inventory or upcoming auctions.",
      },
      {
        title: "Submit Your Inquiry",
        description: "Provide your information so we can review financing options.",
      },
      {
        title: "Review Your Options",
        description: "We'll discuss financing solutions based on your purchase and qualifications.",
      },
      {
        title: "Complete Your Purchase",
        description: "Finalize your purchase and arrange pickup or transportation.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Used Cars for Sale", to: "/used-cars-for-sale" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Vehicle Transportation", to: "/vehicle-transportation" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I finance a vehicle purchased through an auction?",
        a: "Financing may be available for qualified buyers purchasing eligible vehicles.",
      },
      {
        q: "What types of vehicles can be financed?",
        a: "Financing may be available for cars, SUVs, pickup trucks, commercial vehicles, fleet vehicles, and other qualifying inventory.",
      },
      {
        q: "How do I apply?",
        a: "Contact our team or submit a financing inquiry to get started.",
      },
      {
        q: "Can financing and transportation be arranged together?",
        a: "Yes. We can help coordinate both financing and vehicle transportation.",
      },
    ],
    closingTitle: "Get Started with Vehicle Financing",
    closingBody:
      "Apply for financing or contact our team to learn more about available options for your next vehicle purchase.",
    closingPrimaryCta: { label: "Apply for Financing", ...contactLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
  "vehicle-transportation": {
    slug: "vehicle-transportation",
    pageTitle: "Vehicle Transportation",
    metaDescription:
      "Arrange reliable vehicle transportation after your JMA marketplace or auction purchase, from single-unit delivery to fleet moves.",
    eyebrow: "Delivery Support",
    heroTitle: "Reliable Vehicle Transportation Services",
    heroBody: [
      "Jeff Martin Auctioneers helps buyers arrange reliable vehicle transportation after purchasing through our marketplace or auction platform.",
      "Whether you're moving one vehicle or an entire fleet, we'll help coordinate delivery to your preferred destination.",
    ],
    primaryCta: { label: "Arrange Vehicle Transportation", ...contactLink },
    secondaryCta: { label: "Contact Our Team", ...contactLink },
    introTitle: "Transport Your Vehicle with Confidence",
    introBody: [
      "We help coordinate transportation for cars, SUVs, pickup trucks, commercial vehicles, and fleet inventory through trusted transportation partners.",
      "That makes delivery simple and convenient after you complete your purchase.",
    ],
    benefitsTitle: "Why Choose JMA Vehicle Transportation?",
    benefits: [
      {
        title: "Nationwide Delivery",
        description: "Transportation can be arranged across multiple locations.",
      },
      {
        title: "Safe & Reliable Service",
        description: "We work with experienced transportation providers.",
      },
      {
        title: "Solutions for Every Buyer",
        description: "Transportation is available for individual, business, and fleet purchases.",
      },
      {
        title: "Complete Buying Experience",
        description: "From purchase to delivery, we help simplify the process.",
      },
    ],
    processTitle: "How Vehicle Transportation Works",
    processSteps: [
      {
        title: "Purchase Your Vehicle",
        description: "Buy through our marketplace or an upcoming auction.",
      },
      {
        title: "Request Transportation",
        description: "Tell us your pickup and delivery requirements.",
      },
      {
        title: "Schedule Delivery",
        description: "We'll coordinate transportation based on your location and timeline.",
      },
      {
        title: "Receive Your Vehicle",
        description: "Your vehicle is delivered to your requested destination.",
      },
    ],
    relatedTitle: "Related Services",
    relatedLinks: [
      { label: "Cars for Sale", to: "/cars-for-sale" },
      { label: "Auto Auctions", to: "/auto-auctions" },
      { label: "Vehicle Marketplace", to: "/vehicle-marketplace" },
      { label: "Vehicle Financing", to: "/vehicle-financing" },
      { label: "Dealer Inventory", to: "/dealer-inventory" },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can you transport auction vehicles?",
        a: "Yes. We can arrange transportation for vehicles purchased through our marketplace or auctions.",
      },
      {
        q: "What types of vehicles can be transported?",
        a: "We can help coordinate transportation for cars, SUVs, pickup trucks, vans, commercial vehicles, luxury vehicles, and fleet inventory.",
      },
      {
        q: "Can multiple vehicles be transported together?",
        a: "Yes. Transportation is available for both single and multi-vehicle purchases.",
      },
      {
        q: "How do I request transportation?",
        a: "Contact our team after your purchase, and we'll help coordinate delivery.",
      },
    ],
    closingTitle: "Schedule Your Vehicle Transportation",
    closingBody:
      "Request vehicle transportation or contact our team to discuss delivery options for your next purchase.",
    closingPrimaryCta: { label: "Arrange Vehicle Transportation", ...contactLink },
    closingSecondaryCta: { label: "Contact Our Team", ...contactLink },
  },
};
