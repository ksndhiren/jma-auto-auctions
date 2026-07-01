export type MenuItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const HEADER_MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Cars for Sale", href: "/cars-for-sale" },
  { label: "Auto Auctions", href: "/auto-auctions" },
  { label: "Vehicle Marketplace", href: "/vehicle-marketplace" },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "Buying Guides", href: "/blog/buying-guides" },
      { label: "Selling Guides", href: "/blog/selling-guides" },
      { label: "Auto Auction Guides", href: "/blog/auto-auction-guides" },
      { label: "Financing Guides", href: "/blog/financing-guides" },
      { label: "Transportation Guides", href: "/blog/transportation-guides" },
      { label: "Market Insights", href: "/blog/market-insights" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export type FooterColumn = {
  heading: string;
  items: { label: string; href: string }[];
};

export const FOOTER_MENU: FooterColumn[] = [
  {
    heading: "Buy",
    items: [
      { label: "Cars for Sale", href: "/cars-for-sale" },
      { label: "Used Cars for Sale", href: "/used-cars-for-sale" },
      { label: "Auto Auctions", href: "/auto-auctions" },
      { label: "Vehicle Marketplace", href: "/vehicle-marketplace" },
      { label: "Dealer Inventory", href: "/dealer-inventory" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Buying Guides", href: "/blog/buying-guides" },
      { label: "Selling Guides", href: "/blog/selling-guides" },
      { label: "Market Insights", href: "/blog/market-insights" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];
