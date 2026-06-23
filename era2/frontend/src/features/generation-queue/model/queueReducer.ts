import type { GenerationTask, GenType, TaskStatus } from "@/entities/generation-task";

export type StatusFilter = TaskStatus | "all";
export type TypeFilter = GenType | "all";
export type SortOption = "newest" | "oldest" | "status" | "progress";
export type LoadStatus = "idle" | "loading" | "ready" | "error";

export interface QueueState {
  tasks: GenerationTask[];
  loadStatus: LoadStatus;
  filter: StatusFilter;
  typeFilter: TypeFilter;
  sort: SortOption;
  search: string;
}

export type QueueAction =
  | { type: "INIT_START" }
  | { type: "INIT_SUCCESS"; tasks: GenerationTask[] }
  | { type: "INIT_ERROR" }
  | { type: "SET_FILTER"; filter: StatusFilter }
  | { type: "SET_TYPE_FILTER"; typeFilter: TypeFilter }
  | { type: "SET_SORT"; sort: SortOption }
  | { type: "SET_SEARCH"; search: string }
  | { type: "PROMOTE_TO_RUNNING"; id: string }
  | { type: "UPDATE_PROGRESS"; id: string; progress: number }
  | { type: "COMPLETE_TASK"; id: string; durationSeconds?: number }
  | { type: "FAIL_TASK"; id: string; error: string }
  | { type: "CANCEL_TASK"; id: string }
  | { type: "RETRY_TASK"; id: string }
  | { type: "DELETE_TASK"; id: string }
  | { type: "CLEAR_DONE" }
  | { type: "RESTORE_TASKS"; tasks: GenerationTask[] };

export const FAIL_MESSAGES = [
  "Недостаточно кредитов",
  "Превышено время ожидания",
  "Модель временно недоступна",
] as const;

export const MAX_CONCURRENT = 2;

export const initialQueueState: QueueState = {
  tasks: [],
  loadStatus: "idle",
  filter: "all",
  typeFilter: "all",
  sort: "newest",
  search: "",
};

function touch(task: GenerationTask): GenerationTask {
  return { ...task, updatedAt: Date.now() };
}

function taskKey(task: Pick<GenerationTask, "id" | "createdAt">): string {
  return `${task.id}:${task.createdAt}`;
}

function recomputeQueuePositions(tasks: GenerationTask[]): GenerationTask[] {
  const queuedOrdered = tasks
    .filter((t) => t.status === "queued")
    .sort((a, b) => a.createdAt - b.createdAt);

  const positionByKey = new Map(
    queuedOrdered.map((task, index) => [taskKey(task), index + 1]),
  );

  return tasks.map((task) => {
    if (task.status !== "queued") {
      const { queuePosition, ...rest } = task;
      return rest as GenerationTask;
    }
    return { ...task, queuePosition: positionByKey.get(taskKey(task)) ?? 1 };
  });
}

export function ensureUniqueTaskIds(tasks: GenerationTask[]): GenerationTask[] {
  const seen = new Map<string, number>();

  return tasks.map((task) => {
    const count = seen.get(task.id) ?? 0;
    seen.set(task.id, count + 1);
    if (count === 0) return task;
    return { ...task, id: `${task.id}~${count + 1}` };
  });
}

export function enforceMaxConcurrent(tasks: GenerationTask[]): GenerationTask[] {
  const keepRunning = new Set(
    tasks
      .filter((task) => task.status === "running")
      .sort((a, b) => a.createdAt - b.createdAt)
      .slice(0, MAX_CONCURRENT)
      .map(taskKey),
  );

  const normalized = tasks.map((task) => {
    if (task.status !== "running" || keepRunning.has(taskKey(task))) {
      return task;
    }

    return touch({
      ...task,
      status: "queued",
      progress: 0,
      error: undefined,
    });
  });

  return recomputeQueuePositions(normalized);
}

export function normalizeTasks(tasks: GenerationTask[]): GenerationTask[] {
  return enforceMaxConcurrent(recomputeQueuePositions(ensureUniqueTaskIds(tasks)));
}

export function normalizeRestoredTasks(tasks: GenerationTask[]): GenerationTask[] {
  const normalized = tasks.map((task) => {
    if (task.status === "running") {
      return touch({
        ...task,
        status: "queued",
        progress: 0,
        error: undefined,
      });
    }
    return task;
  });
  return normalizeTasks(normalized);
}

export function countRunningTasks(tasks: GenerationTask[]): number {
  return tasks.filter((t) => t.status === "running").length;
}

export function pickNextQueuedTask(tasks: GenerationTask[]): GenerationTask | undefined {
  return tasks
    .filter((t) => t.status === "queued")
    .sort((a, b) => a.createdAt - b.createdAt)[0];
}

export function queueReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case "INIT_START":
      return { ...state, loadStatus: "loading" };

    case "INIT_SUCCESS":
      return {
        ...state,
        tasks: normalizeTasks(action.tasks),
        loadStatus: "ready",
      };

    case "INIT_ERROR":
      return { ...state, loadStatus: "error" };

    case "SET_FILTER":
      return { ...state, filter: action.filter };

    case "SET_TYPE_FILTER":
      return { ...state, typeFilter: action.typeFilter };

    case "SET_SORT":
      return { ...state, sort: action.sort };

    case "SET_SEARCH":
      return { ...state, search: action.search };

    case "PROMOTE_TO_RUNNING": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id
          ? touch({ ...task, status: "running", progress: 0, error: undefined })
          : task,
      );
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "UPDATE_PROGRESS": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id
          ? touch({ ...task, progress: Math.min(100, action.progress) })
          : task,
      );
      return { ...state, tasks };
    }

    case "COMPLETE_TASK": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id
          ? touch({
              ...task,
              status: "done",
              progress: 100,
              durationSeconds: action.durationSeconds ?? task.durationSeconds,
              error: undefined,
            })
          : task,
      );
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "FAIL_TASK": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id
          ? touch({ ...task, status: "failed", error: action.error })
          : task,
      );
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "CANCEL_TASK": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id ? touch({ ...task, status: "canceled" }) : task,
      );
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "RETRY_TASK": {
      const tasks = state.tasks.map((task) =>
        task.id === action.id
          ? touch({
              ...task,
              status: "queued",
              progress: 0,
              error: undefined,
              durationSeconds: undefined,
            })
          : task,
      );
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "DELETE_TASK": {
      const tasks = state.tasks.filter((task) => task.id !== action.id);
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "CLEAR_DONE": {
      const tasks = state.tasks.filter((task) => task.status !== "done");
      return { ...state, tasks: recomputeQueuePositions(tasks) };
    }

    case "RESTORE_TASKS":
      return { ...state, tasks: normalizeTasks(action.tasks) };

    default:
      return state;
  }
}
