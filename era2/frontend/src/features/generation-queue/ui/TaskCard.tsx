import type { GenerationTask } from "@/entities/generation-task";
import { cn } from "@/shared/lib/utils";
import { formatQueueMeta } from "../lib/formatEta";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { TaskActions } from "./TaskActions";
import { TaskThumb } from "./TaskThumb";

interface TaskCardProps {
  task: GenerationTask;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onCancel, onRetry, onDownload, onDelete }: TaskCardProps) {
  const isRunning = task.status === "running";

  return (
    <article
      className={cn(
        "max-[480px]:flex min-[481px]:hidden flex-col gap-3 p-3.5 rounded-2xl border bg-card shadow-[var(--card-shadow-light)] dark:shadow-none",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        isRunning ? "border-[var(--queue-running-border)]" : "border-border",
      )}
    >
      <div className="flex gap-3 items-start">
        <TaskThumb type={task.type} size={48} />
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <p className="text-[15px] font-medium text-foreground line-clamp-2">{task.prompt}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary text-xs font-mono text-[var(--c-fg-dim)]">
              <span className="size-1.5 rounded-full bg-primary shrink-0" />
              {task.model}
            </span>
            <span className="text-xs text-[var(--c-fg-mute)]">{formatQueueMeta(task)}</span>
          </div>
        </div>
      </div>

      <div className="h-[5px] w-full">
        <ProgressBar
          value={task.progress}
          className={cn(
            "transition-opacity duration-200 ease-out",
            isRunning ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusBadge status={task.status} />
          <span
            className={cn(
              "font-mono text-sm font-medium tabular-nums",
              "transition-opacity duration-200 ease-out",
              isRunning ? "text-[var(--c-accent-2)] opacity-100" : "opacity-0 w-0 overflow-hidden",
            )}
            aria-hidden={!isRunning}
          >
            {task.progress}%
          </span>
        </div>
        <TaskActions
          task={task}
          onCancel={onCancel}
          onRetry={onRetry}
          onDownload={onDownload}
          onDelete={onDelete}
          size="sm"
        />
      </div>
    </article>
  );
}
