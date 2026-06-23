import { useState } from "react";
import { Link } from "@/shared/routing";
import { useAuth } from "@/features/auth";

const photoModels = [
  { name: "Midjourney", desc: "Лидер для арт-стилистики, иллюстраций и концепт-арта мирового уровня." },
  { name: "Nano Banana", desc: "Премиум-генерация с неизменными сюжетами и фотореалистичной детализацией." },
  { name: "Seedream", desc: "Быстрая генерация от ByteDance. Отличное соотношение цена/качество." },
  { name: "GPT Image", desc: "Генерация изображений от OpenAI. Точное следование промпту." },
  { name: "Flux", desc: "State of the art. Лучший результат в индустрии." },
  { name: "Imagen 4", desc: "Генерация от Google. Фотореализм и текст на картинках." },
];

const videoModels = [
  { name: "Kling", desc: "Топовая модель видеогенерации. Кинематографичное качество и контроль движения." },
  { name: "Seedance", desc: "Кинематографичный мир от ByteDance. Плавные переходы и многокадровая съёмка." },
  { name: "Veo", desc: "Топовая модель видеогенерации от Google. Фотореализм и физика." },
  { name: "Sora", desc: "Флагман видеогенерации от OpenAI. Сложные сцены и длинные ролики." },
  { name: "Wan AI", desc: "Открытая модель видеогенерации. Доступная и быстрая." },
  { name: "Hailuo", desc: "Новый игрок на рынке видеогенерации с уникальным стилем." },
];

interface SeoDesignSectionProps {
  tab: "photo" | "video";
}

export function SeoDesignSection({ tab }: SeoDesignSectionProps) {
  const models = tab === "photo" ? photoModels : videoModels;
  const [active, setActive] = useState(0);
  const { isAuthed } = useAuth();
  const link = tab === "photo" ? "/design" : "/video";
  const cta = isAuthed ? link : "/auth";
  const model = models[active];

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-center" style={{ fontSize: 28, fontWeight: 700, color: "var(--seo-heading)", marginBottom: 8 }}>
          Нейросети для дизайна и творчества
        </h2>
        <p className="text-center" style={{ fontSize: 15, color: "var(--seo-text-muted)", marginBottom: 32 }}>
          Создавайте контент и тренды на базе лучших ИИ
        </p>

        <div className="flex justify-center gap-2 flex-wrap" style={{ marginBottom: 32 }}>
          {models.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActive(i)}
              style={{
                fontSize: 13,
                padding: "6px 16px",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s",
                border: i === active ? "none" : "1px solid var(--seo-pill-border, rgba(255,255,255,0.1))",
                background: i === active ? "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" : "transparent",
                color: i === active ? "#fff" : "var(--seo-pill-text, rgba(255,255,255,0.5))",
              }}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row" style={{ borderRadius: 24, overflow: "hidden", background: "var(--seo-card-bg)", border: "1px solid var(--seo-card-border)", minHeight: 300 }}>
          <div className="flex flex-col justify-center" style={{ padding: 40, flex: "0 0 40%" }}>
            <h3 style={{ fontSize: 48, fontWeight: 800, fontStyle: "italic", color: "var(--seo-heading)" }}>{model.name}</h3>
            <p style={{ fontSize: 14, color: "var(--seo-text)", marginTop: 16, marginBottom: 24 }}>{model.desc}</p>
            <Link
              to={cta}
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)", color: "#fff", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, width: "fit-content", textDecoration: "none" }}
            >
              Начать создавать
            </Link>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-3" style={{ padding: 24, flex: "1 1 60%" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: 12,
                  background: "var(--seo-pill-bg, rgba(255,255,255,0.04))",
                  aspectRatio: i % 2 === 0 ? "3/4" : "4/3",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
