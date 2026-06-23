export type GenType = "text" | "image" | "video" | "audio";

export interface Generation {
  id: string;
  type: GenType;
  providerId: string;
  modelName: string;
  credits: number;
  prompt: string;
  createdAt: Date;
  text?: string;
  gradient?: string;
  aspect?: "1:1" | "16:9" | "9:16" | "4:3";
  duration?: string;
}

// Warm coal + fiery orange gradient pool. Variety in angle, type, stops, depth.
export const WARM_GRADIENTS: string[] = [
  // radial top-left ember
  "radial-gradient(120% 90% at 25% 20%, rgba(255,122,61,0.65) 0%, rgba(232,84,32,0.4) 35%, rgba(40,22,18,0.9) 75%, #1a0f0c 100%)",
  // diagonal flare
  "linear-gradient(135deg, #3a1a0a 0%, rgba(232,84,32,0.7) 45%, rgba(255,178,122,0.55) 100%)",
  // radial bottom-right glow
  "radial-gradient(90% 70% at 80% 85%, rgba(255,178,122,0.55) 0%, rgba(232,84,32,0.4) 35%, #14080a 80%)",
  // soft amber dawn
  "linear-gradient(160deg, #14080a 0%, rgba(232,84,32,0.55) 55%, rgba(255,178,122,0.5) 100%)",
  // dusk from below
  "radial-gradient(110% 80% at 50% 110%, rgba(255,122,61,0.6) 0%, rgba(80,30,20,0.75) 50%, #0e0b0a 100%)",
  // sharp 45° flare
  "linear-gradient(45deg, rgba(232,84,32,0.75) 0%, rgba(255,178,122,0.45) 55%, #1a0a08 100%)",
  // smoky ember focus
  "radial-gradient(70% 55% at 30% 75%, rgba(255,122,61,0.55) 0%, rgba(120,40,20,0.55) 45%, #0e0b0a 90%)",
  // horizontal split
  "linear-gradient(90deg, #1a0f0c 0%, rgba(232,84,32,0.55) 50%, #2a1410 100%)",
  // double radial — sun + ember
  "radial-gradient(60% 60% at 20% 30%, rgba(255,178,122,0.55) 0%, transparent 60%), radial-gradient(70% 70% at 75% 80%, rgba(232,84,32,0.6) 0%, #14080a 70%)",
  // vertical sunrise
  "linear-gradient(180deg, #3a1a0a 0%, rgba(232,84,32,0.6) 60%, rgba(255,178,122,0.5) 100%)",
  // off-center bloom
  "radial-gradient(80% 60% at 65% 35%, rgba(255,122,61,0.7) 0%, rgba(58,26,10,0.85) 55%, #0e0b0a 100%)",
  // 220° depth
  "linear-gradient(220deg, rgba(255,178,122,0.5) 0%, rgba(232,84,32,0.55) 45%, #141110 100%)",
];

let gradientCursor = 0;
export function gradientForType(_type: GenType): string {
  // round-robin through warm pool — guarantees no two adjacent cards repeat
  const g = WARM_GRADIENTS[gradientCursor % WARM_GRADIENTS.length];
  gradientCursor += 1;
  return g;
}

const NOW = Date.now();
const minutesAgo = (m: number) => new Date(NOW - m * 60_000);
const hoursAgo = (h: number) => new Date(NOW - h * 3_600_000);
const daysAgo = (d: number) => new Date(NOW - d * 86_400_000);

// Pre-pick gradients for mock data (deterministic order)
const G = WARM_GRADIENTS;

export const MOCK_GENERATIONS: Generation[] = [
  // ─── TEXT ───
  {
    id: "t-1",
    type: "text",
    providerId: "chatgpt",
    modelName: "GPT-4o",
    credits: 5,
    prompt: "Напиши короткое стихотворение про закат над морем",
    createdAt: minutesAgo(2),
    text: "Закат расплавил горизонт,\nВ воде дрожит янтарный мост.\nИ чайки чертят над волной\nПоследний вальс перед звездой.",
  },
  {
    id: "t-2",
    type: "text",
    providerId: "claude",
    modelName: "Claude Sonnet 4.5",
    credits: 8,
    prompt: "Объясни простыми словами, что такое квантовая запутанность",
    createdAt: minutesAgo(12),
    text: "Представь две монетки, которые всегда падают одной и той же стороной — даже если их разнести на километры. Квантовая запутанность похожа на это: две частицы остаются «связанными», и измерение одной мгновенно говорит о состоянии другой.",
  },
  {
    id: "t-3",
    type: "text",
    providerId: "gemini",
    modelName: "Gemini 2.5 Pro",
    credits: 6,
    prompt: "Слоган для кофейни в стиле минимализма",
    createdAt: hoursAgo(1),
    text: "Меньше слов. Больше кофе.",
  },

  // ─── IMAGE ───
  {
    id: "i-1",
    type: "image",
    providerId: "nano-banana",
    modelName: "Nano Banana",
    credits: 30,
    prompt: "Кинематографичный портрет: воин на закате, песчаная буря, золотой свет",
    createdAt: minutesAgo(5),
    gradient: G[0],
    aspect: "1:1",
  },
  {
    id: "i-2",
    type: "image",
    providerId: "midjourney",
    modelName: "Midjourney v7",
    credits: 45,
    prompt: "Архитектура будущего: башня из стекла и меди в пустыне",
    createdAt: minutesAgo(20),
    gradient: G[3],
    aspect: "16:9",
  },
  {
    id: "i-3",
    type: "image",
    providerId: "flux",
    modelName: "Flux 1.1 Pro",
    credits: 25,
    prompt: "Минималистичный плакат: оранжевый круг на тёмном фоне",
    createdAt: daysAgo(1),
    gradient: G[8],
    aspect: "4:3",
  },

  // ─── VIDEO ───
  {
    id: "v-1",
    type: "video",
    providerId: "kling",
    modelName: "Kling 2.5 Turbo",
    credits: 75,
    prompt: "Дрон-облёт горящего костра в горах, закат, медленное движение",
    createdAt: minutesAgo(8),
    gradient: G[4],
    aspect: "16:9",
    duration: "5s",
  },
  {
    id: "v-2",
    type: "video",
    providerId: "veo",
    modelName: "Veo 3",
    credits: 120,
    prompt: "Капля чернил растворяется в воде, макросъёмка",
    createdAt: minutesAgo(30),
    gradient: G[6],
    aspect: "9:16",
    duration: "8s",
  },
  {
    id: "v-3",
    type: "video",
    providerId: "sora",
    modelName: "Sora 2",
    credits: 150,
    prompt: "Город ночью с высоты птичьего полёта, неоновые огни",
    createdAt: hoursAgo(2),
    gradient: G[10],
    aspect: "16:9",
    duration: "10s",
  },

  // ─── AUDIO ───
  {
    id: "a-1",
    type: "audio",
    providerId: "suno",
    modelName: "Suno v4",
    credits: 60,
    prompt: "Эмбиент-трек с тёплыми синтезаторами, медленный темп",
    createdAt: minutesAgo(15),
    duration: "2:34",
  },
  {
    id: "a-2",
    type: "audio",
    providerId: "elevenlabs",
    modelName: "ElevenLabs v3",
    credits: 40,
    prompt: "Голос рассказчика читает короткое вступление к подкасту",
    createdAt: hoursAgo(1),
    duration: "0:48",
  },
  {
    id: "a-3",
    type: "audio",
    providerId: "suno",
    modelName: "Suno v4",
    credits: 60,
    prompt: "Lo-Fi бит для учёбы, мягкие клавиши, винил-шум",
    createdAt: daysAgo(1),
    duration: "3:12",
  },
];

export function defaultModelFor(type: GenType): { providerId: string; modelName: string; credits: number } {
  const first = MOCK_GENERATIONS.find((g) => g.type === type);
  if (!first) return { providerId: "chatgpt", modelName: "GPT-4o", credits: 5 };
  return { providerId: first.providerId, modelName: first.modelName, credits: first.credits };
}
