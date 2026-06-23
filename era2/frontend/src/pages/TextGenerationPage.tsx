import { Link } from "@/shared/routing";
import {
  Plus,
  Minus,
  RefreshCw,
  Globe,
  PenLine,
  Code,
  BarChart3,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import { PromoBanner } from "@/components/seo/PromoBanner";
import { SeoPromptWidget } from "@/components/seo/SeoPromptWidget";
import { ScenariosGrid } from "@/components/seo/ScenariosGrid";
import { HowItWorks } from "@/components/seo/HowItWorks";
import { SeoEditorialBlock } from "@/components/seo/SeoEditorialBlock";
import { setPageMeta } from "@/shared/lib/seo";

const models = [
  {
    name: "ChatGPT",
    provider: "OpenAI",
    desc: "Самая популярная нейросеть в мире. Тексты, код, анализ, переводы.",
    submodels: [
      { name: "GPT 5.2", credits: 10 },
      { name: "GPT 5", credits: 6 },
      { name: "GPT 5 mini", credits: 1 },
    ],
  },
  {
    name: "Claude",
    provider: "Anthropic",
    desc: "Лучшая нейросеть для длинных текстов, анализа документов и кода.",
    submodels: [
      { name: "Opus 4.5", credits: 3 },
      { name: "Sonnet 4.5", credits: 1 },
      { name: "Haiku 4.5", credits: 1 },
    ],
  },
  {
    name: "Gemini",
    provider: "Google",
    desc: "Мультимодальная нейросеть от Google. Работает с текстом, кодом и данными.",
    submodels: [
      { name: "3 Pro", credits: 1 },
      { name: "2.5 Pro", credits: 1 },
      { name: "2.5 Flash", credits: 1 },
    ],
  },
  {
    name: "DeepSeek",
    provider: "",
    desc: "Мощная открытая модель для рассуждений и кода.",
    submodels: [
      { name: "Chat", credits: 1 },
      { name: "Reasoner", credits: 1 },
    ],
  },
  {
    name: "Grok",
    provider: "xAI",
    desc: "Нейросеть от xAI с доступом к актуальной информации.",
    submodels: [{ name: "Grok", credits: 1 }],
  },
  {
    name: "Perplexity",
    provider: "",
    desc: "ИИ-поисковик с ответами на основе актуальных источников.",
    submodels: [{ name: "Perplexity", credits: 1 }],
  },
];

const tableRows = [
  {
    name: "GPT 5.2",
    price: 10,
    context: "128K",
    code: "★★★★★",
    analysis: "★★★★★",
    speed: "Средняя",
  },
  {
    name: "GPT 5 mini",
    price: 1,
    context: "128K",
    code: "★★★★☆",
    analysis: "★★★☆☆",
    speed: "Быстрая",
  },
  {
    name: "Claude Opus 4.5",
    price: 3,
    context: "200K",
    code: "★★★★★",
    analysis: "★★★★★",
    speed: "Средняя",
  },
  {
    name: "Claude Sonnet 4.5",
    price: 1,
    context: "200K",
    code: "★★★★☆",
    analysis: "★★★★☆",
    speed: "Быстрая",
  },
  {
    name: "Gemini 3 Pro",
    price: 1,
    context: "1M+",
    code: "★★★★☆",
    analysis: "★★★★★",
    speed: "Быстрая",
  },
  {
    name: "DeepSeek Reasoner",
    price: 1,
    context: "64K",
    code: "★★★★★",
    analysis: "★★★★☆",
    speed: "Медленная",
  },
];

const benefits: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: RefreshCw,
    title: "Все модели в одном чате",
    desc: "ChatGPT, Claude, Gemini — переключайтесь за секунду. Не нужно 6 разных подписок.",
  },
  {
    Icon: CreditCard,
    title: "Оплата в рублях",
    desc: "GPT 5.2 и Claude Opus без иностранной карты. Единая подписка — все модели.",
  },
  {
    Icon: Globe,
    title: "Без VPN",
    desc: "Все нейросети работают напрямую. ChatGPT, Claude, Gemini — без блокировок.",
  },
];

const faqData = [
  {
    q: "Какие текстовые нейросети доступны на ERA2?",
    a: "ChatGPT (GPT 5.2, GPT 5, GPT 5 mini), Claude (Opus 4.5, Sonnet 4.5, Haiku 4.5), Gemini (3 Pro, 2.5 Pro, 2.5 Flash), DeepSeek, Grok и Perplexity.",
  },
  {
    q: "Можно ли использовать ChatGPT без подписки OpenAI?",
    a: "Да. На ERA2 все модели ChatGPT работают через единый интерфейс с оплатой в рублях.",
  },
  {
    q: "Какая модель лучше для кода?",
    a: "Для кода рекомендуем GPT 5.2 или Claude Opus 4.5 — обе модели показывают лучшие результаты в программировании.",
  },
  {
    q: "Какая модель самая дешёвая?",
    a: "GPT 5 mini, Claude Haiku 4.5, Gemini 2.5 Flash и DeepSeek Chat — все по 1 кредиту за запрос.",
  },
  {
    q: "Можно ли работать с длинными документами?",
    a: "Да. Gemini 3 Pro поддерживает контекст более 1 миллиона токенов, Claude Opus 4.5 — до 200K.",
  },
];

const TextGenerationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/text" : "/auth";

  useEffect(() => {
    setPageMeta(
      "Генерация текста — ИИ нейросети | ERA2.ai",
      "ChatGPT, Claude, Gemini, DeepSeek и другие текстовые нейросети. Генерация текста, переводы, анализ документов в одном месте.",
    );
  }, []);

  return (
    <div className="min-w-0" style={{ background: "var(--seo-bg)" }}>
      <section className="relative overflow-hidden" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(232, 84, 32,0.18) 0%, rgba(255, 122, 61,0.08) 40%, transparent 70%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-4 text-center">
          <h1
            className="text-3xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: "var(--seo-heading)" }}
          >
            Текстовые нейросети — ChatGPT, Claude, Gemini и другие
          </h1>
          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--seo-text)" }}
          >
            6 провайдеров, 15+ моделей для работы с текстом. Единая подписка без VPN, с оплатой в
            рублях.
          </p>
          <Link
            to={cta}
            className="inline-block font-semibold"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
              color: "#fff",
              borderRadius: 12,
              padding: "14px 32px",
            }}
          >
            Начать бесплатно
          </Link>
        </div>
      </section>

      <SeoPromptWidget
        mode="text"
        placeholder="Напишите запрос для текстовой нейросети..."
        modelName="GPT 5.2"
        credits={10}
        redirectTo={cta}
      />

      <PromoBanner
        badge="Топ модель"
        title="GPT 5.2"
        description="Самая мощная модель для работы с текстом. Код, анализ, тексты."
        link="/text"
      />

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: "var(--seo-heading)" }}
          >
            Доступные нейросети
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((m) => (
              <div
                key={m.name}
                style={{
                  background: "var(--seo-card-bg)",
                  border: "1px solid var(--seo-card-border)",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "var(--seo-card-shadow)",
                }}
              >
                <div
                  className="mb-3 rounded-lg flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                    color: "#fff",
                  }}
                >
                  <MessageCircle size={20} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--seo-heading)" }}>
                    {m.name}
                  </span>
                  {m.provider && (
                    <span style={{ fontSize: 12, color: "var(--seo-text-muted)" }}>
                      ({m.provider})
                    </span>
                  )}
                </div>
                <p className="mb-3 line-clamp-2" style={{ fontSize: 14, color: "var(--seo-text)" }}>
                  {m.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {m.submodels.map((s) => (
                    <span
                      key={s.name}
                      style={{
                        background: "rgba(232, 84, 32,0.1)",
                        color: "hsl(var(--primary))",
                        fontSize: 12,
                        padding: "4px 10px",
                        borderRadius: 8,
                      }}
                    >
                      {s.name} · {s.credits} cr
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScenariosGrid
        heading="Для чего используют"
        items={[
          { title: "Тексты и статьи", description: "Блоги, лендинги, описания товаров" },
          { title: "Код и разработка", description: "Написание, отладка и рефакторинг кода" },
          { title: "Аналитика и отчёты", description: "Обработка данных и построение выводов" },
          { title: "Переводы", description: "Профессиональный перевод на 50+ языков" },
        ]}
      />

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: "var(--seo-heading)" }}
          >
            Сравнение моделей
          </h2>
          <div
            className="overflow-x-auto"
            style={{
              background: "var(--seo-table-bg)",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--seo-table-border)",
            }}
          >
            <table className="w-full" style={{ fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--seo-table-header)" }}>
                  {["Модель", "Цена, cr", "Контекст", "Код", "Анализ", "Скорость"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-semibold"
                      style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r, i) => (
                  <tr
                    key={r.name}
                    style={{ background: i % 2 === 1 ? "var(--seo-table-alt)" : "transparent" }}
                  >
                    <td
                      style={{ padding: "12px 16px", color: "var(--seo-heading)", fontWeight: 600 }}
                    >
                      {r.name}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.price}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.context}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.code}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.analysis}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.speed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--seo-heading)" }}
          >
            Почему работать с текстом через ERA2?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="text-center"
                style={{
                  background: "var(--seo-card-bg)",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid var(--seo-card-border)",
                  boxShadow: "var(--seo-card-shadow)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-4"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(232, 84, 32, 0.12)",
                  }}
                >
                  <b.Icon size={24} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--seo-heading)",
                    marginBottom: 8,
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--seo-text)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoEditorialBlock
        heading="Все лучшие текстовые нейросети в одном чате"
        text="ERA2 объединяет ChatGPT, Claude, Gemini, DeepSeek, Grok и Perplexity в одном интерфейсе. Переключайтесь между моделями за секунду — не нужно открывать 6 разных сайтов и оплачивать 6 разных подписок. GPT 5.2 для сложных задач и кода, Claude Opus 4.5 для длинных документов и анализа, Gemini 3 Pro с контекстом более миллиона токенов, DeepSeek Reasoner для глубоких рассуждений. Все модели работают на русском языке, без VPN, с оплатой в рублях. Стоимость запроса — от 1 кредита."
        ctaLabel="Попробуйте текстовые нейросети ERA2"
        ctaLink="/text"
      />

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[800px] mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ color: "var(--seo-heading)" }}
          >
            Часто задаваемые вопросы
          </h2>
          {faqData.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid var(--seo-faq-border)", padding: "20px 0" }}
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: "var(--seo-heading)" }}>
                  {item.q}
                </span>
                {openFaq === i ? (
                  <Minus
                    className="shrink-0 ml-4"
                    style={{ width: 18, height: 18, color: "var(--seo-text-muted)" }}
                  />
                ) : (
                  <Plus
                    className="shrink-0 ml-4"
                    style={{ width: 18, height: 18, color: "var(--seo-text-muted)" }}
                  />
                )}
              </button>
              {openFaq === i && (
                <p className="mt-3" style={{ fontSize: 14, color: "var(--seo-text)" }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div
            className="text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(232, 84, 32,0.15), rgba(255, 122, 61,0.15))",
              borderRadius: 24,
              padding: 48,
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: "var(--seo-heading)" }}
            >
              Начните работать с лучшими текстовыми ИИ
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: "var(--seo-text)" }}>
              Бесплатный старт — без карты, без VPN
            </p>
            <Link
              to={cta}
              className="inline-block font-semibold"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                color: "#fff",
                borderRadius: 12,
                padding: "14px 32px",
              }}
            >
              Попробовать бесплатно
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TextGenerationPage;
