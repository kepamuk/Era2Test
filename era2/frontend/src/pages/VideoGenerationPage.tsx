import { Link } from "@/shared/routing";
import { Plus, Minus, Globe, CreditCard, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import { PromoBanner } from "@/components/seo/PromoBanner";
import { SeoPromptWidget } from "@/components/seo/SeoPromptWidget";
import { CommunityGallery } from "@/components/seo/CommunityGallery";
import { ScenariosGrid } from "@/components/seo/ScenariosGrid";
import { aiVideo } from "@/entities/generation";
import { SeoDesignSection } from "@/components/seo/SeoDesignSection";
import { HowItWorks } from "@/components/seo/HowItWorks";
import { SeoEditorialBlock } from "@/components/seo/SeoEditorialBlock";
import { setPageMeta } from "@/shared/lib/seo";

const models = [
  {
    name: "Kling 3.0",
    badge: "NEW",
    desc: "Топовая модель видеогенерации. Кинематографичное качество, контроль движения.",
    credits: 75,
  },
  {
    name: "Seedance 2.0",
    badge: "60% OFF",
    desc: "Кинематографичный мир от ByteDance. Плавные переходы и многокадровая съёмка.",
    credits: 48,
  },
  {
    name: "Veo 3",
    badge: "Google",
    desc: "Топовая модель видеогенерации от Google. Фотореализм и физика.",
    credits: 120,
  },
  {
    name: "Sora 2",
    badge: "OpenAI",
    desc: "Флагман видеогенерации от OpenAI. Сложные сцены и длинные ролики.",
    credits: 480,
  },
  {
    name: "Wan AI",
    badge: "Open Source",
    desc: "Открытая модель видеогенерации. Доступная и быстрая.",
    credits: 30,
  },
  {
    name: "Hailuo AI",
    badge: "NEW",
    desc: "Новый игрок на рынке видеогенерации с уникальным стилем.",
    credits: 40,
  },
  { name: "Vidu AI", badge: "NEW", desc: "Новая модель с поддержкой длинных видео.", credits: 40 },
];

const tableRows = [
  { name: "Kling 3.0", price: 75, length: "60 сек", res: "до 1080p", quality: "★★★★★" },
  { name: "Seedance 2.0", price: 48, length: "120 сек", res: "до 1080p", quality: "★★★★☆" },
  { name: "Veo 3", price: 120, length: "120 сек", res: "до 1080p", quality: "★★★★★" },
  { name: "Sora 2", price: 480, length: "180 сек", res: "до 1080p", quality: "★★★★★" },
  { name: "Wan AI", price: 30, length: "90 сек", res: "до 720p", quality: "★★★☆☆" },
  { name: "Hailuo AI", price: 40, length: "90 сек", res: "до 720p", quality: "★★★★☆" },
  { name: "Vidu AI", price: 40, length: "90 сек", res: "до 720p", quality: "★★★★☆" },
];

const benefits: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Globe,
    title: "Без VPN",
    desc: "Sora, Kling, Veo — все работают напрямую из России без ограничений.",
  },
  {
    Icon: CreditCard,
    title: "Оплата в рублях",
    desc: "Единая подписка вместо 7 отдельных. Одна карта — все модели.",
  },
  {
    Icon: Zap,
    title: "Экономия до 60%",
    desc: "Seedance 2.0 со скидкой 60%. Kling от 75 кредитов — дешевле официальной подписки.",
  },
];

const faqData = [
  {
    q: "Какие нейросети для видео доступны на ERA2?",
    a: "Доступны 7 моделей: Kling 3.0, Seedance 2.0, Veo 3, Sora 2, Wan AI, Hailuo AI и Vidu AI. Все работают без VPN из России.",
  },
  {
    q: "Сколько стоит генерация видео?",
    a: "От 30 кредитов (Wan AI) до 480 кредитов (Sora 2). Seedance 2.0 сейчас со скидкой 60% — всего 48 кредитов.",
  },
  {
    q: "Можно ли использовать Sora без подписки OpenAI?",
    a: "Да. На ERA2 Sora 2 работает через единый интерфейс — без подписки OpenAI, без VPN, с оплатой в рублях.",
  },
  {
    q: "Какое максимальное разрешение видео?",
    a: "Большинство моделей генерируют видео до 1080p. Максимальная длительность зависит от модели — от 60 до 180 секунд.",
  },
  {
    q: "Какая модель лучше для коротких клипов?",
    a: "Для коротких клипов до 60 секунд рекомендуем Kling 3.0 — лучшее соотношение цены и кинематографичного качества.",
  },
];

const VideoGenerationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/video" : "/auth";

  useEffect(() => {
    setPageMeta(
      "Генерация видео — ИИ нейросети | ERA2.ai",
      "Kling, Sora, Seedance, Veo. Генерация видео из текста и изображений.",
    );
  }, []);

  return (
    <div className="min-w-0" style={{ background: "var(--seo-bg)" }}>
      {/* Hero */}
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
            Генерация видео с помощью ИИ
          </h1>
          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--seo-text)" }}
          >
            7 нейросетей для создания видео — от коротких клипов до кинематографичных сцен. Без VPN,
            с оплатой в рублях.
          </p>
          <Link
            to={cta}
            className="inline-block font-semibold text-base"
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
        mode="video"
        placeholder="Опишите видео, которое хотите создать..."
        modelName="Kling 3.0"
        credits={75}
        redirectTo={cta}
      />

      <PromoBanner
        badge="60% OFF"
        title="SEEDANCE 2.0"
        description="Кинематографичные видео со скидкой 60%. Плавные переходы и многокадровая съёмка."
        link="/video"
      />

      <CommunityGallery title="Видео созданные сообществом ERA2" type="video" />

      {/* Models Grid */}
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
                <div className="mb-3">
                  <ModelGlyph name={m.name} size={40} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--seo-heading)" }}>
                    {m.name}
                  </span>
                  {m.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
                        color: "#fff",
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      {m.badge}
                    </span>
                  )}
                </div>
                <p className="mb-3 line-clamp-2" style={{ fontSize: 14, color: "var(--seo-text)" }}>
                  {m.desc}
                </p>
                <span
                  className="font-mono tabular-nums"
                  style={{ fontSize: 13, color: "hsl(var(--primary))" }}
                >
                  от {m.credits} cr
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoDesignSection tab="video" />

      <ScenariosGrid
        heading="Что можно создать"
        images={[aiVideo[0], aiVideo[1], aiVideo[2], aiVideo[3]]}
        items={[
          { title: "Рекламные ролики", description: "Продающие видео для бизнеса и соцсетей" },
          { title: "Музыкальные клипы", description: "Визуальный ряд под любой трек" },
          { title: "Анимация персонажей", description: "Оживление статичных изображений" },
          {
            title: "Кинематографичные сцены",
            description: "Эпичные кадры кинематографического качества",
          },
        ]}
      />

      {/* Comparison Table */}
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
                  {["Модель", "Цена, cr", "Макс. длина", "Разрешение", "Качество"].map((h) => (
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
                      {r.length}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.res}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.quality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Benefits */}
      <section style={{ padding: "80px 0" }}>
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--seo-heading)" }}
          >
            Почему генерировать видео через ERA2?
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
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(232, 84, 32, 0.1)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <b.Icon size={26} strokeWidth={1.75} />
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
        heading="Создавайте видео профессионального качества за секунды"
        text="Генератор видео ERA2 объединяет 7 лучших нейросетей для создания видеоконтента. Kling 3.0 обеспечивает кинематографичное качество с контролем движения камеры. Seedance 2.0 создаёт плавные многокадровые сцены со скидкой 60%. Veo 3 от Google генерирует физически корректные ролики, а Sora 2 от OpenAI справляется со сложными многоплановыми сценами. Результат — от рекламных роликов для бизнеса до кинематографичных клипов для социальных сетей. Все модели доступны в одном интерфейсе без VPN, с оплатой российской картой. Стоимость начинается от 30 кредитов за генерацию."
        ctaLabel="Попробуйте генератор видео ERA2"
        ctaLink="/video"
      />

      {/* FAQ */}
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

      {/* CTA Banner */}
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
              Начните создавать видео с ИИ
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

export default VideoGenerationPage;
