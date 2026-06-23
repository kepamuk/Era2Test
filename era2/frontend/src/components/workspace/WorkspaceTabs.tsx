import { Link, useLocation } from "@/shared/routing";
import { MessageSquare, Image as ImageIcon, Video, AudioLines } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type TabId = "text" | "image" | "video" | "audio";

const TABS: {
  id: TabId;
  label: string;
  to: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}[] = [
  { id: "text", label: "Текст", to: "/text", Icon: MessageSquare },
  { id: "image", label: "Изображения", to: "/design", Icon: ImageIcon },
  { id: "video", label: "Видео", to: "/video", Icon: Video },
  { id: "audio", label: "Аудио", to: "/audio", Icon: AudioLines },
];

const PATH_TO_ID: Record<string, TabId> = {
  "/text": "text",
  "/design": "image",
  "/video": "video",
  "/audio": "audio",
};

interface WorkspaceTabsProps {
  variant?: "attached" | "standalone";
}

export function WorkspaceTabs({ variant = "standalone" }: WorkspaceTabsProps) {
  const { pathname } = useLocation();
  const activeId = PATH_TO_ID[pathname];

  return (
    <div
      className={cn(
        "w-full flex items-end gap-1 px-0 overflow-x-auto no-scrollbar relative z-10",
        variant === "attached"
          ? "-mb-px"
          : "",
      )}
    >
      {TABS.map((t) => {
        const isActive = t.id === activeId;
        const { Icon } = t;
        return (
          <Link
            key={t.id}
            to={t.to}
            className={cn(
              "shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 h-12 text-[13px] sm:text-sm font-medium rounded-t-[18px] border transition-colors duration-200 relative",
              isActive
                ? "z-10 -mb-px text-[hsl(var(--primary))] bg-[hsl(var(--card))] border-[hsl(var(--border))] border-b-[hsl(var(--card))]"
                : "text-muted-foreground border-transparent hover:text-foreground hover:bg-[hsl(var(--secondary))]/50",
            )}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
