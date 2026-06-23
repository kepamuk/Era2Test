import { Link } from "@/shared/routing";
import {
  Plus,
  Minus,
  Globe,
  CreditCard,
  Zap,
  Camera,
  Palette,
  Tag,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import { PromoBanner } from "@/components/seo/PromoBanner";
import { SeoPromptWidget } from "@/components/seo/SeoPromptWidget";
import { CommunityGallery } from "@/components/seo/CommunityGallery";
import { PromptExample } from "@/components/seo/PromptExample";
import { ScenariosGrid } from "@/components/seo/ScenariosGrid";
import { aiPhotos, aiArt, aiProducts, aiLandscapes, aiVideo } from "@/entities/generation";
import { SeoDesignSection } from "@/components/seo/SeoDesignSection";
import { HowItWorks } from "@/components/seo/HowItWorks";
import { SeoEditorialBlock } from "@/components/seo/SeoEditorialBlock";
import { setPageMeta } from "@/shared/lib/seo";

const models = [
  {
    name: "Nano Banana 2",
    badge: "NEW",
    desc: "Премиум-генерация с неизменными сюжетами. Высшее качество на рынке.",
    credits: 300,
  },
  {
    name: "Nano Banana Pro",
    badge: null,
    desc: "Профессиональная генерация изображений с контролем деталей.",
    credits: 150,
  },
  {
    name: "MidJourney",
    badge: "Топ",
    desc: "Лидер для арт-стилистики, иллюстраций и концепт-арта.",
    credits: 80,
  },
  {
    name: "Seedream 5 Lite",
    badge: "NEW",
    desc: "Быстрая генерация от ByteDance. Отличное соотношение цена/качество.",
    credits: 2,
  },
  {
    name: "GPT Image 1.5",
    badge: "Premium",
    desc: "Генерация изображений от OpenAI. Точное следование промпту.",
    credits: 40,
  },
  {
    name: "Flux",
    badge: "SOTA",
    desc: "State of the art. Лучший результат в индустрии на апрель 2026.",
    credits: 15,
  },
  {
    name: "Imagen 4",
    badge: "Google",
    desc: "Генерация изображений от Google. Фотореализм и текст на картинках.",
    credits: 8,
  },
  {
    name: "Higgsfield Soul",
    badge: "NEW",
    desc: "Новая модель с уникальным стилем генерации.",
    credits: 15,
  },
  {
    name: "Kling V3 Omni",
    badge: "NEW",
    desc: "Мультимодальная генерация от Kling AI.",
    credits: 25,
  },
];

const tableRows = [
  { name: "Nano Banana 2", price: 300, speed: "~30 сек", quality: "★★★★★", style: "Фотореализм" },
  { name: "MidJourney", price: 80, speed: "~30 сек", quality: "★★★★★", style: "Арт / Иллюстрации" },
  { name: "Seedream 5 Lite", price: 2, speed: "~10 сек", quality: "★★★☆☆", style: "Универсальный" },
  { name: "GPT Image 1.5", price: 40, speed: "~20 сек", quality: "★★★★☆", style: "Фотореализм" },
  { name: "Flux", price: 15, speed: "~15 сек", quality: "★★★★★", style: "SOTA" },
  { name: "Imagen 4", price: 8, speed: "~15 сек", quality: "★★★★☆", style: "Фотореализм" },
];

const benefits: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Globe,
    title: "Без VPN",
    desc: "Все нейросети работают напрямую. Никаких блокировок и ограничений по региону.",
  },
  {
    Icon: CreditCard,
    title: "Оплата в рублях",
    desc: "Единая подписка с оплатой картой РФ. Никаких иностранных карт и криптовалют.",
  },
  {
    Icon: Zap,
    title: "Все в одном месте",
    desc: "9 моделей для изображений в одном интерфейсе. Переключайтесь между ними за секунду.",
  },
];

const faqData = [
  {
    q: "Какие нейросети для изображений доступны на ERA2?",
    a: "На ERA2 доступны 9 нейросетей: Nano Banana 2, MidJourney, Seedream 5 Lite, GPT Image 1.5, Flux, Imagen 4, Higgsfield Soul, Kling V3 Omni и другие. Все работают без VPN.",
  },
  {
    q: "Сколько стоит генерация изображений?",
    a: "Стоимость зависит от модели: от 2 кредитов (Seedream 5 Lite) до 300 кредитов (Nano Banana 2). Кредиты входят в подписку или покупаются отдельно.",
  },
  {
    q: "Можно ли использовать MidJourney без Discord?",
    a: "Да. На ERA2 MidJourney работает через единый интерфейс — без Discord, без VPN, без иностранной карты.",
  },
  {
    q: "Какая модель лучше для фотореализма?",
    a: "Для фотореалистичных изображений рекомендуем Nano Banana 2 или GPT Image 1.5. Для арта и иллюстраций — MidJourney.",
  },
  {
    q: "Нужен ли VPN для работы?",
    a: "Нет. ERA2 работает напрямую из России. Все нейросети доступны без VPN и ограничений.",
  },
];

const ImageGenerationPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/design" : "/auth";

  useEffect(() => {
    setPageMeta(
      "Генерация изображений — ИИ нейросети | ERA2.ai",
      "MidJourney, Nano Banana, FLUX, Stable Diffusion. Создавайте изображения с помощью лучших нейросетей.",
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
            Генерация изображений с помощью ИИ
          </h1>
          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--seo-text)" }}
          >
            9 нейросетей для создания изображений — от фотореализма до арта. Без VPN, с оплатой в
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
        mode="image"
        placeholder="Опишите изображение которое хотите создать..."
        modelName="Nano Banana 2"
        credits={300}
        redirectTo={cta}
      />

      <PromoBanner
        badge="NEW"
        title="NANO BANANA 2"
        description="Премиум-генерация нового поколения. Лучшее качество на рынке."
        link="/design"
      />

      <CommunityGallery title="Изучите работы сообщества ERA2" />

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

      <SeoDesignSection tab="photo" />

      <ScenariosGrid
        heading="Что можно создать"
        images={[aiPhotos[0], aiArt[0], aiProducts[0], aiLandscapes[0]]}
        items={[
          { title: "Фотореалистичные портреты", description: "Фотосессии без фотографа" },
          { title: "Арт и иллюстрации", description: "Уникальный арт в любом стиле" },
          { title: "Логотипы и брендинг", description: "Дизайн логотипов за минуту" },
          { title: "Контент для соцсетей", description: "Картинки для постов и Stories" },
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
                  {["Модель", "Цена, cr", "Скорость", "Качество", "Стиль"].map((h) => (
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
                      {r.speed}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.quality}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--seo-table-text)" }}>
                      {r.style}
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
            Почему генерировать через ERA2?
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
        heading="Превращайте слова в потрясающие изображения с нашим ИИ-генератором"
        text="Генератор изображений ERA2 создаёт фотореалистичные картинки, арт-иллюстрации и дизайн-контент по простому текстовому описанию. Вам доступны 9 нейросетей — от Nano Banana 2 для премиум-фотореализма до Seedream 5 Lite для мгновенных результатов за 2 кредита. Каждая модель имеет свою специализацию: MidJourney создаёт арт мирового уровня, GPT Image точно следует промпту, Flux показывает state-of-the-art результаты. Все модели работают без VPN, оплата в рублях — не нужны иностранные карты и отдельные подписки на каждый сервис. Попробуйте генерацию бесплатно — достаточно зарегистрироваться и получить стартовые кредиты."
        ctaLabel="Попробуйте генератор изображений ERA2"
        ctaLink="/design"
      />

      <PromptExample
        prompt="A woman is sitting on a sofa, holding a magic book, with bottles of brightly colored potions on the table and an old castle in the background"
        modelName="Nano Banana 2"
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
              Начните создавать изображения с ИИ
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

export default ImageGenerationPage;
