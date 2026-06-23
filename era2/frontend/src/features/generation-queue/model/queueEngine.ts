import type { Dispatch } from "react";
import type { GenType, GenerationTask } from "@/entities/generation-task";
import {
  countRunningTasks,
  FAIL_MESSAGES,
  MAX_CONCURRENT,
  pickNextQueuedTask,
  type QueueAction,
} from "./queueReducer";

export { MAX_CONCURRENT };
export const TASK_FAIL_CHANCE = 0.15;

const TYPE_SPEED: Record<GenType, { minStep: number; maxStep: number; tickMin: number; tickMax: number }> = {
  text: { minStep: 8, maxStep: 18, tickMin: 400, tickMax: 600 },
  image: { minStep: 6, maxStep: 14, tickMin: 450, tickMax: 650 },
  video: { minStep: 2, maxStep: 7, tickMin: 550, tickMax: 750 },
  audio: { minStep: 3, maxStep: 8, tickMin: 500, tickMax: 700 },
};

export function getProgressStep(type: GenType): number {
  const { minStep, maxStep } = TYPE_SPEED[type];
  return minStep + Math.random() * (maxStep - minStep);
}

export function getTickDelay(type: GenType): number {
  const { tickMin, tickMax } = TYPE_SPEED[type];
  return tickMin + Math.random() * (tickMax - tickMin);
}

export function planFailureThreshold(): number | null {
  if (Math.random() >= TASK_FAIL_CHANCE) return null;
  return Math.round(15 + Math.random() * 70);
}

export function pickFailMessage(): string {
  return FAIL_MESSAGES[Math.floor(Math.random() * FAIL_MESSAGES.length)];
}

interface EngineOptions {
  dispatch: Dispatch<QueueAction>;
  getTasks: () => GenerationTask[];
}

export function createQueueEngine({ dispatch, getTasks }: EngineOptions) {
  const taskTimers = new Map<string, ReturnType<typeof setTimeout>>();
  const failureThresholds = new Map<string, number | null>();
  let slotTimer: ReturnType<typeof setInterval> | null = null;

  function clearFailurePlan(id: string) {
    failureThresholds.delete(id);
  }

  function getFailureThreshold(taskId: string): number | null {
    if (!failureThresholds.has(taskId)) {
      failureThresholds.set(taskId, planFailureThreshold());
    }
    return failureThresholds.get(taskId) ?? null;
  }

  function clearTaskTimer(id: string) {
    const timer = taskTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      taskTimers.delete(id);
    }
  }

  function clearAllTaskTimers() {
    taskTimers.forEach((timer) => clearTimeout(timer));
    taskTimers.clear();
  }

  function failTask(id: string) {
    clearTaskTimer(id);
    clearFailurePlan(id);
    dispatch({ type: "FAIL_TASK", id, error: pickFailMessage() });
    fillSlots();
  }

  function scheduleProgressTick(task: GenerationTask) {
    clearTaskTimer(task.id);
    getFailureThreshold(task.id);

    const delay = getTickDelay(task.type);
    const timer = setTimeout(() => {
      const current = getTasks().find((t) => t.id === task.id);
      if (!current || current.status !== "running") return;

      const nextProgress = Math.min(100, current.progress + getProgressStep(task.type));
      const failAt = getFailureThreshold(task.id);

      if (failAt !== null && nextProgress >= failAt) {
        failTask(task.id);
        return;
      }

      if (nextProgress >= 100) {
        clearTaskTimer(task.id);
        clearFailurePlan(task.id);
        const duration = Math.round((Date.now() - current.updatedAt) / 1000) + 5;
        dispatch({ type: "COMPLETE_TASK", id: task.id, durationSeconds: duration });
        fillSlots();
        return;
      }

      dispatch({ type: "UPDATE_PROGRESS", id: task.id, progress: Math.round(nextProgress) });
      scheduleProgressTick(current);
    }, delay);

    taskTimers.set(task.id, timer);
  }

  function fillSlots() {
    let running = countRunningTasks(getTasks());

    while (running < MAX_CONCURRENT) {
      const next = pickNextQueuedTask(getTasks());
      if (!next) break;

      dispatch({ type: "PROMOTE_TO_RUNNING", id: next.id });
      const updated = getTasks().find((t) => t.id === next.id);
      if (updated) scheduleProgressTick(updated);

      running += 1;
    }
  }

  function syncRunningTasks() {
    const tasks = getTasks();
    const runningTasks = tasks.filter((t) => t.status === "running");

    runningTasks.forEach((task) => {
      if (!taskTimers.has(task.id)) {
        scheduleProgressTick(task);
      }
    });

    taskTimers.forEach((_, id) => {
      const task = tasks.find((t) => t.id === id);
      if (!task || task.status !== "running") {
        clearTaskTimer(id);
      }
    });
  }

  function start() {
    fillSlots();
    syncRunningTasks();
    slotTimer = setInterval(() => {
      fillSlots();
      syncRunningTasks();
    }, 800);
  }

  function stop() {
    if (slotTimer) {
      clearInterval(slotTimer);
      slotTimer = null;
    }
    clearAllTaskTimers();
  }

  function stopTaskProgress(id: string) {
    clearTaskTimer(id);
    clearFailurePlan(id);
  }

  function cancelTask(id: string) {
    clearTaskTimer(id);
    clearFailurePlan(id);
    dispatch({ type: "CANCEL_TASK", id });
    fillSlots();
  }

  return { start, stop, cancelTask, stopTaskProgress, fillSlots };
}

export type QueueEngine = ReturnType<typeof createQueueEngine>;
