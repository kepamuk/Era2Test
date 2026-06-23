export type ModelCategory = "text" | "image" | "video" | "audio";

export interface SubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: ModelCategory;
  subModels?: SubModel[];
  credits: number;
  description: string;
  icon: string;
  isNew?: boolean;
  slug: string;
}

export const models: AIModel[] = [
  // === TEXT ===
  {
    id: "chatgpt",
    name: "ChatGPT",
    provider: "OpenAI",
    category: "text",
    credits: 1,
    description: "Семейство моделей GPT от OpenAI для генерации текста, кода и анализа данных.",
    icon: "🤖",
    slug: "chatgpt",
    subModels: [
      { id: "gpt-5.2", name: "GPT 5.2", credits: 10, isNew: true },
      { id: "gpt-5", name: "GPT 5", credits: 6 },
      { id: "gpt-5-mini", name: "GPT 5 mini", credits: 1 },
      { id: "gpt-web", name: "GPT Web", credits: 2 },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    category: "text",
    credits: 1,
    description: "Модели Anthropic Claude для безопасной генерации текста и анализа документов.",
    icon: "🧠",
    slug: "claude",
    subModels: [
      { id: "claude-4-opus", name: "Claude 4 Opus", credits: 8, isNew: true },
      { id: "claude-4-sonnet", name: "Claude 4 Sonnet", credits: 4 },
      { id: "claude-4.5-sonnet", name: "Claude 4.5 Sonnet", credits: 3 },
      { id: "claude-4.5-haiku", name: "Claude 4.5 Haiku", credits: 1 },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    category: "text",
    credits: 1,
    description: "Мультимодальные модели Google для текста, кода и анализа изображений.",
    icon: "💎",
    slug: "gemini",
    subModels: [
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", credits: 1, isNew: true },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", credits: 1 },
      { id: "gemini-3-pro", name: "Gemini 3 Pro", credits: 2 },
    ],
  },
  {
    id: "grok",
    name: "Grok",
    provider: "xAI",
    category: "text",
    credits: 2,
    description: "Модели Grok от xAI для рассуждений, поиска и генерации текста.",
    icon: "⚡",
    slug: "grok",
    subModels: [
      { id: "grok-4", name: "Grok 4", credits: 8, isNew: true },
      { id: "grok-3", name: "Grok 3", credits: 4 },
      { id: "grok-3-reasoner", name: "Grok 3 Reasoner", credits: 6 },
      { id: "grok-3-deep-search", name: "Grok 3 Deep Search", credits: 5 },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    category: "text",
    credits: 1,
    description: "Открытые модели DeepSeek для генерации текста и сложных рассуждений.",
    icon: "🔍",
    slug: "deepseek",
    subModels: [
      { id: "deepseek-r1", name: "DeepSeek R1", credits: 2, isNew: true },
      { id: "deepseek-v3", name: "DeepSeek V3", credits: 1 },
      { id: "deepseek-chat", name: "DeepSeek Chat", credits: 1 },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner", credits: 1 },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    provider: "Perplexity",
    category: "text",
    credits: 3,
    description: "Модели Perplexity для поиска и анализа информации в реальном времени.",
    icon: "🌐",
    slug: "perplexity",
    subModels: [
      { id: "sonar-pro", name: "Perplexity Sonar Pro", credits: 5, isNew: true },
      { id: "sonar-deep-research", name: "Sonar Deep Research", credits: 8 },
    ],
  },
  {
    id: "qwen",
    name: "Qwen",
    provider: "Alibaba",
    category: "text",
    credits: 1,
    description: "Модели Qwen от Alibaba для многоязычной генерации текста и рассуждений.",
    icon: "🔮",
    slug: "qwen",
    subModels: [
      { id: "qwen-3-max-thinking", name: "Qwen 3 Max Thinking", credits: 3, isNew: true },
      { id: "qwen-3-thinking", name: "Qwen 3 Thinking", credits: 2 },
    ],
  },

  // === IMAGE ===
  {
    id: "gpt-image-1.5",
    name: "GPT Image 1.5",
    provider: "OpenAI",
    category: "image",
    credits: 40,
    description: "Продвинутая модель генерации изображений от OpenAI с высоким качеством.",
    icon: "🎨",
    slug: "gpt-image-1-5",
  },
  {
    id: "gpt-image-1-mini",
    name: "GPT Image 1 mini",
    provider: "OpenAI",
    category: "image",
    credits: 5,
    description: "Быстрая и экономичная генерация изображений от OpenAI.",
    icon: "🖼",
    slug: "gpt-image-1-mini",
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    provider: "Google",
    category: "image",
    credits: 300,
    description: "Генерация изображений от Google с фотореалистичным качеством.",
    icon: "🍌",
    slug: "nano-banana",
    subModels: [
      { id: "nano-banana-2", name: "Nano Banana 2", credits: 300, isNew: true },
      { id: "nano-banana-pro", name: "Nano Banana Pro", credits: 300 },
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    provider: "Midjourney",
    category: "image",
    credits: 80,
    description: "Легендарный генератор изображений для художественных и креативных работ.",
    icon: "⛵",
    slug: "midjourney",
  },
  {
    id: "seedream",
    name: "Seedream 5.0 Lite",
    provider: "ByteDance",
    category: "image",
    credits: 20,
    description: "Новая модель генерации изображений от ByteDance.",
    icon: "🌱",
    slug: "seedream",
    isNew: true,
  },
  {
    id: "kling-image",
    name: "Kling Image",
    provider: "Kuaishou",
    category: "image",
    credits: 30,
    description: "Генерация изображений от Kuaishou с кинематографическим стилем.",
    icon: "🎬",
    slug: "kling-image",
    subModels: [
      { id: "kling-v3-omni", name: "Kling V3 Omni", credits: 30, isNew: true },
      { id: "kling-3.0", name: "Kling 3.0", credits: 30, isNew: true },
      { id: "kling-01", name: "Kling 01", credits: 20 },
    ],
  },
  {
    id: "grok-imagine",
    name: "Grok Imagine",
    provider: "xAI",
    category: "image",
    credits: 20,
    description: "Генерация изображений от xAI на базе Grok.",
    icon: "⚡",
    slug: "grok-imagine",
  },

  // === VIDEO ===
  {
    id: "veo-3",
    name: "Veo 3",
    provider: "Google",
    category: "video",
    credits: 120,
    description: "Генерация видео от Google с кинематографическим качеством.",
    icon: "🎥",
    slug: "veo-3",
  },
  {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    category: "video",
    credits: 480,
    description: "Продвинутая модель генерации видео от OpenAI.",
    icon: "🌀",
    slug: "sora-2",
    subModels: [
      { id: "sora-2-base", name: "Sora 2", credits: 480 },
      { id: "sora-2-pro", name: "Sora 2 Pro", credits: 1440 },
    ],
  },
  {
    id: "kling-video",
    name: "Kling Video",
    provider: "Kuaishou",
    category: "video",
    credits: 60,
    description: "Генерация видео с режимами Text to Video, Image to Video, Keyframes, Elements.",
    icon: "🎞",
    slug: "kling-video",
    subModels: [
      { id: "kling-t2v", name: "Text to Video", credits: 60 },
      { id: "kling-i2v", name: "Image to Video", credits: 60 },
      { id: "kling-keyframes", name: "Keyframes", credits: 80 },
      { id: "kling-elements", name: "Elements", credits: 40 },
    ],
  },
  {
    id: "seedance",
    name: "Seedance",
    provider: "ByteDance",
    category: "video",
    credits: 60,
    description: "Генерация танцевальных и динамичных видео от ByteDance.",
    icon: "💃",
    slug: "seedance",
    subModels: [
      { id: "seedance-2.0", name: "Seedance 2.0", credits: 60, isNew: true },
      { id: "seedance-new", name: "Seedance New", credits: 40 },
    ],
  },
  {
    id: "wan-ai",
    name: "Wan AI",
    provider: "Alibaba",
    category: "video",
    credits: 40,
    description: "Модель генерации видео от Alibaba.",
    icon: "🌊",
    slug: "wan-ai",
  },

  // === AUDIO ===
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    provider: "ElevenLabs",
    category: "audio",
    credits: 60,
    description: "Передовой синтез речи с естественным звучанием и клонированием голоса.",
    icon: "🎙",
    slug: "elevenlabs",
    subModels: [
      { id: "el-voiceover", name: "Озвучка текста", credits: 60 },
      { id: "el-ads", name: "Рекламные ролики", credits: 80 },
      { id: "el-podcast", name: "Подкасты", credits: 100 },
      { id: "el-localization", name: "Локализация", credits: 120 },
    ],
  },
  {
    id: "suno",
    name: "Suno",
    provider: "Suno",
    category: "audio",
    credits: 30,
    description: "Генерация музыки и песен по текстовому описанию.",
    icon: "🎵",
    slug: "suno",
    subModels: [
      { id: "suno-song", name: "Песня с вокалом", credits: 30 },
      { id: "suno-instrumental", name: "Инструментал", credits: 25 },
      { id: "suno-jingle", name: "Джингл / реклама", credits: 20 },
      { id: "suno-extended", name: "Расширенный трек", credits: 50 },
    ],
  },
];

export function getModelsByCategory(category: ModelCategory): AIModel[] {
  return models.filter((m) => m.category === category);
}

export function getModelBySlug(slug: string): AIModel | undefined {
  return models.find((m) => m.slug === slug);
}
