import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Cta } from "@/components/ui/cta";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface Props {
  variant?: "light" | "dark";
}

export function NewsletterForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    trackEvent("subscribe_auction_alerts", { source: "footer" });
    // Placeholder submit
    await new Promise((r) => setTimeout(r, 700));
    setState("success");
    setEmail("");
  };

  if (state === "success") {
    return (
      <p className={cn("text-sm", variant === "dark" ? "text-gold" : "text-success")}>
        Subscribed. Check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
      <Input
        type="email"
        required
        aria-label="Email address"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn(
          "h-11 rounded-none border-0 px-3",
          variant === "dark"
            ? "bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-gold"
            : "bg-bone text-ink",
        )}
      />
      <Cta variant={variant === "dark" ? "gold" : "dark"} size="sm" withArrow={false}>
        {state === "loading" ? "..." : "Subscribe"}
      </Cta>
      {state === "error" && (
        <span className="sr-only" role="alert">
          Please enter a valid email address.
        </span>
      )}
    </form>
  );
}
