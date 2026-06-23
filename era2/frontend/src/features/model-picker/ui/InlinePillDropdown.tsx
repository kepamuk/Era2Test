import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
  desc?: string;
}

interface InlinePillDropdownProps {
  icon?: React.ReactNode;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
  className?: string;
}

export function InlinePillDropdown({
  icon,
  value,
  options,
  onSelect,
  className,
}: InlinePillDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-[12px] font-medium whitespace-nowrap transition-all",
          open
            ? "ring-1 ring-[hsl(var(--primary))]/40 border-[hsl(var(--primary))]/40"
            : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/30",
          "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] border",
          className,
        )}
      >
        {icon && (
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 opacity-70 [&_svg]:w-3.5 [&_svg]:h-3.5">
            {icon}
          </span>
        )}
        <span className="font-mono tabular-nums leading-none">
          {current?.label || value}
        </span>
        <ChevronDown
          size={12}
          className={cn(
            "opacity-60 transition-transform duration-150",
            open ? "rotate-180" : "",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute bottom-full left-0 mb-2 z-50 min-w-[180px] rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--popover))] p-1.5 shadow-2xl"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-[8px] text-[12px] transition-colors flex flex-col gap-0.5",
                  value === opt.value
                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium"
                    : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]",
                )}
              >
                <span className="font-mono tabular-nums">{opt.label}</span>
                {opt.desc && (
                  <span className="text-[11px] text-[hsl(var(--muted-foreground))] font-normal">
                    {opt.desc}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
