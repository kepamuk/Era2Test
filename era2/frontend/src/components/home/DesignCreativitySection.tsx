import { useState } from "react";
import { Link } from "@/shared/routing";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { aiPhotos, aiVideo } from "@/entities/generation";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const photoModels = [
  { id: "midjourney", name: "Midjourney", desc: "Лидер для арт-стилистики, иллюстраций и концепт-арта. Создавайте произведения искусства по текстовому описанию." },
  { id: "nano-banana", name: "Nano Banana", desc: "Премиум-генерация с фотореалистичным качеством. Лучшая модель для коммерческих фотосессий." },
  { id: "seedream", name: "Seedream", desc: "Быстрая генерация от ByteDance с отличным соотношением цена/качество. От 2 кредитов." },
  { id: "gpt-image", name: "GPT Image", desc: "Генерация изображений от OpenAI. Точное следование промпту, работа с текстом на картинках." },
  { id: "flux", name: "Flux", desc: "State of the art. Лучший результат в индустрии на апрель 2026." },
  { id: "imagen4", name: "Imagen 4", desc: "Модель от Google. Фотореализм, генерация текста на изображениях." },
];

const videoModels = [
  { id: "kling", name: "Kling", desc: "Топовая модель видеогенерации. Кинематографичное качество с контролем движения и камеры." },
  { id: "seedance", name: "Seedance", desc: "Кинематографичный мир от ByteDance. Плавные переходы, многокадровая съёмка. Скидка 60%." },
  { id: "veo", name: "Veo", desc: "Топовая модель от Google. Физически корректные сцены, фотореалистичное видео." },
  { id: "sora", name: "Sora", desc: "Флагман видеогенерации от OpenAI. Сложные многоплановые сцены." },
  { id: "wan-ai", name: "Wan AI", desc: "Открытая модель видеогенерации. Доступная и быстрая, от 30 кредитов." },
  { id: "hailuo", name: "Hailuo AI", desc: "Новый игрок с уникальным стилем генерации видео." },
];

export function DesignCreativitySection() {
  const [tab, setTab] = useState<"photo" | "video">("photo");
  const models = tab === "photo" ? photoModels : videoModels;
  const [activeModel, setActiveModel] = useState(0);
  const active = models[activeModel];

  const handleTabChange = (t: "photo" | "video") => {
    setTab(t);
    setActiveModel(0);
  };

  return (
    <motion.section
      className="max-w-[1200px] mx-auto px-4"
      style={{ padding: "80px 0" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-8">
        <h2 className="text-2xl md:text-[32px] font-bold mb-3">Нейросети для дизайна и творчества</h2>
        <p className="text-base text-muted-foreground">
          Создавайте контент и тренды на базе лучших ИИ
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-center mb-6">
        <div className="inline-flex gap-1 p-1 rounded-xl bg-muted/50 dark:bg-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => handleTabChange("photo")}
            className={cn("px-5 py-2 rounded-[8px] text-sm cursor-pointer", tab === "photo" ? "text-foreground font-medium" : "text-muted-foreground")}
            style={tab === "photo" ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : undefined}
          >
            ИИ Фото
          </button>
          <button
            onClick={() => handleTabChange("video")}
            className={cn("px-5 py-2 rounded-[8px] text-sm cursor-pointer", tab === "video" ? "text-foreground font-medium" : "text-muted-foreground")}
            style={tab === "video" ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : undefined}
          >
            ИИ Видео
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-8">
        {models.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActiveModel(i)}
            className="text-[13px] cursor-pointer px-4 py-1.5 rounded-lg"
            style={
              i === activeModel
                ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)", color: "#fff", border: "1px solid transparent" }
                : { background: "transparent", border: "1px solid var(--seo-pill-border)", color: "var(--seo-pill-text)" }
            }
          >
            {m.name}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex flex-col md:flex-row overflow-hidden"
        style={{ background: "var(--seo-card-bg)", border: "1px solid var(--seo-card-border)", borderRadius: 24, minHeight: 300, boxShadow: "var(--seo-card-shadow)" }}
      >
        <div className="md:w-[40%] p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-3xl md:text-[48px] font-extrabold leading-tight" style={{ fontStyle: "italic", color: "var(--seo-heading)" }}>
            {active.name}
          </h3>
          <p className="text-sm mt-4 mb-6 line-clamp-3" style={{ color: "var(--seo-text)" }}>
            {active.desc}
          </p>
          <Link
            to={tab === "photo" ? "/design" : "/video"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] text-white text-sm font-semibold hover:opacity-90 transition-opacity w-fit"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" }}
          >
            Начать создавать
          </Link>
        </div>
        <div
          className="md:w-[60%] p-6 grid grid-cols-2 md:grid-cols-3 gap-3"
          style={{ background: "var(--seo-gradient-placeholder)" }}
        >
          {(tab === "photo" ? aiPhotos : aiVideo).slice(0, 6).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="rounded-xl w-full h-full object-cover"
              style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
