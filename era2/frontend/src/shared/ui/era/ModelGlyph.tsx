import {
  Banana, Sailboat, Wand2, Sparkles, Bot, Zap, Film, Camera, Flame, Palette,
  MessageCircle, Image as ImageIcon, Video, Mic, Music, Search, Brain,
  Compass, Waves, Square, Star, Layers, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* Map model / provider name → lucide icon */
const ICON_BY_KEY: Record<string, LucideIcon> = {
  // image
  "nano banana": Banana,
  "midjourney": Sailboat,
  "seedream": Wand2,
  "gpt image": Bot,
  "flux": Zap,
  "runway": Film,
  "imagen": Camera,
  "higgsfield": Flame,
  "kling image": Palette,
  "kling v3 omni": Palette,
  // video
  "kling": Film,
  "seedance": Layers,
  "veo": Waves,
  "sora": Square,
  "wan": Compass,
  "wan ai": Compass,
  "hailuo": Star,
  "vidu": Film,
  // text
  "chatgpt": Sparkles,
  "claude": Brain,
  "gemini": Sparkles,
  "deepseek": Search,
  "grok": Zap,
  "perplexity": Search,
  // audio
  "elevenlabs": Mic,
  "suno": Music,
  // categories
  "text": MessageCircle,
  "image": ImageIcon,
  "video": Video,
  "audio": Mic,
};

export function getModelIcon(name: string): LucideIcon {
  const key = name.toLowerCase().trim();
  if (ICON_BY_KEY[key]) return ICON_BY_KEY[key];
  for (const [k, Icon] of Object.entries(ICON_BY_KEY)) {
    if (key.startsWith(k) || key.includes(k)) return Icon;
  }
  return Sparkles;
}

interface ModelGlyphProps {
  name: string;
  size?: number;
  className?: string;
}

/** Square rust-tinted tile with a lucide icon — replaces emoji avatars. */
export function ModelGlyph({ name, size = 40, className = "" }: ModelGlyphProps) {
  const Icon = getModelIcon(name);
  const iconSize = Math.round(size * 0.5);
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[8px] shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: "rgba(232, 84, 32, 0.1)",
        color: "hsl(var(--primary))",
        border: "1px solid rgba(232, 84, 32, 0.18)",
      }}
    >
      <Icon size={iconSize} strokeWidth={1.75} />
    </span>
  );
}

/** Inline mono credit chip: "75 cr" — replaces "⚡ 75". */
export function CreditTag({ value, className = "" }: { value: number | string; className?: string }) {
  return (
    <span
      className={`font-mono tabular-nums text-[11px] inline-flex items-center gap-1 ${className}`}
      style={{ color: "hsl(var(--primary))", letterSpacing: "-0.01em" }}
    >
      {value}<span style={{ opacity: 0.55 }}>cr</span>
    </span>
  );
}
