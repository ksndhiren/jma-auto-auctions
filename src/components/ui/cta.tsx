import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "dark" | "outline" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/cta inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap text-center leading-none font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-black hover:bg-gold-dark",
  dark: "bg-ink text-white hover:bg-gold hover:text-black",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/40 text-white hover:bg-white hover:text-black",
  ghost: "text-ink hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-7 py-4 text-sm",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkProps = BaseProps & { to: string; href?: never } & Omit<ComponentProps<typeof Link>, "to" | "className" | "children">;
type AnchorProps = BaseProps & { href: string; to?: never } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type ButtonProps = BaseProps & { to?: never; href?: never } & Omit<ComponentProps<"button">, "className" | "children">;

export type CtaProps = LinkProps | AnchorProps | ButtonProps;

export function Cta(props: CtaProps) {
  const {
    variant = "gold",
    size = "md",
    withArrow = true,
    children,
    className,
    ...rest
  } = props as BaseProps & { to?: string; href?: string };

  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {withArrow && (
        <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
      )}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls} {...(rest as Record<string, unknown>)}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={cls} {...(rest as Record<string, unknown>)}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as Record<string, unknown>)}>
      {inner}
    </button>
  );
}
