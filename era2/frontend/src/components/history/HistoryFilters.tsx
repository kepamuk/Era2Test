export type HistoryFilter = "all" | "text" | "image" | "video" | "audio" | "favorites";

interface Props {
  value: HistoryFilter;
  onChange: (v: HistoryFilter) => void;
  counts?: Partial<Record<HistoryFilter, number>>;
}

const OPTIONS: { value: HistoryFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "text", label: "Текст" },
  { value: "image", label: "Изображения" },
  { value: "video", label: "Видео" },
  { value: "audio", label: "Аудио" },
  { value: "favorites", label: "Избранное" },
];

export function HistoryFilters({ value, onChange, counts }: Props) {
  return (
    <div
      className="sticky z-30 bg-background/85 backdrop-blur-md border-b border-border"
      style={{ top: "var(--header-height, 56px)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex gap-2 flex-wrap">
        {OPTIONS.map((opt) => {
          const active = opt.value === value;
          const count = counts?.[opt.value];
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={
                active
                  ? "gradient-accent text-white h-9 px-3.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-all shadow-[0_8px_22px_-12px_rgba(232,84,32,0.55)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground h-9 px-3.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
              }
            >
              {opt.label}
              {typeof count === "number" && (
                <span className={active ? "text-white/80 font-mono text-[11px]" : "text-muted-foreground/70 font-mono text-[11px]"}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
