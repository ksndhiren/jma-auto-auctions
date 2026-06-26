import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQGroup } from "@/data/types";

export function FAQAccordion({ groups }: { groups: FAQGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.slug}>
          <h3 className="font-display text-xl text-ink">{g.title}</h3>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {g.items.map((it, i) => {
              const id = `${g.slug}-${i}`;
              const isOpen = open === id;
              return (
                <div key={id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-ink">{it.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-gold transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">
                      {it.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
