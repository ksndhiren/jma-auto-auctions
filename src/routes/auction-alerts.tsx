import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { AuctionAlertForm } from "@/components/forms/AuctionAlertForm";

export const Route = createFileRoute("/auction-alerts")({
  head: () => ({
    meta: [
      { title: "Auction Alerts | JMA Auto Auctions" },
      { name: "description", content: "Subscribe to receive notifications when new auctions matching your interests are scheduled." },
    ],
  }),
  component: AuctionAlerts,
});

function AuctionAlerts() {
  return (
    <SiteShell>
      <Section size="md">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Auction Alerts</Eyebrow>
            <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">
              Never miss an auction that matters.
            </h1>
            <p className="mt-5 text-muted-foreground">
              Select the categories and locations you care about and we'll email you the moment
              new auctions are scheduled.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink">
              <li className="flex items-center gap-2"><span className="size-1.5 bg-gold" /> Targeted by category and region</li>
              <li className="flex items-center gap-2"><span className="size-1.5 bg-gold" /> No spam — only auction-related updates</li>
              <li className="flex items-center gap-2"><span className="size-1.5 bg-gold" /> Unsubscribe with one click</li>
            </ul>
          </div>
          <div className="border border-border bg-bone p-6 md:p-8">
            <AuctionAlertForm />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
