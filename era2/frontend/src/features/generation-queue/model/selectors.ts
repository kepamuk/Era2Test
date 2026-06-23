import type { GenerationTask, TaskStatus } from "@/entities/generation-task";
import type { QueueState } from "./queueReducer";

const STATUS_ORDER: Record<TaskStatus, number> = {
  running: 0,
  queued: 1,
  failed: 2,
  canceled: 3,
  done: 4,
};

export interface QueueStats {
  queued: number;
  running: number;
  done: number;
  failed: number;
}

export function selectStats(tasks: GenerationTask[]): QueueStats {
  return tasks.reduce<QueueStats>(
    (acc, task) => {
      if (task.status === "queued") acc.queued += 1;
      if (task.status === "running") acc.running += 1;
      if (task.status === "done") acc.done += 1;
      if (task.status === "failed") acc.failed += 1;
      return acc;
    },
    { queued: 0, running: 0, done: 0, failed: 0 },
  );
}

export function selectActiveTasks(tasks: GenerationTask[]): GenerationTask[] {
  return tasks
    .filter((t) => t.status === "running" || t.status === "queued")
    .sort((a, b) => {
      if (a.status === "running" && b.status !== "running") return -1;
      if (b.status === "running" && a.status !== "running") return 1;
      return a.createdAt - b.createdAt;
    });
}

export function selectAverageProgress(tasks: GenerationTask[]): number {
  const active = selectActiveTasks(tasks);
  if (active.length === 0) return 0;
  const sum = active.reduce((acc, t) => acc + (t.status === "running" ? t.progress : 0), 0);
  const runningCount = active.filter((t) => t.status === "running").length;
  if (runningCount === 0) return 0;
  return Math.round(sum / runningCount);
}

export function selectFilteredTasks(state: QueueState): GenerationTask[] {
  const query = state.search.trim().toLowerCase();

  let result = state.tasks.filter((task) => {
    if (state.filter !== "all" && task.status !== state.filter) return false;
    if (state.typeFilter !== "all" && task.type !== state.typeFilter) return false;
    if (query && !task.prompt.toLowerCase().includes(query)) return false;
    return true;
  });

  result = [...result].sort((a, b) => {
    switch (state.sort) {
      case "oldest":
        return a.createdAt - b.createdAt;
      case "status":
        return STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.createdAt - a.createdAt;
      case "progress":
        return b.progress - a.progress || b.createdAt - a.createdAt;
      case "newest":
      default:
        return b.createdAt - a.createdAt;
    }
  });

  return result;
}

export function selectHasActiveGenerations(tasks: GenerationTask[]): boolean {
  return tasks.some((t) => t.status === "running" || t.status === "queued");
}

export function selectActiveCount(tasks: GenerationTask[]): number {
  return tasks.filter((t) => t.status === "running" || t.status === "queued").length;
}
