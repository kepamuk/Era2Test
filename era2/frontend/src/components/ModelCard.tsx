import { useNavigate } from "@/shared/routing";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/shared/ui/era";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import type { SearchableModel } from "@/config/searchableModels";
import { cn } from "@/shared/lib/utils";

// rough seconds-to-render estimate per type (декоративно)
const approxSeconds: Record<SearchableModel["type"], number> = {
  text: 4,
  image: 12,
  video: 60,
  audio: 25,
};

export function ModelCard({ model }: { model: SearchableModel }) {
  const navigate = useNavigate();

  const routeMap: Record<SearchableModel["type"], string> = {
    text: "/text",
    image: "/design",
    video: "/video",
    audio: "/audio",
  };

  const handleClick = () => {
    navigate({ to: routeMap[model.type] as never });
  };

  const badgeVariant: "new" | "top" | "beta" | undefined = model.isNew ? "new" : undefined;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex-shrink-0 w-[280px] h-[320px] rounded-2xl border border-border",
        "bg-secondary hover:bg-card hover:border-primary/30 transition-all",
        "cursor-pointer p-5 flex flex-col justify-between group relative overflow-hidden",
        "snap-start text-left",
      )}
    >
      {/* top row: icon + badge */}
      <div className="flex items-start justify-between">
        <ModelGlyph name={model.name} size={56} />
        {badgeVariant && <StatusBadge variant={badgeVariant} />}
      </div>

      {/* center: name + provider */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{model.provider}</p>
      </div>

      {/* bottom: metric line */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-mono tabular-nums text-primary">
          от {model.credits} cr
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="font-mono tabular-nums text-muted-foreground">
          ~{approxSeconds[model.type]} сек
        </span>
      </div>

      {/* hover arrow */}
      <ArrowUpRight
        size={16}
        className={cn(
          "absolute top-5 right-5 text-muted-foreground transition-all duration-200",
          "group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          badgeVariant && "opacity-0",
        )}
      />
    </button>
  );
}
