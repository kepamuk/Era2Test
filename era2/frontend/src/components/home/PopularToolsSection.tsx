import { Link } from "@/shared/routing";
import {
  Image as ImageIcon,
  Video,
  MessageSquare,
  AudioLines,
  Sparkles,
  Bot,
  ArrowRight,
} from "lucide-react";

const TOOLS = [
  {
    Icon: ImageIcon,
    title: "Генерация изображений",
    desc: "Midjourney, Nano Banana, FLUX, GPT Image — все в одном окне",
    to: "/tools/image-generation",
  },
  {
    Icon: Video,
    title: "Генерация видео",
    desc: "Sora, Kling, Veo, Seedance и десятки моделей по подписке",
    to: "/tools/video-generation",
  },
  {
    Icon: MessageSquare,
    title: "Текстовые нейросети",
    desc: "ChatGPT, Claude, Gemini и Grok с диалогом и поиском",
    to: "/tools/text-generation",
  },
  {
    Icon: AudioLines,
    title: "Аудио и музыка",
    desc: "ElevenLabs, Suno и другие модели для голоса и треков",
    to: "/tools/audio-generation",
  },
  {
    Icon: Sparkles,
    title: "Nano Banana 2",
    desc: "Премиум-генерация изображений с неизменными сюжетами",
    to: "/tools/nano-banana",
  },
  {
    Icon: Bot,
    title: "ИИ-агенты",
    desc: "Готовые ассистенты: маркетолог, программист, копирайтер",
    to: "/tools/agents",
  },
] as const;

export function PopularToolsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Популярные инструменты</h2>
        <p className="text-muted-foreground">Подробнее о возможностях каждого раздела</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map(({ Icon, title, desc, to }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border p-5 transition-all"
            style={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(232, 84, 32, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "hsl(var(--border))";
            }}
          >
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 40,
                height: 40,
                background: "var(--c-accent-soft)",
                color: "var(--c-accent-2)",
              }}
            >
              <Icon size={20} strokeWidth={1.8} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
            <p
              className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {desc}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span />
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground group-hover:text-foreground transition-colors">
                Подробнее
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
