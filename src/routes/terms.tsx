import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions | Aucto Auctions" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <SiteShell>
      <Section size="md">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Terms & Conditions</h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Placeholder content. The final site Terms must be drafted and approved before launch.
            Auction-specific terms apply to each individual sale and are published on the auction
            page.
          </p>
        </div>
      </Section>
    </SiteShell>
  ),
});
