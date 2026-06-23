import { Link } from "@/shared/routing";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Globe,
  Languages,
  FileText,
  Pencil,
  Sparkles,
  Image as ImageIcon,
  Camera,
  Palette,
  Scissors,
  UserRound,
  XCircle,
  ZoomIn,
  Video,
  Film,
  User,
  Music2,
  ArrowUpCircle,
  Music,
  Mic,
  Volume2,
  VolumeX,
  AudioLines,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { textProviders } from "@/entities/ai-model";
import { imageProviders } from "@/entities/ai-model";
import { videoProviders } from "@/entities/ai-model";

interface Tool {
  Icon: LucideIcon;
  title: string;
  category: string;
}

const tools: Tool[] = [
  { Icon: MessageSquare, title: "Чат с ИИ", category: "text" },
  { Icon: Sparkles, title: "Нейросеть Бесплатно", category: "text" },
  { Icon: Languages, title: "Перевод текста", category: "text" },
  { Icon: FileText, title: "Анализ документов", category: "text" },
  { Icon: Globe, title: "Поиск в интернете", category: "text" },
  { Icon: Pencil, title: "Написать текст", category: "text" },
  { Icon: Sparkles, title: "Улучшение промпта", category: "text" },
  { Icon: ImageIcon, title: "Промпт по фото", category: "text" },
  { Icon: FileText, title: "Создать презентацию", category: "text" },

  { Icon: Camera, title: "Сделать ИИ-Фото", category: "image" },
  { Icon: ImageIcon, title: "Создать изображение", category: "image" },
  { Icon: Palette, title: "Редактор фото", category: "image" },
  { Icon: Scissors, title: "Удалить объект", category: "image" },
  { Icon: UserRound, title: "Замена лица", category: "image" },
  { Icon: XCircle, title: "Удалить фон", category: "image" },
  { Icon: ZoomIn, title: "Улучшить качество фото", category: "image" },

  { Icon: Video, title: "Создать видео", category: "video" },
  { Icon: Film, title: "Видео редактор", category: "video" },
  { Icon: User, title: "ИИ Аватар", category: "video" },
  { Icon: Music2, title: "ИИ Танцы", category: "video" },
  { Icon: ImageIcon, title: "Оживить фото", category: "video" },
  { Icon: ArrowUpCircle, title: "Улучшить качество видео", category: "video" },

  { Icon: Music, title: "Создать песню", category: "audio" },
  { Icon: Mic, title: "Озвучка текста", category: "audio" },
  { Icon: Volume2, title: "Создание звуков", category: "audio" },
  { Icon: AudioLines, title: "Смена голоса", category: "audio" },
  { Icon: Mic, title: "Клон голоса", category: "audio" },
  { Icon: VolumeX, title: "Удаление шума", category: "audio" },
];

const categoryLabels: Record<string, string> = {
  text: "ТЕКСТОВЫЕ ИНСТРУМЕНТЫ",
  image: "ИНСТРУМЕНТЫ ДЛЯ ИЗОБРАЖЕНИЙ",
  video: "ВИДЕО ИНСТРУМЕНТЫ",
  audio: "АУДИО ИНСТРУМЕНТЫ",
};

const modelCategoryLabels: Record<string, string> = {
  text: "ТЕКСТОВЫЕ МОДЕЛИ",
  image: "МОДЕЛИ ДЛЯ ИЗОБРАЖЕНИЙ",
  video: "ВИДЕО МОДЕЛИ",
  audio: "АУДИО МОДЕЛИ",
};

const categoryLinks: Record<string, string> = {
  text: "/text",
  image: "/design",
  video: "/video",
  audio: "/audio",
};

const filters: { id: string; label: string; Icon?: LucideIcon }[] = [
  { id: "all", label: "Все" },
  { id: "text", label: "Текст", Icon: MessageSquare },
  { id: "image", label: "Изображения", Icon: ImageIcon },
  { id: "video", label: "Видео", Icon: Video },
  { id: "audio", label: "Аудио", Icon: Mic },
];

const audioModels = [
  {
    provider: "ElevenLabs",
    models: ["ElevenLabs TTS", "ElevenLabs SFX", "ElevenLabs Voice Changer", "ElevenLabs Music"],
  },
  { provider: "Suno", models: ["Suno v4", "Suno v3.5"] },
];

const allCategories = ["text", "image", "video", "audio"];

function FilterPills({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors",
            filter === f.id ? "text-white" : "text-muted-foreground",
          )}
          style={
            filter === f.id
              ? { background: "hsl(var(--primary))", border: "1px solid transparent" }
              : { background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }
          }
        >
          {f.Icon && <f.Icon className="w-3.5 h-3.5" />}
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default function StudiosPage() {
  useEffect(() => {
    document.title = "ERA2 — Инструменты и Модели";
  }, []);
  const [tab, setTab] = useState<"tools" | "models">("tools");
  const [filter, setFilter] = useState("all");

  const visibleCategories = filter === "all" ? allCategories : [filter];

  return (
    <div className="min-h-[calc(100vh-var(--header-height,64px))] px-4 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Инструменты и Модели
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          {(["tools", "models"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setFilter("all");
              }}
              className={cn(
                "px-5 py-2.5 rounded-[14px] text-sm font-medium",
                tab === t ? "text-white" : "text-muted-foreground",
              )}
              style={
                tab === t
                  ? {
                      background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                      border: "1px solid transparent",
                    }
                  : { background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }
              }
            >
              {t === "tools" ? "⚡ Инструменты" : "⊕ Модели"}
            </button>
          ))}
        </div>

        <FilterPills filter={filter} setFilter={setFilter} />

        {tab === "tools" &&
          visibleCategories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat);
            if (!catTools.length) return null;
            return (
              <div key={cat} className="mb-10">
                <h2
                  className="text-xs font-semibold tracking-wider mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {categoryLabels[cat]}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {catTools.map((t) => (
                    <Link
                      key={`${cat}-${t.title}`}
                      to={categoryLinks[cat]}
                      className="rounded-2xl p-4 flex flex-col items-start gap-3 transition-colors hover:brightness-110"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(232, 84, 32, 0.12)",
                          border: "1px solid rgba(232, 84, 32, 0.18)",
                        }}
                      >
                        <t.Icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

        {tab === "models" && (
          <>
            {visibleCategories.includes("text") && (
              <div className="mb-10">
                <h2
                  className="text-xs font-semibold tracking-wider mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {modelCategoryLabels.text}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {textProviders.flatMap((p) =>
                    p.subModels.map((s) => (
                      <Link
                        key={`text-${p.id}-${s.id}`}
                        to="/text"
                        className="rounded-2xl p-4 flex items-center gap-3 transition-colors hover:brightness-110"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-primary)",
                        }}
                      >
                        <ModelGlyph name={p.name} size={32} />
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.name}
                        </span>
                      </Link>
                    )),
                  )}
                </div>
              </div>
            )}

            {visibleCategories.includes("image") && (
              <div className="mb-10">
                <h2
                  className="text-xs font-semibold tracking-wider mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {modelCategoryLabels.image}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {imageProviders.flatMap((p) =>
                    p.subModels.map((s) => (
                      <Link
                        key={`img-${p.id}-${s.id}`}
                        to="/design"
                        className="rounded-2xl p-4 flex items-center gap-3 transition-colors hover:brightness-110"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-primary)",
                        }}
                      >
                        <ModelGlyph name={p.name} size={32} />
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.name}
                        </span>
                      </Link>
                    )),
                  )}
                </div>
              </div>
            )}

            {visibleCategories.includes("video") && (
              <div className="mb-10">
                <h2
                  className="text-xs font-semibold tracking-wider mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {modelCategoryLabels.video}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {videoProviders.flatMap((p) =>
                    p.subModels.map((s) => (
                      <Link
                        key={`vid-${p.id}-${s.id}`}
                        to="/video"
                        className="rounded-2xl p-4 flex items-center gap-3 transition-colors hover:brightness-110"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-primary)",
                        }}
                      >
                        <ModelGlyph name={p.name} size={32} />
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.name}
                        </span>
                      </Link>
                    )),
                  )}
                </div>
              </div>
            )}

            {visibleCategories.includes("audio") && (
              <div className="mb-10">
                <h2
                  className="text-xs font-semibold tracking-wider mb-4"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {modelCategoryLabels.audio}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {audioModels.flatMap((p) =>
                    p.models.map((m) => (
                      <Link
                        key={`audio-${p.provider}-${m}`}
                        to="/audio"
                        className="rounded-2xl p-4 flex items-center gap-3 transition-colors hover:brightness-110"
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-primary)",
                        }}
                      >
                        <ModelGlyph name={p.provider} size={32} />
                        <span
                          className="text-sm font-medium truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {m}
                        </span>
                      </Link>
                    )),
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
