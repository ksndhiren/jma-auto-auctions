import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cta } from "@/components/ui/cta";
import { trackEvent } from "@/lib/analytics";
import { categories } from "@/data/mock";
import { CheckCircle2 } from "lucide-react";

export function AuctionAlertForm() {
  const [data, setData] = useState({
    first: "",
    last: "",
    email: "",
    interests: [] as string[],
    state: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const toggle = (slug: string) => {
    setData((d) => ({
      ...d,
      interests: d.interests.includes(slug)
        ? d.interests.filter((i) => i !== slug)
        : [...d.interests, slug],
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.email || !data.consent) return;
    setStatus("loading");
    trackEvent("subscribe_auction_alerts", { interests: data.interests });
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="border border-gold bg-bone p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" />
        <h3 className="mt-3 font-display text-xl text-ink">You're on the list</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll email you when new auctions matching your interests are scheduled.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="first" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">First name</Label>
          <Input id="first" value={data.first} onChange={(e) => setData({ ...data, first: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="last" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">Last name</Label>
          <Input id="last" value={data.last} onChange={(e) => setData({ ...data, last: e.target.value })} />
        </div>
      </div>
      <div>
        <Label htmlFor="aa-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">Email *</Label>
        <Input id="aa-email" type="email" required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      </div>
      <fieldset>
        <legend className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">Interests</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setData((d) => ({ ...d, interests: d.interests.length === categories.length ? [] : categories.map((c) => c.slug) }))}
            className="border border-border bg-bone px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink hover:border-ink"
          >
            All Auctions
          </button>
          {categories.map((c) => (
            <label
              key={c.slug}
              className="flex cursor-pointer items-center justify-center border border-border bg-bone px-3 py-2 text-center text-xs transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-white"
            >
              <input
                type="checkbox"
                checked={data.interests.includes(c.slug)}
                onChange={() => toggle(c.slug)}
                className="sr-only"
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <Label htmlFor="aa-state" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">State / region (optional)</Label>
        <Input id="aa-state" value={data.state} onChange={(e) => setData({ ...data, state: e.target.value })} />
      </div>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => setData({ ...data, consent: e.target.checked })}
          className="mt-1 size-4 accent-gold"
        />
        <span className="text-muted-foreground">
          I agree to receive auction alerts from JMA Auto Auctions. Unsubscribe anytime.
        </span>
      </label>
      <Cta size="md" type="submit" disabled={status === "loading" || !data.consent}>
        {status === "loading" ? "Subscribing..." : "Subscribe to Alerts"}
      </Cta>
    </form>
  );
}
