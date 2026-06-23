import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

/**
 * ERA2 Eyebrow — capsule with mono dot + uppercase label.
 * Use above section headlines: <Eyebrow>CATEGORY · LABEL</Eyebrow>
 */
export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  ({ children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "border border-[hsl(20_17%_20%)] bg-card",
        "font-mono text-[12px] font-medium uppercase tracking-[0.14em]",
        "text-[#ff7a3d]",
        className
      )}
      {...props}
    >
      <span
        className="size-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 10px hsl(var(--primary))" }}
        aria-hidden
      />
      {children}
    </span>
  )
)
Eyebrow.displayName = "Eyebrow"
