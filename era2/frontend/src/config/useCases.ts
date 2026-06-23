import {
  Pen, Globe, GraduationCap, Lightbulb, FileText, Code2,
  Camera, Sparkles, Palette, Zap, Heart, Square,
  Video, User, Clapperboard, Music, Smartphone, Timer,
  Mic, Radio, Megaphone, BookOpen, Music2, Waves,
  type LucideIcon,
} from "lucide-react";

export type UseCaseType = "text" | "image" | "video" | "audio";

export interface UseCase {
  label: string;
  prompt: string;
  Icon: LucideIcon;
}

export const useCases: Record<UseCaseType, UseCase[]> = {
  text: [
    { label: "Написать пост для соцсетей", prompt: "Напиши вирусный пост для Telegram про ", Icon: Pen },
    { label: "Перевести текст", prompt: "Переведи на английский следующий текст: ", Icon: Globe },
    { label: "Объяснить простыми словами", prompt: "Объясни как 5-летнему: ", Icon: GraduationCap },
    { label: "Идеи для контента", prompt: "Дай 10 идей для постов про ", Icon: Lightbulb },
    { label: "Резюме статьи", prompt: "Сделай саммари этой статьи: ", Icon: FileText },
    { label: "Написать код", prompt: "Напиши на Python функцию которая ", Icon: Code2 },
  ],
  image: [
    { label: "Фотореалистичный портрет", prompt: "Photorealistic portrait of ", Icon: Camera },
    { label: "Логотип минимализм", prompt: "Minimal logo design for ", Icon: Sparkles },
    { label: "Аниме иллюстрация", prompt: "Anime style illustration of ", Icon: Palette },
    { label: "Киберпанк сцена", prompt: "Cyberpunk neon city scene with ", Icon: Zap },
    { label: "Открытка с поздравлением", prompt: "Beautiful greeting card with ", Icon: Heart },
    { label: "Иконка для приложения", prompt: "App icon, flat design, ", Icon: Square },
  ],
  video: [
    { label: "Рекламный ролик", prompt: "Commercial ad video showing ", Icon: Video },
    { label: "Анимация персонажа", prompt: "Character animation of ", Icon: User },
    { label: "Кинематографичная сцена", prompt: "Cinematic shot of ", Icon: Clapperboard },
    { label: "Музыкальный клип", prompt: "Music video featuring ", Icon: Music },
    { label: "Короткий клип для Reels", prompt: "Vertical short video for Reels: ", Icon: Smartphone },
    { label: "Замедленная съёмка", prompt: "Slow motion video of ", Icon: Timer },
  ],
  audio: [
    { label: "Озвучка для YouTube", prompt: "YouTube voiceover script: ", Icon: Mic },
    { label: "Подкаст-вступление", prompt: "Podcast intro voice: ", Icon: Radio },
    { label: "Текст для рекламы", prompt: "Advertising voice for ", Icon: Megaphone },
    { label: "Голос для рассказа", prompt: "Narrator voice for storytelling: ", Icon: BookOpen },
    { label: "Электронная музыка", prompt: "Electronic music track with ", Icon: Music2 },
    { label: "Эмбиент-фон", prompt: "Ambient background music: ", Icon: Waves },
  ],
};
