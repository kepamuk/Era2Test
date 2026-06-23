import { cn } from "@/shared/lib/utils";
import type { QueueStats } from "../model/selectors";

const STAT_ITEMS = [
  { key: "queued" as const, label: "В очереди", dot: "bg-[var(--c-fg-mute)]" },
  { key: "running" as const, label: "Идёт", dot: "bg-primary" },
  { key: "done" as const, label: "Готово", dot: "bg-[var(--queue-status-done-dot)]" },
  { key: "failed" as const, label: "Ошибка", dot: "bg-[var(--queue-status-failed-dot)]" },
];

interface QueueStatsProps {
  stats: QueueStats;
}

export function QueueStatsPanel({ stats }: QueueStatsProps) {
  return (
    <div className="grid grid-cols-2 min-[481px]:grid-cols-4 gap-2.5 md:gap-3">
      {STAT_ITEMS.map(({ key, label, dot }) => (
        <div
          key={key}
          className="flex flex-col gap-2 px-[18px] py-4 rounded-[16px] border border-border bg-card shadow-[var(--card-shadow-light)] dark:shadow-none min-w-0"
        >
          <div className="flex items-center gap-2">
            <span className={cn("size-2 rounded-full shrink-0", dot)} />
            <span className="text-[13px] text-[var(--c-fg-mute)] truncate">{label}</span>
          </div>
          <span className="font-mono text-2xl md:text-[28px] font-bold text-foreground tabular-nums leading-none">
            {stats[key]}
          </span>
        </div>
      ))}
    </div>
  );
}
