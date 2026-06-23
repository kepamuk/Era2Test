import type { TaskStatus } from "@/entities/generation-task";
import { cn } from "@/shared/lib/utils";

const LABELS: Record<TaskStatus, string> = {
  queued: "В очереди",
  running: "Идёт",
  done: "Готово",
  failed: "Ошибка",
  canceled: "Отменено",
};

const STYLES: Record<TaskStatus, string> = {
  queued: "bg-secondary text-[var(--c-fg-mute)]",
  running: "bg-[var(--c-accent-soft)] text-[var(--c-accent-2)]",
  done: "bg-[var(--queue-status-done-bg)] text-[var(--queue-status-done-fg)]",
  failed: "bg-[var(--queue-status-failed-bg)] text-[var(--queue-status-failed-fg)]",
  canceled: "bg-secondary text-[var(--c-fg-low)]",
};

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-[10px] py-[5px] box-border rounded-sm text-[12px] leading-[16px] font-medium transition-[background-color,color] duration-150 ease-out",
        STYLES[status],
        className,
      )}
    >
      {LABELS[status]}
    </span>
  );
}
