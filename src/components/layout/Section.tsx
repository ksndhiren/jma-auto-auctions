import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "ink" | "bone";
  size?: "sm" | "md" | "lg";
  id?: string;
}

const tones = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  bone: "bg-bone text-foreground",
  ink: "bg-ink text-white",
};

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export function Section({ children, className, tone = "default", size = "md", id }: SectionProps) {
  return (
    <section id={id} className={cn(tones[tone], sizes[size], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light";
}

export function Eyebrow({ children, className, tone = "default" }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="block h-px w-8 bg-gold" />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.2em]",
          tone === "light" ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {children}
      </span>
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl md:text-5xl",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            tone === "light" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
