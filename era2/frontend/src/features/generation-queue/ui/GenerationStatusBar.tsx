import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GenerationTask } from "@/entities/generation-task";
import { useLocation, useNavigate } from "@/shared/routing";
import { cn } from "@/shared/lib/utils";
import { useQueue } from "../model/useQueue";
import { getGenerationTitle, pluralizeGenerations } from "../lib/formatEta";
import { GenerationSpinner } from "./GenerationSpinner";
import { ProgressBar } from "./ProgressBar";
import { TaskThumb } from "./TaskThumb";

const STATUS_BAR_SHADOW = "shadow-[var(--shadow-2)]";

function StatusBarShell({
  children,
  className,
  widthClass = "w-[332px]",
}: {
  children: ReactNode;
  className?: string;
  widthClass?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "fixed z-50 bottom-6 right-6 max-lg:left-0 max-lg:right-0 max-lg:bottom-0 max-lg:w-full safe-bottom",
        widthClass,
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function StatusBarCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-[var(--queue-running-border)] bg-card overflow-hidden max-lg:rounded-none max-lg:border-x-0",
        STATUS_BAR_SHADOW,
        className,
      )}
    >
      {children}
    </div>
  );
}

function MultiTaskRow({ task }: { task: GenerationTask }) {
  const isRunning = task.status === "running";

  return (
    <div className="flex items-center gap-2.5">
      <TaskThumb type={task.type} size={28} className="rounded-lg" />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-xs text-[var(--c-fg-dim)] truncate">{task.prompt}</p>
        {isRunning && <ProgressBar value={task.progress} height="sm" />}
      </div>
      <span
        className={cn(
          "font-mono text-[11px] font-medium shrink-0",
          isRunning ? "text-[var(--c-accent-2)]" : "text-[var(--c-fg-mute)]",
        )}
      >
        {isRunning ? `${task.progress}%` : "в очереди"}
      </span>
    </div>
  );
}

export function GenerationStatusBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { activeTasks, activeCount, averageProgress, hasActiveGenerations } = useQueue();
  const [expanded, setExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  if (!hasActiveGenerations || pathname === "/queue") return null;

  const openQueue = () => navigate("/queue");
  const previewTasks = activeTasks.slice(0, 3);

  if (collapsed && activeCount > 1) {
    return (
      <StatusBarShell widthClass="w-auto" className="hidden lg:block">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full border border-[var(--queue-running-border)] bg-card shadow-[var(--shadow-2)]"
        >
          <GenerationSpinner size={16} />
          <span className="text-[13px] font-medium text-foreground">
            {activeCount} {pluralizeGenerations(activeCount)}
          </span>
          <span className="font-mono text-[13px] font-medium text-[var(--c-accent-2)]">
            · {averageProgress}%
          </span>
        </button>
      </StatusBarShell>
    );
  }

  if (activeCount === 1) {
    const task = activeTasks[0];
    const isRunning = task.status === "running";

    return (
      <StatusBarShell widthClass="w-[300px]">
        <StatusBarCard>
          <div
            role="button"
            tabIndex={0}
            onClick={openQueue}
            onKeyDown={(e) => e.key === "Enter" && openQueue()}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2.5 pl-3.5 pr-3 py-3">
              <GenerationSpinner size={18} />
              <div className="flex-1 min-w-0 flex flex-col gap-px">
                <p className="text-[13px] font-semibold text-foreground truncate">
                  {isRunning ? getGenerationTitle(task.type) : "В очереди"}
                </p>
                <p className="text-[11px] font-mono text-[var(--c-fg-mute)] truncate">
                  {task.model}
                  {isRunning ? ` · ${task.progress}%` : ""}
                </p>
              </div>
              <span className="text-sm text-[var(--c-fg-mute)] shrink-0" aria-hidden>
                →
              </span>
            </div>

            {isRunning && (
              <div className="flex items-center gap-3 px-3.5 pb-3.5">
                <TaskThumb type={task.type} size={40} className="rounded-[10px]" />
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <p className="text-xs text-[var(--c-fg-dim)] truncate">{task.prompt}</p>
                  <ProgressBar value={task.progress} height="sm" />
                </div>
              </div>
            )}
          </div>
        </StatusBarCard>
      </StatusBarShell>
    );
  }

  return (
    <StatusBarShell>
      <StatusBarCard>
        <div className="flex items-center gap-2.5 pl-3.5 pr-3 py-3">
          <GenerationSpinner size={18} />
          <div className="flex-1 min-w-0 flex flex-col gap-px">
            <p className="text-[13px] font-semibold text-foreground leading-[17px]">Генерации идут</p>
            <p className="text-[11px] font-mono text-[var(--c-fg-mute)] leading-[14px]">
              {activeCount} активны · {averageProgress}%
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth >= 1024) setCollapsed(true);
              else setExpanded((v) => !v);
            }}
            className="pb-0.5 text-[var(--c-fg-mute)] hover:text-foreground transition-colors text-sm leading-[18px]"
            aria-label={expanded ? "Свернуть" : "Развернуть"}
          >
            {expanded ? "⌄" : "⌃"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2.5 pt-0.5 pb-2.5 px-3.5">
                {previewTasks.map((task) => (
                  <MultiTaskRow key={`${task.id}:${task.createdAt}`} task={task} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={openQueue}
          className="w-full flex items-center justify-center gap-1.5 py-[11px] border-t border-border text-[13px] font-medium text-[var(--c-accent-2)] hover:bg-secondary/50 transition-colors"
        >
          <span>Открыть очередь</span>
          <span className="font-normal" aria-hidden>
            →
          </span>
        </button>
      </StatusBarCard>
    </StatusBarShell>
  );
}
