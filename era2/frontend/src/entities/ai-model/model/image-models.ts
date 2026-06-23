// ─── Image model providers & sub-models for /design ───

export interface ImageSubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
  isDefault?: boolean;
  badge?: string;
  desc?: string;
  time?: string;
}

export interface ImageProvider {
  id: string;
  name: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  subModels: ImageSubModel[];
  aspectRatios: string[];
  maxUploads: number;
  quantityOptions?: number[];
  qualityOptions?: string[];
  /** Extra toggles/pills rendered dynamically */
  hasTurbo?: boolean;
  hasAdvanced?: boolean;
  advancedFields?: AdvancedField[];
  styles?: string[];
}

export interface AdvancedField {
  key: string;
  label: string;
  type: "slider" | "input" | "style-grid";
  min?: number;
  max?: number;
  default?: number;
  options?: string[];
}

export const imageProviders: ImageProvider[] = [
  {
    id: "nano-banana",
    name: "Nano Banana",
    icon: "🍌",
    badge: "Популярная",
    badgeColor: "yellow",
    description: "Нашумевшая нейросеть от Google: Gemini Flash 3.0 Banana. Загрузите до 14 изображений вместе с запросом, чтобы использовать режим Remix",
    subModels: [
      { id: "banana-2", name: "Nano Banana 2", credits: 300, isDefault: true, isNew: true, desc: "Премиум генерация", time: "30 сек" },
      { id: "banana-pro", name: "Nano Banana Pro", credits: 150, desc: "Профессиональная", time: "25 сек" },
      { id: "banana", name: "Nano Banana", credits: 80, desc: "Стандартная", time: "20 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "4:5", "5:4", "21:9"],
    maxUploads: 14,
    quantityOptions: [1, 2, 3, 4],
    qualityOptions: ["1K", "2K", "3K", "4K"],
  },
  {
    id: "midjourney",
    name: "MidJourney",
    icon: "⛵",
    badge: "Топ",
    badgeColor: "orange",
    description: "Полный функционал MidJourney для генерации изображений. Выберите версию модели и настройте параметры. Загрузите изображение для задания стиля.",
    subModels: [
      { id: "mj-8", name: "MidJourney", credits: 80, isDefault: true, desc: "Топ для арта", time: "30 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "2:1", "1:2"],
    maxUploads: 1,
    quantityOptions: [1, 2],
    hasTurbo: true,
  },
  {
    id: "seedream",
    name: "Seedream",
    icon: "📊",
    badge: "NEW",
    badgeColor: "green",
    description: "Seedream 5.0 (Lite) — единая мультимодальная модель ByteDance для генерации из текста, генерации по изображению, переноса стиля и редактирования.",
    subModels: [
      { id: "seedream-5-lite", name: "Seedream 5 Lite", credits: 2, isDefault: true, isNew: true, desc: "Быстрая генерация", time: "10 сек" },
      { id: "seedream-4.5", name: "Seedream 4.5", credits: 5, desc: "Улучшенная", time: "15 сек" },
      { id: "seedream-4", name: "Seedream 4", credits: 4, desc: "Стабильная", time: "15 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "4:5"],
    maxUploads: 14,
    quantityOptions: [1, 2, 3, 4],
    qualityOptions: ["1K", "2K", "3K", "4K"],
  },
  {
    id: "gpt-image",
    name: "GPT Image",
    icon: "🤖",
    badge: "Premium",
    badgeColor: "purple",
    description: "Создавайте или редактируйте изображения в нейросети Sora Images (она же GPT Images) от OpenAI. Загрузите до 5 изображений для режима Remix.",
    subModels: [
      { id: "gpt-image-1.5", name: "GPT Image 1.5", credits: 40, isDefault: true, desc: "От OpenAI", time: "20 сек", badge: "PRO" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
    maxUploads: 5,
    quantityOptions: [1],
  },
  {
    id: "flux",
    name: "Flux",
    icon: "⚡",
    badge: "SOTA",
    badgeColor: "blue",
    description: "Набор моделей Flux для генерации изображений претендует на звание SOTA (state of the art), что является статусом лучших в индустрии.",
    subModels: [
      { id: "flux-1", name: "Flux", credits: 15, isDefault: true, desc: "State of the art", time: "15 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4", "21:9"],
    maxUploads: 1,
    hasAdvanced: true,
    advancedFields: [
      { key: "steps", label: "Steps", type: "slider", min: 1, max: 50, default: 25 },
      { key: "cfg", label: "CFG Scale", type: "slider", min: 1, max: 20, default: 7 },
      { key: "seed", label: "Seed", type: "input" },
    ],
    styles: ["Photography", "Digital Art", "Illustration", "Sketch", "3D Render", "Anime"],
  },
  {
    id: "runway",
    name: "Runway Frames",
    icon: "🎬",
    badge: "Creative",
    badgeColor: "pink",
    description: "Генерируйте изображения в популярной нейросети Runway Frames при помощи текстовых запросов с различными уникальными стилями или загружайте до 3 изображений.",
    subModels: [
      { id: "runway-frames", name: "Runway", credits: 20, isDefault: true, desc: "Креативная генерация", time: "20 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3"],
    maxUploads: 3,
    hasAdvanced: true,
    advancedFields: [
      { key: "motion", label: "Motion Strength", type: "slider", min: 0, max: 100, default: 50 },
      { key: "seed", label: "Seed", type: "input" },
    ],
    styles: ["Cinematic", "Portrait", "Editorial", "Commercial", "Artistic"],
  },
  {
    id: "imagen",
    name: "Imagen 4",
    icon: "🌀",
    badge: "Google",
    badgeColor: "blue",
    description: "Создавайте фотореалистичные изображения с точной типографикой и мельчайшими деталями за считанные секунды с помощью Imagen 4 от Google.",
    subModels: [
      { id: "imagen-4", name: "Imagen 4", credits: 8, isDefault: true, desc: "От Google", time: "15 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
    maxUploads: 0,
    quantityOptions: [1, 2, 3, 4],
  },
  {
    id: "higgsfield",
    name: "Higgsfield Soul",
    icon: "🔥",
    badge: "NEW",
    badgeColor: "green",
    description: "Кинематографичные изображения с уникальным стилем Higgsfield Soul.",
    subModels: [
      { id: "higgsfield-soul", name: "Higgsfield Soul", credits: 15, isDefault: true, isNew: true, desc: "Новая модель", time: "20 сек" },
    ],
    aspectRatios: ["1:1", "9:16", "16:9"],
    maxUploads: 0,
    styles: ["Cinematic", "Portrait", "Artistic"],
  },
  {
    id: "kling",
    name: "Kling Image",
    icon: "🎨",
    badge: "NEW",
    badgeColor: "green",
    description: "Высококачественные изображения с безупречной детализацией и консистентностью объектов.",
    subModels: [
      { id: "kling-v3-omni", name: "Kling V3 Omni", credits: 25, isDefault: true, isNew: true, desc: "Мультимодальная", time: "20 сек" },
    ],
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
    maxUploads: 0,
    quantityOptions: [1, 2, 3, 4],
    qualityOptions: ["1K", "2K"],
  },
];

// ─── Grid cards (ordered by popularity) ───

export interface GridCard {
  providerId: string;
  subModelId: string;
  label: string;
  shortDesc: string;
  credits: number;
  isNew?: boolean;
  badge?: string;
}

export const imageGridCards: GridCard[] = [
  { providerId: "nano-banana", subModelId: "banana-2", label: "Nano Banana 2", shortDesc: "Премиум генерация", credits: 300, isNew: true },
  { providerId: "midjourney", subModelId: "mj-8", label: "MidJourney", shortDesc: "Топ для арта", credits: 80 },
  { providerId: "seedream", subModelId: "seedream-5-lite", label: "Seedream 5 Lite", shortDesc: "Быстрая генерация", credits: 2, isNew: true },
  { providerId: "gpt-image", subModelId: "gpt-image-1.5", label: "GPT Image 1.5", shortDesc: "От OpenAI", credits: 40, badge: "PRO" },
  { providerId: "flux", subModelId: "flux-1", label: "Flux", shortDesc: "State of the art", credits: 15 },
  { providerId: "runway", subModelId: "runway-frames", label: "Runway", shortDesc: "Креативная генерация", credits: 20 },
  { providerId: "imagen", subModelId: "imagen-4", label: "Imagen 4", shortDesc: "От Google", credits: 8 },
  { providerId: "higgsfield", subModelId: "higgsfield-soul", label: "Higgsfield Soul", shortDesc: "Новая модель", credits: 15, isNew: true },
  { providerId: "kling", subModelId: "kling-v3-omni", label: "Kling V3 Omni", shortDesc: "Мультимодальная", credits: 25, isNew: true },
];

// ─── Carousel promo cards ───

export interface CarouselPromo {
  providerId: string;
  subModelId: string;
  title: string;
  desc: string;
  gradient: string;
  badge?: string;
}

export const imageCarouselCards: CarouselPromo[] = [
  {
    providerId: "nano-banana",
    subModelId: "banana-2",
    title: "NANO BANANA 2",
    desc: "Высокое качество премиум-класса с неизменными сюжетами",
    gradient: "linear-gradient(135deg, #1a2e0f, #2e4e1b)",
    badge: "NEW",
  },
  {
    providerId: "seedream",
    subModelId: "seedream-5-lite",
    title: "SEEDREAM 5.0 LITE",
    desc: "Мультимодальная модель ByteDance с поддержкой до 14 референсов",
    gradient: "linear-gradient(135deg, #0a1a2e, #1b2d4e)",
    badge: "NEW",
  },
  {
    providerId: "flux",
    subModelId: "flux-kontext-pro",
    title: "FLUX KONTEXT PRO",
    desc: "SOTA — лучший результат в индустрии на апрель 2026",
    gradient: "linear-gradient(135deg, #1a0a2e, #2e1a4e)",
    badge: "NEW",
  },
];

// ─── Prompt suggestions ───

export const imagePromptSuggestions = [
  "Рождественское настроени...",
  "Открытка с днём рождения",
  "Путешествие с питомцем",
  "Аниме портрет",
  "Логотип минимализм",
  "Киберпанк город ночью",
  "Сюрреалистичный пейзаж",
];

// ─── Helpers ───

export function getDefaultSubModel(provider: ImageProvider): ImageSubModel {
  return provider.subModels.find((s) => s.isDefault) || provider.subModels[0];
}

export function getProviderById(id: string): ImageProvider | undefined {
  return imageProviders.find((p) => p.id === id);
}
