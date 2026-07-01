import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cta } from "@/components/ui/cta";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/mock";

const STEPS = ["Contact", "Assets", "Details"] as const;

interface FormData {
  // contact
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone";
  // assets
  category: string;
  assetCount: string;
  location: string;
  manufacturer: string;
  model: string;
  year: string;
  condition: string;
  // details
  timeframe: string;
  estValue: string;
  description: string;
  preferredFormat: "online" | "live" | "hybrid" | "open";
  source: string;
  files: File[];
  consent: boolean;
}

const initial: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  preferredContact: "email",
  category: "",
  assetCount: "",
  location: "",
  manufacturer: "",
  model: "",
  year: "",
  condition: "",
  timeframe: "",
  estValue: "",
  description: "",
  preferredFormat: "open",
  source: "",
  files: [],
  consent: false,
};

export function SellerEnquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return data.name && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    if (step === 1) return data.category && data.assetCount;
    return data.consent;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      if (canAdvance()) {
        if (step === 0) trackEvent("start_seller_enquiry");
        setStep(step + 1);
      }
      return;
    }
    if (!canAdvance()) return;
    setStatus("loading");
    trackEvent("submit_seller_enquiry", { category: data.category });
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="border border-gold bg-bone p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-gold" />
        <h3 className="mt-4 font-display text-2xl text-ink">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          An auction specialist from Jeff Martin Auctioneers will be in touch within one business
          day to discuss your assets.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-background">
      {/* Progress */}
      <div className="flex border-b border-border">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={cn(
              "flex-1 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              i === step
                ? "bg-ink text-white"
                : i < step
                  ? "bg-gold/20 text-ink"
                  : "bg-bone text-muted-foreground",
            )}
          >
            <span className="mr-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-5 p-6 md:p-8" noValidate>
        {step === 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Full name *">
                <Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} />
              </Field>
              <Field id="company" label="Company">
                <Input id="company" value={data.company} onChange={(e) => update("company", e.target.value)} />
              </Field>
              <Field id="email" label="Email *">
                <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
              </Field>
              <Field id="phone" label="Phone">
                <Input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
              </Field>
            </div>
            <Field id="pc" label="Preferred contact method">
              <div className="flex gap-3">
                {(["email", "phone"] as const).map((m) => (
                  <label key={m} className="flex flex-1 cursor-pointer items-center gap-2 border border-border bg-bone px-4 py-2.5 text-sm capitalize transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-white">
                    <input
                      type="radio"
                      name="pc"
                      value={m}
                      checked={data.preferredContact === m}
                      onChange={() => update("preferredContact", m)}
                      className="sr-only"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="category" label="Asset category *">
                <select
                  id="category"
                  value={data.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="h-10 w-full border border-input bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <option value="">Select…</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field id="count" label="Number of assets *">
                <Input id="count" value={data.assetCount} onChange={(e) => update("assetCount", e.target.value)} placeholder="e.g. 12" />
              </Field>
              <Field id="loc" label="Asset location">
                <Input id="loc" value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="City, State" />
              </Field>
              <Field id="mfg" label="Primary manufacturer">
                <Input id="mfg" value={data.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} />
              </Field>
              <Field id="model" label="Model">
                <Input id="model" value={data.model} onChange={(e) => update("model", e.target.value)} />
              </Field>
              <Field id="year" label="Year">
                <Input id="year" value={data.year} onChange={(e) => update("year", e.target.value)} />
              </Field>
            </div>
            <Field id="condition" label="Condition">
              <Input id="condition" value={data.condition} onChange={(e) => update("condition", e.target.value)} placeholder="Operational, parts only, etc." />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="timeframe" label="Desired timeframe">
                <select
                  id="timeframe"
                  value={data.timeframe}
                  onChange={(e) => update("timeframe", e.target.value)}
                  className="h-10 w-full border border-input bg-white px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <option value="">Select…</option>
                  <option value="asap">As soon as possible</option>
                  <option value="30">Within 30 days</option>
                  <option value="60">30–60 days</option>
                  <option value="90">60–90 days</option>
                  <option value="flexible">Flexible</option>
                </select>
              </Field>
              <Field id="value" label="Estimated value (optional)">
                <Input id="value" value={data.estValue} onChange={(e) => update("estValue", e.target.value)} placeholder="USD range" />
              </Field>
            </div>
            <Field id="format" label="Preferred auction format">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(["open", "online", "live", "hybrid"] as const).map((f) => (
                  <label key={f} className="cursor-pointer border border-border bg-bone px-3 py-2 text-center text-xs capitalize transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-white">
                    <input
                      type="radio"
                      name="format"
                      value={f}
                      checked={data.preferredFormat === f}
                      onChange={() => update("preferredFormat", f)}
                      className="sr-only"
                    />
                    {f === "open" ? "Open to recommendation" : f}
                  </label>
                ))}
              </div>
            </Field>
            <Field id="desc" label="Additional details">
              <Textarea id="desc" rows={4} value={data.description} onChange={(e) => update("description", e.target.value)} />
            </Field>
            <Field id="files" label="Asset photographs / inventory (optional)">
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-border-strong bg-bone p-4 text-sm text-muted-foreground hover:border-gold">
                <Upload className="size-5 text-gold" />
                <span>
                  {data.files.length > 0
                    ? `${data.files.length} file${data.files.length > 1 ? "s" : ""} selected`
                    : "Click to upload images, PDFs, or spreadsheets"}
                </span>
                <input
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={(e) => update("files", Array.from(e.target.files ?? []))}
                />
              </label>
            </Field>
            <Field id="source" label="How did you hear about us?">
              <Input id="source" value={data.source} onChange={(e) => update("source", e.target.value)} />
            </Field>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 size-4 accent-gold"
              />
              <span className="text-muted-foreground">
                I consent to being contacted regarding my enquiry and acknowledge the{" "}
                <a href="/privacy" className="underline hover:text-gold-dark">Privacy Policy</a>.
              </span>
            </label>
          </>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-ink disabled:opacity-30"
          >
            ‹ Back
          </button>
          <Cta size="md" type="submit" disabled={!canAdvance() || status === "loading"}>
            {step === STEPS.length - 1
              ? status === "loading"
                ? "Submitting..."
                : "Submit Enquiry"
              : "Continue"}
          </Cta>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
        {label}
      </Label>
      {children}
    </div>
  );
}
