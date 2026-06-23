import { Placeholder } from "@/shared/ui/era";

interface Scenario {
  name: string;
  gradient: string;
}

interface ScenariosCarouselProps {
  title: string;
  scenarios: Scenario[];
}

const tones: Array<"rust" | "coal" | "ember"> = ["rust", "ember", "coal"];

export function ScenariosCarousel({ title, scenarios }: ScenariosCarouselProps) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{title}</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] cursor-pointer text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
          Все →
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {scenarios.map((s, i) => (
          <div key={s.name} className="shrink-0 w-[220px] cursor-pointer hover:scale-[1.02] transition-transform duration-200">
            <Placeholder tone={tones[i % tones.length]} aspect="4/3" label="USE CASE" />
            <div className="pt-3">
              <span className="text-[14px] font-semibold text-[hsl(var(--foreground))]">{s.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
