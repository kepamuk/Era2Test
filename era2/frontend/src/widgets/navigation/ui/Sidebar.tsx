import { Link, useLocation } from "@/shared/routing";
import {
  Home, Image, Video, MessageSquare, Mic, Bot, LayoutGrid, Layers,
  CreditCard, History, ChevronLeft, ChevronDown, X, ArrowRight, Gem, Plus, Gift, Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCopyToast } from "@/features/copy-toast";
import { StatusBadge } from "@/shared/ui/era/StatusBadge";
import { getHistoryItems } from "@/entities/history";
import { cn } from "@/shared/lib/utils";
import { ReferralPopup } from "@/features/promo";

interface RecentChat {
  id: string;
  title: string;
  type: "text" | "image" | "video" | "audio";
  time: Date;
}

const typeIcons: Record<"text" | "image" | "video" | "audio", React.ElementType> = {
  text: MessageSquare,
  image: Image,
  video: Video,
  audio: Mic,
};

const formatTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} мин`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ч`;
  const days = Math.floor(hours / 24);
  return `${days} д`;
};

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const genItems = [
  { icon: MessageSquare, label: "Текст", path: "/text" },
  { icon: Image, label: "Изображения", path: "/design" },
  { icon: Video, label: "Видео", path: "/video" },
  { icon: Mic, label: "Аудио", path: "/audio" },
];

const toolItems: Array<{ icon: React.ElementType; label: string; path: string; badge?: "new" | "soon" }> = [
  { icon: Bot, label: "Агенты / Ассистенты", path: "/agents" },
  { icon: LayoutGrid, label: "Все нейросети", path: "/toolkit" },
  { icon: Layers, label: "Инструменты", path: "/studios" },
];

const bottomItems = [
  { icon: CreditCard, label: "Тарифы", path: "/pricing" },
  { icon: History, label: "История", path: "/history" },
];

export function Sidebar({ open, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const copy = useCopyToast();
  const [recentOpen, setRecentOpen] = useState(true);
  const [showReferral, setShowReferral] = useState(false);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);

  useEffect(() => {
    let isActive = true;

    getHistoryItems({ limit: 8 }).then((items) => {
      if (!isActive) return;

      setRecentChats(
        items.map((item) => ({
          id: item.id,
          title: item.prompt.length > 35 ? item.prompt.slice(0, 35) + "..." : item.prompt,
          type: item.type,
          time: item.createdAt,
        })),
      );
    });

    return () => {
      isActive = false;
    };
  }, []);
  const isActive = (path: string) => location.pathname === path;

  const renderItem = (item: { icon: React.ElementType; label: string; path: string; badge?: "new" | "soon" }) => (
    <Link
      key={item.label}
      to={item.path}
      onClick={() => { if (window.innerWidth < 1024) onClose(); }}
      className={cn(
        "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
        collapsed && "justify-center px-2",
        isActive(item.path)
          ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-primary/40"
          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
      )}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate flex-1">{item.label}</span>}
      {!collapsed && item.badge === "new" && <StatusBadge variant="new" />}
      {!collapsed && item.badge === "soon" && <StatusBadge variant="soon">СКОРО</StatusBadge>}
    </Link>
  );

  const renderSection = (label: string, items: Array<{ icon: React.ElementType; label: string; path: string; badge?: "new" | "soon" }>) => (
    <>
      {!collapsed && label && (
        <div className="px-4 pt-5 pb-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            {label}
          </span>
        </div>
      )}
      {collapsed && <div className="h-3" />}
      {items.map(renderItem)}
    </>
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 flex flex-col transition-all duration-200",
          "bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))]",
          collapsed ? "w-14" : "w-[200px]",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo / mobile close */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[hsl(var(--sidebar-border))]">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className="flex items-center justify-center font-bold text-white select-none"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #E85420, #ff7a3d)",
                fontSize: 18,
                letterSpacing: "-0.02em",
                boxShadow: "0 2px 8px rgba(232, 84, 32, 0.3)",
              }}
            >
              E
            </span>
            {!collapsed && (
              <span className="text-[20px] font-semibold tracking-tight" style={{ color: "var(--c-fg)" }}>
                era<span style={{ color: "var(--c-accent-2)" }}>2</span>
                <span className="font-mono text-[13px] font-normal ml-0.5" style={{ color: "var(--c-fg-mute)" }}>.ai</span>
              </span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-[hsl(var(--secondary))]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Top: Home + New chat */}
        <div className="px-0 pt-3 space-y-0.5">
          {renderItem({ icon: Home, label: "Главная", path: "/" })}
          {!collapsed ? (
            <Link
              to="/text"
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className="flex items-center gap-2 mx-2 mt-2 px-3 py-2.5 rounded-[14px] text-sm font-medium transition-all"
              style={{
                background: "rgba(232, 84, 32, 0.08)",
                border: "1px solid rgba(232, 84, 32, 0.15)",
                color: "hsl(var(--primary))",
              }}
            >
              <Plus className="h-4 w-4" />
              Новый чат
            </Link>
          ) : (
            <Link
              to="/text"
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className="flex items-center justify-center mx-2 mt-2 h-9 rounded-full"
              style={{ background: "rgba(232, 84, 32, 0.08)", border: "1px solid rgba(232, 84, 32, 0.15)", color: "hsl(var(--primary))" }}
            >
              <Plus className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-thin">
          {renderSection("Генерация", genItems)}

          {/* Секция: Недавние чаты */}
          {!collapsed && (
            <>
              <div className="px-4 pt-5 pb-2 flex items-center justify-between">
                <button
                  onClick={() => setRecentOpen(!recentOpen)}
                  className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
                >
                  <ChevronDown
                    className={cn("h-3 w-3 transition-transform duration-200", !recentOpen && "-rotate-90")}
                  />
                  Недавние
                </button>
                <Link to="/history" className="text-muted-foreground hover:text-foreground" onClick={() => { if (window.innerWidth < 1024) onClose(); }}>
                  <History className="h-3 w-3" />
                </Link>
              </div>
              {recentOpen && (
                <>
                  <div className="space-y-0.5 max-h-[240px] overflow-y-auto scrollbar-thin">
                    {recentChats.map((chat) => {
                      const TypeIcon = typeIcons[chat.type] || MessageSquare;
                      return (
                        <Link
                          key={chat.id}
                          to="/history"
                          onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                          className="flex items-center gap-2.5 mx-2 px-3 py-2 rounded-[8px] text-sm transition-colors hover:bg-secondary group"
                        >
                          <TypeIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="flex-1 truncate text-[13px] text-foreground/90 group-hover:text-foreground">
                            {chat.title}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                            {formatTime(chat.time)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    to="/history"
                    onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                    className="flex items-center gap-2 mx-2 px-3 py-2 mt-1 text-[12px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                    Вся история
                  </Link>
                </>
              )}
            </>
          )}
          {collapsed && (
            <div className="flex justify-center py-3">
              <Link to="/history" className="p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => { if (window.innerWidth < 1024) onClose(); }}>
                <History className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          )}

          {renderSection("Инструменты", toolItems)}
          {renderSection("", bottomItems)}

          {!collapsed && (
            <div className="mx-3 mt-5 mb-3 p-3 rounded-[12px]" style={{ background: "rgba(232,84,32,0.06)", border: "1px solid rgba(232,84,32,0.15)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <Gift className="h-3.5 w-3.5" style={{ color: "hsl(var(--primary))" }} />
                <span className="text-[12px] font-semibold text-foreground">Пригласите друга</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug mb-2.5">
                Получите 100 кредитов за каждого приглашённого друга
              </p>
              <button
                onClick={() => setShowReferral(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[12px] font-medium transition-colors"
                style={{
                  background: "rgba(232, 84, 32, 0.1)",
                  color: "hsl(var(--primary))",
                  border: "1px solid rgba(232, 84, 32, 0.18)",
                }}
              >
                <Copy className="h-3 w-3" />
                Копировать ссылку
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA — ghost link */}
        <div className="mt-auto border-t border-[hsl(var(--sidebar-border))] pt-3">
          <Link
            to="/pricing"
            className={cn(
              "flex items-center gap-2 px-3 h-9 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors mx-2 mb-3",
              collapsed && "justify-center px-2"
            )}
          >
            <Gem className="h-3.5 w-3.5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">Обновить план</span>
                <ArrowRight className="h-3 w-3 ml-auto" />
              </>
            )}
          </Link>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>
      {showReferral && <ReferralPopup onClose={() => setShowReferral(false)} />}
    </>
  );
}
