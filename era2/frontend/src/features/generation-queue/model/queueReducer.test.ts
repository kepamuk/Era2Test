import { describe, expect, it } from "vitest";
import type { GenerationTask } from "@/entities/generation-task";
import {
  countRunningTasks,
  ensureUniqueTaskIds,
  enforceMaxConcurrent,
  initialQueueState,
  pickNextQueuedTask,
  queueReducer,
} from "./queueReducer";

function makeTask(overrides: Partial<GenerationTask> & Pick<GenerationTask, "id">): GenerationTask {
  const now = Date.now();
  return {
    type: "text",
    prompt: "test",
    model: "GPT-4o",
    status: "queued",
    progress: 0,
    credits: 10,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("queueReducer", () => {
  it("promotes task to running", () => {
    const tasks = [makeTask({ id: "1" })];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "PROMOTE_TO_RUNNING", id: "1" },
    );
    expect(state.tasks[0].status).toBe("running");
    expect(state.tasks[0].progress).toBe(0);
  });

  it("promote resets progress after retry", () => {
    let state = queueReducer(
      {
        ...initialQueueState,
        tasks: [makeTask({ id: "1", status: "failed", progress: 64, error: "err" })],
        loadStatus: "ready",
      },
      { type: "RETRY_TASK", id: "1" },
    );
    state = queueReducer(state, { type: "PROMOTE_TO_RUNNING", id: "1" });
    expect(state.tasks[0].status).toBe("running");
    expect(state.tasks[0].progress).toBe(0);
  });

  it("completes task with 100 progress", () => {
    const tasks = [makeTask({ id: "1", status: "running", progress: 95 })];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "COMPLETE_TASK", id: "1", durationSeconds: 12 },
    );
    expect(state.tasks[0].status).toBe("done");
    expect(state.tasks[0].progress).toBe(100);
    expect(state.tasks[0].durationSeconds).toBe(12);
  });

  it("fails task with error message", () => {
    const tasks = [makeTask({ id: "1", status: "running", progress: 40 })];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "FAIL_TASK", id: "1", error: "Недостаточно кредитов" },
    );
    expect(state.tasks[0].status).toBe("failed");
    expect(state.tasks[0].error).toBe("Недостаточно кредитов");
  });

  it("cancels running task", () => {
    const tasks = [makeTask({ id: "1", status: "running", progress: 30 })];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "CANCEL_TASK", id: "1" },
    );
    expect(state.tasks[0].status).toBe("canceled");
  });

  it("retries failed task back to queued", () => {
    const tasks = [makeTask({ id: "1", status: "failed", progress: 64, error: "err" })];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "RETRY_TASK", id: "1" },
    );
    expect(state.tasks[0].status).toBe("queued");
    expect(state.tasks[0].progress).toBe(0);
    expect(state.tasks[0].error).toBeUndefined();
  });

  it("clears done tasks", () => {
    const tasks = [
      makeTask({ id: "1", status: "done", progress: 100 }),
      makeTask({ id: "2", status: "queued" }),
    ];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "CLEAR_DONE" },
    );
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].id).toBe("2");
  });

  it("recomputes queue positions", () => {
    const tasks = [
      makeTask({ id: "1", status: "queued", createdAt: 100 }),
      makeTask({ id: "2", status: "queued", createdAt: 200 }),
    ];
    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "PROMOTE_TO_RUNNING", id: "1" },
    );
    const queued = state.tasks.find((t) => t.id === "2");
    expect(queued?.queuePosition).toBe(1);
  });
});

describe("queue slot helpers", () => {
  it("counts running tasks", () => {
    const tasks = [
      makeTask({ id: "1", status: "running" }),
      makeTask({ id: "2", status: "running" }),
      makeTask({ id: "3", status: "queued" }),
    ];
    expect(countRunningTasks(tasks)).toBe(2);
  });

  it("picks oldest queued task", () => {
    const tasks = [
      makeTask({ id: "2", status: "queued", createdAt: 200 }),
      makeTask({ id: "1", status: "queued", createdAt: 100 }),
    ];
    expect(pickNextQueuedTask(tasks)?.id).toBe("1");
  });
});

describe("task normalization", () => {
  it("assigns unique ids to duplicate seed entries", () => {
    const tasks = [
      makeTask({ id: "task-5", status: "failed", createdAt: 100 }),
      makeTask({ id: "task-5", status: "failed", createdAt: 100 }),
    ];

    const normalized = ensureUniqueTaskIds(tasks);

    expect(normalized[0].id).toBe("task-5");
    expect(normalized[1].id).toBe("task-5~2");
  });

  it("retries only the targeted task id", () => {
    const tasks = ensureUniqueTaskIds([
      makeTask({ id: "task-5", status: "failed", createdAt: 100 }),
      makeTask({ id: "task-5", status: "failed", createdAt: 200 }),
    ]);

    const state = queueReducer(
      { ...initialQueueState, tasks, loadStatus: "ready" },
      { type: "RETRY_TASK", id: "task-5" },
    );

    expect(state.tasks.find((task) => task.id === "task-5")?.status).toBe("queued");
    expect(state.tasks.find((task) => task.id === "task-5~2")?.status).toBe("failed");
  });

  it("keeps only two running tasks on init", () => {
    const tasks = [
      makeTask({ id: "1", status: "running", createdAt: 100 }),
      makeTask({ id: "2", status: "running", createdAt: 200 }),
      makeTask({ id: "3", status: "running", createdAt: 300 }),
    ];

    const normalized = enforceMaxConcurrent(tasks);

    expect(countRunningTasks(normalized)).toBe(2);
    expect(normalized.find((task) => task.id === "3")?.status).toBe("queued");
  });
});
