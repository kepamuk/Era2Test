import { cn } from "@/shared/lib/utils";
import { Zap } from "lucide-react";

export interface GridModel {
  name: string;
  desc: string;
  isNew?: boolean;
  icon?: string;
  credits?: number;
}

interface ModelsGridProps {
  title: string;
  models: GridModel[];
  onSelect?: (name: string) => void;
}

export function ModelsGrid({ title, models, onSelect }: ModelsGridProps) {
  return (
    <div>
      <h2 className="text-[20px] font-bold mb-4" style={{ color: "var(--text-primary)" }}>{title}</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {models.map((m) => (
          <div
            key={m.name}
            onClick={() => onSelect?.(m.name)}
            className="shrink-0 min-w-[200px] rounded-xl p-3 transition-colors cursor-pointer flex items-center gap-3"
            style={{ border: "1px solid var(--border-primary)", background: "var(--bg-card-hover)" }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border-primary)"; }}
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[#ff7a3d] flex items-center justify-center text-white text-sm shrink-0">
              {m.icon || "✦"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>{m.name}</span>
                {m.isNew && (
                  <span className="text-[8px] bg-gradient-to-r from-[hsl(var(--primary))] to-[#ff7a3d] text-white px-1 py-0.5 rounded-full font-bold shrink-0">NEW</span>
                )}
              </div>
              <p className="text-[11px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: "var(--text-tertiary)" }}>{m.desc}</p>
            </div>
            {m.credits !== undefined && (
              <span className="text-[12px] font-mono shrink-0 flex items-center gap-0.5" style={{ color: "var(--text-tertiary)" }}>
                <Zap size={10} /> {m.credits}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
