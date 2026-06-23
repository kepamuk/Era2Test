import { useState } from "react";
import { motion } from "framer-motion";
import { Send, PenLine, Code, GraduationCap, BarChart3, Music, Globe, FileText, Clapperboard, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const chatModels = ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Grok", "Perplexity"];

const agents: { Icon: LucideIcon; name: string; desc: string }[] = [
  { Icon: PenLine, name: "Копирайтер", desc: "Продающие тексты и посты" },
  { Icon: Code, name: "Программист", desc: "Код на любом языке" },
  { Icon: GraduationCap, name: "Репетитор", desc: "Обучение и экзамены" },
  { Icon: BarChart3, name: "Маркетолог", desc: "Стратегии и аналитика" },
  { Icon: Music, name: "MUSIC_Prompt", desc: "Промпты для Suno" },
  { Icon: Globe, name: "Language teacher", desc: "Изучение языков" },
  { Icon: FileText, name: "Резюме", desc: "Составление резюме" },
  { Icon: Clapperboard, name: "Сценарист", desc: "Сценарии и сюжеты" },
  { Icon: Sparkles, name: "Сунь Цзы", desc: "Стратегии и мудрость" },
];

export function TextAssistantsSection() {
  const [activeModel, setActiveModel] = useState(0);

  return (
    <motion.section
      className="max-w-[1200px] mx-auto px-4"
      style={{ padding: "80px 0" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-10">
        <h2 className="text-2xl md:text-[32px] font-bold mb-3">Нейросети и Ассистенты для текста</h2>
        <p className="text-base text-muted-foreground">
          ChatGPT, Claude, Gemini, DeepSeek — все модели в одном чате
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-10">
        {/* Left: chat preview */}
        <div
          className="md:w-1/2 rounded-[22px] p-6 flex flex-col"
          style={{ background: "var(--seo-card-bg)", border: "1px solid var(--seo-card-border)", minHeight: 400, boxShadow: "var(--seo-card-shadow)" }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {chatModels.map((m, i) => (
              <button
                key={m}
                onClick={() => setActiveModel(i)}
                className="text-[13px] px-3 py-1.5 rounded-lg cursor-pointer"
                style={
                  i === activeModel
                    ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)", color: "#fff" }
                    : { color: "var(--seo-pill-text)", background: "var(--seo-pill-bg)" }
                }
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex-1 space-y-4 mb-6">
            <div className="flex justify-end">
              <div
                className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md text-sm"
                style={{ background: "rgba(232, 84, 32,0.15)", color: "var(--seo-heading)" }}
              >
                Напиши продающий текст для лендинга
              </div>
            </div>
            <div className="flex justify-start">
              <div
                className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-md text-sm leading-relaxed"
                style={{ background: "var(--seo-pill-bg)", color: "var(--seo-text)" }}
              >
                Конечно! Вот продающий текст для лендинга: «Откройте мир возможностей с нашим продуктом. Автоматизируйте рутинные задачи, экономьте время и увеличивайте продажи...»
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: "var(--seo-pill-bg)" }}
          >
            <span className="flex-1 text-sm" style={{ color: "var(--seo-text-muted)" }}>
              Напишите запрос или идею для текста
            </span>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Right: agents grid */}
        <div className="md:w-1/2">
          <div className="grid grid-cols-3 gap-3">
            {agents.map((a) => (
              <div
                key={a.name}
                className="rounded-xl p-4 text-center cursor-pointer transition-colors"
                style={{ background: "var(--seo-card-bg)", border: "1px solid var(--seo-card-border)", boxShadow: "var(--seo-card-shadow)" }}
              >
                <div className="inline-flex items-center justify-center mb-2" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(232, 84, 32, 0.1)", color: "hsl(var(--primary))" }}><a.Icon size={22} strokeWidth={1.75} /></div>
                <p className="text-[13px] font-semibold" style={{ color: "var(--seo-heading)" }}>{a.name}</p>
                <p className="text-[11px] mt-1" style={{ color: "var(--seo-text-muted)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="text-sm hover:underline" style={{ color: "hsl(var(--primary))" }}>
              Показать ещё →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
