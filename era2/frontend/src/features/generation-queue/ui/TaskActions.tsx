import { Download, MoreHorizontal, RotateCcw, X } from "lucide-react";
import type { GenerationTask } from "@/entities/generation-task";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

interface TaskActionsProps {
  task: GenerationTask;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  size?: "sm" | "md";
}

export function TaskActions({
  task,
  onCancel,
  onRetry,
  onDownload,
  onDelete,
  size = "md",
}: TaskActionsProps) {
  const iconSize = size === "sm" ? "size-[34px]" : "size-8";

  const primaryAction = (() => {
    if (task.status === "running" || task.status === "queued") {
      return (
        <Button
          variant="ghost"
          size="icon"
          className={cn(iconSize, "rounded-sm border border-border bg-secondary shrink-0")}
          onClick={() => onCancel(task.id)}
          aria-label="Отменить"
        >
          <X className="size-[14px] text-[var(--c-fg-mute)]" strokeWidth={1.75} />
        </Button>
      );
    }
    if (task.status === "failed" || task.status === "canceled") {
      return (
        <Button
          variant="ghost"
          size="icon"
          className={cn(iconSize, "rounded-sm border border-border bg-secondary shrink-0")}
          onClick={() => onRetry(task.id)}
          aria-label="Повторить"
        >
          <RotateCcw className="size-[14px] text-[var(--c-accent-2)]" strokeWidth={1.75} />
        </Button>
      );
    }
    if (task.status === "done") {
      return (
        <Button
          variant="ghost"
          size="icon"
          className={cn(iconSize, "rounded-sm border border-border bg-secondary shrink-0")}
          onClick={() => onDownload(task.id)}
          aria-label="Скачать"
        >
          <Download className="size-[14px] text-[var(--c-accent-2)]" strokeWidth={1.75} />
        </Button>
      );
    }
    return null;
  })();

  return (
    <div className="flex items-center gap-[6px] shrink-0">
      {primaryAction}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(iconSize, "rounded-sm border border-border bg-secondary shrink-0")}
            aria-label="Ещё"
          >
            <MoreHorizontal className="size-[14px] text-[var(--c-fg-mute)]" strokeWidth={1.75} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[160px]">
          {(task.status === "failed" || task.status === "canceled") && (
            <DropdownMenuItem onClick={() => onRetry(task.id)}>Повторить</DropdownMenuItem>
          )}
          {task.status === "done" && (
            <DropdownMenuItem onClick={() => onDownload(task.id)}>Скачать</DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
