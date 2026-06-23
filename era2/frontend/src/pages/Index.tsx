import { useState, useEffect } from "react";
import { Link, useNavigate } from "@/shared/routing";
import { useAuth } from "@/features/auth";
import { ArrowUp, Star } from "lucide-react";
import { Eyebrow } from "@/shared/ui/era";
import { PromptWindow, type GenType } from "@/components/workspace/PromptWindow";

import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { DesignCreativitySection } from "@/components/home/DesignCreativitySection";
import { AllModelsSection } from "@/components/home/AllModelsSection";
import { TextAssistantsSection } from "@/components/home/TextAssistantsSection";
import { ModelTagsCloud } from "@/components/home/ModelTagsCloud";
import { StartCreatingSection } from "@/components/home/StartCreatingSection";
import { LearnAIBanner } from "@/components/home/LearnAIBanner";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { ModelsMarquee } from "@/components/home/ModelsMarquee";
import { QuickActions } from "@/components/home/QuickActions";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { PopularToolsSection } from "@/components/home/PopularToolsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const Index = () => {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const ctaLink = isAuthed ? "/design" : "/auth";
  const [showTop, setShowTop] = useState(false);
  const [genType, setGenType] = useState<GenType>("image");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    document.title = "ERA2.ai — Агрегатор нейросетей";
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (!isAuthed) {
      navigate({ to: "/auth" });
      return;
    }
    const routeMap: Record<GenType, string> = {
      text: "/text",
      image: "/design",
      video: "/video",
      audio: "/audio",
    };
    navigate({ to: routeMap[genType] as never });
  };

  const handlePickPrompt = (preset: string) => {
    setPrompt(preset);
    // best-effort focus into the prompt textarea (we can't touch PromptWindow)
    setTimeout(() => {
      const ta = document.querySelector<HTMLTextAreaElement>(".max-w-\\[880px\\] textarea");
      if (ta) {
        ta.focus();
        const len = ta.value.length;
        ta.setSelectionRange(len, len);
        ta.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  };

  return (
    <div className="min-w-0">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.18) 0%, rgba(255,122,61,0.06) 40%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative max-w-3xl mx-auto text-center px-4 pt-20 pb-10 md:pt-28 md:pb-14"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <Eyebrow>● ERA2 · AI AGGREGATOR</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-[32px] md:text-[52px] font-bold leading-[1.05] tracking-tight mb-6 text-balance"
          >
            Один ключ.
            <br />
            Все модели.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-6 leading-relaxed"
          >
            Подключайтесь к ChatGPT, Claude, Gemini, Midjourney, Sora и ещё 90+ нейросетям через
            единую подписку. Оплата в рублях, без VPN.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#ffb27a] text-[#ffb27a]" />
              ))}
            </div>
            <span>Бета-тестирование · Присоединяйтесь первыми</span>
            <span className="mx-2 opacity-40">·</span>
            <Link to={ctaLink} className="text-[hsl(var(--primary))] hover:underline font-medium">
              Начать бесплатно
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── Interactive prompt window ─── */}
        <div className="relative max-w-[780px] mx-auto px-4 pb-16 md:pb-24">
          <PromptWindow
            type={genType}
            onTypeChange={setGenType}
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
          />
        </div>

        {/* ─── Showcase: models carousel + use cases (per active type) ─── */}
        <div className="relative pb-12">
          <HomeShowcase type={genType} onPickPrompt={handlePickPrompt} />
        </div>
      </section>

      <ModelsMarquee />
      <QuickActions />

      {!isAuthed && <PopularToolsSection />}

      <DesignCreativitySection />
      <AllModelsSection />

      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">
            Нейросети по категориям
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Генерация текста", to: "/tools/text-generation", emoji: "💬" },
              { label: "Генерация изображений", to: "/tools/image-generation", emoji: "🎨" },
              { label: "Генерация видео", to: "/tools/video-generation", emoji: "🎬" },
              { label: "Генерация аудио", to: "/tools/audio-generation", emoji: "🎵" },
              { label: "ИИ-агенты", to: "/tools/agents", emoji: "🤖" },
              { label: "Nano Banana", to: "/tools/nano-banana", emoji: "🍌" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-secondary hover:bg-card hover:border-primary/30 transition-all"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TextAssistantsSection />

      <StartCreatingSection />
      <LearnAIBanner />

      <HomeHowItWorks />

      {/* ─── ERA2 ecosystem ─── */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-bold mb-2">
                  ERA2 | Агрегатор нейросетей
                </h2>
                <p className="text-5xl font-bold gradient-accent-text">ERA2</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold italic mb-1">Обучение</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Школа", "Академия", "Мастер-классы", "Туториалы"].map((t) => (
                      <span key={t} className="text-xs text-muted-foreground">
                        {t} •
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    В ERA2 AI обучение — это часть экосистемы. Видео и практические материалы по
                    работе с нейросетями, разбор реальных кейсов.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">Сообщество</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Наше сообщество — место где креаторы делятся опытом и находят вдохновение.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1">Медиа</h3>
                  <p className="text-xs text-muted-foreground mb-1">Рост вместе с ERA2.AI</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Следите за новостями и обновлениями в наших каналах.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModelTagsCloud />
      <HomeFAQ />
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full gradient-accent text-white flex items-center justify-center glow-accent hover:opacity-90 transition-opacity z-40"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Index;
