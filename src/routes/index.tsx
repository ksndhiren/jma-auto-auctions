import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Calendar,
  ClipboardList,
  Gavel,
  Globe2,
  HelpCircle,
  Mail,
  Monitor,
  Phone,
  Search,
  ShieldCheck,
  Trophy,
  Truck,
  UserPlus,
} from "lucide-react";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { LotCard } from "@/components/auction/LotCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { Cta } from "@/components/ui/cta";
import { siteConfig } from "@/config/site";
import { getUpcomingAuctions, getFeaturedLots } from "@/data/auctions-feed";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [featuredAuctions, featuredLots] = await Promise.all([
      getUpcomingAuctions(4),
      getFeaturedLots(4),
    ]);
    return { featuredAuctions, featuredLots };
  },
  head: () => ({
    meta: [
      { title: "JMA Auto Auctions | Upcoming Auto Auctions & Vehicle Lots" },
      {
        name: "description",
        content:
          "Browse upcoming auto auctions, preview featured vehicles, and head to Jeff Martin Auctioneers when you are ready to register and bid.",
      },
      {
        property: "og:title",
        content: "JMA Auto Auctions | Upcoming Auto Auctions & Vehicle Inventory",
      },
      {
        property: "og:description",
        content:
          "Preview upcoming auto auctions and featured vehicle inventory backed by Jeff Martin Auctioneers.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { featuredAuctions, featuredLots } = Route.useLoaderData();
  const heroBackgroundImage = getOptimizedImageUrl(
    "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg",
    { width: 1600, quality: 76, fit: "cover" },
  );

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          {heroBackgroundImage && (
            <img
              src={heroBackgroundImage}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center opacity-72"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.86)_46%,rgba(0,0,0,0.54)_72%,rgba(0,0,0,0.18)_100%),radial-gradient(circle_at_top_left,rgba(242,169,0,0.1),transparent_24%)]" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-20rem)] max-w-7xl items-start gap-5 px-6 pb-10 pt-28 md:min-h-[calc(100vh-22rem)] md:px-8 md:pb-12 md:pt-32 lg:min-h-[calc(100vh-24rem)] lg:grid-cols-12 lg:gap-7 lg:pb-14 lg:pt-36">
          <div className="lg:col-span-8">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Jeff Martin Auto Auctions</span>
            </div>
            <h1 className="max-w-5xl font-display text-[2.7rem] uppercase leading-[0.9] tracking-[0.01em] sm:text-[3.25rem] md:text-[3.7rem] lg:text-[3.5rem]">
              <span className="block">Browse Upcoming Auto</span>
              <span className="block text-gold">Auctions & Featured</span>
              <span className="block">Inventory</span>
            </h1>
            <p className="mt-2 max-w-[36rem] text-[15px] leading-relaxed text-white/80 md:text-[15px]">
              Find upcoming vehicle auctions, browse featured inventory, and register to bid with
              Jeff Martin Auto Auctions.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Cta href={siteConfig.platform.auctionsUrl} variant="gold" size="lg">
                Register to Bid
              </Cta>
              <Cta href={siteConfig.platform.lotsUrl} variant="outline-light" size="lg">
                Browse Inventory
              </Cta>
            </div>
          </div>
          <div className="hidden items-start justify-end pt-10 lg:col-span-4 lg:flex">
            <div className="max-w-[16rem] border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
              <p className="font-display text-[1.45rem] leading-tight text-white">
                Auction dates, featured vehicles, and a clearer path to your next bid
              </p>
              <p className="mt-2 text-sm text-white/70">
                Start here to compare timing, inventory, and lot volume before you continue to the
                full auction experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-10 md:grid-cols-4 md:gap-5 md:px-8 md:py-12">
          {[
            {
              icon: Calendar,
              label: "Upcoming Auctions",
              description: "See what's coming up next",
              href: siteConfig.platform.auctionsUrl,
              external: true,
            },
            {
              icon: ClipboardList,
              label: "Featured Inventory",
              description: "Vehicles worth a closer look",
              href: siteConfig.platform.lotsUrl,
              external: true,
            },
            {
              icon: Truck,
              label: "Dealer Inventory",
              description: "Browse commercial-ready units",
              href: "/dealer-inventory",
              external: false,
            },
            {
              icon: HelpCircle,
              label: "Need Help?",
              description: "Talk to our team",
              href: "/contact",
              external: false,
            },
          ].map(({ icon: Icon, label, description, href, external }) => {
            const content = (
              <>
                <Icon className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
                <div className="mt-4">
                  <p className="font-display text-lg uppercase tracking-[0.04em] text-black">
                    {label}
                  </p>
                  <p className="mt-1 text-sm text-black/65">{description}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </>
            );
            const className =
              "group flex flex-col border border-black/10 bg-bone p-6 transition-colors hover:border-gold";
            return external ? (
              <a key={label} href={href} className={className}>
                {content}
              </a>
            ) : (
              <Link key={label} to={href} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6 border-b border-white/15 pb-5">
            <div className="max-w-3xl">
              <span className="eyebrow text-gold">Auctions</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
                Upcoming Auto <span className="text-gold">Auctions</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
                See location, date, vehicle count, and timing at a glance. When an auction matches
                what you&apos;re after, jump to Jeff Martin Auctioneers for full details and
                bidding access.
              </p>
            </div>
            <Cta
              href={siteConfig.platform.auctionsUrl}
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
            >
              View All Auctions
            </Cta>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-5">
            <div className="max-w-3xl">
              <span className="eyebrow text-gold">Inventory</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
                Featured <span className="text-gold">Vehicles</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
                Browse vehicles drawing attention right now: year, make, model, current bid, and
                auction date. When one catches your eye, continue to the full lot details.
              </p>
            </div>
            <Cta
              href={siteConfig.platform.lotsUrl}
              variant="dark"
              size="sm"
              className="hidden md:inline-flex"
            >
              View Inventory
            </Cta>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">How It Works</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              Four steps from <span className="text-gold">browsing to bidding.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                step: "01",
                icon: UserPlus,
                title: "Register",
                body: "Create your bidder account on the Jeff Martin Auctioneers platform and get approved before the sale.",
              },
              {
                step: "02",
                icon: Search,
                title: "Browse",
                body: "Compare upcoming auctions and featured vehicles to find the lots that match what you're looking for.",
              },
              {
                step: "03",
                icon: Gavel,
                title: "Bid",
                body: "Place bids live online or in person, and track your activity in real time during the auction.",
              },
              {
                step: "04",
                icon: Trophy,
                title: "Win",
                body: "Complete payment, arrange transport, and take delivery of your vehicle from a trusted source.",
              },
            ].map(({ step, icon: Icon, title, body }) => (
              <div key={step} className="border border-white/15 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <p className="font-display text-3xl text-gold">{step}</p>
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-xl uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="border border-black/10 bg-bone p-8 md:p-12">
            <span className="eyebrow text-gold">Fleet & Dealer Solutions</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              Selling Multiple <span className="text-gold">Vehicles?</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/75">
              Built for dealers, fleet operators, lenders, and municipalities. JMA moves volume
              inventory with disciplined process and broad bidder exposure across the country.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Dealer trade-ins and aged inventory",
                "Fleet rotations and lease returns",
                "Bank and lender repossessions",
                "Municipal and utility sell-downs",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black/75"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta to="/dealer-inventory" variant="gold">
                Browse Dealer Inventory
              </Cta>
              <Cta to="/contact" variant="outline">
                Talk to Our Team
              </Cta>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">Why JMA</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              Why Choose <span className="text-gold">JMA Auto Auctions</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Decades of auctioneering experience paired with a modern bidding platform, backed by
              one of the country&apos;s most trusted names in the business.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Globe2,
                title: "Nationwide Auctions",
                body: "Live and online auto auctions held across the U.S., reaching buyers and sellers from coast to coast.",
              },
              {
                icon: Monitor,
                title: "Online Bidding",
                body: "Bid from anywhere with a real-time online platform built for transparency, speed, and security.",
              },
              {
                icon: Award,
                title: "Quality Inventory",
                body: "Carefully vetted vehicles from dealers, fleets, lenders, and municipal sources nationwide.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Auctioneer",
                body: "Backed by Jeff Martin Auctioneers, a name buyers and sellers have relied on for generations.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-white/15 bg-white/5 p-6">
                <Icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">Support</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              Need <span className="text-gold">Help?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
              Bidding for the first time or tracking a specific vehicle? Our team can help with
              registration, auction timing, and finding the right inventory.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a
              href={siteConfig.phoneHref}
              className="group flex flex-col border border-black/10 bg-bone p-6 transition-colors hover:border-gold"
            >
              <Phone className="h-7 w-7 text-gold" strokeWidth={1.5} />
              <p className="mt-5 font-display text-xl uppercase">Call Support</p>
              <p className="mt-2 text-sm text-black/70">{siteConfig.phone}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                Call now <ArrowRight className="h-3 w-3" />
              </span>
            </a>
            <a
              href={siteConfig.emailHref}
              className="group flex flex-col border border-black/10 bg-bone p-6 transition-colors hover:border-gold"
            >
              <Mail className="h-7 w-7 text-gold" strokeWidth={1.5} />
              <p className="mt-5 font-display text-xl uppercase">Email Support</p>
              <p className="mt-2 text-sm text-black/70">{siteConfig.email}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                Send email <ArrowRight className="h-3 w-3" />
              </span>
            </a>
            <Link
              to="/contact"
              className="group flex flex-col border border-black/10 bg-bone p-6 transition-colors hover:border-gold"
            >
              <HelpCircle className="h-7 w-7 text-gold" strokeWidth={1.5} />
              <p className="mt-5 font-display text-xl uppercase">Contact</p>
              <p className="mt-2 text-sm text-black/70">Talk to our team about buying or selling</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                Contact us <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-gold">Get Started</span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
            Ready to Register for the Next <span className="text-gold">Auto Auction?</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75">
            Browse current auctions, review featured vehicles, and head to Jeff Martin Auctioneers
            when you&apos;re ready to place your first bid.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Cta href={siteConfig.platform.auctionsUrl} variant="gold" size="lg">
              Register to Bid
            </Cta>
            <Cta href={siteConfig.platform.lotsUrl} variant="outline-light" size="lg">
              Browse Inventory
            </Cta>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" /> Upcoming closings and live timelines
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> JMA-backed auction process
            </span>
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 z-40 grid grid-cols-2 gap-px border-t border-black/10 bg-white lg:hidden">
        <a
          href={siteConfig.platform.lotsUrl}
          className="inline-flex items-center justify-center px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black"
        >
          Browse Inventory
        </a>
        <a
          href={siteConfig.platform.auctionsUrl}
          className="inline-flex items-center justify-center bg-gold px-4 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black"
        >
          Register
        </a>
      </div>
    </SiteShell>
  );
}
