import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Copy, Download, RefreshCw, MoreHorizontal, Play, Zap } from "lucide-react";
import { ModelIcon } from "@/features/model-picker";
import type { Generation } from "@/entities/generation";

interface Props {
  generation: Generation;
}

const ASPECT_CLASS: Record<NonNullable<Generation["aspect"]>, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16] max-h-[520px]",
  "4:3": "aspect-[4/3]",
};

function ActionButton({
  Icon,
  label,
  onClick,
}: {
  Icon: typeof Copy;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-7 h-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      <Icon size={14} strokeWidth={1.8} />
    </button>
  );
}

function Waveform() {
  // deterministic-ish bars
  const bars = Array.from({ length: 48 }).map((_, i) => {
    const h = 20 + Math.abs(Math.sin(i * 1.7) * 70) + Math.abs(Math.cos(i * 0.9) * 20);
    return Math.min(100, Math.round(h));
  });
  return (
    <div className="flex items-center gap-[3px] h-12 flex-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${h}%`,
            background:
              i < 18
                ? "linear-gradient(to top, hsl(var(--primary)), #ff7a3d)"
                : "color-mix(in oklab, hsl(var(--muted-foreground)) 50%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export function GenerationCard({ generation }: Props) {
  const { type, providerId, modelName, credits, prompt, createdAt, text, gradient, aspect, duration } =
    generation;

  const [relative, setRelative] = useState(() =>
    formatDistanceToNow(createdAt, { addSuffix: true, locale: ru }),
  );
  useEffect(() => {
    const tick = () =>
      setRelative(formatDistanceToNow(createdAt, { addSuffix: true, locale: ru }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [createdAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group rounded-2xl border border-border bg-card p-4 hover:border-[hsl(var(--border))]/80 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <ModelIcon providerId={providerId} size={22} />
        <span className="text-sm font-medium text-foreground">{modelName}</span>
        <span className="text-muted-foreground text-xs">·</span>
        <span className="text-xs text-muted-foreground">{relative}</span>
        <span
          className="ml-auto inline-flex items-center gap-1 font-mono tabular-nums text-[11px] px-2 py-0.5 rounded-full"
          style={{
            background: "var(--c-accent-soft)",
            color: "hsl(var(--primary))",
          }}
        >
          <Zap size={10} strokeWidth={1.8} />
          {credits}
        </span>
      </div>

      {/* Prompt */}
      <p className="text-sm text-foreground/90 line-clamp-2 mb-3">{prompt}</p>

      {/* Result */}
      {type === "text" && text && (
        <div className="bg-secondary rounded-xl p-3 text-sm text-foreground whitespace-pre-line leading-relaxed">
          {text}
        </div>
      )}

      {type === "image" && (
        <div
          className={`${ASPECT_CLASS[aspect ?? "1:1"]} w-full rounded-xl overflow-hidden`}
          style={{ background: gradient }}
        />
      )}

      {type === "video" && (
        <div
          className={`${ASPECT_CLASS[aspect ?? "16:9"]} w-full rounded-xl overflow-hidden relative flex items-center justify-center`}
          style={{ background: gradient }}
        >
          <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <Play size={22} strokeWidth={1.8} fill="currentColor" />
          </div>
          {duration && (
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[11px] font-mono text-white bg-black/50 backdrop-blur-sm">
              {duration}
            </span>
          )}
        </div>
      )}

      {type === "audio" && (
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 bg-secondary">
          <button
            type="button"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
            aria-label="Воспроизвести"
          >
            <Play size={14} strokeWidth={2} fill="currentColor" />
          </button>
          <Waveform />
          {duration && (
            <span className="font-mono tabular-nums text-xs text-muted-foreground shrink-0">{duration}</span>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ActionButton Icon={Copy} label="Копировать" />
        <ActionButton Icon={Download} label="Скачать" />
        <ActionButton Icon={RefreshCw} label="Регенерировать" />
        <ActionButton Icon={MoreHorizontal} label="Ещё" />
      </div>
    </motion.div>
  );
}
