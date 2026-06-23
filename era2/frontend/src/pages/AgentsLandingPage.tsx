import { useEffect, useState } from "react";
import { Link } from "@/shared/routing";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import {
  ChevronDown,
  PenLine,
  Code,
  Palette,
  BarChart3,
  Globe,
  FileText,
  Smartphone,
  Mail,
  GraduationCap,
  Target,
  RefreshCw,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PromoBanner } from "@/components/seo/PromoBanner";
import { SeoPromptWidget } from "@/components/seo/SeoPromptWidget";
import { ScenariosGrid } from "@/components/seo/ScenariosGrid";
import { HowItWorks } from "@/components/seo/HowItWorks";
import { SeoEditorialBlock } from "@/components/seo/SeoEditorialBlock";
import { setPageMeta } from "@/shared/lib/seo";

const agents: { Icon: LucideIcon; name: string; description: string }[] = [
  {
    Icon: PenLine,
    name: "Копирайтер",
    description:
      "Пишет продающие тексты, посты для соцсетей, email-рассылки и рекламные заголовки.",
  },
  {
    Icon: Code,
    name: "Программист",
    description:
      "Пишет код, находит ошибки, объясняет алгоритмы. Python, JavaScript, SQL и другие языки.",
  },
  {
    Icon: Palette,
    name: "Дизайн-ассистент",
    description:
      "Помогает составить промпт для генерации изображений, подбирает стили и композицию.",
  },
  {
    Icon: BarChart3,
    name: "Аналитик данных",
    description: "Анализирует таблицы, строит отчёты, находит инсайты в данных.",
  },
  {
    Icon: Globe,
    name: "Переводчик",
    description: "Переводит тексты с сохранением стиля и контекста. 50+ языков.",
  },
  {
    Icon: FileText,
    name: "Редактор",
    description: "Проверяет грамматику, улучшает стиль, адаптирует тексты под целевую аудиторию.",
  },
  {
    Icon: Smartphone,
    name: "SMM-менеджер",
    description: "Создаёт контент-планы, пишет посты, придумывает идеи для Reels и Stories.",
  },
  {
    Icon: Mail,
    name: "Email-маркетолог",
    description: "Пишет цепочки писем, welcome-серии, триггерные рассылки.",
  },
  {
    Icon: GraduationCap,
    name: "Репетитор",
    description:
      "Объясняет сложные темы простым языком, помогает учиться и готовиться к экзаменам.",
  },
];

const benefits: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Target,
    title: "Готовые роли",
    description: "Не нужно писать промпт с нуля. Каждый агент уже настроен под свою задачу.",
  },
  {
    Icon: RefreshCw,
    title: "Любая модель",
    description: "Агенты работают на ChatGPT, Claude, Gemini — выбирайте лучшую для задачи.",
  },
  {
    Icon: Zap,
    title: "Мгновенный старт",
    description: "Выберите агента и начните работу. Без регистрации, без настройки.",
  },
];

const faqItems = [
  {
    q: "Что такое ИИ-агенты?",
    a: "Это готовые ассистенты с настроенными промптами под конкретные задачи. Копирайтер, программист, аналитик — каждый знает свою роль.",
  },
  {
    q: "На каких нейросетях работают агенты?",
    a: "Агенты работают на ChatGPT, Claude и Gemini. Вы можете выбрать модель при запуске.",
  },
  {
    q: "Можно ли создать своего агента?",
    a: "Скоро. Мы работаем над конструктором агентов, где вы сможете настроить роль и промпт под свои задачи.",
  },
  {
    q: "Сколько стоит использование агентов?",
    a: "Стоимость зависит от выбранной модели. Агенты на GPT 5 mini и Claude Haiku — от 1 кредита за запрос.",
  },
  {
    q: "Агенты отличаются от обычного чата?",
    a: "Да. Агент уже настроен на конкретную задачу — он даёт более точные результаты без необходимости объяснять контекст.",
  },
];

export default function AgentsLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/agents" : "/auth";

  useEffect(() => {
    setPageMeta(
      "ИИ-агенты и ассистенты | ERA2.ai",
      "44 ИИ-ассистента для образования, бизнеса, маркетинга, разработки, здоровья.",
    );
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--seo-bg)" }}>
      <section
        className="relative py-20 px-4"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232, 84, 32,0.2), rgba(255, 122, 61,0.1), transparent 70%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--seo-heading)" }}
          >
            ИИ Агенты и ассистенты
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--seo-text)" }}>
            Готовые ИИ-ассистенты для бизнеса и творчества. Настроенные промпты, специализированные
            роли — начните работу за секунду.
          </p>
          <Link
            to={cta}
            className="inline-block font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
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
        placeholder="Опишите задачу для ИИ-ассистента..."
        modelName="GPT 5.2"
        credits={10}
        redirectTo={cta}
      />

      <PromoBanner
        badge="START"
        title="9 ГОТОВЫХ АГЕНТОВ"
        description="Копирайтер, программист, маркетолог — начните работу за секунду."
        link="/"
      />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Доступные агенты
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((a) => (
              <div
                key={a.name}
                className="flex flex-col"
                style={{
                  background: "var(--seo-card-bg)",
                  border: "1px solid var(--seo-card-border)",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "var(--seo-card-shadow)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-3"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(232, 84, 32, 0.12)",
                  }}
                >
                  <a.Icon size={22} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--seo-heading)" }}>
                  {a.name}
                </h3>
                <p className="text-sm flex-1" style={{ color: "var(--seo-text)" }}>
                  {a.description}
                </p>
                <Link
                  to={cta}
                  className="mt-4 text-[13px] font-medium hover:underline"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  Попробовать →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScenariosGrid
        heading="Для чего используют агентов"
        items={[
          { title: "Контент-маркетинг", description: "Посты, рассылки, статьи за минуты" },
          { title: "Бизнес-аналитика", description: "Отчёты, стратегии, конкурентный анализ" },
          { title: "Обучение", description: "Репетитор по любому предмету" },
          { title: "Разработка", description: "Код, отладка, документация" },
        ]}
      />

      <HowItWorks />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Почему использовать агентов на ERA2?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--seo-heading)" }}>
                  {b.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--seo-text)" }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoEditorialBlock
        heading="ИИ-ассистенты, которые знают свою работу"
        text="Агенты ERA2 — это не просто чат с нейросетью. Каждый агент настроен под конкретную задачу: копирайтер знает структуру продающих текстов, программист разбирается в паттернах и отладке, маркетолог строит стратегии на основе данных. Вы выбираете агента, описываете задачу — и получаете результат без необходимости писать сложные промпты. Агенты работают на ChatGPT, Claude и Gemini — выбирайте лучшую модель под задачу. 9 готовых ролей с мгновенным стартом, без настройки."
        ctaLabel="Попробуйте ИИ-агентов ERA2"
        ctaLink="/agents"
      />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--seo-card-bg)",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--seo-card-border)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold" style={{ color: "var(--seo-heading)" }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 ml-4 transition-transform duration-200"
                    style={{
                      color: "var(--seo-text-muted)",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm" style={{ color: "var(--seo-text)" }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0" }} className="px-4">
        <div
          className="max-w-[1200px] mx-auto text-center"
          style={{
            background: "linear-gradient(135deg, rgba(232, 84, 32,0.15), rgba(255, 122, 61,0.15))",
            borderRadius: 24,
            padding: 48,
          }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--seo-heading)" }}>
            Попробуйте ИИ-ассистентов
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--seo-text)" }}>
            9 готовых агентов — бесплатный старт без регистрации
          </p>
          <Link
            to={cta}
            className="inline-block font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
              borderRadius: 12,
              padding: "14px 32px",
            }}
          >
            Попробовать бесплатно
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
