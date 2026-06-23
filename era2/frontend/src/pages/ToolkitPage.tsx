import { useState, useMemo } from "react";
import { useNavigate } from "@/shared/routing";
import { Search, MessageCircle, Image as ImageIcon, Video, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ModelGlyph, CreditTag } from "@/shared/ui/era/ModelGlyph";

type CategoryFilter = "all" | "text" | "image" | "video" | "audio";

interface ToolkitModel {
  name: string;
  provider?: string;
  subModels?: { name: string; credits: number }[];
  minCredits: number;
  badges?: string[];
  isNew?: boolean;
  description?: string;
}

interface CategorySection {
  id: CategoryFilter;
  Icon: LucideIcon;
  label: string;
  models: ToolkitModel[];
  link: string;
  columns?: number;
}

const sections: CategorySection[] = [
  {
    id: "text", Icon: MessageCircle, label: "Текст", link: "/text",
    models: [
      { name: "ChatGPT", provider: "OpenAI", subModels: [{ name: "GPT 5.2", credits: 10 }, { name: "GPT 5", credits: 6 }, { name: "GPT 5 mini", credits: 1 }], minCredits: 1 },
      { name: "Claude", provider: "Anthropic", subModels: [{ name: "Opus 4.5", credits: 3 }, { name: "Sonnet 4.5", credits: 1 }, { name: "Haiku 4.5", credits: 1 }], minCredits: 1 },
      { name: "Gemini", provider: "Google", subModels: [{ name: "3 Pro", credits: 1 }, { name: "2.5 Pro", credits: 1 }, { name: "2.5 Flash", credits: 1 }], minCredits: 1 },
      { name: "DeepSeek", subModels: [{ name: "Chat", credits: 1 }, { name: "Reasoner", credits: 1 }], minCredits: 1 },
      { name: "Grok", provider: "xAI", minCredits: 1 },
      { name: "Perplexity", minCredits: 1 },
    ],
  },
  {
    id: "image", Icon: ImageIcon, label: "Изображения", link: "/design",
    models: [
      { name: "Nano Banana 2", isNew: true, minCredits: 300 },
      { name: "Nano Banana Pro", minCredits: 150 },
      { name: "MidJourney", badges: ["Топ"], minCredits: 80 },
      { name: "Seedream 5 Lite", isNew: true, minCredits: 2 },
      { name: "GPT Image 1.5", badges: ["Premium"], minCredits: 40 },
      { name: "Flux", badges: ["SOTA"], minCredits: 15 },
      { name: "Imagen 4", badges: ["Google"], minCredits: 8 },
      { name: "Higgsfield Soul", isNew: true, minCredits: 15 },
      { name: "Kling V3 Omni", isNew: true, minCredits: 25 },
    ],
  },
  {
    id: "video", Icon: Video, label: "Видео", link: "/video",
    models: [
      { name: "Kling 3.0", isNew: true, minCredits: 75 },
      { name: "Kling 3.0 Motion Control", isNew: true, minCredits: 75 },
      { name: "Kling 2.5 Turbo", minCredits: 30 },
      { name: "Seedance 2.0", isNew: true, badges: ["60% OFF"], minCredits: 48 },
      { name: "Veo 3", badges: ["Google"], isNew: true, minCredits: 120 },
      { name: "Sora 2", badges: ["OpenAI"], minCredits: 480 },
      { name: "Sora 2 Pro", minCredits: 1440 },
      { name: "Wan AI", badges: ["Open Source"], minCredits: 30 },
      { name: "Hailuo AI", isNew: true, minCredits: 40 },
    ],
  },
  {
    id: "audio", Icon: Mic, label: "Аудио", link: "/audio", columns: 2,
    models: [
      { name: "ElevenLabs", description: "Озвучка текста, клонирование голоса, 29 языков", minCredits: 60 },
      { name: "Suno", description: "Генерация музыки по текстовому описанию", minCredits: 30 },
    ],
  },
];

const filterTabs: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "text", label: "Текст" },
  { id: "image", label: "Изображения" },
  { id: "video", label: "Видео" },
  { id: "audio", label: "Аудио" },
];

const ToolkitPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return sections
      .filter((s) => activeTab === "all" || s.id === activeTab)
      .map((s) => ({
        ...s,
        models: q ? s.models.filter((m) => m.name.toLowerCase().includes(q)) : s.models,
      }))
      .filter((s) => s.models.length > 0);
  }, [search, activeTab]);

  return (
    <div className="pt-16 pb-20 px-4 md:px-8 max-w-[1100px] mx-auto">
      <h1 className="text-[28px] font-bold" style={{ color: "var(--text-primary)" }}>Все нейросети</h1>
      <p className="text-[15px] mb-8" style={{ color: "var(--text-secondary)" }}>
        90+ AI-моделей в одном месте. Без VPN, с оплатой в рублях.
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти нейросеть..."
          className="w-full rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition-colors"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-primary)"; }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
              activeTab === t.id
                ? "bg-primary text-white font-medium"
                : ""
            }`}
            style={activeTab !== t.id ? {
              background: "var(--bg-pill)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-secondary)",
            } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.map((section) => (
        <div key={section.id} className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold inline-flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <section.Icon size={18} style={{ color: "hsl(var(--primary))" }} />
              {section.label}
            </h2>
            <span className="font-mono tabular-nums text-[12px]" style={{ color: "var(--text-tertiary)" }}>
              {String(section.models.length).padStart(2, "0")}
            </span>
          </div>

          <div className={`grid gap-3 ${section.columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
            {section.models.map((model) => (
              <div
                key={model.name}
                onClick={() => navigate({ to: section.link })}
                className="rounded-[14px] p-5 cursor-pointer transition-all group"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-card)" }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border-primary)"; }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <ModelGlyph name={model.name} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>{model.name}</span>
                      {model.isNew && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary text-white leading-none">NEW</span>
                      )}
                      {model.badges?.map((b) => (
                        <span key={b} className="px-1.5 py-0.5 rounded text-[10px] font-medium leading-none" style={{ background: "var(--bg-tag)", color: "var(--text-secondary)" }}>{b}</span>
                      ))}
                    </div>
                    {model.provider && (
                      <span className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>{model.provider}</span>
                    )}
                  </div>
                </div>

                {model.description && (
                  <p className="text-[12px] mt-2" style={{ color: "var(--text-secondary)" }}>{model.description}</p>
                )}

                {model.subModels && model.subModels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {model.subModels.map((s) => (
                      <span key={s.name} className="px-2.5 py-1 rounded-md text-[11px] inline-flex items-center gap-1.5" style={{ background: "var(--bg-pill)", color: "var(--text-secondary)" }}>
                        {s.name} <CreditTag value={s.credits} />
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <CreditTag value={`от ${model.minCredits}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 p-8 rounded-[22px] bg-gradient-to-br from-[rgba(232, 84, 32,0.08)] to-[rgba(255, 122, 61,0.05)] text-center">
        <div className="flex justify-center gap-16 flex-wrap">
          {[
            { value: "90+", label: "AI-моделей" },
            { value: "4", label: "Категории" },
            { value: "0₽", label: "За подключение VPN" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[40px] font-extrabold bg-primary bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-[14px] mt-1" style={{ color: "var(--text-secondary)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolkitPage;
