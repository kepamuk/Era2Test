import { useState, useEffect, useRef } from "react";
import { Bell, Sparkles, Gift, Zap, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface Notification {
  id: string;
  icon: "gift" | "spark" | "zap" | "info";
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const defaultNotifications: Notification[] = [
  { id: "1", icon: "gift", title: "Добро пожаловать в ERA2!", desc: "Вам начислено 100 бесплатных кредитов. Попробуйте сгенерировать первое изображение.", time: "Сейчас", read: false },
  { id: "2", icon: "spark", title: "Новая модель: Nano Banana 2", desc: "Премиум генерация изображений с неизменными персонажами. Попробуйте!", time: "1 час назад", read: false },
  { id: "3", icon: "zap", title: "Seedream 5 Lite — уже доступна", desc: "Мультимодальная модель ByteDance для генерации из текста и редактирования.", time: "3 часа назад", read: true },
  { id: "4", icon: "info", title: "Обновление тарифов", desc: "Добавлен бесплатный тариф «Старт» с 100 кредитами. Пригласите друга — получите ещё 100.", time: "Вчера", read: true },
];

const iconMap = { gift: Gift, spark: Sparkles, zap: Zap, info: Info };

const iconBtn =
  "relative w-9 h-9 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors flex items-center justify-center";

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => { setOpen(!open); if (!open) markAllRead(); }}
        className={iconBtn}
        aria-label="Уведомления"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[10px] font-mono font-semibold flex items-center justify-center"
            style={{ boxShadow: "0 0 6px var(--c-accent)" }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-[380px] max-h-[480px] overflow-y-auto rounded-[14px] border shadow-2xl z-50"
            style={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0" style={{ background: "hsl(var(--popover))" }}>
              <h3 className="text-sm font-semibold text-foreground">Уведомления</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[12px] text-[hsl(var(--primary))] hover:underline">
                  Прочитать все
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center px-4">
                <Bell className="w-8 h-8 text-muted-foreground mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">Нет уведомлений</p>
              </div>
            ) : (
              <div className="p-1.5">
                {notifications.map((n) => {
                  const IconComp = iconMap[n.icon];
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "group relative flex gap-3 p-3 rounded-[8px] transition-colors hover:bg-secondary",
                        !n.read && "bg-[rgba(232,84,32,0.06)]"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(232,84,32,0.12)" }}>
                        <IconComp className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                      </div>
                      <div className="flex-1 min-w-0 pr-5">
                        <h4 className="text-[13px] font-semibold text-foreground mb-0.5">{n.title}</h4>
                        <p className="text-[12px] text-muted-foreground leading-snug">{n.desc}</p>
                        <p className="text-[11px] text-muted-foreground mt-1 font-mono">{n.time}</p>
                      </div>
                      <button
                        onClick={() => dismiss(n.id)}
                        className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-card transition-all"
                        aria-label="Скрыть"
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
