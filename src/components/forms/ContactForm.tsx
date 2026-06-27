import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Cta } from "@/components/ui/cta";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2 } from "lucide-react";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  topic: "general",
  message: "",
  consent: false,
};

export function ContactForm() {
  const [data, setData] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!data.name) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Valid email required";
    if (!data.message) e.message = "Required";
    if (!data.consent) e.consent = "Please acknowledge";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    trackEvent("contact_auction_specialist", { topic: data.topic });
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="border border-gold bg-bone p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" />
        <h3 className="mt-3 font-display text-xl text-ink">Thank you</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We received your message and will follow up within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <Input id="name" value={data.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field id="company" label="Company">
          <Input id="company" value={data.company} onChange={(e) => update("company", e.target.value)} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field id="phone" label="Telephone">
          <Input id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
      </div>
      <Field id="topic" label="Department">
        <select
          id="topic"
          value={data.topic}
          onChange={(e) => update("topic", e.target.value)}
          className="h-10 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <option value="general">General Enquiry</option>
          <option value="buyer">Buyer Assistance</option>
          <option value="seller">Seller Consultation</option>
          <option value="auction">Auction-Specific Support</option>
          <option value="press">Press & Media</option>
        </select>
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <Textarea id="message" rows={5} value={data.message} onChange={(e) => update("message", e.target.value)} />
      </Field>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 size-4 accent-gold"
        />
        <span className="text-muted-foreground">
          I agree to be contacted by JMA Auto Auctions. See our{" "}
          <a href="/privacy" className="underline hover:text-gold-dark">Privacy Policy</a>.
        </span>
      </label>
      {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
      <Cta size="md" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Cta>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
