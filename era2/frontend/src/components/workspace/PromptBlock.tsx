import { useState, useRef, useEffect } from "react";
import { ChevronDown, Zap, Sparkles, Square, Gem, Clock, Monitor, Video, Mic, Palette } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { SegmentedToolbar, SegmentedItem, AttachmentButton } from "@/shared/ui/era";

interface ModelOption {
  name: string;
  desc?: string;
  isNew?: boolean;
}

interface PromptBlockProps {
  mode: "video" | "audio";
  prompt: string;
  onPromptChange: (v: string) => void;
  selectedModel: string;
  onModelSelect: (m: string) => void;
  models: ModelOption[];
  aspectRatio: string;
  onAspectSelect: (r: string) => void;
  aspectRatios: string[];
  quantity?: number;
  onQuantityChange?: (n: number) => void;
  quantityOptions?: number[];
  quality?: string;
  onQualityChange?: (q: string) => void;
  qualityOptions?: string[];
  duration?: string;
  onDurationChange?: (d: string) => void;
  durationOptions?: string[];
  resolution?: string;
  onResolutionChange?: (r: string) => void;
  resolutionOptions?: string[];
  credits?: number;
  onGenerate: () => void;
  placeholder?: string;
  extraPills?: React.ReactNode;
}

function SegmentedDropdown({
  open, onClose, anchor, children,
}: { open: boolean; onClose: () => void; anchor: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        anchor.current && !anchor.current.contains(e.target as Node)
      ) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchor]);
  if (!open) return null;
  return (
    <div ref={ref} className="absolute top-full mt-2 z-50 min-w-[200px] max-w-[320px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1.5 shadow-2xl max-h-[400px] overflow-y-auto">
      {children}
    </div>
  );
}

function DDOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-[8px] text-sm transition-colors flex items-center justify-between gap-2",
        active
          ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
      )}
    >
      {children}
    </button>
  );
}

export function PromptBlock({
  mode, prompt, onPromptChange, selectedModel, onModelSelect, models,
  aspectRatio, onAspectSelect, aspectRatios,
  quality = "1K", onQualityChange, qualityOptions,
  duration, onDurationChange, durationOptions,
  resolution, onResolutionChange, resolutionOptions,
  credits = 2, onGenerate, placeholder, extraPills,
}: PromptBlockProps) {
  const [openDD, setOpenDD] = useState<null | "model" | "aspect" | "quality" | "duration" | "resolution">(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const aspectRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const resolutionRef = useRef<HTMLDivElement>(null);

  const ModeIcon = mode === "video" ? Video : Mic;
  const modeLabel = mode === "video" ? "ИИ Видео" : "Аудио";

  return (
    <div className="rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-colors duration-200 focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--primary))]/20">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <AttachmentButton current={0} max={mode === "video" ? 5 : undefined} />
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder={placeholder || "Введите свою идею для генерации"}
            rows={mode === "audio" ? 4 : 3}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] resize-none min-h-[80px] py-3 px-1 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] placeholder:opacity-60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 sm:overflow-visible sm:flex-wrap">
          <SegmentedToolbar>
            {/* Mode label (static) */}
            <SegmentedItem icon={<ModeIcon />} label={modeLabel} trailing={null} disabled />

            {/* Model selector */}
            <div ref={modelRef} className="relative inline-flex">
              <SegmentedItem
                icon={<Palette />}
                label={<span className="max-w-[180px] truncate">{selectedModel}</span>}
                active={openDD === "model"}
                onClick={() => setOpenDD(openDD === "model" ? null : "model")}
              />
              <SegmentedDropdown open={openDD === "model"} onClose={() => setOpenDD(null)} anchor={modelRef}>
                {models.map((m) => (
                  <DDOption key={m.name} active={selectedModel === m.name} onClick={() => { onModelSelect(m.name); setOpenDD(null); }}>
                    <div className="flex flex-col items-start min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">{m.name}</span>
                        {m.isNew && (
                          <span className="font-mono text-[9px] px-1 py-px rounded bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30 uppercase tracking-wider">NEW</span>
                        )}
                      </div>
                      {m.desc && <span className="text-[11px] text-[hsl(var(--muted-foreground))]">{m.desc}</span>}
                    </div>
                    {selectedModel === m.name && <span className="text-[hsl(var(--primary))]">✓</span>}
                  </DDOption>
                ))}
              </SegmentedDropdown>
            </div>

            {/* Aspect ratio */}
            {aspectRatios.length > 0 && (
              <div ref={aspectRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Square />}
                  label={<span className="font-mono tabular-nums">{aspectRatio}</span>}
                  active={openDD === "aspect"}
                  onClick={() => setOpenDD(openDD === "aspect" ? null : "aspect")}
                />
                <SegmentedDropdown open={openDD === "aspect"} onClose={() => setOpenDD(null)} anchor={aspectRef}>
                  {aspectRatios.map((r) => (
                    <DDOption key={r} active={aspectRatio === r} onClick={() => { onAspectSelect(r); setOpenDD(null); }}>
                      <span className="font-mono tabular-nums">{r}</span>
                      {aspectRatio === r && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DDOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

            {/* Quality */}
            {qualityOptions && onQualityChange && (
              <div ref={qualityRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Gem />}
                  label={<span className="font-mono tabular-nums uppercase">{quality}</span>}
                  active={openDD === "quality"}
                  onClick={() => setOpenDD(openDD === "quality" ? null : "quality")}
                />
                <SegmentedDropdown open={openDD === "quality"} onClose={() => setOpenDD(null)} anchor={qualityRef}>
                  {qualityOptions.map((q) => (
                    <DDOption key={q} active={quality === q} onClick={() => { onQualityChange(q); setOpenDD(null); }}>
                      <span className="font-mono tabular-nums uppercase">{q}</span>
                      {quality === q && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DDOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

            {/* Duration (video) */}
            {mode === "video" && durationOptions && onDurationChange && duration && (
              <div ref={durationRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Clock />}
                  label={<span className="font-mono tabular-nums">{duration}</span>}
                  active={openDD === "duration"}
                  onClick={() => setOpenDD(openDD === "duration" ? null : "duration")}
                />
                <SegmentedDropdown open={openDD === "duration"} onClose={() => setOpenDD(null)} anchor={durationRef}>
                  {durationOptions.map((d) => (
                    <DDOption key={d} active={duration === d} onClick={() => { onDurationChange(d); setOpenDD(null); }}>
                      <span className="font-mono tabular-nums">{d}</span>
                      {duration === d && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DDOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

            {/* Resolution (video) */}
            {mode === "video" && resolutionOptions && onResolutionChange && resolution && (
              <div ref={resolutionRef} className="relative inline-flex">
                <SegmentedItem
                  icon={<Monitor />}
                  label={<span className="font-mono tabular-nums">{resolution}</span>}
                  active={openDD === "resolution"}
                  onClick={() => setOpenDD(openDD === "resolution" ? null : "resolution")}
                />
                <SegmentedDropdown open={openDD === "resolution"} onClose={() => setOpenDD(null)} anchor={resolutionRef}>
                  {resolutionOptions.map((r) => (
                    <DDOption key={r} active={resolution === r} onClick={() => { onResolutionChange(r); setOpenDD(null); }}>
                      <span className="font-mono tabular-nums">{r}</span>
                      {resolution === r && <span className="text-[hsl(var(--primary))]">✓</span>}
                    </DDOption>
                  ))}
                </SegmentedDropdown>
              </div>
            )}

          </SegmentedToolbar>

          {extraPills}

          <button
            onClick={onGenerate}
            disabled={!prompt.trim()}
            className="ml-auto inline-flex items-center gap-1.5 px-5 h-10 rounded-full gradient-accent text-white text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" /> Генерировать
            <span className="inline-flex items-center gap-1 ml-1 font-mono tabular-nums">
              <Zap className="w-3 h-3" /> {credits}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
