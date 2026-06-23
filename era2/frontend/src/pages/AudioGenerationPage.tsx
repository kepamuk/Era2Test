import { useEffect, useState } from "react";
import { Link } from "@/shared/routing";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import {
  ChevronDown,
  Mic,
  Music,
  Globe,
  CreditCard,
  Zap,
  Megaphone,
  Languages,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PromoBanner } from "@/components/seo/PromoBanner";
import { SeoPromptWidget } from "@/components/seo/SeoPromptWidget";
import { ScenariosGrid } from "@/components/seo/ScenariosGrid";
import { HowItWorks } from "@/components/seo/HowItWorks";
import { SeoEditorialBlock } from "@/components/seo/SeoEditorialBlock";
import { setPageMeta } from "@/shared/lib/seo";

const models = [
  {
    name: "ElevenLabs",
    description:
      "Лидер в генерации голоса. Реалистичная озвучка, клонирование голоса, мультиязычность.",
    price: "от 60",
  },
  {
    name: "Suno",
    description:
      "Генерация музыки по текстовому описанию. Создавайте треки любого жанра за секунды.",
    price: "от 30",
  },
];

const useCases: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: Mic,
    title: "Озвучка видео",
    description:
      "Профессиональная озвучка роликов для YouTube, Reels, TikTok. 29 языков, сотни голосов.",
  },
  {
    Icon: Megaphone,
    title: "Реклама",
    description: "Аудиоролики для рекламы. Естественный голос без найма диктора.",
  },
  {
    Icon: Music,
    title: "Музыка",
    description: "Создание уникальных треков для контента, подкастов, видео и презентаций.",
  },
  {
    Icon: Languages,
    title: "Локализация",
    description: "Перевод и озвучка контента на другие языки с сохранением интонации.",
  },
];

const benefits: { Icon: LucideIcon; title: string; description: string }[] = [
  { Icon: Globe, title: "Без VPN", description: "ElevenLabs и Suno работают напрямую из России." },
  {
    Icon: CreditCard,
    title: "Оплата в рублях",
    description: "Без иностранных карт. Единая подписка — голос и музыка.",
  },
  {
    Icon: Zap,
    title: "Дешевле подписки",
    description:
      "Платите только за использование. Не нужна ежемесячная подписка ElevenLabs за $22.",
  },
];

const faqItems = [
  {
    q: "Какие аудио-нейросети доступны на ERA2?",
    a: "ElevenLabs для генерации голоса и озвучки, Suno для генерации музыки.",
  },
  {
    q: "Сколько стоит озвучка?",
    a: "От 60 кредитов за генерацию через ElevenLabs. Это значительно дешевле официальной подписки.",
  },
  {
    q: "Можно ли клонировать свой голос?",
    a: "Да. ElevenLabs поддерживает клонирование голоса — загрузите образец и генерируйте речь вашим голосом.",
  },
  {
    q: "Какие языки поддерживаются?",
    a: "ElevenLabs поддерживает 29 языков, включая русский, английский, китайский, испанский и другие.",
  },
  {
    q: "Можно ли создавать музыку для коммерческого использования?",
    a: "Да. Все треки, созданные через Suno на ERA2, можно использовать в коммерческих проектах.",
  },
];

export default function AudioGenerationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/audio" : "/auth";

  useEffect(() => {
    setPageMeta(
      "Генерация аудио — ИИ нейросети | ERA2.ai",
      "ElevenLabs, Suno. Озвучка текста, создание музыки, клон голоса.",
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
            Генерация аудио и голоса с помощью ИИ
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--seo-text)" }}>
            Озвучка, музыка, клонирование голоса — 2 мощные нейросети в одном месте. Без VPN, с
            оплатой в рублях.
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
        mode="audio"
        placeholder="Введите текст для озвучки или опишите музыку..."
        modelName="ElevenLabs"
        credits={60}
        redirectTo={cta}
      />

      <PromoBanner
        badge="Лидер рынка"
        title="ELEVENLABS"
        description="Реалистичная озвучка и клонирование голоса. 29 языков."
        link="/audio"
      />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Доступные нейросети
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {models.map((m) => (
              <div
                key={m.name}
                className="w-full md:max-w-[500px]"
                style={{
                  background: "var(--seo-card-bg)",
                  border: "1px solid var(--seo-card-border)",
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: "var(--seo-card-shadow)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold" style={{ color: "var(--seo-heading)" }}>
                    {m.name}
                  </h3>
                  <span className="text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                    {m.price} cr
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--seo-text)" }}>
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScenariosGrid
        heading="Что можно создать"
        items={[
          { title: "Озвучка видео", description: "Профессиональный голос для роликов" },
          { title: "Рекламные аудио", description: "Ролики без найма диктора" },
          { title: "Музыкальные треки", description: "Уникальная музыка для контента" },
          { title: "Локализация", description: "Перевод голоса на другие языки" },
        ]}
      />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Для чего используют
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px] mx-auto">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                style={{
                  background: "var(--seo-card-bg)",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid var(--seo-card-border)",
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
                  <uc.Icon size={22} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--seo-heading)" }}>
                  {uc.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--seo-text)" }}>
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section style={{ padding: "80px 0" }} className="px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--seo-heading)" }}
          >
            Почему создавать аудио через ERA2?
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
        heading="Профессиональная озвучка и музыка — без студии и диктора"
        text="ERA2 открывает доступ к двум лидерам аудио-генерации: ElevenLabs для озвучки и клонирования голоса, Suno для создания музыки. ElevenLabs генерирует речь, неотличимую от настоящего диктора — 29 языков, десятки голосов, от делового тона до эмоциональной рекламы. Suno создаёт полноценные музыкальные треки любого жанра по текстовому описанию — от Lo-Fi для подкастов до кинематографических саундтреков. Не нужна ежемесячная подписка ElevenLabs за $22 — платите только за использование через ERA2."
        ctaLabel="Попробуйте аудио-генерацию ERA2"
        ctaLink="/audio"
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
            Начните создавать аудио с ИИ
          </h2>
          <p className="text-base mb-8" style={{ color: "var(--seo-text)" }}>
            Бесплатный старт — без карты, без VPN
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
