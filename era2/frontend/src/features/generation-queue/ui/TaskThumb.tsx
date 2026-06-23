import { Contrast, MessageSquare, Music, Play, type LucideIcon } from "lucide-react";
import type { GenType } from "@/entities/generation-task";
import { cn } from "@/shared/lib/utils";

const TYPE_ICONS: Record<GenType, LucideIcon> = {
  text: MessageSquare,
  image: Contrast,
  video: Play,
  audio: Music,
};

const MEDIA_TYPES = new Set<GenType>(["image", "video"]);

interface TaskThumbProps {
  type: GenType;
  size?: number;
  className?: string;
  tone?: "default" | "statusBar";
}

export function TaskThumb({ type, size = 56, className, tone = "default" }: TaskThumbProps) {
  const Icon = TYPE_ICONS[type];
  const isMedia = MEDIA_TYPES.has(type);
  const iconSize = Math.round(size * (20 / 56));
  const backgroundClass =
    tone === "statusBar" || isMedia ? "era-queue-thumb-media" : "era-queue-thumb-soft";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl shrink-0 overflow-hidden",
        backgroundClass,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon
        size={iconSize}
        className="text-[var(--c-accent-2)]"
        strokeWidth={type === "video" ? 0 : 1.75}
        fill={type === "video" ? "currentColor" : "none"}
      />
    </span>
  );
}
