import { useState, useRef, useEffect } from "react";
import {
  Plus, ChevronDown, Sparkles, Zap,
  FileText, Square, Hash,
  RectangleHorizontal, Clock, Monitor, Disc,
  MessageSquare, Image as ImageTab, Video as VideoTab, AudioLines,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ModelPickerPill, type PickerProvider } from "@/features/model-picker";
import { imageProviders } from "@/entities/ai-model";
import { videoProviders } from "@/entities/ai-model";
import { getModelsByCategory } from "@/entities/ai-model";

export type GenType = "text" | "image" | "video" | "audio";

interface PromptWindowProps {
  type: GenType;
  onTypeChange: (t: GenType) => void;
  prompt: string;
  onPromptChange: (v: string) => void;
  onGenerate: () => void;
}

const TABS: { id: GenType; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }[] = [
  { id: "text", label: "Текст", Icon: MessageSquare },
  { id: "image", label: "Изображения", Icon: ImageTab },
  { id: "video", label: "Видео", Icon: VideoTab },
  { id: "audio", label: "Аудио", Icon: AudioLines },
];

const PLACEHOLDERS: Record<GenType, string> = {
  text: "Спроси что угодно...",
  image: "Опиши изображение, которое нужно создать...",
  video: "Опиши свою идею для генерации видео...",
  audio: "Опиши музыку, голос или звук...",
};

const CREDITS: Record<GenType, number> = {
  text: 5, image: 30, video: 75, audio: 60,
};

/* ─── Mini pill with dropdown stub ─── */
function ParamPill({
  Icon, label, options, value, onChange, mono,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number; width: number }>({ left: 0, top: 0, width: 180 });
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (popupRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const compute = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const width = Math.max(180, Math.ceil(rect.width));
      const height = Math.min(options.length * 38 + 8, 320);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      if (spaceBelow < height + 8 && spaceAbove > spaceBelow) {
        setPos({ left, bottom: window.innerHeight - rect.top + 6, width });
      } else {
        setPos({ left, top: rect.bottom + 6, width });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open, options.length]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap"
        style={{
          background: "var(--c-bg-2)",
          border: "1px solid var(--c-line)",
          color: "var(--c-fg-dim)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--c-line-2)";
          e.currentTarget.style.color = "var(--c-fg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--c-line)";
          e.currentTarget.style.color = "var(--c-fg-dim)";
        }}
      >
        <Icon size={14} strokeWidth={1.6} />
        <span className={mono ? "font-mono tabular-nums" : ""}>{value || label}</span>
        <ChevronDown size={12} strokeWidth={1.8} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div
          ref={popupRef}
          className="fixed rounded-[14px] shadow-xl z-[100] p-1 overflow-y-auto"
          style={{
            left: pos.left,
            ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
            width: pos.width,
            maxHeight: 320,
            background: "var(--c-bg-1)",
            border: "1px solid var(--c-line-2)",
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { onChange(o); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-[8px] text-[13px] transition-colors",
                mono && "font-mono tabular-nums",
              )}
              style={{
                color: o === value ? "var(--c-accent-2)" : "var(--c-fg-dim)",
                background: o === value ? "var(--c-accent-soft)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (o !== value) e.currentTarget.style.background = "var(--c-bg-2)";
              }}
              onMouseLeave={(e) => {
                if (o !== value) e.currentTarget.style.background = "transparent";
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


/* ─── Per-type params row ─── */
function ParamsRow({ type }: { type: GenType }) {
  // ── Build provider lists per type from real data ──
  const textProviders: PickerProvider[] = getModelsByCategory("text").map((m) => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
    badge: m.provider,
    badgeColor: "purple",
    subModels: (m.subModels || [{ id: m.id, name: m.name, credits: m.credits }]).map((s) => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      isNew: s.isNew,
      desc: m.provider,
    })),
  }));

  const imgPickerProviders: PickerProvider[] = imageProviders.map((p) => ({
    id: p.id,
    name: p.name,
    icon: p.icon,
    badge: p.badge,
    badgeColor: p.badgeColor,
    subModels: p.subModels.map((s) => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      isNew: s.isNew,
      desc: s.desc,
      time: s.time,
      badge: s.badge,
    })),
  }));

  const vidPickerProviders: PickerProvider[] = videoProviders.map((p) => ({
    id: p.id,
    name: p.name,
    icon: p.icon,
    badge: p.badge,
    badgeColor: "orange",
    subModels: p.subModels.map((s) => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      isNew: s.isNew,
      desc: s.desc,
      time: s.time,
      badge: s.badge,
    })),
  }));

  const audPickerProviders: PickerProvider[] = getModelsByCategory("audio").map((m) => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
    badge: m.provider,
    badgeColor: "pink",
    subModels: (m.subModels || [{ id: m.id, name: m.name, credits: m.credits }]).map((s) => ({
      id: s.id,
      name: s.name,
      credits: s.credits,
      isNew: s.isNew,
      desc: m.provider,
    })),
  }));

  // ── Selected state per type ──
  const [textSel, setTextSel] = useState(() => ({
    pid: textProviders[0]?.id ?? "",
    sid: textProviders[0]?.subModels[0]?.id ?? "",
  }));
  const [textPrompt, setTextPrompt] = useState("Без пресета");

  const [imgSel, setImgSel] = useState(() => ({
    pid: imgPickerProviders[0]?.id ?? "",
    sid: imgPickerProviders[0]?.subModels[0]?.id ?? "",
  }));
  const [imgSize, setImgSize] = useState("1024×1024");
  const [imgVar, setImgVar] = useState("1 вариант");

  const [vidSel, setVidSel] = useState(() => ({
    pid: vidPickerProviders[0]?.id ?? "",
    sid: vidPickerProviders[0]?.subModels[0]?.id ?? "",
  }));
  const [vidAspect, setVidAspect] = useState("16:9");
  const [vidDur, setVidDur] = useState("5s");
  const [vidRes, setVidRes] = useState("720p");

  const [audSel, setAudSel] = useState(() => ({
    pid: audPickerProviders[0]?.id ?? "",
    sid: audPickerProviders[0]?.subModels[0]?.id ?? "",
  }));
  const [audDur, setAudDur] = useState("3 мин");
  const [audGenre, setAudGenre] = useState("Поп");

  if (type === "text") {
    return (
      <>
        <ModelPickerPill
          providers={textProviders}
          selectedProviderId={textSel.pid}
          selectedSubModelId={textSel.sid}
          onSelect={(pid, sid) => setTextSel({ pid, sid })}
        />
        <ParamPill Icon={FileText} label="Системный промпт" value={textPrompt} onChange={setTextPrompt}
          options={["Без пресета", "Копирайтер", "Программист", "Учитель", "Переводчик"]} />
        
      </>
    );
  }
  if (type === "image") {
    return (
      <>
        <ModelPickerPill
          providers={imgPickerProviders}
          selectedProviderId={imgSel.pid}
          selectedSubModelId={imgSel.sid}
          onSelect={(pid, sid) => setImgSel({ pid, sid })}
        />
        <ParamPill Icon={Square} label="Размер" value={imgSize} onChange={setImgSize}
          options={["512×512", "1024×1024", "1536×1024", "1024×1536"]} mono />
        <ParamPill Icon={Hash} label="Варианты" value={imgVar} onChange={setImgVar}
          options={["1 вариант", "2 варианта", "4 варианта"]} />
        
      </>
    );
  }
  if (type === "video") {
    return (
      <>
        <ModelPickerPill
          providers={vidPickerProviders}
          selectedProviderId={vidSel.pid}
          selectedSubModelId={vidSel.sid}
          onSelect={(pid, sid) => setVidSel({ pid, sid })}
        />
        <ParamPill Icon={RectangleHorizontal} label="Формат" value={vidAspect} onChange={setVidAspect}
          options={["16:9", "9:16", "1:1", "4:3"]} mono />
        <ParamPill Icon={Clock} label="Длительность" value={vidDur} onChange={setVidDur}
          options={["3s", "5s", "8s", "10s"]} mono />
        <ParamPill Icon={Monitor} label="Разрешение" value={vidRes} onChange={setVidRes}
          options={["480p", "720p", "1080p"]} mono />
        
      </>
    );
  }
  return (
    <>
      <ModelPickerPill
        providers={audPickerProviders}
        selectedProviderId={audSel.pid}
        selectedSubModelId={audSel.sid}
        onSelect={(pid, sid) => setAudSel({ pid, sid })}
      />
      <ParamPill Icon={Clock} label="Длительность" value={audDur} onChange={setAudDur}
        options={["1 мин", "2 мин", "3 мин", "4 мин"]} mono />
      <ParamPill Icon={Disc} label="Жанр" value={audGenre} onChange={setAudGenre}
        options={["Поп", "Рок", "Электронная", "Lo-Fi", "Джаз", "Эмбиент"]} />
      
    </>
  );
}

export function PromptWindow({ type, onTypeChange, prompt, onPromptChange, onGenerate }: PromptWindowProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || prompt.length > 0;
  const credits = CREDITS[type];

  // Shared border color so active tab seamlessly merges with card top
  const cardBorder = active
    ? "color-mix(in oklab, var(--c-accent) 40%, transparent)"
    : "var(--c-line-2)";

  return (
    <div className="w-full max-w-[780px] mx-auto">
      {/* ─── Folder tabs (anchor to card top) ─── */}
      <div
        className="flex items-end gap-1 overflow-visible max-sm:overflow-x-auto max-sm:overflow-y-hidden scrollbar-hide flex-nowrap justify-start pl-0"
        style={{ marginBottom: -1, position: "relative", zIndex: 2 }}
      >
        {TABS.map((t) => {
          const isActive = t.id === type;
          const { Icon } = t;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTypeChange(t.id)}
              className={cn(
                "shrink-0 inline-flex items-center gap-2 px-5 text-sm font-medium transition-colors duration-200",
                "rounded-t-xl rounded-b-none",
              )}
              style={
                isActive
                  ? {
                      height: 40,
                      background: "var(--c-bg-1)",
                      borderTop: `1px solid ${cardBorder}`,
                      borderLeft: `1px solid ${cardBorder}`,
                      borderRight: `1px solid ${cardBorder}`,
                      borderBottom: "1px solid var(--c-bg-1)",
                      color: "var(--c-accent-2)",
                      boxShadow: active ? "0 -12px 34px -18px var(--c-accent-glow), -12px 0 28px -22px var(--c-accent-glow), 12px 0 28px -22px var(--c-accent-glow)" : "none",
                    }
                  : {
                      height: 40,
                      background: "color-mix(in oklab, var(--c-bg-1) 92%, #000)",
                      borderTop: "1px solid var(--c-line)",
                      borderLeft: "1px solid var(--c-line)",
                      borderRight: "1px solid var(--c-line)",
                      borderBottom: `1px solid ${cardBorder}`,
                      color: "color-mix(in oklab, var(--c-fg-dim) 70%, transparent)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "var(--c-fg)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.color =
                    "color-mix(in oklab, var(--c-fg-dim) 70%, transparent)";
              }}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── Prompt window ─── */}
      <div
        className="rounded-[22px] rounded-tl-none p-4 sm:p-5 transition-all duration-200 relative min-h-[160px] sm:h-[188px] flex flex-col justify-between gap-3"
        style={{
          background: "var(--c-bg-1)",
          border: `1px solid ${cardBorder}`,
          boxShadow: active
            ? "0 0 0 1px var(--c-accent), 0 0 40px -5px var(--c-accent-glow)"
            : "none",
        }}
      >
        {/* Row 1: + icon + textarea */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="w-11 h-11 shrink-0 rounded-[14px] flex items-center justify-center transition-colors"
            style={{
              background: "transparent",
              border: "1px solid var(--c-line)",
              color: "var(--c-fg-mute)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--c-line-2)";
              e.currentTarget.style.color = "var(--c-fg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--c-line)";
              e.currentTarget.style.color = "var(--c-fg-mute)";
            }}
            aria-label="Прикрепить"
          >
            <Plus size={18} strokeWidth={1.8} />
          </button>
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={PLACEHOLDERS[type]}
            rows={3}
            className="flex-1 min-w-0 bg-transparent border-none outline-none resize-none text-[16px] leading-relaxed"
            style={{
              color: "var(--c-fg)",
              minHeight: 80,
              padding: "10px 0 0 4px",
              fontFamily: "Geist, system-ui, sans-serif",
            }}
          />
        </div>

        {/* Row 2: params + CTA */}
        <div className="flex items-center gap-2 mt-4 min-h-10">
          <div className="flex items-center gap-2 flex-1 min-w-0 pb-0.5 overflow-x-auto no-scrollbar flex-nowrap">
            <ParamsRow type={type} />
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={!prompt.trim()}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all disabled:opacity-50"
            style={{
              background: "var(--c-accent)",
              color: "#fff",
              boxShadow:
                "0 10px 30px -10px var(--c-accent-glow), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = "var(--c-accent-2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--c-accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Sparkles size={14} strokeWidth={1.8} />
            <span>Генерировать</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
            <Zap size={13} strokeWidth={1.8} />
            <span className="font-mono tabular-nums">{credits}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
