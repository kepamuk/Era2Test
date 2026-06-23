import { cn } from "@/shared/lib/utils";

interface GenerationSpinnerProps {
  size?: number;
  className?: string;
}

/** Оранжевый дуговой спиннер — Figma Status bar · состояния */
export function GenerationSpinner({ size = 18, className }: GenerationSpinnerProps) {
  return (
    <span
      className={cn("inline-block shrink-0 animate-spin rounded-full", className)}
      style={{
        width: size,
        height: size,
        background:
          "conic-gradient(from 45deg, var(--c-accent-2) 0deg 270deg, transparent 270deg 360deg)",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
      }}
      aria-hidden
    />
  );
}
