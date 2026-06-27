import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.slug }}
      className="group block border border-black/10 bg-white p-6 transition-all hover:border-black"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
        {category.activeAuctions ?? 0} Active Auctions
      </p>
      <h3 className="mt-3 font-display text-2xl leading-tight text-ink">{category.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink group-hover:text-gold-dark">
        Explore <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}
