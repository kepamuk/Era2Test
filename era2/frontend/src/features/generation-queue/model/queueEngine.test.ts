import { describe, expect, it, vi } from "vitest";
import type { GenerationTask } from "@/entities/generation-task";
import {
  MAX_CONCURRENT,
  TASK_FAIL_CHANCE,
  createQueueEngine,
  getProgressStep,
  planFailureThreshold,
} from "./queueEngine";
import {
  countRunningTasks,
  initialQueueState,
  pickNextQueuedTask,
  queueReducer,
  type QueueState,
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

describe("queueEngine helpers", () => {
  it("respects max concurrent limit", () => {
    expect(MAX_CONCURRENT).toBe(2);
  });

  it("returns different step sizes by type", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const textStep = getProgressStep("text");
    const videoStep = getProgressStep("video");
    expect(textStep).toBeGreaterThan(videoStep);
    vi.restoreAllMocks();
  });

  it("plans failure for roughly 15% of task runs", () => {
    expect(TASK_FAIL_CHANCE).toBe(0.15);

    vi.spyOn(Math, "random").mockReturnValue(0.1);
    expect(planFailureThreshold()).not.toBeNull();

    vi.spyOn(Math, "random").mockReturnValue(0.9);
    expect(planFailureThreshold()).toBeNull();

    vi.restoreAllMocks();
  });
});

describe("createQueueEngine fillSlots", () => {
  it("promotes only up to max concurrent tasks", () => {
    let state: QueueState = {
      ...initialQueueState,
      loadStatus: "ready",
      tasks: [
        makeTask({ id: "1", status: "queued", createdAt: 1 }),
        makeTask({ id: "2", status: "queued", createdAt: 2 }),
        makeTask({ id: "3", status: "queued", createdAt: 3 }),
      ],
    };

    const dispatch = (action: Parameters<typeof queueReducer>[1]) => {
      state = queueReducer(state, action);
    };

    const engine = createQueueEngine({
      dispatch,
      getTasks: () => state.tasks,
    });

    engine.fillSlots();

    expect(countRunningTasks(state.tasks)).toBe(MAX_CONCURRENT);
    expect(pickNextQueuedTask(state.tasks)?.id).toBe("3");
    engine.stop();
  });
});
