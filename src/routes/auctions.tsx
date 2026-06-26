import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Section, Eyebrow } from "@/components/layout/Section";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { Cta } from "@/components/ui/cta";
import { Input } from "@/components/ui/input";
import { auctions, categories } from "@/data/mock";
import type { AuctionStatus, AuctionType } from "@/data/types";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/auctions")({
  head: () => ({
    meta: [
      { title: "Auctions — Browse Current & Upcoming | Aucto Auctions" },
      { name: "description", content: "Discover current and upcoming auctions across construction, transport, industrial, and agricultural assets." },
      { property: "og:title", content: "Browse Auctions | Aucto Auctions" },
      { property: "og:description", content: "Live, online, and hybrid auctions managed by Jeff Martin Auctioneers." },
    ],
  }),
  component: AuctionsPage,
});

const STATUSES: { value: AuctionStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "live_today", label: "Live Today" },
  { value: "closing_soon", label: "Closing Soon" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

const TYPES: { value: AuctionType | "all"; label: string }[] = [
  { value: "all", label: "All formats" },
  { value: "live", label: "Live" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid" },
];

function AuctionsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<AuctionStatus | "all">("all");
  const [type, setType] = useState<AuctionType | "all">("all");
  const [cat, setCat] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return auctions.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (type !== "all" && a.type !== type) return false;
      if (cat !== "all" && !a.categories.includes(cat)) return false;
      if (q && !`${a.title} ${a.location} ${a.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, status, type, cat]);

  const clearAll = () => {
    setQ(""); setStatus("all"); setType("all"); setCat("all");
  };
  const activeCount =
    (status !== "all" ? 1 : 0) + (type !== "all" ? 1 : 0) + (cat !== "all" ? 1 : 0) + (q ? 1 : 0);

  return (
    <SiteShell>
      <section className="border-b border-border bg-bone py-14 md:py-20">
        <div className="container-x">
          <Eyebrow>Auctions</Eyebrow>
          <h1 className="mt-4 font-display text-4xl text-ink md:text-6xl">Find your next auction.</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Live, online, and hybrid sales across the categories we know best — all managed by Jeff Martin Auctioneers.
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => { setQ(e.target.value); trackEvent("search_auction_inventory", { q: e.target.value }); }}
                placeholder="Search auctions, locations, descriptions…"
                className="h-12 rounded-none border-border bg-background pl-10 text-base"
                aria-label="Search auctions"
              />
            </div>
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex h-12 items-center justify-center gap-2 border border-border bg-background px-5 text-sm font-semibold uppercase tracking-[0.12em] text-ink hover:border-ink lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
          </div>
        </div>
      </section>

      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              status={status} setStatus={setStatus}
              type={type} setType={setType}
              cat={cat} setCat={setCat}
              clearAll={clearAll}
              activeCount={activeCount}
            />
          </aside>

          <div>
            <div className="mb-6 flex items-baseline justify-between border-b border-border pb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-display text-lg text-ink">{filtered.length}</span> auction{filtered.length === 1 ? "" : "s"}
              </p>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:text-gold-dark">
                  Clear all
                </button>
              )}
            </div>
            {filtered.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((a) => <AuctionCard key={a.id} auction={a} />)}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between border-b border-border p-4">
            <p className="font-display text-lg">Filters</p>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid size-9 place-items-center">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <FilterPanel
              status={status} setStatus={setStatus}
              type={type} setType={setType}
              cat={cat} setCat={setCat}
              clearAll={clearAll}
              activeCount={activeCount}
            />
          </div>
          <div className="border-t border-border p-4">
            <Cta onClick={() => setFiltersOpen(false)} variant="dark" size="md" withArrow={false} className="w-full">
              Show {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </Cta>
          </div>
        </div>
      )}
    </SiteShell>
  );
}

function FilterPanel({
  status, setStatus, type, setType, cat, setCat, clearAll, activeCount,
}: any) {
  return (
    <div className="space-y-8">
      <FilterGroup label="Status">
        <div className="space-y-1.5">
          {STATUSES.map((s) => (
            <RadioRow key={s.value} checked={status === s.value} onChange={() => { setStatus(s.value); trackEvent("apply_auction_filter", { status: s.value }); }} label={s.label} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Format">
        <div className="space-y-1.5">
          {TYPES.map((t) => (
            <RadioRow key={t.value} checked={type === t.value} onChange={() => setType(t.value)} label={t.label} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Category">
        <div className="space-y-1.5">
          <RadioRow checked={cat === "all"} onChange={() => setCat("all")} label="All categories" />
          {categories.map((c) => (
            <RadioRow key={c.slug} checked={cat === c.slug} onChange={() => setCat(c.slug)} label={c.name} />
          ))}
        </div>
      </FilterGroup>
      {activeCount > 0 && (
        <button onClick={clearAll} className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </div>
  );
}

function RadioRow({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm text-foreground hover:text-ink">
      <input type="radio" checked={checked} onChange={onChange} className="size-4 accent-gold" />
      {label}
    </label>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="border border-dashed border-border bg-bone p-12 text-center">
      <p className="font-display text-2xl text-ink">No auctions match your filters.</p>
      <p className="mt-2 text-sm text-muted-foreground">Try broadening your search or clearing filters.</p>
      <div className="mt-6">
        <Cta variant="dark" onClick={onClear} withArrow={false}>Clear filters</Cta>
      </div>
    </div>
  );
}
