import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@/shared/routing";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  PenLine,
  Globe,
  FileSearch,
  Languages,
  Code,
  Lightbulb,
  Image as ImageIcon,
  Camera,
  Paintbrush,
  Eraser,
  Scissors,
  ZoomIn,
  RefreshCw,
  Video,
  Sparkles,
  Film,
  User,
  TrendingUp,
  Music,
  AudioLines,
  Mic,
  Volume2,
  Activity,
  VolumeX,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}
interface ModelItem {
  name: string;
  desc: string;
  badge?: string;
}
interface TabConfig {
  key: string;
  label: string;
  route: string;
  features?: FeatureItem[];
  models?: ModelItem[];
  modelsTitle?: string;
}

const TABS: TabConfig[] = [
  {
    key: "text",
    label: "Текст",
    route: "/text",
    features: [
      { icon: MessageSquare, title: "Чат с ИИ", desc: "Ответы на любые вопросы" },
      { icon: PenLine, title: "Написать текст", desc: "Статьи, посты, тексты" },
      { icon: Globe, title: "Поиск в интернете", desc: "Актуальная информация" },
      { icon: FileSearch, title: "Анализ документов", desc: "Исследования и разбор" },
      { icon: Languages, title: "Перевод текста", desc: "Перевод с сохранением смысла" },
      { icon: Code, title: "Написать код", desc: "Создание и исправление кода" },
      { icon: Lightbulb, title: "Генерация идей", desc: "Концепции, названия, слоганы" },
    ],
    models: [
      { name: "ChatGPT", desc: "GPT от OpenAI" },
      { name: "Claude", desc: "От Anthropic" },
      { name: "Gemini", desc: "От Google" },
      { name: "Perplexity", desc: "Поиск с ИИ" },
      { name: "Grok", desc: "От xAI" },
      { name: "Qwen", desc: "От Alibaba" },
      { name: "DeepSeek", desc: "Reasoning модель" },
    ],
  },
  {
    key: "design",
    label: "Дизайн",
    route: "/design",
    features: [
      { icon: ImageIcon, title: "Создать изображение", desc: "Генерация по тексту" },
      { icon: Camera, title: "Сделать ИИ-фото", desc: "Реалистичные фото людей" },
      { icon: Paintbrush, title: "Редактор фото", desc: "Изменение и доработка" },
      { icon: Eraser, title: "Удалить фон", desc: "Удаление и замена фона" },
      { icon: Scissors, title: "Удалить объект", desc: "Удаление людей и предметов" },
      { icon: ZoomIn, title: "Улучшить качество", desc: "Повышение чёткости и деталей" },
      { icon: RefreshCw, title: "Замена лица", desc: "Face Swap на фото" },
    ],
    models: [
      { name: "Nano Banana", desc: "Быстрая генерация" },
      { name: "MidJourney", desc: "Художественный стиль" },
      { name: "Seedream", desc: "От ByteDance" },
      { name: "GPT Image", desc: "От OpenAI" },
      { name: "Flux", desc: "Фотореализм" },
      { name: "Imagen", desc: "От Google" },
      { name: "Higgsfield", desc: "Soul / Speak" },
    ],
  },
  {
    key: "video",
    label: "Видео",
    route: "/video",
    features: [
      { icon: Video, title: "Создать видео", desc: "Генерация из текста" },
      { icon: Sparkles, title: "Оживить фото", desc: "Анимация изображений" },
      { icon: Film, title: "Видео редактор", desc: "Изменение видео" },
      { icon: User, title: "ИИ Аватар", desc: "Говорящие аватары" },
      { icon: TrendingUp, title: "Улучшить качество", desc: "Апскейл видео" },
    ],
    models: [
      { name: "Kling", desc: "Реалистичное видео" },
      { name: "Veo", desc: "От Google" },
      { name: "Runway", desc: "Профессиональный" },
      { name: "Seedance", desc: "От ByteDance" },
      { name: "Hailuo", desc: "Minimax" },
      { name: "Wan", desc: "Alibaba" },
      { name: "Sora", desc: "От OpenAI" },
      { name: "HeyGen", desc: "AI аватары" },
      { name: "Hedra", desc: "Говорящие персонажи" },
    ],
  },
  {
    key: "audio",
    label: "Аудио",
    route: "/audio",
    features: [
      { icon: Music, title: "Создать песню", desc: "Генерация музыки и вокала" },
      { icon: AudioLines, title: "Озвучка текста", desc: "Текст в речь" },
      { icon: Mic, title: "Клон голоса", desc: "Копирование голоса" },
      { icon: Volume2, title: "Смена голоса", desc: "Изменение тембра" },
      { icon: Activity, title: "Создание звуков", desc: "Генерация эффектов" },
      { icon: VolumeX, title: "Удаление шума", desc: "Очистка и улучшение" },
    ],
    models: [
      { name: "ElevenLabs", desc: "Озвучка и голос" },
      { name: "Suno", desc: "Генерация музыки", badge: "TOP" },
    ],
  },
  {
    key: "agents",
    label: "Агенты",
    route: "/agents",
    modelsTitle: "РАБОТАЮТ НА",
    features: [
      { icon: TrendingUp, title: "Маркетолог", desc: "Стратегия и продвижение" },
      { icon: PenLine, title: "Копирайтер", desc: "Тексты и SEO" },
      { icon: Code, title: "Программист", desc: "Код и отладка" },
      { icon: Languages, title: "Переводчик", desc: "50+ языков" },
      { icon: FileSearch, title: "Юрист", desc: "Анализ документов" },
      { icon: Lightbulb, title: "Генерация идей", desc: "Концепции и слоганы" },
    ],
    models: [
      { name: "ChatGPT", desc: "Универсальный ИИ" },
      { name: "Claude", desc: "Глубокий анализ" },
      { name: "Gemini", desc: "От Google" },
      { name: "DeepSeek", desc: "Reasoning модель" },
    ],
  },
];

export function NavMegaMenu() {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 200);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const activeTab = TABS.find((t) => t.key === active && t.features);

  return (
    <div className="relative flex items-center gap-1" onMouseLeave={scheduleClose}>
      {TABS.map((tab) => {
        const isHot = active === tab.key && tab.features;
        const handleEnter = () => {
          if (tab.features) {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            closeTimer.current = setTimeout(() => open(tab.key), active ? 80 : 0);
          } else {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setActive(null);
          }
        };
        return (
          <Link
            key={tab.key}
            to={tab.route}
            onMouseEnter={handleEnter}
            onClick={() => setActive(null)}
            className="px-3 h-9 inline-flex items-center rounded-full text-sm font-medium transition-colors"
            style={{
              color: isHot ? "var(--c-fg)" : "var(--c-fg-dim)",
              background: isHot ? "var(--c-bg-2)" : "transparent",
            }}
          >
            {tab.label}
          </Link>
        );
      })}

      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() => open(activeTab.key)}
            onMouseLeave={scheduleClose}
            className="absolute left-0 top-full z-50 pt-1"
            style={{ width: "min(720px, 92vw)" }}
          >
            <div
              className="grid grid-cols-2 gap-6 p-5"
              style={{
                background: "var(--c-bg-1)",
                border: "1px solid var(--c-line)",
                borderRadius: 22,
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              {/* Features */}
              <div className="flex flex-col">
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "var(--c-fg-mute)" }}
                >
                  Возможности
                </div>
                <div className="flex flex-col gap-0.5">
                  {activeTab.features!.map((f) => (
                    <button
                      key={f.title}
                      onClick={() => {
                        setActive(null);
                        navigate({ to: activeTab.route });
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-left transition-colors hover:bg-[var(--c-bg-2)]"
                    >
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "var(--c-bg-2)",
                          color: "var(--c-fg-dim)",
                        }}
                      >
                        <f.icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span
                          className="text-[14px] font-medium leading-tight truncate"
                          style={{ color: "var(--c-fg)" }}
                        >
                          {f.title}
                        </span>
                        <span
                          className="text-[12px] truncate"
                          style={{ color: "var(--c-fg-mute)" }}
                        >
                          {f.desc}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <Link
                  to={activeTab.route}
                  onClick={() => setActive(null)}
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium px-3"
                  style={{ color: "var(--c-accent)" }}
                >
                  Все возможности <ArrowRight size={12} />
                </Link>
              </div>

              {/* Models */}
              <div className="flex flex-col">
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.14em] mb-3"
                  style={{ color: "var(--c-fg-mute)" }}
                >
                  {activeTab.modelsTitle || "Модели"}
                </div>
                <div className="flex flex-col gap-0.5">
                  {activeTab.models!.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => {
                        setActive(null);
                        navigate({ to: activeTab.route });
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-left transition-colors hover:bg-[var(--c-bg-2)]"
                    >
                      <ModelGlyph name={m.name} size={32} />
                      <span className="flex flex-col min-w-0">
                        <span
                          className="text-[14px] font-medium leading-tight truncate flex items-center"
                          style={{ color: "var(--c-fg)" }}
                        >
                          {m.name}
                          {m.badge && (
                            <span
                              className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full ml-1"
                              style={{
                                background: "rgba(232,84,32,0.12)",
                                color: "hsl(var(--primary))",
                              }}
                            >
                              {m.badge}
                            </span>
                          )}
                        </span>
                        <span
                          className="text-[12px] truncate"
                          style={{ color: "var(--c-fg-mute)" }}
                        >
                          {m.desc}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <Link
                  to="/toolkit"
                  onClick={() => setActive(null)}
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium px-3"
                  style={{ color: "var(--c-accent)" }}
                >
                  Все ИИ-модели <ArrowRight size={12} />
                </Link>
                {activeTab.key === "text" && (
                  <Link
                    to="/tools/text-generation"
                    onClick={() => setActive(null)}
                    className="flex items-center gap-1.5 mt-3 pt-3 mx-3 text-[12px] font-medium transition-colors hover:opacity-80 border-t"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Все текстовые нейросети →
                  </Link>
                )}
                {activeTab.key === "design" && (
                  <Link
                    to="/tools/image-generation"
                    onClick={() => setActive(null)}
                    className="flex items-center gap-1.5 mt-3 pt-3 mx-3 text-[12px] font-medium transition-colors hover:opacity-80 border-t"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Все нейросети для изображений →
                  </Link>
                )}
                {activeTab.key === "video" && (
                  <Link
                    to="/tools/video-generation"
                    onClick={() => setActive(null)}
                    className="flex items-center gap-1.5 mt-3 pt-3 mx-3 text-[12px] font-medium transition-colors hover:opacity-80 border-t"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Все видео нейросети →
                  </Link>
                )}
                {activeTab.key === "audio" && (
                  <Link
                    to="/tools/audio-generation"
                    onClick={() => setActive(null)}
                    className="flex items-center gap-1.5 mt-3 pt-3 mx-3 text-[12px] font-medium transition-colors hover:opacity-80 border-t"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Все аудио нейросети →
                  </Link>
                )}
                {activeTab.key === "agents" && (
                  <Link
                    to="/tools/agents"
                    onClick={() => setActive(null)}
                    className="flex items-center gap-1.5 mt-3 pt-3 mx-3 text-[12px] font-medium transition-colors hover:opacity-80 border-t"
                    style={{
                      borderColor: "hsl(var(--border))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Все ИИ-агенты →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
