import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/shared/lib/utils"

/**
 * ERA2 SegmentedToolbar — single capsule bar with internal dividers.
 * Use under prompt inputs for model / aspect / quantity / quality / more.
 *
 * Usage:
 *   <SegmentedToolbar>
 *     <SegmentedToolbar.Item icon={<Banana />} label="Nano Banana 2" onClick={...} />
 *     <SegmentedToolbar.Item label="1:1" onClick={...} />
 *     <SegmentedToolbar.Item label="..." trailing={null} />
 *   </SegmentedToolbar>
 */
export const SegmentedToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-stretch h-10 rounded-full relative",
      "bg-[hsl(var(--secondary))] border border-[hsl(var(--border))]",
      "divide-x divide-[hsl(var(--border))]",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SegmentedToolbar.displayName = "SegmentedToolbar"

export interface SegmentedItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label?: React.ReactNode
  active?: boolean
  trailing?: React.ReactNode | null
}

export const SegmentedItem = React.forwardRef<HTMLButtonElement, SegmentedItemProps>(
  ({ icon, label, active, trailing, className, children, ...props }, ref) => {
    const showChevron = trailing === undefined
    return (
      <button
        ref={ref}
        type="button"
        data-active={active}
        className={cn(
          "group inline-flex items-center gap-1.5 px-3 h-full text-sm font-medium",
          "transition-colors duration-150 whitespace-nowrap",
          "first:pl-4 last:pr-4 first:rounded-l-full last:rounded-r-full",
          active
            ? "bg-[hsl(var(--card))] text-[hsl(var(--foreground))]"
            : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] hover:text-[hsl(var(--foreground))]",
          className
        )}
        {...props}
      >
        {icon && (
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 [&_svg]:w-3.5 [&_svg]:h-3.5 shrink-0">
            {icon}
          </span>
        )}
        {label != null && <span className="leading-none">{label}</span>}
        {children}
        {trailing !== null &&
          (trailing ?? (showChevron ? (
            <ChevronDown className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100" />
          ) : null))}
      </button>
    )
  }
)
SegmentedItem.displayName = "SegmentedItem"

;(SegmentedToolbar as typeof SegmentedToolbar & { Item: typeof SegmentedItem }).Item = SegmentedItem
