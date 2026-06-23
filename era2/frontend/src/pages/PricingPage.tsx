import { useState, useEffect } from "react";
import { Check, ChevronDown, Users, Copy } from "lucide-react";
import { useCopyToast } from "@/features/copy-toast";
import { cn } from "@/shared/lib/utils";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

type Period = "year" | "month";

const plans = [
  {
    name: "Старт",
    badge: "БЕСПЛАТНО",
    oldPrice: null as string | null,
    yearPrice: "0 ₽",
    monthPrice: "0 ₽",
    credits: "100 кредитов",
    creditsNote: "единоразово",
    features: [
      "5 текстовых моделей (GPT 4.1 Mini, Claude 4 Sonnet, Gemini 2.5 Flash, DeepSeek V3, Qwen 3)",
      "3 модели изображений (Nano Banana, Flux.1, Seedream 4)",
      "1 видео-модель (Kling 1.5)",
      "Базовые агенты",
      "Качество до 1K",
      "Очередь генерации",
    ],
    cta: "Начать бесплатно",
    recommended: false,
    popular: false,
  },
  {
    name: "Базовый",
    badge: "-30%",
    oldPrice: "38 100 ₽",
    yearPrice: "756 ₽/мес",
    monthPrice: "890 ₽/мес",
    credits: "3 000 кредитов",
    creditsNote: "ежемесячно",
    features: [
      "Все текстовые модели (30+)",
      "Все модели изображений (10+)",
      "5 видео-моделей",
      "ElevenLabs озвучка",
      "Качество до 2K",
      "Приоритетная очередь",
      "История генераций 30 дней",
    ],
    cta: "Выбрать план",
    recommended: false,
    popular: false,
  },
  {
    name: "Про",
    badge: "ПОПУЛЯРНЫЙ",
    oldPrice: "66 200 ₽",
    yearPrice: "1 436 ₽/мес",
    monthPrice: "1 690 ₽/мес",
    credits: "8 000 кредитов",
    creditsNote: "ежемесячно",
    features: [
      "Все 90+ моделей без ограничений",
      "Все видео-модели (Kling 3.0, Veo 3, Sora 2)",
      "ElevenLabs + Suno",
      "Качество до 4K",
      "Быстрая генерация (без очереди)",
      "Все 27 агентов",
      "API-доступ",
      "История генераций 90 дней",
    ],
    cta: "Выбрать план",
    recommended: true,
    popular: true,
  },
  {
    name: "Бизнес",
    badge: null as string | null,
    oldPrice: "66 200 ₽",
    yearPrice: "1 691 ₽/мес",
    monthPrice: "1 990 ₽/мес",
    credits: "∞ Безлимит",
    creditsNote: "без кредитов",
    features: [
      "∞ Все 90+ моделей без кредитов",
      "Максимальное качество 4K+",
      "Мгновенная генерация",
      "Приоритетная поддержка",
      "Команда до 5 человек",
      "Выделенный API",
      "Кастомные агенты",
      "История генераций бессрочно",
    ],
    cta: "Связаться",
    recommended: false,
    popular: false,
  },
];

const faqItems = [
  {
    q: "Что такое кредиты?",
    a: "Каждая генерация стоит определённое количество кредитов. Текст: 6 cr, Изображение: 80–300 cr, Видео: 75–150 cr, Аудио: 30–60 cr.",
  },
  {
    q: "Можно ли перейти на другой план?",
    a: "Да, в любой момент. Остаток кредитов переносится.",
  },
  {
    q: "Что будет когда кредиты закончатся?",
    a: "Можно докупить пакет кредитов или дождаться обновления в начале месяца.",
  },
  {
    q: "Есть ли API?",
    a: "Да, на планах Про и Бизнес. Документация в личном кабинете.",
  },
];

const PricingPage = () => {
  const [period, setPeriod] = useState<Period>("year");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const copy = useCopyToast();

  useEffect(() => { document.title = "ERA2 — Тарифы"; }, []);

  return (
    <div className="min-w-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.12) 0%, rgba(255,122,61,0.04) 40%, transparent 70%)" }} />
        <motion.div className="relative max-w-4xl mx-auto text-center px-4 pt-16 pb-10 md:pt-20" initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[2px] text-primary font-semibold mb-4">Тарифы</motion.p>
          <motion.h1 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold mb-4">Простые тарифы для каждого</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8">Одна подписка — доступ ко всем 90+ нейросетям. Начните бесплатно.</motion.p>

          {/* Period toggle */}
          <motion.div variants={fadeUp} className="inline-flex rounded-full border border-[hsl(var(--border))] p-1">
            <button
              onClick={() => setPeriod("year")}
              className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2", period === "year" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Год
              <span className="font-mono tabular-nums text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">−18%</span>
            </button>
            <button
              onClick={() => setPeriod("month")}
              className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors", period === "month" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
            >
              Месяц
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isFree = plan.badge === "БЕСПЛАТНО";
            const isPopular = plan.badge === "ПОПУЛЯРНЫЙ";
            const isPrimaryCta = isFree || plan.recommended;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "relative bg-card border rounded-card p-6 text-left flex flex-col",
                  plan.recommended ? "border-primary glow-accent" : "border-border"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        isFree && "bg-emerald-500/15 text-emerald-400",
                        isPopular && "bg-primary/15 text-primary",
                        !isFree && !isPopular && "bg-muted text-foreground"
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                <div className="mb-2 min-h-[20px]">
                  {plan.oldPrice && (
                    <span className="font-mono tabular-nums text-sm text-muted-foreground line-through mr-2">{plan.oldPrice}</span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-[28px] font-bold font-mono tabular-nums tracking-tight">
                    {period === "year" ? plan.yearPrice : plan.monthPrice}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-foreground">{plan.credits}</div>
                  <div className="text-xs text-muted-foreground font-mono">{plan.creditsNote}</div>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-3 rounded-button text-sm font-semibold transition-all",
                    isPrimaryCta
                      ? "gradient-accent text-white hover:opacity-90"
                      : "border border-border text-foreground hover:bg-muted"
                  )}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Trust block */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">Оплата через ЮKassa · Карты РФ · СБП · Рассрочка</p>
          <p className="text-muted-foreground text-xs mt-2">Отмена подписки в любой момент · Возврат в течение 3 дней</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Частые вопросы</h2>
        <div className="divide-y divide-border border-y border-border">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 ml-4 text-muted-foreground transition-transform duration-200",
                    openFaq === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openFaq === i ? "max-h-40 pb-4" : "max-h-0"
                )}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Реферальный баннер */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div
          className="relative overflow-hidden rounded-[24px] p-8 md:p-12 text-center"
          style={{
            background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.18) 0%, rgba(255,122,61,0.06) 40%, transparent 75%), hsl(var(--card))",
            border: "1px solid rgba(232,84,32,0.2)",
          }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: "rgba(232,84,32,0.12)" }}>
            <Users className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Приведи друга — получи 100 кредитов
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            За каждого друга, который зарегистрируется по вашей ссылке, вы оба получите по 100 бесплатных кредитов. Без ограничений на количество приглашений.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
            <div className="px-4 py-2.5 rounded-full font-mono text-sm text-foreground" style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}>
              era2.ai/ref/user123
            </div>
            <button
              onClick={() => copy("https://era2.ai/ref/user123", "Реферальная ссылка скопирована")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-accent shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-opacity"
            >
              <Copy className="h-4 w-4" />
              Копировать
            </button>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Уже пригласили: 0 друзей · Заработано: 0 кредитов
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
