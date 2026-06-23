import { Link } from "@/shared/routing";
import type { LucideIcon } from "lucide-react";

export interface ToolItem {
  Icon?: LucideIcon;
  label: string;
}

interface ToolsCarouselProps {
  title: string;
  tools: ToolItem[];
  moreLink?: string;
}

export function ToolsCarousel({ title, tools, moreLink = "/toolkit" }: ToolsCarouselProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link to={moreLink} className="text-sm text-primary hover:underline">Посмотреть больше →</Link>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {tools.map((t) => (
          <div
            key={t.label}
            className="shrink-0 w-[160px] h-[100px] border border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
          >
            {t.Icon ? <t.Icon size={24} strokeWidth={1.75} style={{ color: "hsl(var(--primary))" }} /> : null}
            <span className="text-xs text-center px-2">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
