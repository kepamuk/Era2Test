import { useState } from "react";
import { X, Gift, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReferralPopup({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const refLink = "https://era2.ai/ref/USER123";

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[420px] max-w-[90vw] rounded-[20px] p-6 text-center shadow-2xl"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
          role="dialog"
          aria-label="Пригласить друга"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>

          <div
            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white mb-4"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
          >
            <Gift size={26} strokeWidth={1.8} />
          </div>

          <h3 className="text-[20px] font-semibold text-foreground">Пригласить друга</h3>
          <p className="text-[13px] text-muted-foreground mt-1.5">
            и зарабатывайте бесплатные кредиты
          </p>

          <div className="grid grid-cols-2 gap-2.5 mt-5">
            <div
              className="rounded-[12px] p-3 text-left"
              style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}
            >
              <div className="text-[18px] mb-1">📩</div>
              <div className="text-[12px] font-semibold text-foreground">Регистрация</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Друг создаёт аккаунт</div>
              <div
                className="text-[12px] font-mono font-semibold mt-1.5"
                style={{ color: "hsl(var(--primary))" }}
              >
                +30 кредитов
              </div>
            </div>
            <div
              className="rounded-[12px] p-3 text-left"
              style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}
            >
              <div className="text-[18px] mb-1">⭐</div>
              <div className="text-[12px] font-semibold text-foreground">Подписка</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Друг оформляет план</div>
              <div
                className="text-[12px] font-mono font-semibold mt-1.5"
                style={{ color: "hsl(var(--primary))" }}
              >
                +50 кредитов
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 mt-5 rounded-[10px] p-1 pl-3"
            style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}
          >
            <span className="flex-1 text-left text-[12px] font-mono text-foreground truncate">
              {refLink}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Скопировать ссылку"
              className="w-9 h-9 rounded-[8px] flex items-center justify-center text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
            >
              {copied ? <Check size={14} strokeWidth={2.2} /> : <Copy size={14} strokeWidth={2} />}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full h-11 rounded-[12px] text-[14px] font-medium text-white transition-transform hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
          >
            Порекомендуйте сейчас
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
