import type { GenerationTask } from "@/entities/generation-task";
import { cn } from "@/shared/lib/utils";
import { formatQueueMeta } from "../lib/formatEta";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";
import { TaskActions } from "./TaskActions";
import { TaskThumb } from "./TaskThumb";

interface TaskRowProps {
  task: GenerationTask;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskRow({ task, onCancel, onRetry, onDownload, onDelete }: TaskRowProps) {
  const isRunning = task.status === "running";

  return (
    <article
      className={cn(
        "hidden min-[481px]:flex items-center gap-4 px-4 py-[14px] rounded-2xl border bg-card shadow-[var(--card-shadow-light)] dark:shadow-none",
        "transition-[border-color,box-shadow] duration-200 ease-out",
        isRunning ? "border-[var(--queue-running-border)]" : "border-border",
      )}
    >
      <TaskThumb type={task.type} className="rounded-[12px]" />

      <div className="flex-1 min-w-0 flex flex-col gap-[7px]">
        <p className="text-[15px] font-medium text-foreground truncate leading-normal">{task.prompt}</p>
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full bg-secondary shrink-0">
            <span className="size-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-[12px] leading-[16px] font-mono text-[var(--c-fg-dim)]">{task.model}</span>
          </span>
          <span className="text-[12px] text-[var(--c-fg-low)] leading-none">·</span>
          <span className="text-[12px] text-[var(--c-fg-mute)] truncate leading-none">
            {formatQueueMeta(task)}
          </span>
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
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          className={cn(
            "font-mono text-[13px] font-medium tabular-nums leading-none w-[38px] text-right",
            "transition-opacity duration-200 ease-out",
            isRunning ? "text-[var(--c-accent-2)] opacity-100" : "opacity-0",
          )}
          aria-hidden={!isRunning}
        >
          {task.progress}%
        </span>
        <StatusBadge status={task.status} />
        <TaskActions
          task={task}
          onCancel={onCancel}
          onRetry={onRetry}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>
    </article>
  );
}
