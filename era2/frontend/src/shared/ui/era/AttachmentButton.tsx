import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export interface AttachmentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  current?: number
  max?: number
}

/**
 * ERA2 AttachmentButton — dashed square 56×56 with Plus and counter "0/N".
 */
export const AttachmentButton = React.forwardRef<
  HTMLButtonElement,
  AttachmentButtonProps
>(({ current = 0, max, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "w-14 h-14 shrink-0 rounded-2xl border border-dashed border-[hsl(var(--border))]",
      "flex flex-col items-center justify-center gap-0.5",
      "text-[hsl(var(--muted-foreground))]",
      "hover:border-[hsl(var(--primary))]/60 hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]/30",
      "transition-colors duration-150",
      className
    )}
    {...props}
  >
    <Plus className="w-4 h-4" />
    {typeof max === "number" && max > 0 && (
      <span className="font-mono text-[10px] tabular-nums leading-none">
        {current}/{max}
      </span>
    )}
  </button>
))
AttachmentButton.displayName = "AttachmentButton"
