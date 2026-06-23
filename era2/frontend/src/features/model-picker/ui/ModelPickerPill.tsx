import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Zap, Clock } from "lucide-react";

import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";

export interface PickerSubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
  desc?: string;
  time?: string;
  badge?: string;
}

export interface PickerProvider {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  subModels: PickerSubModel[];
}

interface Props {
  providers: PickerProvider[];
  selectedProviderId: string;
  selectedSubModelId: string;
  onSelect: (providerId: string, subModelId: string) => void;
}

function badgeStyle(color?: string): React.CSSProperties {
  switch (color) {
    case "yellow":
      return { background: "rgba(234,179,8,0.15)", color: "#facc15" };
    case "orange":
      return { background: "var(--c-accent-soft)", color: "var(--c-accent-2)" };
    case "green":
      return { background: "rgba(34,197,94,0.15)", color: "#4ade80" };
    case "purple":
      return { background: "rgba(168,85,247,0.15)", color: "#c084fc" };
    case "blue":
      return { background: "rgba(59,130,246,0.15)", color: "#60a5fa" };
    case "pink":
      return { background: "rgba(236,72,153,0.15)", color: "#f472b6" };
    default:
      return { background: "var(--c-bg-2)", color: "var(--c-fg-dim)" };
  }
}

export function ModelPickerPill({
  providers,
  selectedProviderId,
  selectedSubModelId,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number; width: number }>({ left: 0, top: 0, width: 560 });
  const [hoverProviderId, setHoverProviderId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const providerHoverTimer = useRef<number | null>(null);

  const clearProviderHoverTimer = () => {
    if (providerHoverTimer.current !== null) {
      window.clearTimeout(providerHoverTimer.current);
      providerHoverTimer.current = null;
    }
  };

  const scheduleProviderHover = (providerId: string) => {
    if (providerId === expanded?.id) return;
    clearProviderHoverTimer();
    providerHoverTimer.current = window.setTimeout(() => {
      setHoverProviderId((prev) => (prev === providerId ? prev : providerId));
      providerHoverTimer.current = null;
    }, 70);
  };

  const selectedProvider =
    providers.find((p) => p.id === selectedProviderId) || providers[0];
  const selectedSub =
    selectedProvider?.subModels.find((s) => s.id === selectedSubModelId) ||
    selectedProvider?.subModels[0];

  const expanded =
    providers.find((p) => p.id === hoverProviderId) || selectedProvider;

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
      const width = Math.min(560, window.innerWidth - 16);
      const dropdownH = 440 + 8;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      if (spaceBelow < dropdownH && spaceAbove > spaceBelow) {
        setPos({ left, bottom: window.innerHeight - rect.top + 8, width });
      } else {
        setPos({ left, top: rect.bottom + 8, width });
      }
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open]);

  useEffect(() => {
    if (open) setHoverProviderId(selectedProviderId);
  }, [open, selectedProviderId]);

  useEffect(() => clearProviderHoverTimer, []);

  if (!selectedProvider || !selectedSub) return null;

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
          color: "var(--c-fg)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--c-line-2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--c-line)";
        }}
      >
        <ModelGlyph name={selectedProvider.name} size={20} />
        <span>{selectedSub.name}</span>
        <ChevronDown size={12} strokeWidth={1.8} style={{ opacity: 0.6 }} />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="fixed rounded-[14px] shadow-2xl z-[100] flex overflow-hidden"
          style={{
            left: pos.left,
            ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
            background: "var(--c-bg-1)",
            border: "1px solid var(--c-line-2)",
            width: pos.width,
            height: "min(440px, calc(100vh - 16px))",
          }}
        >
          {/* Left: providers */}
          <div
            className="w-[240px] overflow-y-auto py-2"
            style={{ borderRight: "1px solid var(--c-line)" }}
          >
            <div
              className="px-4 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: "var(--c-fg-mute)" }}
            >
              Модели
            </div>
            {providers.map((p) => {
              const isExpanded = expanded?.id === p.id;
              const isSelected = selectedProviderId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => scheduleProviderHover(p.id)}
                  onMouseLeave={clearProviderHoverTimer}
                  onClick={() => {
                    clearProviderHoverTimer();
                    if (p.subModels.length === 1) {
                      onSelect(p.id, p.subModels[0].id);
                      setOpen(false);
                    } else {
                      setHoverProviderId(p.id);
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left"
                  style={{
                    background: isExpanded
                      ? "var(--c-bg-2)"
                      : "transparent",
                    color: isSelected ? "var(--c-accent-2)" : "var(--c-fg)",
                    borderLeft: isExpanded
                      ? "2px solid var(--c-accent)"
                      : "2px solid transparent",
                  }}
                >
                  <ModelGlyph name={p.name} size={20} />
                  <span className="text-[13px] font-medium flex-1 truncate">{p.name}</span>
                  {p.badge && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide shrink-0"
                      style={badgeStyle(p.badgeColor)}
                    >
                      {p.badge.replace(/^[^\w]+/, "")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: sub-models */}
          <div className="flex-1 overflow-y-scroll py-2 min-h-0 [scrollbar-gutter:stable]">
            {expanded?.subModels.map((s) => {
              const isSelected =
                selectedProviderId === expanded.id && selectedSubModelId === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelect(expanded.id, s.id);
                    setOpen(false);
                  }}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
                  style={{
                    background: isSelected ? "var(--c-accent-soft)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "var(--c-bg-2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: isSelected
                        ? "var(--c-accent)"
                        : "color-mix(in oklab, var(--c-fg-mute) 60%, transparent)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: "var(--c-fg)" }}
                      >
                        {s.name}
                      </span>
                      {s.isNew && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                          style={badgeStyle("orange")}
                        >
                          NEW
                        </span>
                      )}
                      {s.badge && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                          style={badgeStyle("green")}
                        >
                          {s.badge}
                        </span>
                      )}
                    </div>
                    {s.desc && (
                      <div
                        className="text-[12px] mt-0.5"
                        style={{ color: "var(--c-fg-dim)" }}
                      >
                        {s.desc}
                      </div>
                    )}
                    <div
                      className="flex items-center gap-3 mt-1.5 text-[11px]"
                      style={{ color: "var(--c-fg-mute)" }}
                    >
                      {s.time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock size={10} strokeWidth={1.8} />
                          {s.time}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                        <Zap size={10} strokeWidth={1.8} />
                        {s.credits} кредитов
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <Check
                      size={16}
                      strokeWidth={2}
                      style={{ color: "var(--c-accent)" }}
                      className="shrink-0 mt-1"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
