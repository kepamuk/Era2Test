import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { aiPhotos, aiArt, aiVideo, aiLandscapes } from "@/entities/generation";

const allImages = [...aiPhotos.slice(0, 3), ...aiArt.slice(0, 2), ...aiLandscapes.slice(0, 2), ...aiVideo.slice(0, 3), ...aiPhotos.slice(3, 5), ...aiArt.slice(2, 4)];

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const imageTools = [
  { name: "Текст в изображение", sub: "Text to Image" },
  { name: "Изображение в изображение", sub: "Image to Image" },
  { name: "Генерация аватаров", sub: "AI Avatars" },
  { name: "Генерация логотипов", sub: "Logo Generation" },
  { name: "Арт и иллюстрации", sub: "Art & Illustrations" },
  { name: "Фотореализм", sub: "Photorealism" },
  { name: "Стикеры и эмодзи", sub: "Stickers & Emoji" },
];

const videoTools = [
  { name: "Текст в видео", sub: "Text to Video" },
  { name: "Изображение в видео", sub: "Image to Video" },
  { name: "Контроль движения", sub: "Motion Control" },
  { name: "Видео с аудио", sub: "Video with Audio" },
  { name: "Анимация персонажей", sub: "Character Animation" },
  { name: "Кинематографичные сцены", sub: "Cinematic Scenes" },
  { name: "Короткие клипы", sub: "Short Clips" },
];

export function AllModelsSection() {
  const [tab, setTab] = useState<"image" | "video">("image");
  const tools = tab === "image" ? imageTools : videoTools;

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
        <h2 className="text-2xl md:text-[32px] font-bold mb-3">Все инструменты в одной подписке</h2>
        <p className="text-base text-muted-foreground">
          Создавайте контент и тренды на базе лучших ИИ
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-center mb-8">
        <div className="inline-flex gap-1 p-1 rounded-xl bg-muted/50 dark:bg-[rgba(255,255,255,0.06)]">
          <button
            onClick={() => setTab("image")}
            className={cn("px-5 py-2 rounded-[8px] text-sm cursor-pointer", tab === "image" ? "text-foreground font-medium" : "text-muted-foreground")}
            style={tab === "image" ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : undefined}
          >
            Инструменты изображений
          </button>
          <button
            onClick={() => setTab("video")}
            className={cn("px-5 py-2 rounded-[8px] text-sm cursor-pointer", tab === "video" ? "text-foreground font-medium" : "text-muted-foreground")}
            style={tab === "video" ? { background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)" } : undefined}
          >
            Инструменты видео
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {tools.map((tool, i) => (
          <div
            key={tool.name}
            className="shrink-0 w-[220px] rounded-2xl overflow-hidden cursor-pointer hover:brightness-110 transition-[filter]"
            style={{ border: "1px solid var(--seo-card-border)" }}
          >
            <img
              src={allImages[i % allImages.length]}
              alt=""
              loading="lazy"
              className="h-[140px] w-full object-cover"
            />
            <div className="p-3" style={{ background: "var(--seo-card-bg)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--seo-heading)" }}>{tool.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--seo-text-muted)" }}>{tool.sub}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
