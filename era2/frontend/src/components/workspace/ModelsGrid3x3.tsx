import { StatusBadge } from "@/shared/ui/era";
import { ModelGlyph, CreditTag } from "@/shared/ui/era/ModelGlyph";

export interface GridModel3x3 {
  name: string;
  desc: string;
  icon?: string;
  iconColor?: string;
  badges?: string[];
  isNew?: boolean;
  credits?: number;
}

interface ModelsGrid3x3Props {
  models: GridModel3x3[];
  onSelect?: (name: string) => void;
}

export function ModelsGrid3x3({ models, onSelect }: ModelsGrid3x3Props) {
  return (
    <div className="mt-10">
      <h2 className="text-[18px] font-bold mb-5 tracking-tight" style={{ color: "var(--text-primary)" }}>Модели</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {models.map((m) => (
          <div
            key={m.name}
            onClick={() => onSelect?.(m.name)}
            className="flex items-center gap-3 p-3 rounded-[14px] cursor-pointer transition-colors hover:bg-[hsl(var(--secondary))]"
            style={{ boxShadow: "var(--card-shadow-light)" }}
          >
            <ModelGlyph name={m.name} size={40} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>{m.name}</span>
                {m.isNew && <StatusBadge variant="new" />}
                {m.badges?.map((b) => {
                  const isOff = /off/i.test(b);
                  return <StatusBadge key={b} variant={isOff ? "top" : "beta"}>{b}</StatusBadge>;
                })}
              </div>
              <p className="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ color: "var(--text-tertiary)" }}>{m.desc}</p>
            </div>
            {m.credits !== undefined && <CreditTag value={m.credits} className="shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
