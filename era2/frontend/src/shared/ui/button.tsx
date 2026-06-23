import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-full shadow-[0_6px_24px_-6px_rgba(232,84,32,0.4),inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-[#ff7a3d] hover:-translate-y-px active:translate-y-0",
        ghost:
          "bg-card text-foreground rounded-full border border-[hsl(var(--border))] hover:bg-secondary hover:border-[hsl(20_17%_20%)]",
        quiet:
          "text-muted-foreground hover:text-foreground bg-transparent rounded-full",
        outline:
          "border border-[hsl(var(--border))] bg-transparent text-foreground rounded-full hover:bg-secondary hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full hover:bg-[hsl(15_13%_12%)]",
        destructive:
          "bg-destructive text-destructive-foreground rounded-full shadow-sm hover:bg-destructive/90",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px] [&_svg]:size-3.5",
        default: "h-10 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-7 text-base [&_svg]:size-[18px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
