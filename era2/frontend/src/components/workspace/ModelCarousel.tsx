import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselModel {
  name: string;
  desc: string;
  gradient: string;
  badge?: string;
}

interface ModelCarouselProps {
  models: CarouselModel[];
  onSelect?: (name: string) => void;
}

export function ModelCarousel({ models, onSelect }: ModelCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
      >
        <ChevronLeft size={16} />
      </button>
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {models.map((m) => (
          <div
            key={m.name}
            onClick={() => onSelect?.(m.name)}
            className="shrink-0 w-[340px] h-[180px] rounded-2xl p-5 flex flex-col justify-end cursor-pointer hover:brightness-110 transition-[filter] relative overflow-hidden"
            style={{ background: m.gradient }}
          >
            {m.badge && (
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ff7a3d] text-white">
                {m.badge}
              </span>
            )}
            <h3
              className="text-white text-xl font-bold mb-1 uppercase"
              style={{ letterSpacing: "2px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              {m.name}
            </h3>
            <p className="text-white/70 text-sm">{m.desc}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
