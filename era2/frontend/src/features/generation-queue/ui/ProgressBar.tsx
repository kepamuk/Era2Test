import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  height?: "sm" | "md";
}

export function ProgressBar({ value, className, height = "md" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const prevValueRef = useRef(clamped);
  const shouldAnimateWidth = clamped >= prevValueRef.current;

  useEffect(() => {
    prevValueRef.current = clamped;
  }, [clamped]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-[var(--c-bg-3)]",
        height === "sm" ? "h-1" : "h-[5px]",
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full gradient-accent",
          shouldAnimateWidth && "transition-[width] duration-500 ease-linear",
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
