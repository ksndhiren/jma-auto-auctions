import { useEffect, useState } from "react";

interface Props {
  to: string; // ISO date
  compact?: boolean;
}

export function Countdown({ to, compact }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return compact ? (
      <span className="font-display text-sm tracking-wider tabular-nums text-ink">--</span>
    ) : (
      <div className="flex items-center gap-2">
        <Unit value={0} label="Days" />
        <Unit value={0} label="Hrs" />
        <Unit value={0} label="Min" />
        <Unit value={0} label="Sec" />
      </div>
    );
  }

  const ms = Math.max(0, new Date(to).getTime() - now);
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);

  if (ms === 0) {
    return <span className="font-display text-sm tracking-wider text-muted-foreground">CLOSED</span>;
  }

  if (compact) {
    return (
      <span className="font-display text-sm tracking-wider tabular-nums text-ink">
        {d}d {String(h).padStart(2, "0")}h {String(m).padStart(2, "0")}m
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Unit value={d} label="Days" />
      <Unit value={h} label="Hrs" />
      <Unit value={m} label="Min" />
      <Unit value={s} label="Sec" />
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-ink px-3 py-2 text-white">
      <span className="font-display text-xl tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/60">{label}</span>
    </div>
  );
}
