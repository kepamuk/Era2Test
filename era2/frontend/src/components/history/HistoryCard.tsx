import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Heart, Play } from "lucide-react";
import { ModelIcon } from "@/features/model-picker";
import type { HistoryItem } from "@/entities/history";

interface Props {
  item: HistoryItem;
  onClick: () => void;
  onToggleFavorite: (id: string) => void;
}

const ASPECT_CLASS: Record<NonNullable<HistoryItem["aspect"]>, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "4:3": "aspect-[4/3]",
};

function MiniWaveform() {
  const bars = Array.from({ length: 28 }).map((_, i) => {
    const h = 25 + Math.abs(Math.sin(i * 1.4) * 60) + Math.abs(Math.cos(i * 0.7) * 15);
    return Math.min(100, Math.round(h));
  });
  return (
    <div className="flex items-center gap-[2px] h-8 flex-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: `${h}%`,
            background:
              i < 10
                ? "linear-gradient(to top, hsl(var(--primary)), #ff7a3d)"
                : "color-mix(in oklab, hsl(var(--muted-foreground)) 45%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export function HistoryCard({ item, onClick, onToggleFavorite }: Props) {
  const { type, providerId, modelName, prompt, createdAt, gradient, aspect, duration, text, favorite } = item;

  const [relative, setRelative] = useState(() =>
    formatDistanceToNow(createdAt, { addSuffix: true, locale: ru }),
  );
  useEffect(() => {
    const tick = () => setRelative(formatDistanceToNow(createdAt, { addSuffix: true, locale: ru }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [createdAt]);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group rounded-2xl border border-border bg-card overflow-hidden cursor-pointer transition-all hover:border-[hsl(var(--primary))]/40 hover:scale-[1.01] mb-3 break-inside-avoid"
    >
      {/* Preview */}
      <div className="relative">
        {(type === "image" || type === "video") && (
          <div
            className={`${ASPECT_CLASS[aspect ?? "1:1"]} w-full`}
            style={{ background: gradient }}
          >
            {type === "video" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                  <Play size={16} strokeWidth={1.8} fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        )}

        {type === "audio" && (
          <div className="h-[80px] px-3 flex items-center gap-2 bg-secondary">
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
              aria-label="Воспроизвести"
            >
              <Play size={12} strokeWidth={2} fill="currentColor" />
            </button>
            <MiniWaveform />
          </div>
        )}

        {type === "text" && (
          <div className="relative bg-secondary px-3.5 pt-3.5 pb-6 min-h-[120px]">
            <p className="text-sm text-foreground/90 whitespace-pre-line line-clamp-4 leading-relaxed">
              {text}
            </p>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--card)) 100%)",
              }}
            />
          </div>
        )}

        {/* Favorite */}
        <button
          type="button"
          onClick={handleFav}
          aria-label={favorite ? "Убрать из избранного" : "В избранное"}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
            favorite
              ? "opacity-100 text-white"
              : "opacity-0 group-hover:opacity-100 text-white/90 bg-black/40 hover:bg-black/60"
          }`}
          style={
            favorite
              ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }
              : undefined
          }
        >
          <Heart size={13} strokeWidth={1.8} fill={favorite ? "currentColor" : "none"} />
        </button>

        {/* Duration pill (video / audio) */}
        {(type === "video" || type === "audio") && duration && (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono text-white bg-black/60 backdrop-blur-sm">
            {duration}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="p-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <ModelIcon providerId={providerId} size={18} />
          <span className="text-xs font-medium text-foreground truncate">{modelName}</span>
          <span className="text-muted-foreground text-[11px]">·</span>
          <span className="text-[11px] text-muted-foreground truncate">{relative}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{prompt}</p>
      </div>
    </div>
  );
}
