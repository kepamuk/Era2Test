import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles, CreditCard, Layers, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/shared/routing";

interface Step {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  link?: string;
}

const steps: Step[] = [
  {
    icon: <Sparkles className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />,
    title: "Добро пожаловать в ERA2!",
    desc: "90+ нейросетей в одном месте. Текст, изображения, видео, аудио — всё в одной подписке.",
    cta: "Далее",
  },
  {
    icon: <CreditCard className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />,
    title: "100 бесплатных кредитов",
    desc: "Мы начислили вам 100 кредитов для первых генераций. Этого хватит на ~15 изображений или ~16 текстовых запросов.",
    cta: "Далее",
  },
  {
    icon: <Layers className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />,
    title: "Переключайтесь между моделями",
    desc: "Используйте вкладки Текст, Дизайн, Видео, Аудио для переключения. Выбирайте модель через капсулу сверху.",
    cta: "Далее",
  },
  {
    icon: <MessageSquare className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />,
    title: "Начните прямо сейчас",
    desc: "Попробуйте сгенерировать первое изображение бесплатно!",
    cta: "Начать генерацию",
    link: "/design",
  },
];

export function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("era2_onboarding_done");
    const isAuthed = localStorage.getItem("era2_auth") === "true";
    if (isAuthed && !seen) {
      const t = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("era2_onboarding_done", "true");
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleClose();
  };

  const current = steps[step];

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-[22px] border p-6 pointer-events-auto"
              style={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-1.5 mb-5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: i === step ? 24 : 8,
                      background: i <= step ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                  />
                ))}
              </div>

              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(232,84,32,0.12)" }}>
                {current.icon}
              </div>

              <h2 className="text-xl font-bold text-foreground mb-2">{current.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{current.desc}</p>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleClose}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Пропустить
                </button>

                {current.link ? (
                  <Link
                    to={current.link}
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-accent shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-opacity"
                  >
                    {current.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-accent shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-opacity"
                  >
                    {current.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
