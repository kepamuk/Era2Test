import {
  useQueue,
  QueueStatsPanel,
  QueueToolbar,
  TaskCard,
  TaskRow,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/features/generation-queue";

export function GenerationQueue() {
  const {
    state,
    stats,
    filteredTasks,
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
  } = useQueue();

  const hasFilters =
    state.filter !== "all" ||
    state.typeFilter !== "all" ||
    state.search.trim().length > 0;

  const isEmpty = state.tasks.length === 0;
  const isFilteredEmpty = !isEmpty && filteredTasks.length === 0;

  return (
    <div className="w-full max-w-[1120px] mx-auto px-8 pt-6 pb-16 md:pt-10 md:pb-20">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-[26px] md:text-[30px] font-bold tracking-[-0.6px] text-foreground leading-none">
              Очередь генераций
            </h1>
            <p className="text-sm md:text-[15px] text-[var(--c-fg-mute)] leading-normal">
              Все ваши задачи в реальном времени
            </p>
          </div>
          <button
            type="button"
            onClick={clearDone}
            disabled={stats.done === 0}
            className="h-10 px-4 rounded-full border border-border text-[14px] font-medium text-[var(--c-fg-dim)] hover:bg-secondary transition-colors duration-150 ease-out disabled:opacity-40 disabled:pointer-events-none shrink-0 hidden sm:block"
          >
            Очистить готовые
          </button>
        </div>

        {state.loadStatus === "loading" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[88px] md:h-[93px] rounded-2xl bg-[var(--c-bg-2)] animate-pulse" />
              ))}
            </div>
            <LoadingState />
          </>
        )}

        {state.loadStatus === "error" && <ErrorState onRetry={retryInit} />}

        {state.loadStatus === "ready" && (
          <>
            <QueueStatsPanel stats={stats} />

            <QueueToolbar
              filter={state.filter}
              typeFilter={state.typeFilter}
              sort={state.sort}
              search={state.search}
              onFilterChange={setFilter}
              onTypeFilterChange={setTypeFilter}
              onSortChange={setSort}
              onSearchChange={setSearch}
            />

            {isEmpty && <EmptyState hasFilters={false} />}
            {isFilteredEmpty && <EmptyState hasFilters />}

            {!isEmpty && filteredTasks.length > 0 && (
              <div className="flex flex-col gap-2.5">
                {filteredTasks.map((task) => (
                  <div key={`${task.id}:${task.createdAt}`} className="queue-task-item">
                    <TaskRow
                      task={task}
                      onCancel={cancelTask}
                      onRetry={retryTask}
                      onDownload={downloadTask}
                      onDelete={deleteTask}
                    />
                    <TaskCard
                      task={task}
                      onCancel={cancelTask}
                      onRetry={retryTask}
                      onDownload={downloadTask}
                      onDelete={deleteTask}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
