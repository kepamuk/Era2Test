import { useState, useEffect } from "react";
import { X, Gift, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = [
  { day: 1, credits: 2 },
  { day: 2, credits: 2 },
  { day: 3, credits: 3 },
  { day: 4, credits: 3 },
  { day: 5, credits: 4 },
  { day: 6, credits: 4 },
  { day: 7, credits: 15, isBonus: true },
];

export function DailyCheckIn() {
  const [open, setOpen] = useState(false);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const last = localStorage.getItem("era2_checkin_date");
    const today = new Date().toDateString();
    if (last === today) return;

    const savedStreak = parseInt(localStorage.getItem("era2_checkin_streak") || "0");
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = last === yesterday ? Math.min(savedStreak + 1, 7) : 1;

    setStreak(newStreak);
    const t = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleCheckin = () => {
    localStorage.setItem("era2_checkin_date", new Date().toDateString());
    localStorage.setItem("era2_checkin_streak", String(streak));
    setOpen(false);
  };

  const current = DAYS[streak - 1];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[400px] max-w-[90vw] rounded-[20px] p-6 text-center"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-4xl mb-3">🔥</div>

            <h2 className="text-xl font-bold text-foreground mb-1">
              Заходите 7 дней подряд
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              и получите до 33 кредитов бесплатно
            </p>

            <div
              className="rounded-[12px] p-3 mb-5 flex items-center justify-center gap-2"
              style={{
                background: "rgba(232,84,32,0.1)",
                border: "1px solid rgba(232,84,32,0.2)",
              }}
            >
              <span className="text-sm text-foreground">
                Вы на <span className="font-semibold">{streak}-м</span> дне
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{ color: "hsl(var(--primary))" }}
              >
                +{current.credits} cr
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 mb-6">
              {DAYS.map((d) => {
                const done = d.day < streak;
                const active = d.day === streak;
                return (
                  <div key={d.day} className="flex flex-col items-center gap-1">
                    <div
                      className="w-full aspect-square rounded-[10px] flex items-center justify-center text-[11px] font-semibold transition-colors"
                      style={{
                        background: done
                          ? "hsl(var(--primary))"
                          : active
                            ? "rgba(232,84,32,0.15)"
                            : "hsl(var(--secondary))",
                        border: active
                          ? "1px solid hsl(var(--primary))"
                          : "1px solid hsl(var(--border))",
                        color: done
                          ? "white"
                          : active
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {done ? (
                        <Check size={14} />
                      ) : d.isBonus ? (
                        <Gift size={14} />
                      ) : (
                        `+${d.credits}`
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      День {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleCheckin}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[14px] text-sm font-semibold text-white transition-all hover:opacity-95"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                boxShadow: "0 8px 22px -8px rgba(232,84,32,0.55)",
              }}
            >
              Забрать +{current.credits} кредитов
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
