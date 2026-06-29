import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Calendar,
  ClipboardList,
  Globe2,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { LotCard } from "@/components/auction/LotCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { Cta } from "@/components/ui/cta";
import { siteConfig } from "@/config/site";
import { auctions, lots } from "@/data/mock";

export const Route = createFileRoute("/")({
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
  const featuredAuctions = auctions.slice(0, 4);
  const featuredLots = lots.slice(0, 4);
  const heroBackgroundImage = "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg";

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          {heroBackgroundImage && (
            <img
              src={heroBackgroundImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-72"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.86)_46%,rgba(0,0,0,0.54)_72%,rgba(0,0,0,0.18)_100%),radial-gradient(circle_at_top_left,rgba(242,169,0,0.1),transparent_24%)]" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-start gap-5 px-6 pb-2 pt-10 md:min-h-[calc(100vh-9.5rem)] md:px-8 md:pb-3 md:pt-12 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-12 lg:gap-7 lg:pb-4 lg:pt-14">
          <div className="lg:col-span-8">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Upcoming Auctions And Inventory</span>
            </div>
            <h1 className="max-w-5xl font-display text-[2.7rem] uppercase leading-[0.9] tracking-[0.01em] sm:text-[3.25rem] md:text-[3.7rem] lg:text-[3.5rem]">
              <span className="block">Browse Upcoming Auto</span>
              <span className="block text-gold">Auctions And Featured</span>
              <span className="block">Vehicle Inventory</span>
            </h1>
            <p className="mt-2 max-w-[36rem] text-[15px] leading-relaxed text-white/80 md:text-[15px]">
              Explore upcoming sales, compare featured vehicles, and keep an eye on closing dates
              before you head to the main bidding platform. This page is built to help you find the
              right auction quickly and move with confidence when the right vehicle appears.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Cta href={siteConfig.platform.auctionsUrl} variant="gold" size="lg">
                Register to Bid
              </Cta>
              <Cta href={siteConfig.platform.auctionsUrl} variant="outline-light" size="lg">
                View Upcoming Auto Auctions
              </Cta>
            </div>
          </div>
          <div className="hidden items-start justify-end pt-10 lg:col-span-4 lg:flex">
            <div className="max-w-[16rem] border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
              <p className="font-display text-[1.45rem] leading-tight text-white">
                Auction dates, featured vehicles, and a clearer path to your next bid
              </p>
              <p className="mt-2 text-sm text-white/70">
                Start here to compare timing, inventory, and lot volume before you continue to the full auction experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-bone">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:gap-10 md:px-8 md:py-10">
          {[
            { icon: Award, label: "Trusted JMA Backing" },
            { icon: BadgeCheck, label: "Upcoming Auto Auctions" },
            { icon: ClipboardList, label: "Active Vehicle Inventory" },
            { icon: Globe2, label: "Live Registration Help" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <Icon className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="text-xs font-bold uppercase tracking-wider text-black/85 md:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-5">
            <div className="max-w-3xl">
              <span className="eyebrow text-gold">Upcoming Auto Auctions</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
                <span className="block">Find the next sale</span>
                <span className="block text-gold whitespace-nowrap">worth watching closely</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
                See the date, location, lot count, and timing at a glance. When an auction matches
                what you are looking for, continue to Jeff Martin Auctioneers for full details and bidding access.
              </p>
            </div>
            <Cta href={siteConfig.platform.auctionsUrl} variant="dark" size="sm" className="hidden md:inline-flex">
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
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <span className="eyebrow text-black/50">Why Buyers Start Here</span>
              <h3 className="mt-3 font-display text-2xl uppercase leading-tight md:text-3xl">
                See the key details before you <span className="text-gold">commit to bidding.</span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-black/75">
                You should not have to create an account just to figure out whether a sale is worth
                your time. This page gives you the essentials first, so you can narrow in on the
                auctions and vehicles that fit your needs.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Upcoming auction dates and locations",
                  "Featured vehicles worth a closer look",
                  "Quick links to registration and bidding",
                  "Support if you need help before you bid",
                ].map((item) => (
                  <div key={item} className="border border-black/10 bg-bone px-4 py-4 text-sm font-medium text-black/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 bg-black p-8 text-white md:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-3">
              <span className="eyebrow text-gold">How It Works</span>
            </div>
            <div className="lg:col-span-9">
              <h3 className="font-display text-2xl uppercase leading-tight md:text-3xl">
                Browse here. Bid there. <span className="text-gold">Simple and fast.</span>
              </h3>
              <p className="mt-5 text-base leading-relaxed text-white/80">
                Use this site to compare upcoming auctions and get a visual feel for the inventory.
                When you want the full lot page, registration, or bidding access, continue to the
                main Jeff Martin Auctioneers platform and pick up right where your search left off.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-5">
            <div className="max-w-3xl">
              <span className="eyebrow text-gold">Featured Auto Lots</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
                Featured vehicles worth <span className="text-gold">a closer look.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
                Get a quick read on the vehicles catching attention right now. When one stands out,
                jump to the full inventory on Jeff Martin Auctioneers for more photos, bidding, and sale details.
              </p>
            </div>
            <Cta href={siteConfig.platform.lotsUrl} variant="dark" size="sm" className="hidden md:inline-flex">
              View All Inventory
            </Cta>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-gold">How Registration Works</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              A cleaner path from <span className="text-gold">visit to bidder.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["01", "Browse auctions and lots", "Start by exploring upcoming auto auctions and featured vehicle inventory on this site."],
              ["02", "Choose your event", "Click into the sale or lot that matches your interest and timeline."],
              ["03", "Move to the JMA platform", "When you want full details or bidding access, we send you to the main Jeff Martin Auctioneers experience."],
              ["04", "Register and bid", "Complete registration, get approved, and bid through the live auction environment."],
            ].map(([step, title, body]) => (
              <div key={step} className="border border-black/10 p-6">
                <p className="font-display text-3xl text-gold">{step}</p>
                <h3 className="mt-4 font-display text-xl uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="border border-black/10 bg-white p-8 md:p-12">
            <span className="eyebrow text-gold">For Sellers</span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
              Designed for fleets, lenders, dealers, and municipalities.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/75">
              The same site that captures buyer interest should also reassure sellers that JMA can
              market and move volume inventory with speed, process discipline, and broad bidder exposure.
            </p>
            <div className="mt-6 space-y-3 text-sm text-black/70">
              <p>Fleet reductions</p>
              <p>Bank and lender dispositions</p>
              <p>Municipal and utility vehicle sell-downs</p>
              <p>Tow and recovery inventory</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Cta to="/sell" variant="gold">Consign Vehicles</Cta>
              <Cta to="/contact" variant="outline">Talk to a Specialist</Cta>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow text-gold">Support & Alerts</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
                Need help before you bid?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/75">
                Whether you are bidding for the first time or tracking a specific vehicle, our team
                can help with registration questions, auction timing, and where to find the right inventory.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a href={siteConfig.phoneHref} className="border border-black/10 p-5 hover:border-black">
                  <Phone className="h-5 w-5 text-gold" />
                  <p className="mt-3 font-display text-xl uppercase">Call support</p>
                  <p className="mt-2 text-sm text-black/70">{siteConfig.phone}</p>
                </a>
                <a href={siteConfig.emailHref} className="border border-black/10 p-5 hover:border-black">
                  <Mail className="h-5 w-5 text-gold" />
                  <p className="mt-3 font-display text-xl uppercase">Email support</p>
                  <p className="mt-2 text-sm text-black/70">{siteConfig.email}</p>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-black/10 bg-bone p-6 md:p-8">
                <p className="eyebrow text-gold">Auction Alerts</p>
                <h3 className="mt-3 font-display text-2xl uppercase">Stay in the loop on new auto inventory.</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  Get updates on upcoming auto auctions and fresh inventory so you do not miss the next vehicle worth bidding on.
                </p>
                <div className="mt-6">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-gold">Final CTA</span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-tight md:text-5xl">
            Ready to register for the next <span className="text-gold">auto auction?</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75">
            Browse the current auctions, review featured lots, and move into the main Jeff Martin
            Auctioneers platform when you are ready to bid.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Cta href={siteConfig.platform.auctionsUrl} variant="gold" size="lg">
              Register to Bid
            </Cta>
            <Cta href={siteConfig.platform.lotsUrl} variant="outline-light" size="lg">
              Browse Auto Inventory
            </Cta>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70">
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Upcoming closings and live timelines</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> JMA-backed auction process</span>
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
