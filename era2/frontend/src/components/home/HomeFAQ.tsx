import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const faqItems = [
  { q: "Можно ли попробовать бесплатно?", a: "Да. При регистрации вы получаете бесплатные кредиты для тестирования всех нейросетей. Карта не требуется." },
  { q: "Какие нейросети доступны по подписке?", a: "Более 90 моделей: ChatGPT, Claude, Gemini, MidJourney, Nano Banana, Kling, Seedance, Sora, Veo, ElevenLabs, Suno и другие." },
  { q: "Что такое кредиты?", a: "Кредиты (cr) — это внутренняя валюта ERA2. Каждая генерация стоит определённое количество кредитов. Стоимость зависит от модели." },
  { q: "Нужен ли VPN?", a: "Нет. Все нейросети на ERA2 работают напрямую из России без VPN и ограничений." },
  { q: "Как оплатить подписку?", a: "Картой любого российского банка. Также доступна оплата через СБП и ЮKassa." },
  { q: "Сгорают ли кредиты?", a: "Нет. Неиспользованные кредиты сохраняются и переносятся на следующий период." },
  { q: "Можно ли использовать для коммерческих проектов?", a: "Да. Весь контент, созданный через ERA2, можно использовать в коммерческих целях." },
];

export function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[60px]">
          {/* Left column */}
          <div className="lg:w-[30%] shrink-0">
            <h2 className="text-[32px] font-extrabold leading-[1.2]" style={{ color: "var(--text-primary)" }}>Важные вопросы</h2>
            <p className="text-[14px] mt-4" style={{ color: "var(--text-tertiary)" }}>
              Если у вас возникли сложности, обратитесь в службу заботы
            </p>
            <a
              href="https://t.me/era2_support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-[8px] text-[14px] text-[hsl(var(--primary))] border border-[rgba(232, 84, 32,0.2)] hover:bg-[rgba(232, 84, 32,0.15)] transition-colors"
              style={{ background: "rgba(232, 84, 32,0.1)" }}
            >
              ✈ Написать в поддержку
            </a>
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl transition-colors"
                style={{
                  border: "1px solid var(--border-primary)",
                  padding: "20px 24px",
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border-primary)"; }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 ml-4 transition-transform duration-200",
                      openIdx === i && "rotate-180"
                    )}
                    style={{ color: "var(--text-tertiary)" }}
                  />
                </button>
                <div className={cn("overflow-hidden transition-all duration-200", openIdx === i ? "max-h-40 pt-3" : "max-h-0")}>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
