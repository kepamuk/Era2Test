import { Link } from "@/shared/routing";
import { Image as ImageIcon, Video, MessageSquare, Mic, Bot } from "lucide-react";

const actions = [
  { Icon: ImageIcon, label: "Создать изображение", to: "/design" },
  { Icon: Video, label: "Создать видео", to: "/video" },
  { Icon: MessageSquare, label: "Спросить ИИ", to: "/text" },
  { Icon: Mic, label: "Озвучить текст", to: "/audio" },
  { Icon: Bot, label: "ИИ Агенты", to: "/agents" },
];

export function QuickActions() {
  return (
    <div className="max-w-[800px] mx-auto text-center" style={{ padding: "32px 16px" }}>
      <div className="flex justify-center gap-2.5 flex-wrap">
        {actions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="quick-action-btn inline-flex items-center gap-2"
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--seo-text)",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
          >
            <a.Icon className="h-4 w-4" />
            {a.label}
          </Link>
        ))}
      </div>
      <style>{`
        .quick-action-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: hsl(var(--primary) / 0.3) !important;
        }
      `}</style>
    </div>
  );
}
