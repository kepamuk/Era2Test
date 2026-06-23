import { useState, useRef, useEffect } from "react";
import { ChevronDown, Clock, Zap } from "lucide-react";
import { getModelIcon } from "@/shared/ui/era/ModelGlyph";

export interface SelectorSubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
  badge?: string;
  desc?: string;
  time?: string;
  isDefault?: boolean;
}

export interface SelectorProvider {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  subModels: SelectorSubModel[];
}

interface TwoPanelModelSelectorProps {
  providers: SelectorProvider[];
  selectedProviderId: string;
  selectedSubModelId: string;
  onSelect: (providerId: string, subModelId: string) => void;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

/* Badge color mapping */
function getBadgeStyle(badge: string): { bg: string; color: string } {
  const lower = badge.toLowerCase();
  if (lower.includes("топ") || lower.includes("top"))
    return { bg: "rgba(255, 122, 61,0.2)", color: "#ff7a3d" };
  if (lower.includes("off") || lower.includes("скидк"))
    return { bg: "rgba(52,211,153,0.2)", color: "#34d399" };
  if (lower.includes("new") || lower.includes("нов"))
    return { bg: "rgba(232, 84, 32,0.2)", color: "hsl(var(--primary))" };
  if (lower.includes("google"))
    return { bg: "rgba(96,165,250,0.2)", color: "#60a5fa" };
  if (lower.includes("openai"))
    return { bg: "rgba(255,255,255,0.1)", color: "var(--text-secondary)" };
  if (lower.includes("open source"))
    return { bg: "rgba(74,222,128,0.2)", color: "#4ade80" };
  if (lower.includes("premium"))
    return { bg: "rgba(232, 84, 32,0.2)", color: "hsl(var(--primary))" };
  if (lower.includes("sota"))
    return { bg: "rgba(96,165,250,0.2)", color: "#60a5fa" };
  if (lower.includes("creative"))
    return { bg: "rgba(255, 122, 61,0.2)", color: "#ff7a3d" };
  if (lower.includes("xai"))
    return { bg: "rgba(96,165,250,0.2)", color: "#60a5fa" };
  return { bg: "rgba(255,255,255,0.1)", color: "var(--text-secondary)" };
}

/* Provider dot colors */
const PROVIDER_DOT_COLORS: Record<string, string> = {
  "kling": "#ffb27a",
  "seedance": "#34d399",
  "veo": "#60a5fa",
  "sora": "#ffffff",
  "wan": "#4ade80",
  "hailuo": "#f59e0b",
  "vidu": "hsl(var(--primary))",
  "nano-banana": "#facc15",
  "midjourney": "#3b82f6",
  "seedream": "#a78bfa",
  "gpt-image": "#10b981",
  "flux": "#f97316",
  "runway": "#ff7a3d",
  "imagen": "#60a5fa",
  "higgsfield": "hsl(var(--primary))",
  "kling-image": "#ffb27a",
};

function getProviderDotColor(providerId: string): string {
  return PROVIDER_DOT_COLORS[providerId] || "hsl(var(--primary))";
}

export function TwoPanelModelSelector({
  providers, selectedProviderId, selectedSubModelId, onSelect, triggerButtonRef,
}: TwoPanelModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number }>({ left: 0, top: 0 });
  const [activeProvider, setActiveProvider] = useState(selectedProviderId);
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
    if (providerId === activeProvider) return;
    clearProviderHoverTimer();
    providerHoverTimer.current = window.setTimeout(() => {
      setActiveProvider((prev) => (prev === providerId ? prev : providerId));
      providerHoverTimer.current = null;
    }, 70);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      if (popupRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Position dropdown via fixed coords (escapes overflow:hidden parents)
  const [width, setWidth] = useState(640);
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const compute = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const dropdownH = 420 + 8;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const upward = spaceBelow < dropdownH && spaceAbove > spaceBelow;
      const w = Math.min(640, window.innerWidth - 16);
      setWidth(w);
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - w - 8);
      if (upward) {
        setPos({ left, bottom: window.innerHeight - rect.top + 4 });
      } else {
        setPos({ left, top: rect.bottom + 4 });
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

  useEffect(() => { setActiveProvider(selectedProviderId); }, [selectedProviderId]);

  useEffect(() => clearProviderHoverTimer, []);

  const currentProvider = providers.find((p) => p.id === selectedProviderId);
  const currentSub = currentProvider?.subModels.find((s) => s.id === selectedSubModelId);
  const hoverProvider = providers.find((p) => p.id === activeProvider);

  return (
    <div ref={ref} className="relative">
      {(() => {
        const PillIcon = getModelIcon(currentProvider?.name || "");
        return (
          <button
            ref={(node) => {
              triggerRef.current = node;
              if (triggerButtonRef) triggerButtonRef.current = node;
            }}
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] whitespace-nowrap transition-colors"
            style={{ background: "var(--bg-pill)", color: "var(--text-primary)", border: "1px solid var(--border-primary)" }}
          >
            <PillIcon size={14} style={{ color: "hsl(var(--primary))" }} />
            <span className="truncate max-w-[180px]">{currentSub?.name || currentProvider?.name}</span>
            <ChevronDown size={12} style={{ color: "var(--text-tertiary)" }} />
          </button>
        );
      })()}
      {open && (
        <div
          ref={popupRef}
          className="fixed z-[100] flex flex-col overflow-hidden"
          style={{
            left: pos.left,
            ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
            width,
            height: "min(420px, calc(100vh - 16px))",
            background: "var(--bg-popup)",
            border: "1px solid var(--border-primary)",
            borderRadius: 12,
            boxShadow: "var(--shadow-dropdown)",
          }}
        >
          {/* Header */}
          <div style={{ padding: "12px 16px 8px", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-primary)" }}>
            Модели
          </div>

          {/* Two columns */}
          <div className="flex flex-1 min-h-0">
            {/* Left: providers */}
            <div className="flex-shrink-0 overflow-y-auto w-[180px] sm:w-[220px]" style={{ borderRight: "1px solid var(--border-primary)", paddingTop: 8 }}>
              {providers.map((p) => {
                const isActive = activeProvider === p.id;
                const isSelected = selectedProviderId === p.id;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => scheduleProviderHover(p.id)}
                    onMouseLeave={clearProviderHoverTimer}
                    onClick={() => {
                      clearProviderHoverTimer();
                      const def = p.subModels.find((s) => s.isDefault) || p.subModels[0];
                      onSelect(p.id, def.id);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-[8px] text-left"
                    style={{
                      height: 36,
                      padding: "0 12px",
                      background: isActive ? "rgba(232, 84, 32,0.1)" : "transparent",
                      borderLeft: isSelected ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                      color: isSelected ? "hsl(var(--primary))" : "var(--text-primary)",
                    }}
                  >
                    {(() => {
                      const PIcon = getModelIcon(p.name);
                      return <PIcon size={14} style={{ color: isSelected ? "hsl(var(--primary))" : "var(--text-secondary)", flexShrink: 0 }} />;
                    })()}
                    <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>{p.name}</span>
                    {p.badge && (() => {
                      const s = getBadgeStyle(p.badge);
                      return (
                        <span className="shrink-0" style={{ fontSize: 9, padding: "1px 4px", borderRadius: 4, background: s.bg, color: s.color, fontWeight: 600 }}>
                          {p.badge}
                        </span>
                      );
                    })()}
                  </button>
                );
              })}
            </div>

            {/* Right: sub-models, scrollable */}
            <div
              className="flex-1 submodel-scroll-container"
              style={{ minHeight: 0, paddingTop: 8, overflowY: "scroll", scrollbarGutter: "stable" }}
            >
              {hoverProvider?.subModels.map((s, i) => {
                const isSelected = selectedSubModelId === s.id && selectedProviderId === hoverProvider.id;
                const badgeStyle = s.badge ? getBadgeStyle(s.badge) : s.isNew ? getBadgeStyle("NEW") : null;
                const dotColor = getProviderDotColor(hoverProvider.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => { onSelect(hoverProvider.id, s.id); setOpen(false); }}
                    className="w-full flex items-center gap-2 text-left transition-colors"
                    style={{
                      height: 68,
                      padding: "10px 16px",
                      background: isSelected ? "rgba(232, 84, 32,0.08)" : "transparent",
                      borderBottom: "1px solid var(--border-secondary)",
                    }}
                    onMouseOver={(e) => {
                      if (!isSelected) (e.currentTarget.style.background = "var(--bg-card-hover)");
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) (e.currentTarget.style.background = isSelected ? "rgba(232, 84, 32,0.08)" : "transparent");
                    }}
                  >
                    <span
                      className="shrink-0"
                      style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: dotColor, marginRight: 8, flexShrink: 0,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</span>
                        {badgeStyle && (
                          <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: badgeStyle.bg, color: badgeStyle.color, fontWeight: 700 }}>
                            {s.isNew && !s.badge ? "NEW" : s.badge}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: 12, color: "var(--text-tertiary)",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        maxWidth: 320, marginTop: 2,
                      }}>
                        {s.desc || "—"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }} className="font-mono tabular-nums inline-flex items-center gap-2">
                        <span className="inline-flex items-center gap-1"><Clock size={10} /> {s.time || "20 сек"}</span>
                        <span style={{ opacity: 0.5 }}>·</span>
                        <span className="inline-flex items-center gap-1" style={{ color: "hsl(var(--primary))" }}><Zap size={10} /> {s.credits} cr</span>
                      </div>
                    </div>
                    {isSelected && <span style={{ color: "hsl(var(--primary))", fontSize: 16, flexShrink: 0 }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
