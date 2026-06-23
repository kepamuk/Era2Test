import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children: React.ReactNode
}

/**
 * ERA2 Chip — pill filter button. Use for tags, filters, segmented controls.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ active = false, children, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-active={active}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 h-7 rounded-full",
        "text-[13px] font-medium leading-none",
        "border transition-colors duration-200",
        active
          ? "bg-accent border-primary text-[#ff7a3d]"
          : "bg-card border-[hsl(var(--border))] text-muted-foreground hover:text-foreground hover:border-[hsl(20_17%_20%)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Chip.displayName = "Chip"
