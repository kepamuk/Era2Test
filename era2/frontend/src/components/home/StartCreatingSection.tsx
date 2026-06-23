import { Link } from "@/shared/routing";
import { Image as ImageIcon, Video, MessageCircle, Music, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { aiPhotos, aiVideo, aiLandscapes, aiArt, aiProducts } from "@/entities/generation";

const cards = [
  { image: aiPhotos[0] },
  { image: aiVideo[0] },
  { image: aiLandscapes[0] },
  { image: aiArt[0] },
  { image: aiProducts[0] },
];

const actions: { Icon: LucideIcon; label: string; to: string }[] = [
  { Icon: ImageIcon, label: "Создать изображение", to: "/design" },
  { Icon: Video, label: "Создать видео", to: "/video" },
  { Icon: MessageCircle, label: "Начать диалог", to: "/text" },
  { Icon: Music, label: "Записать песню", to: "/audio" },
  { Icon: Bot, label: "Запустить агента", to: "/agents" },
];

export function StartCreatingSection() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-[28px] font-bold" style={{ color: "var(--text-primary)" }}>Начните создавать с лучшими нейросетями</h2>
          <p className="text-[15px] max-w-[400px]" style={{ color: "var(--text-secondary)" }}>
            Создавайте изображения, видео и улучшайте контент с помощью ИИ.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex-1 min-w-[160px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 relative"
            >
              <img src={c.image} alt="" loading="lazy" className="w-full h-[180px] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide pb-2">
          {actions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="flex-1 min-w-[160px] flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors cursor-pointer"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.background = "var(--bg-pill-hover)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border-primary)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
            >
              <span className="text-[14px] font-medium flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <a.Icon size={16} style={{ color: "hsl(var(--primary))" }} /> {a.label}
              </span>
              <span style={{ color: "var(--text-tertiary)" }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
