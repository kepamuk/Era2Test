import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { createSeedTasks, type GenerationTask } from "@/entities/generation-task";
import { createQueueEngine, type QueueEngine } from "./queueEngine";
import {
  initialQueueState,
  normalizeRestoredTasks,
  queueReducer,
  type QueueAction,
  type QueueState,
  type SortOption,
  type StatusFilter,
  type TypeFilter,
} from "./queueReducer";
import {
  selectActiveCount,
  selectActiveTasks,
  selectAverageProgress,
  selectFilteredTasks,
  selectHasActiveGenerations,
  selectStats,
} from "./selectors";

const STORAGE_KEY = "era2-generation-queue";
const INIT_DELAY_MS = 600;

interface PersistedQueue {
  tasks: GenerationTask[];
  filter: StatusFilter;
  typeFilter: TypeFilter;
  sort: SortOption;
  search: string;
}

interface QueueContextValue {
  state: QueueState;
  stats: ReturnType<typeof selectStats>;
  filteredTasks: GenerationTask[];
  activeTasks: GenerationTask[];
  activeCount: number;
  averageProgress: number;
  hasActiveGenerations: boolean;
  setFilter: (filter: StatusFilter) => void;
  setTypeFilter: (typeFilter: TypeFilter) => void;
  setSort: (sort: SortOption) => void;
  setSearch: (search: string) => void;
  cancelTask: (id: string) => void;
  retryTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearDone: () => void;
  retryInit: () => void;
  downloadTask: (id: string) => void;
}

const QueueContext = createContext<QueueContextValue | null>(null);

function loadPersisted(): PersistedQueue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedQueue;
  } catch {
    return null;
  }
}

function savePersisted(state: QueueState) {
  const payload: PersistedQueue = {
    tasks: state.tasks,
    filter: state.filter,
    typeFilter: state.typeFilter,
    sort: state.sort,
    search: state.search,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

async function initializeTasks(): Promise<GenerationTask[]> {
  await new Promise((resolve) => setTimeout(resolve, INIT_DELAY_MS));

  const persisted = loadPersisted();
  if (persisted?.tasks?.length) {
    return normalizeRestoredTasks(persisted.tasks);
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("queueInitError") === "1") {
    throw new Error("init failed");
  }

  return createSeedTasks();
}

export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(queueReducer, initialQueueState);
  const stateRef = useRef(state);
  const engineRef = useRef<QueueEngine | null>(null);

  stateRef.current = state;

  const getTasks = useCallback(() => stateRef.current.tasks, []);

  const dispatchAction = useCallback((action: QueueAction) => {
    stateRef.current = queueReducer(stateRef.current, action);
    dispatch(action);
  }, []);

  useEffect(() => {
    engineRef.current = createQueueEngine({ dispatch: dispatchAction, getTasks });
    return () => engineRef.current?.stop();
  }, [dispatchAction, getTasks]);

  const runInit = useCallback(async () => {
    dispatchAction({ type: "INIT_START" });
    try {
      const tasks = await initializeTasks();
      dispatchAction({ type: "INIT_SUCCESS", tasks });

      const persisted = loadPersisted();
      if (persisted) {
        dispatchAction({ type: "SET_FILTER", filter: persisted.filter ?? "all" });
        dispatchAction({ type: "SET_TYPE_FILTER", typeFilter: persisted.typeFilter ?? "all" });
        dispatchAction({ type: "SET_SORT", sort: persisted.sort ?? "newest" });
        dispatchAction({ type: "SET_SEARCH", search: persisted.search ?? "" });
      }
    } catch {
      dispatchAction({ type: "INIT_ERROR" });
    }
  }, [dispatchAction]);

  useEffect(() => {
    if (state.loadStatus === "idle") {
      runInit();
    }
  }, [state.loadStatus, runInit]);

  useEffect(() => {
    if (state.loadStatus !== "ready") return;
    engineRef.current?.fillSlots();
    engineRef.current?.start();
  }, [state.loadStatus]);

  useEffect(() => {
    if (state.loadStatus !== "ready") return;
    savePersisted(state);
  }, [state]);

  const setFilter = useCallback((filter: StatusFilter) => {
    dispatchAction({ type: "SET_FILTER", filter });
  }, [dispatchAction]);

  const setTypeFilter = useCallback((typeFilter: TypeFilter) => {
    dispatchAction({ type: "SET_TYPE_FILTER", typeFilter });
  }, [dispatchAction]);

  const setSort = useCallback((sort: SortOption) => {
    dispatchAction({ type: "SET_SORT", sort });
  }, [dispatchAction]);

  const setSearch = useCallback((search: string) => {
    dispatchAction({ type: "SET_SEARCH", search });
  }, [dispatchAction]);

  const cancelTask = useCallback((id: string) => {
    engineRef.current?.cancelTask(id);
  }, []);

  const retryTask = useCallback((id: string) => {
    engineRef.current?.stopTaskProgress(id);
    dispatchAction({ type: "RETRY_TASK", id });
    engineRef.current?.fillSlots();
  }, [dispatchAction]);

  const deleteTask = useCallback(
    (id: string) => {
      const task = stateRef.current.tasks.find((t) => t.id === id);
      if (!task) return;

      engineRef.current?.stopTaskProgress(id);
      dispatchAction({ type: "DELETE_TASK", id });
      engineRef.current?.fillSlots();

      toast("Задача удалена", {
        action: {
          label: "Отменить",
          onClick: () => {
            dispatchAction({ type: "RESTORE_TASKS", tasks: [...stateRef.current.tasks, task] });
            engineRef.current?.fillSlots();
          },
        },
      });
    },
    [dispatchAction],
  );

  const clearDone = useCallback(() => {
    const doneTasks = stateRef.current.tasks.filter((t) => t.status === "done");
    if (doneTasks.length === 0) return;

    dispatchAction({ type: "CLEAR_DONE" });

    toast(`Удалено ${doneTasks.length} готовых задач`, {
      action: {
        label: "Отменить",
        onClick: () => {
          dispatchAction({
            type: "RESTORE_TASKS",
            tasks: [...stateRef.current.tasks, ...doneTasks],
          });
        },
      },
    });
  }, [dispatchAction]);

  const retryInit = useCallback(() => {
    runInit();
  }, [runInit]);

  const downloadTask = useCallback((_id: string) => {
    toast.success("Загрузка началась");
  }, []);

  const value = useMemo<QueueContextValue>(() => {
    const stats = selectStats(state.tasks);
    const filteredTasks = selectFilteredTasks(state);
    const activeTasks = selectActiveTasks(state.tasks);

    return {
      state,
      stats,
      filteredTasks,
      activeTasks,
      activeCount: selectActiveCount(state.tasks),
      averageProgress: selectAverageProgress(state.tasks),
      hasActiveGenerations: selectHasActiveGenerations(state.tasks),
      setFilter,
      setTypeFilter,
      setSort,
      setSearch,
      cancelTask,
      retryTask,
      deleteTask,
      clearDone,
      retryInit,
      downloadTask,
    };
  }, [
    state,
    setFilter,
    setTypeFilter,
    setSort,
    setSearch,
    cancelTask,
    retryTask,
    deleteTask,
    clearDone,
    retryInit,
    downloadTask,
  ]);

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueueContext() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueueContext must be used within QueueProvider");
  }
  return context;
}
