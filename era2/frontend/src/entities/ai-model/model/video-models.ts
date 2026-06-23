// ─── Video model providers & sub-models for /video ───

export interface VideoSubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
  isDefault?: boolean;
  badge?: string;
  desc?: string;
  time?: string;
}

export interface VideoProvider {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  subModels: VideoSubModel[];
  aspectRatios: string[];
  durationOptions: string[];
  resolutionOptions: string[];
  qualityOptions?: string[];
  functions?: string[];
}

export const videoProviders: VideoProvider[] = [
  {
    id: "kling",
    name: "Kling AI",
    icon: "🎬",
    badge: "Топ",
    subModels: [
      { id: "kling-3.0", name: "Kling 3.0", credits: 75, isNew: true, isDefault: true, desc: "Топовое видео", time: "60 сек" },
      { id: "kling-3.0-motion", name: "Kling 3.0 Motion Control", credits: 75, isNew: true, desc: "Контроль движения", time: "60 сек" },
      { id: "kling-2.6", name: "Kling 2.6", credits: 75, desc: "Стабильная", time: "60 сек" },
      { id: "kling-2.5-turbo", name: "Kling 2.5 Turbo", credits: 30, desc: "Быстрая", time: "60 сек" },
      { id: "kling-o1", name: "Kling O1", credits: 75, desc: "Мультимодальная", time: "60 сек" },
      { id: "kling-01", name: "Kling 01", credits: 75, desc: "Стандартная", time: "60 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3", "3:4"],
    durationOptions: ["5s", "8s", "10s"],
    resolutionOptions: ["720p", "1080p"],
    qualityOptions: ["Стандарт", "Профессиональный"],
    functions: ["Текст в видео", "Изображение в видео", "Кадры в видео"],
  },
  {
    id: "seedance",
    name: "Seedance",
    icon: "📊",
    badge: "60% OFF",
    subModels: [
      { id: "seedance-2.0", name: "Seedance 2.0", credits: 48, isNew: true, isDefault: true, badge: "60% OFF", desc: "Кинематографичный мир", time: "120 сек" },
      { id: "seedance-1.0", name: "Seedance 1.0", credits: 60, desc: "Стандартная", time: "120 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3"],
    durationOptions: ["5s", "8s", "10s"],
    resolutionOptions: ["720p", "1080p"],
    functions: ["Текст в видео", "Изображение в видео"],
  },
  {
    id: "veo",
    name: "Veo",
    icon: "🌊",
    badge: "Google",
    subModels: [
      { id: "veo-3", name: "Veo 3", credits: 120, isNew: true, isDefault: true, desc: "Топовая модель Google", time: "120 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durationOptions: ["5s", "8s"],
    resolutionOptions: ["720p", "1080p"],
  },
  {
    id: "sora",
    name: "Sora",
    icon: "⬛",
    badge: "OpenAI",
    subModels: [
      { id: "sora-2", name: "Sora 2", credits: 480, isDefault: true, desc: "Флагман видеогенерации", time: "180 сек" },
      { id: "sora-2-pro", name: "Sora 2 Pro", credits: 1440, desc: "Максимальное качество", time: "300 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3"],
    durationOptions: ["5s", "10s", "15s"],
    resolutionOptions: ["720p", "1080p"],
  },
  {
    id: "wan",
    name: "Wan AI",
    icon: "🌊",
    badge: "Open Source",
    subModels: [
      { id: "wan-2.1-video", name: "Wan AI", credits: 30, isDefault: true, desc: "Открытая модель", time: "90 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durationOptions: ["4s", "5s", "8s"],
    resolutionOptions: ["480p", "720p"],
  },
  {
    id: "hailuo",
    name: "Hailuo AI",
    icon: "🎬",
    badge: "NEW",
    subModels: [
      { id: "hailuo", name: "Hailuo AI", credits: 40, isNew: true, isDefault: true, desc: "Новый игрок", time: "90 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durationOptions: ["5s", "8s"],
    resolutionOptions: ["720p", "1080p"],
  },
  {
    id: "vidu",
    name: "Vidu AI",
    icon: "🎬",
    badge: "NEW",
    subModels: [
      { id: "vidu", name: "Vidu AI", credits: 40, isNew: true, isDefault: true, desc: "Новый игрок", time: "90 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1", "4:3"],
    durationOptions: ["5s", "8s"],
    resolutionOptions: ["720p", "1080p"],
  },
  {
    id: "heygen",
    name: "HeyGen",
    icon: "",
    badge: "NEW",
    subModels: [
      { id: "heygen-avatar", name: "HeyGen Avatar", credits: 120, isNew: true, isDefault: true, desc: "Реалистичные AI аватары", time: "120 сек" },
      { id: "heygen-video-translate", name: "HeyGen Video Translate", credits: 150, desc: "Перевод видео с липсинком", time: "180 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durationOptions: ["15s", "30s", "60s"],
    resolutionOptions: ["720p", "1080p"],
  },
  {
    id: "hedra",
    name: "Hedra",
    icon: "",
    badge: "NEW",
    subModels: [
      { id: "hedra-character", name: "Hedra Character-1", credits: 80, isNew: true, isDefault: true, desc: "Говорящие персонажи", time: "60 сек" },
    ],
    aspectRatios: ["16:9", "9:16", "1:1"],
    durationOptions: ["5s", "10s", "15s"],
    resolutionOptions: ["720p", "1080p"],
  },
];

// ─── Carousel promo cards ───

export interface VideoCarouselCard {
  providerId: string;
  subModelId: string;
  title: string;
  desc: string;
  gradient: string;
  badge?: string;
}

export const videoCarouselCards: VideoCarouselCard[] = [
  {
    providerId: "seedance",
    subModelId: "seedance-2.0",
    title: "SEEDANCE 2.0",
    desc: "Создайте мир, который вы себе представляете.",
    gradient: "linear-gradient(135deg, #0a2e1a, #1b4e2d)",
    badge: "60% OFF",
  },
  {
    providerId: "kling",
    subModelId: "kling-3.0-motion",
    title: "KLING 3.0 MOTION",
    desc: "Динамический захват обновлён до максимума",
    gradient: "linear-gradient(135deg, #0a1a2e, #1b2d4e)",
    badge: "NEW",
  },
  {
    providerId: "veo",
    subModelId: "veo-3",
    title: "VEO 3",
    desc: "Топовая модель видеогенерации от Google",
    gradient: "linear-gradient(135deg, #1a0f2e, #2d1b4e)",
    badge: "NEW",
  },
];

// ─── Grid cards ───

export interface VideoGridCard {
  providerId: string;
  subModelId: string;
  label: string;
  shortDesc: string;
  credits: number;
  isNew?: boolean;
  icon?: string;
}

export const videoGridCards: VideoGridCard[] = [
  { providerId: "kling", subModelId: "kling-3.0", label: "Kling 3.0", shortDesc: "Топовое видео от Kling AI", credits: 75, isNew: true, icon: "🎬" },
  { providerId: "seedance", subModelId: "seedance-2.0", label: "Seedance 2.0", shortDesc: "Кинематографичный мир", credits: 48, isNew: true, icon: "📊" },
  { providerId: "veo", subModelId: "veo-3", label: "Veo 3", shortDesc: "Топовая модель Google", credits: 120, isNew: true, icon: "🌊" },
  { providerId: "sora", subModelId: "sora-2", label: "Sora 2", shortDesc: "Флагман видеогенерации OpenAI", credits: 480, icon: "⬛" },
  { providerId: "sora", subModelId: "sora-2-pro", label: "Sora 2 Pro", shortDesc: "Максимальное качество", credits: 1440, icon: "⬛" },
  { providerId: "wan", subModelId: "wan-2.1-video", label: "Wan AI 2.1", shortDesc: "Open Source видео", credits: 30, icon: "🌊" },
  { providerId: "hailuo", subModelId: "hailuo", label: "Hailuo AI", shortDesc: "Быстрое качественное видео", credits: 40, isNew: true, icon: "🎬" },
  { providerId: "vidu", subModelId: "vidu", label: "Vidu AI", shortDesc: "Детализированное видео", credits: 50, isNew: true, icon: "🎬" },
];

// ─── Prompt suggestions ───

export const videoPromptSuggestions = [
  "Замороженная поездка",
  "Фонари заднего хода",
  "Минимальное движение",
  "Прибытие динозавра",
  "Киберпанк ночью",
  "Закат над океаном",
  "Танец в невесомости",
];

// ─── Helpers ───

export function getDefaultVideoSubModel(provider: VideoProvider): VideoSubModel {
  return provider.subModels.find((s) => s.isDefault) || provider.subModels[0];
}
