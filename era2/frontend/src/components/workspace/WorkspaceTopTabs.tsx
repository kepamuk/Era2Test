import { cn } from "@/shared/lib/utils";

export type WorkspaceTopTab = "history" | "community";

interface Props {
  value: WorkspaceTopTab;
  onChange: (v: WorkspaceTopTab) => void;
}

const TABS: { id: WorkspaceTopTab; label: string }[] = [
  { id: "history", label: "История" },
  { id: "community", label: "Сообщество" },
];

export function WorkspaceTopTabs({ value, onChange }: Props) {
  return (
    <div
      className="sticky top-[56px] z-30 h-12 flex items-center justify-center border-b border-border backdrop-blur-md"
      style={{ background: "color-mix(in oklab, hsl(var(--background)) 85%, transparent)" }}
    >
      <div
        className="inline-flex items-center gap-1 p-1 rounded-full"
        style={{ background: "var(--c-bg-2)", border: "1px solid var(--c-line)" }}
      >
        {TABS.map((t) => {
          const active = t.id === value;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "px-4 h-8 rounded-full text-[13px] font-medium transition-all",
                active
                  ? "text-white shadow-[0_4px_14px_-4px_rgba(232,84,32,0.5)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={
                active
                  ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }
                  : undefined
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
