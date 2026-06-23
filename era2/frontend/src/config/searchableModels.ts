export type SearchableModelType = "text" | "image" | "video" | "audio";

export interface SearchableModel {
  id: string;
  name: string;
  provider: string;
  type: SearchableModelType;
  credits: string;
  icon?: string;
  isNew?: boolean;
}

export const searchableModels: SearchableModel[] = [
  { id: "chatgpt", name: "ChatGPT", provider: "OpenAI", type: "text", credits: "6" },
  { id: "claude", name: "Claude", provider: "Anthropic", type: "text", credits: "3" },
  { id: "gemini", name: "Gemini", provider: "Google", type: "text", credits: "1" },
  { id: "grok", name: "Grok", provider: "xAI", type: "text", credits: "1" },
  { id: "deepseek", name: "DeepSeek", provider: "DeepSeek", type: "text", credits: "1" },
  { id: "perplexity", name: "Perplexity", provider: "Perplexity", type: "text", credits: "1" },
  { id: "qwen", name: "Qwen", provider: "Alibaba", type: "text", credits: "1" },
  { id: "nano-banana-2", name: "Nano Banana 2", provider: "Google", type: "image", credits: "300", isNew: true },
  { id: "seedream", name: "Seedream 5", provider: "ByteDance", type: "image", credits: "150", isNew: true },
  { id: "flux-kontext", name: "Flux Kontext Pro", provider: "Black Forest", type: "image", credits: "80" },
  { id: "midjourney", name: "Midjourney", provider: "Midjourney", type: "image", credits: "120" },
  { id: "gpt-image", name: "GPT Image 2", provider: "OpenAI", type: "image", credits: "200" },
  { id: "kling-3", name: "Kling 3.0 Motion", provider: "Kling", type: "video", credits: "75", isNew: true },
  { id: "veo-3", name: "Veo 3", provider: "Google", type: "video", credits: "480", isNew: true },
  { id: "sora-2", name: "Sora 2", provider: "OpenAI", type: "video", credits: "480" },
  { id: "seedance-2", name: "Seedance 2.0", provider: "ByteDance", type: "video", credits: "60" },
  { id: "hailuo", name: "Hailuo", provider: "Hailuo", type: "video", credits: "50" },
  { id: "vidu", name: "Vidu", provider: "Vidu", type: "video", credits: "40" },
  { id: "suno", name: "Suno", provider: "Suno", type: "audio", credits: "30" },
  { id: "eleven-labs", name: "ElevenLabs", provider: "ElevenLabs", type: "audio", credits: "60" },
];

export const modelTypeToRoute: Record<SearchableModelType, string> = {
  text: "/text",
  image: "/design",
  video: "/video",
  audio: "/audio",
};
