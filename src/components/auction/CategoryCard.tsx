import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.slug }}
      className="group relative block aspect-[4/5] overflow-hidden bg-ink"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
          {category.activeAuctions ?? 0} Active Auctions
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{category.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
          Explore <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}
