import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface PillOption {
  value: string;
  label: string;
}

interface PillDropdownProps {
  icon?: ReactNode;
  value: string;
  options: PillOption[];
  onSelect: (v: string) => void;
}

export function PillDropdown({ icon, value, options, onSelect }: PillDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[13px] font-medium whitespace-nowrap leading-none transition-colors text-foreground"
        style={{ background: "var(--bg-pill)", border: "1px solid var(--border-primary)" }}
      >
        {icon && <span className="inline-flex items-center justify-center w-4 h-4 text-[14px] leading-none shrink-0">{icon}</span>}
        <span className="leading-none">{value}</span>
        <ChevronDown size={12} className="shrink-0 opacity-60" />
      </button>
      {open && (
        <div
          className="absolute bottom-full left-0 mb-1 w-40 rounded-xl z-50 p-1"
          style={{ background: "var(--bg-popup)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-dropdown)" }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => { onSelect(o.value); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                value === o.value ? "bg-[rgba(232, 84, 32,0.15)] text-[hsl(var(--primary))]" : ""
              )}
              style={value !== o.value ? { color: "var(--text-secondary)" } : undefined}
              onMouseOver={(e) => { if (value !== o.value) e.currentTarget.style.background = "var(--bg-card-hover)"; }}
              onMouseOut={(e) => { if (value !== o.value) e.currentTarget.style.background = "transparent"; }}
            >
              <span>{o.label}</span>
              {value === o.value && <span className="text-[hsl(var(--primary))] text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
