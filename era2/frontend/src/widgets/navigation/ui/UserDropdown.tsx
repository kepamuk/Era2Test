import { Link, useNavigate } from "@/shared/routing";
import { Clock, LogOut, Moon, Plus, Settings, Sun, User, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";
import { StatusBadge } from "@/shared/ui/era/StatusBadge";
import { useAuth } from "@/features/auth";
import { useTheme } from "@/features/theme-switcher";

const PLAN: "PRO" | "FREE" = "FREE";
const CREDITS_USED = 1000;
const CREDITS_TOTAL = 5000;
const EMAIL = "roman2024gerts@gmail.com";
const DISPLAY_NAME = "Роман Г.";

export function UserDropdown() {
  const { logout, userName } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const initial = (userName || DISPLAY_NAME).charAt(0).toUpperCase();
  const pct = Math.min(100, Math.round((CREDITS_USED / CREDITS_TOTAL) * 100));

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const itemCls =
    "flex items-center gap-2.5 h-9 px-3 rounded-md hover:bg-secondary text-sm cursor-pointer transition-colors text-foreground";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Профиль"
          className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-br from-[#E85420] via-[#ff7a3d] to-[#ffb27a] hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="w-full h-full rounded-full bg-card flex items-center justify-center font-mono text-sm font-semibold text-foreground">
            {initial}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[280px] p-2 bg-card border border-border rounded-2xl shadow-xl"
      >
        {/* Profile header */}
        <div className="px-3 py-2.5 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-foreground truncate">{DISPLAY_NAME}</div>
            <div className="text-xs text-muted-foreground truncate">{EMAIL}</div>
          </div>
          <StatusBadge variant={PLAN === "PRO" ? "pro" : "new"}>{PLAN}</StatusBadge>
        </div>

        <div className="my-2 h-px bg-border" />

        {/* Balance */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Кредиты
            </span>
            <span className="font-mono tabular-nums text-sm text-foreground">
              {CREDITS_USED.toLocaleString("ru-RU")} / {CREDITS_TOTAL.toLocaleString("ru-RU")}
            </span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-[#E85420] to-[#ff7a3d] rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">Хватит на ~12 генераций</div>
        </div>

        <div className="px-2 pb-2 pt-1">
          <Button asChild variant="default" size="sm" className="w-full">
            <Link to="/pricing">
              <Plus className="h-3.5 w-3.5" />
              Пополнить
            </Link>
          </Button>
        </div>

        <div className="my-1 h-px bg-border" />

        <div className="space-y-0.5">
          <button className={itemCls} onClick={() => {}}>
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            Профиль
          </button>
          <Link to="/history" className={itemCls}>
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            История
          </Link>
          <button className={itemCls}>
            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
            Настройки
          </button>
          <button className={itemCls} onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            Тема: {theme === "dark" ? "Тёмная" : "Светлая"}
          </button>
          <button
            className="flex items-center gap-2.5 h-9 px-3 rounded-md hover:bg-secondary text-sm cursor-pointer transition-colors text-destructive w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" />
            Выйти
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
