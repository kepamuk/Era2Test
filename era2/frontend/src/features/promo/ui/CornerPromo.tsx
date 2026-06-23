import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "@/shared/routing";
import { motion, AnimatePresence } from "framer-motion";

export function CornerPromo() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 3600);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("era2_corner_dismissed") === "true") return;

    const timer = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(
      () => setTimeLeft((prev) => Math.max(0, prev - 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem("era2_corner_dismissed", "true");
    setVisible(false);
  };

  const hours = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[60] w-[calc(100vw-24px)] sm:w-[320px] max-w-[340px] rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
          role="dialog"
          aria-label="Промо предложение"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Закрыть"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X size={14} strokeWidth={2} />
          </button>

          <div
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-white mb-3"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
          >
            Только сегодня
          </div>

          <h3 className="text-[17px] font-semibold text-foreground leading-tight">
            −30% на тариф «Про»
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug">
            Ваш персональный промокод на первый месяц
          </p>

          <div className="mt-3 mb-4 flex items-center justify-between rounded-[10px] bg-secondary px-3 py-2">
            <span className="text-[11px] text-muted-foreground">Истекает через</span>
            <span className="font-mono text-[13px] font-semibold text-foreground tabular-nums">
              {pad(hours)}:{pad(mins)}:{pad(secs)}
            </span>
          </div>

          <Link
            to="/pricing"
            onClick={dismiss}
            className="flex items-center justify-center w-full h-10 rounded-[10px] text-[13px] font-medium text-white transition-transform hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
          >
            Забрать скидку
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
