import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

export function ProcessTimeline({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("space-y-px", className)}>
      {steps.map((s, i) => (
        <li key={i} className="group relative grid grid-cols-[auto_1fr] gap-6 border-t border-border py-6 first:border-t-0">
          <div className="flex items-start gap-4">
            <span className="font-display text-3xl text-gold tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
