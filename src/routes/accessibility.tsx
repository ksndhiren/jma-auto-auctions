import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility | JMA Auto Auctions" }] }),
  component: () => (
    <SiteShell>
      <Section size="md">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Accessibility</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Accessibility Statement</h1>
          <p className="mt-6 text-muted-foreground">
            JMA Auto Auctions is committed to ensuring digital accessibility for people with
            disabilities. We work to meet WCAG 2.1 AA standards across the site. If you experience
            any difficulty accessing content, please contact us and we will respond promptly.
          </p>
        </div>
      </Section>
    </SiteShell>
  ),
});
