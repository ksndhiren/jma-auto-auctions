import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const STORAGE_KEY = "jma-cookie-consent-v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setVisible(stored == null);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "dismissed") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage failures and still hide the banner for the current session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-5xl border border-black/12 bg-white shadow-[0_18px_60px_-22px_rgba(0,0,0,0.35)] pointer-events-auto">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between md:p-5">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Cookie Notice
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/72">
              We use essential site cookies and privacy-safe measurement to keep the auction
              experience reliable. By continuing, you agree to our{" "}
              <Link to="/privacy" className="font-semibold text-ink underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => persist("dismissed")}
              className="inline-flex min-h-11 items-center justify-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-black hover:text-white"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={() => persist("accepted")}
              className="inline-flex min-h-11 items-center justify-center bg-gold px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-gold-dark"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
