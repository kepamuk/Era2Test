import { Play, Copy, Share2, Download, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCopyToast } from "@/features/copy-toast";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { Placeholder } from "@/shared/ui/era";

export interface MediaGeneration {
  id: string;
  prompt: string;
  model: string;
  subModel: string;
  createdAt: Date;
  type: "image" | "video" | "audio";
  // image
  images?: { width: number; height: number }[];
  aspect?: string;
  quality?: string;
  // video
  duration?: string;
  resolution?: string;
  // audio
  audioDuration?: string;
}

interface Props {
  generations: MediaGeneration[];
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* Deterministic waveform bars */
const WAVE_BARS = Array.from({ length: 28 }, (_, i) =>
  Math.round(35 + Math.abs(Math.sin(i * 1.7)) * 60)
);

function ImageResult({ gen }: { gen: MediaGeneration }) {
  const images = gen.images && gen.images.length > 0 ? gen.images : [{ width: 1024, height: 1024 }];
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((img, i) => (
        <div key={i} className="relative">
          <Placeholder tone={i % 2 === 0 ? "rust" : "ember"} aspect="1/1" label="IMAGE" />
          <span className="absolute bottom-2 right-2 font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-black/60 text-white">
            {img.width}×{img.height}
          </span>
        </div>
      ))}
    </div>
  );
}

function VideoResult({ gen }: { gen: MediaGeneration }) {
  return (
    <div className="relative">
      <Placeholder tone="coal" aspect="16/9" label="VIDEO" />
      <button
        className="absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(232,84,32,0.92)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
      >
        <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
      </button>
      {gen.duration && (
        <span className="absolute bottom-2 right-2 font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-black/60 text-white">
          {gen.duration}
        </span>
      )}
    </div>
  );
}

function AudioResult({ gen }: { gen: MediaGeneration }) {
  return (
    <div
      className="rounded-xl p-3 flex items-center gap-3"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
    >
      <button
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "hsl(var(--primary))" }}
      >
        <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
      </button>
      <div className="flex-1 flex items-center gap-[2px] h-9">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm"
            style={{ height: `${h}%`, background: "hsl(var(--primary) / 0.55)" }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] tabular-nums shrink-0" style={{ color: "var(--text-tertiary)" }}>
        {gen.audioDuration || "0:30"}
      </span>
    </div>
  );
}

export function MediaChatFeed({ generations }: Props) {
  const copy = useCopyToast();
  return (
    <div className="max-w-[780px] mx-auto py-6 px-4 space-y-6">
      {generations.map((gen) => (
        <div key={gen.id} className="space-y-4">
          {/* User message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-end"
          >
            <div
              className="max-w-[75%] rounded-[14px] rounded-br-[4px] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={{ background: "hsl(var(--primary))", color: "#fff" }}
            >
              {gen.prompt}
            </div>
          </motion.div>

          {/* Assistant response */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="flex gap-3"
          >
            <ModelGlyph name={gen.model} size={24} className="mt-1" />
            <div className="flex-1 min-w-0 max-w-[75%]">
              <div className="text-[11px] mb-1 font-medium flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <span>{gen.subModel || gen.model}</span>
                <span>·</span>
                <span className="font-mono tabular-nums">{formatTime(gen.createdAt)}</span>
              </div>
              {gen.type === "image" && <ImageResult gen={gen} />}
              {gen.type === "video" && <VideoResult gen={gen} />}
              {gen.type === "audio" && <AudioResult gen={gen} />}
              <div className="flex items-center gap-2 mt-1.5 font-mono text-[11px] tabular-nums" style={{ color: "var(--text-muted)" }}>
                {gen.aspect && <span>{gen.aspect}</span>}
                {gen.quality && <span>· {gen.quality}</span>}
                {gen.resolution && <span>· {gen.resolution}</span>}
                {gen.duration && gen.type !== "video" && <span>· {gen.duration}</span>}
              </div>
              <div className="flex items-center gap-1 mt-2 -ml-2">
                <button
                  onClick={() => copy(gen.prompt, "Промпт скопирован")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Копировать промпт"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Промпт
                </button>
                <button
                  onClick={() => copy(`https://era2.ai/share/${gen.id}`, "Ссылка скопирована")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Поделиться"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Поделиться
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Скачать"
                >
                  <Download className="h-3.5 w-3.5" />
                  Скачать
                </button>
                <button
                  className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                  title="В избранное"
                >
                  <Heart className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
