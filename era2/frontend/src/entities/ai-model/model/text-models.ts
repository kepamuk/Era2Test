// ─── Text model providers & sub-models for /text ───

import type { LucideIcon } from "lucide-react";
import { PenLine, Lightbulb, Code, Languages, Search, BarChart3 } from "lucide-react";

export interface TextSubModel {
  id: string;
  name: string;
  credits: number;
  badge?: string;       // "🏆 TOP" | "NEW" | "∞ FAST" | "🔍 WEB" | "🧠 THINK" | "🏆 PRO"
  description: string;
  isNew?: boolean;
  hasWeb?: boolean;
  hasThinking?: boolean;
  hasFiles?: boolean;
  hasImages?: boolean;
}

export interface TextProvider {
  id: string;
  name: string;
  icon: string;
  subModels: TextSubModel[];
}

export const textProviders: TextProvider[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "",
    subModels: [
      { id: "gpt-web", name: "GPT Web", credits: 0, badge: "WEB", description: "Веб-поиск и анализ ссылок в реальном времени", hasWeb: true, hasImages: true },
      { id: "gpt-4.1", name: "GPT-4.1", credits: 3, description: "Производительная модель для повседневных задач", hasFiles: true, hasImages: true },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", credits: 1, badge: "∞ FAST", description: "Быстрая и экономная версия 4.1", hasFiles: true, hasImages: true },
      { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", credits: 1, badge: "∞ FAST", description: "Ультрабыстрая, минимальные задачи", hasFiles: true },
      { id: "gpt-5.2", name: "GPT 5.2", credits: 6, badge: "TOP", description: "Флагман GPT — умный и быстрый", isNew: true, hasFiles: true, hasImages: true },
      { id: "gpt-5.3", name: "GPT 5.3", credits: 8, badge: "TOP", description: "Улучшенная версия GPT 5", hasFiles: true, hasImages: true },
      { id: "gpt-5.1", name: "GPT 5.1", credits: 6, badge: "TOP", description: "Стабильная версия GPT 5", hasFiles: true, hasImages: true },
      { id: "gpt-5.4", name: "GPT 5.4", credits: 10, badge: "TOP", description: "Топовый GPT для сложных задач", hasFiles: true, hasImages: true },
      { id: "gpt-5.4-pro", name: "GPT 5.4 Pro", credits: 15, badge: "PRO", description: "Максимальная мощность OpenAI", hasFiles: true, hasImages: true },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    icon: "",
    subModels: [
      { id: "claude-3.5-haiku", name: "Claude 3.5 Haiku", credits: 1, badge: "∞ FAST", description: "Быстрый и эффективный", hasFiles: true },
      { id: "claude-4-sonnet", name: "Claude 4 Sonnet", credits: 1, description: "Баланс скорости и качества", hasFiles: true },
      { id: "claude-4-opus", name: "Claude 4 Opus", credits: 3, badge: "TOP", description: "Умнейший Claude 4 для сложных задач", hasFiles: true },
      { id: "claude-4.1-opus", name: "Claude 4.1 Opus", credits: 4, badge: "TOP", description: "Обновлённый Opus с лучшим кодингом", hasFiles: true },
      { id: "claude-4.5-sonnet", name: "Claude 4.5 Sonnet", credits: 1, badge: "NEW", description: "Новый Sonnet 4.5", isNew: true, hasFiles: true },
      { id: "claude-4.5-opus", name: "Claude 4.5 Opus", credits: 5, badge: "NEW", description: "Топовый Claude апрель 2026", isNew: true, hasFiles: true },
      { id: "claude-4.6-opus", name: "Claude 4.6 Opus", credits: 6, badge: "NEW", description: "Новейший флагман Anthropic", isNew: true, hasFiles: true },
      { id: "claude-4.6-sonnet", name: "Claude 4.6 Sonnet", credits: 2, badge: "NEW", description: "Новейший Sonnet 4.6", isNew: true, hasFiles: true },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: "",
    subModels: [
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", credits: 1, badge: "∞ FAST", description: "Быстрый и мультимодальный", hasFiles: true, hasImages: true },
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", credits: 1, badge: "NEW", description: "Самая мощная версия с высокой точностью", isNew: true, hasFiles: true, hasImages: true },
      { id: "gemini-3-pro", name: "Gemini 3 Pro", credits: 2, badge: "TOP", description: "Gemini 3 — сложные задачи и большие данные", hasFiles: true, hasImages: true },
      { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro Preview", credits: 3, badge: "NEW", description: "Превью новейшего Gemini", isNew: true, hasFiles: true, hasImages: true },
    ],
  },
  {
    id: "grok",
    name: "Grok",
    icon: "",
    subModels: [
      { id: "grok-3", name: "Grok 3", credits: 1, description: "Стандартный Grok от xAI" },
      { id: "grok-3-reasoner", name: "Grok 3 Reasoner", credits: 2, badge: "THINK", description: "Рассуждающая версия Grok", hasThinking: true },
      { id: "grok-3-deep-search", name: "Grok 3 Deep Search", credits: 2, badge: "WEB", description: "Глубокий поиск в интернете", hasWeb: true },
      { id: "grok-4", name: "Grok 4", credits: 3, badge: "TOP", description: "Новейший флагман xAI", isNew: true },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    icon: "",
    subModels: [
      { id: "deepseek-v3", name: "DeepSeek V3", credits: 1, badge: "∞ FAST", description: "Быстрый и мощный open-source" },
      { id: "deepseek-r1", name: "DeepSeek R1", credits: 1, badge: "THINK", description: "Лучшая рассуждающая модель", hasThinking: true },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: "",
    subModels: [
      { id: "perplexity-sonar", name: "Perplexity Sonar", credits: 1, badge: "∞ FAST", description: "Быстрый поиск с цитатами", hasWeb: true },
      { id: "perplexity-sonar-pro", name: "Perplexity Sonar Pro", credits: 2, badge: "WEB", description: "Расширенный поиск с анализом", hasWeb: true },
      { id: "perplexity-deep-research", name: "Perplexity Sonar Deep Research", credits: 5, badge: "WEB", description: "Глубокое исследование с отчётом", hasWeb: true },
    ],
  },
  {
    id: "qwen",
    name: "Qwen",
    icon: "",
    subModels: [
      { id: "qwen-3", name: "Qwen 3", credits: 1, description: "Флагманская языковая модель Alibaba" },
      { id: "qwen-3-thinking", name: "Qwen 3 Thinking", credits: 2, badge: "THINK", description: "Версия с пошаговым рассуждением", hasThinking: true },
      { id: "qwen-3-max-thinking", name: "Qwen 3 Max Thinking", credits: 3, badge: "MAX", description: "Максимальная мощность + мышление", hasThinking: true },
    ],
  },
];

// ─── Quick action cards for welcome screen ───

export interface QuickAction {
  Icon: LucideIcon;
  title: string;
  description: string;
  prompt: string;
}

export const textQuickActions: QuickAction[] = [
  { Icon: PenLine,    title: "Написать текст",   description: "Статья, пост, письмо, сценарий",    prompt: "Напиши мне " },
  { Icon: Lightbulb,  title: "Генерация идей",   description: "Концепции, названия, слоганы",       prompt: "Придумай идеи для " },
  { Icon: Code,       title: "Написать код",     description: "Создам, исправлю, объясню",          prompt: "Напиши код: " },
  { Icon: Languages,  title: "Перевести",        description: "На любой язык с сохранением стиля",  prompt: "Переведи на английский: " },
  { Icon: Search,     title: "Найти ответ",      description: "Факты, объяснения, анализ",          prompt: "Объясни мне " },
  { Icon: BarChart3,  title: "Работа с данными", description: "Таблицы, отчёты, данные",            prompt: "Проанализируй " },
];

// ─── Helpers ───

export function getDefaultTextProvider(): TextProvider {
  return textProviders[0]; // ChatGPT
}

export function getDefaultTextSubModel(): TextSubModel {
  return textProviders[0].subModels.find((s) => s.id === "gpt-5.2")!;
}

export function findTextProvider(id: string): TextProvider | undefined {
  return textProviders.find((p) => p.id === id);
}
