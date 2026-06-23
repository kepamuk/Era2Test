import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useNavigate } from "@/shared/routing";
import { Sparkles, Download, Play, Zap } from "lucide-react";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ModelIcon } from "@/features/model-picker";
import type { HistoryItem } from "@/entities/history";

interface Props {
  item: HistoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ASPECT_CLASS: Record<NonNullable<HistoryItem["aspect"]>, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16] max-h-[80vh]",
  "4:3": "aspect-[4/3]",
};

function BigWaveform() {
  const bars = Array.from({ length: 64 }).map((_, i) => {
    const h = 20 + Math.abs(Math.sin(i * 1.3) * 70) + Math.abs(Math.cos(i * 0.8) * 20);
    return Math.min(100, Math.round(h));
  });
  return (
    <div className="flex items-center gap-[3px] h-24 w-full px-6">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${h}%`,
            background:
              i < 22
                ? "linear-gradient(to top, hsl(var(--primary)), #ff7a3d)"
                : "color-mix(in oklab, hsl(var(--muted-foreground)) 50%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export function HistoryDetailDialog({ item, open, onOpenChange }: Props) {
  const navigate = useNavigate();

  if (!item) return null;

  const { type, providerId, modelName, credits, prompt, createdAt, text, gradient, aspect, duration } = item;

  const fullDate = format(createdAt, "d MMMM yyyy 'в' HH:mm", { locale: ru });

  const handleReuse = () => {
    onOpenChange(false);
    const routeMap: Record<typeof type, string> = {
      text: "/text",
      image: "/design",
      video: "/video",
      audio: "/audio",
    };
    navigate({ to: routeMap[type] as never });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1100px] p-0 overflow-hidden border border-border">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%]">
          {/* Left: preview */}
          <div className="bg-[hsl(var(--background))] flex items-center justify-center min-h-[280px] md:min-h-[480px] p-4 md:p-6">
            {(type === "image" || type === "video") && (
              <div
                className={`${ASPECT_CLASS[aspect ?? "1:1"]} w-full rounded-xl overflow-hidden relative flex items-center justify-center`}
                style={{ background: gradient }}
              >
                {type === "video" && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                      <Play size={26} strokeWidth={1.8} fill="currentColor" />
                    </div>
                    {duration && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs font-mono text-white bg-black/60 backdrop-blur-sm">
                        {duration}
                      </span>
                    )}
                  </>
                )}
              </div>
            )}

            {type === "audio" && (
              <div className="w-full rounded-xl bg-secondary p-6 flex flex-col items-center gap-4">
                <button
                  type="button"
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
                  aria-label="Воспроизвести"
                >
                  <Play size={22} strokeWidth={2} fill="currentColor" />
                </button>
                <BigWaveform />
                {duration && (
                  <span className="font-mono tabular-nums text-sm text-muted-foreground">{duration}</span>
                )}
              </div>
            )}

            {type === "text" && (
              <div className="w-full bg-secondary rounded-xl p-8 max-h-[80vh] overflow-y-auto">
                <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{text}</p>
              </div>
            )}
          </div>

          {/* Right: metadata */}
          <div className="flex flex-col p-6 gap-4 border-t md:border-t-0 md:border-l border-border bg-card">
            <div className="flex items-center gap-3">
              <ModelIcon providerId={providerId} size={32} />
              <div className="min-w-0">
                <div className="font-semibold text-foreground truncate">{modelName}</div>
                <div className="text-xs text-muted-foreground capitalize">{providerId}</div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">{fullDate}</div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1 font-mono tabular-nums text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--c-accent-soft)", color: "hsl(var(--primary))" }}
              >
                <Zap size={10} strokeWidth={1.8} />
                {credits}
              </span>
              {aspect && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {aspect}
                </span>
              )}
              {duration && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {duration}
                </span>
              )}
            </div>

            <div>
              <div className="font-mono uppercase tracking-wide text-[11px] text-muted-foreground mb-1.5">
                Промпт
              </div>
              <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
            </div>

            <div className="flex-1" />

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleReuse}
                className="w-full gradient-accent text-white shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55)]"
              >
                <Sparkles size={16} />
                Использовать снова
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Download size={16} />
                Скачать
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
