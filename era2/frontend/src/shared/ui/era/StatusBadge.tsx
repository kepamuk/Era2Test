import * as React from "react"
import { cn } from "@/shared/lib/utils"

type Variant = "new" | "top" | "beta" | "soon" | "pro"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: Variant
  children?: React.ReactNode
}

const labels: Record<Variant, string> = {
  new: "NEW",
  top: "TOP",
  beta: "BETA",
  soon: "SOON",
  pro: "PRO",
}

const styles: Record<Variant, string> = {
  new:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  top:  "bg-primary/15 text-[#ff7a3d] border-primary/40 shadow-[0_0_12px_rgba(232,84,32,0.25)]",
  beta: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  soon: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  pro:  "bg-amber-500/15 text-amber-300 border-amber-500/40",
}

/**
 * ERA2 StatusBadge — compact mono pill for NEW / TOP / BETA / SOON / PRO labels.
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ variant, children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border",
        "font-mono text-[10px] font-bold uppercase tracking-[0.14em] leading-none",
        styles[variant],
        className
      )}
      {...props}
    >
      {children ?? labels[variant]}
    </span>
  )
)
StatusBadge.displayName = "StatusBadge"
