import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | JMA Auto Auctions" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <SiteShell>
      <Section size="md">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-sm text-muted-foreground">
            Placeholder content. The final Privacy Policy must be drafted and approved by Jeff
            Martin Auctioneers' legal team before launch.
          </p>
        </div>
      </Section>
    </SiteShell>
  ),
});
