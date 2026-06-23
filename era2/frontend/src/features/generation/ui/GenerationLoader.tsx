interface GenerationLoaderProps {
  type: "text" | "image" | "video" | "audio";
  model?: string;
}

const messages: Record<GenerationLoaderProps["type"], string> = {
  text: "Генерирую ответ",
  image: "Создаю изображение",
  video: "Генерирую видео",
  audio: "Обрабатываю аудио",
};

export function GenerationLoader({ type, model }: GenerationLoaderProps) {
  return (
    <div className="max-w-[780px] mx-auto px-4 py-6">
      <div className="flex items-center gap-4 p-4 rounded-[14px] border border-border bg-card">
        {/* Progress Ring */}
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="17" fill="none" stroke="var(--c-line)" strokeWidth="2" />
            <circle
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="107"
              className="animate-progress-ring"
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center text-[14px] font-bold gradient-accent-text"
          >
            E
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">{messages[type]}...</span>
            {model && (
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full text-muted-foreground"
                style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}
              >
                {model}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
