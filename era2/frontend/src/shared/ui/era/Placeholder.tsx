import * as React from "react"
import { cn } from "@/shared/lib/utils"

type Tone = "rust" | "coal" | "ember"
type Aspect = "1/1" | "4/3" | "16/9" | "16/10" | "3/4" | "5/4"

export interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  aspect?: Aspect
  label?: string
}

const aspectClass: Record<Aspect, string> = {
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
}

const toneClass: Record<Tone, string> = {
  rust: "era-ph-rust",
  coal: "era-ph-coal",
  ember: "era-ph-ember",
}

/**
 * ERA2 Placeholder — diagonal-stripe block with mono label, replacing
 * stock images. Default tone: rust, default aspect: 16/9.
 */
export const Placeholder = React.forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ tone = "rust", aspect = "16/9", label, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-[hsl(var(--border))]",
        aspectClass[aspect],
        toneClass[tone],
        className
      )}
      {...props}
    >
      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#ff7a3d]/80">
          {label}
        </span>
      )}
    </div>
  )
)
Placeholder.displayName = "Placeholder"
