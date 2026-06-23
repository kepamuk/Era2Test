import { useState, useEffect, useRef } from "react";
import { Camera, Palette, Sparkles, Image as ImageIcon, Zap, Paintbrush, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { cn } from "@/shared/lib/utils";

import { PromptBlock } from "@/components/workspace/ImagePromptBlock";

import { PromptSuggestions } from "@/components/workspace/PromptSuggestions";
import { ModelCarousel } from "@/components/workspace/ModelCarousel";
import { ScenariosCarousel } from "@/components/workspace/ScenariosCarousel";
import { ModelsGrid3x3 } from "@/components/workspace/ModelsGrid3x3";
import { WelcomeBlock, type WelcomeScenario } from "@/components/workspace/WelcomeBlock";
import { MediaChatFeed, type MediaGeneration } from "@/components/workspace/MediaChatFeed";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { GenerationLoader } from "@/features/generation";
import { WorkspaceTabs } from "@/components/workspace/WorkspaceTabs";

const ASPECT_TO_DIM: Record<string, [number, number]> = {
  "1:1": [1024, 1024], "16:9": [1280, 720], "9:16": [720, 1280],
  "4:3": [1152, 864], "3:4": [864, 1152], "3:2": [1216, 832], "2:3": [832, 1216],
  "21:9": [1536, 658], "4:5": [896, 1120], "5:4": [1120, 896],
};

import {
  imageProviders,
  imageCarouselCards,
  imagePromptSuggestions,
} from "@/entities/ai-model";

const designScenarios = [
  { name: "Фотореалистичный портрет", gradient: "linear-gradient(135deg, #1a0533, #2d1250)" },
  { name: "Арт и иллюстрация", gradient: "linear-gradient(135deg, #0d1b2a, #1b2838)" },
  { name: "Логотип и брендинг", gradient: "linear-gradient(135deg, #1a0a2e, #2a1a3e)" },
  { name: "Контент для соцсетей", gradient: "linear-gradient(135deg, #0a1628, #162040)" },
  { name: "Стикеры и эмодзи", gradient: "linear-gradient(135deg, #1a1030, #2a1840)" },
  { name: "Фон и обои", gradient: "linear-gradient(135deg, #0d2018, #1a3028)" },
  { name: "Концепт-арт", gradient: "linear-gradient(135deg, #1a1520, #2a2030)" },
];

const designGridModels = [
  { name: "Nano Banana 2", desc: "Премиум генерация", isNew: true, credits: 300 },
  { name: "MidJourney", desc: "Топ для арта", badges: ["Топ"], credits: 80 },
  { name: "Seedream 5 Lite", desc: "Быстрая генерация", isNew: true, credits: 2 },
  { name: "GPT Image 1.5", desc: "От OpenAI", credits: 40 },
  { name: "Flux", desc: "State of the art", badges: ["SOTA"], credits: 15 },
  { name: "Runway", desc: "Креативная генерация", credits: 20 },
  { name: "Imagen 4", desc: "От Google", badges: ["Google"], credits: 8 },
  { name: "Higgsfield Soul", desc: "Уникальный стиль", isNew: true, credits: 15 },
  { name: "Kling V3 Omni", desc: "Мультимодальная", isNew: true, credits: 25 },
];

const welcomeScenarios: WelcomeScenario[] = [
  {
    Icon: Camera,
    title: "Фотореалистичный портрет",
    desc: "Портрет человека с детализацией",
    prompt: "Photorealistic portrait of a young woman, soft studio lighting, shallow depth of field, 85mm lens, high detail skin texture, natural makeup",
    providerId: "midjourney",
    subModelId: "7",
    aspect: "3:4",
    quality: "2K",
    quantity: 2,
  },
  {
    Icon: Palette,
    title: "Логотип и брендинг",
    desc: "Минималистичный лого для бренда",
    prompt: "Minimal flat vector logo design, clean lines, modern typography, white background, professional branding",
    providerId: "flux",
    subModelId: "flux-kontext-pro",
    aspect: "1:1",
    quality: "2K",
    quantity: 4,
  },
  {
    Icon: Sparkles,
    title: "Аниме иллюстрация",
    desc: "Персонаж в стиле аниме",
    prompt: "Anime style character illustration, vibrant colors, detailed eyes, dynamic pose, studio ghibli inspired",
    providerId: "midjourney",
    subModelId: "niji-7",
    aspect: "3:4",
    quality: "2K",
    quantity: 2,
  },
  {
    Icon: ImageIcon,
    title: "Контент для соцсетей",
    desc: "Пост, сторис, обложка",
    prompt: "Eye-catching social media post design, bold typography, gradient background, modern aesthetic, Instagram ready",
    providerId: "nano-banana",
    subModelId: "banana-2",
    aspect: "1:1",
    quality: "2K",
    quantity: 1,
  },
  {
    Icon: Zap,
    title: "Киберпанк сцена",
    desc: "Неоновый город будущего",
    prompt: "Cyberpunk city at night, neon lights, rain reflections on wet streets, holographic billboards, blade runner atmosphere, cinematic wide angle",
    providerId: "nano-banana",
    subModelId: "banana-2",
    aspect: "16:9",
    quality: "2K",
    quantity: 2,
  },
  {
    Icon: Paintbrush,
    title: "Арт и иллюстрация",
    desc: "Художественная иллюстрация",
    prompt: "Digital art illustration, fantasy landscape, magical forest with glowing mushrooms, ethereal light rays, detailed environment, concept art style",
    providerId: "seedream",
    subModelId: "seedream-5-lite",
    aspect: "16:9",
    quality: "2K",
    quantity: 1,
  },
];

const DesignPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("nano-banana");
  const [selectedSubModelId, setSelectedSubModelId] = useState("banana-2");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quantity, setQuantity] = useState(1);
  const [quality, setQuality] = useState("2K");
  const [turbo, setTurbo] = useState(false);
  const [generations, setGenerations] = useState<MediaGeneration[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  
  const [capsuleOpen, setCapsuleOpen] = useState(false);

  useEffect(() => {
    if (!capsuleOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-capsule-dropdown]")) setCapsuleOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [capsuleOpen]);

  const provider = imageProviders.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const hasGenerations = generations.length > 0;

  useEffect(() => { document.title = "ERA2 — Генерация изображений"; }, []);
  useEffect(() => {
    if (generations.length > 0) {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [generations]);

  // Restore draft on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("era2_draft_design");
    if (saved) setPrompt(saved);
  }, []);
  // Save draft on change
  useEffect(() => {
    sessionStorage.setItem("era2_draft_design", prompt);
  }, [prompt]);

  const handleGenerate = () => {
    const text = prompt.trim();
    if (!text || isGenerating) return;
    const [w, h] = ASPECT_TO_DIM[aspectRatio] || [1024, 1024];
    const imgs = Array.from({ length: Math.max(1, quantity) }, () => ({ width: w, height: h }));
    setIsGenerating(true);
    setTimeout(() => {
      setGenerations((prev) => [...prev, {
        id: Date.now().toString(),
        prompt: text,
        model: provider?.name || "Image",
        subModel: subModel?.name || "",
        createdAt: new Date(),
        type: "image",
        images: imgs,
        aspect: aspectRatio,
        quality,
      }]);
      setIsGenerating(false);
      setPrompt("");
      sessionStorage.removeItem("era2_draft_design");
    }, 2000 + Math.random() * 2000);
  };

  const handleModelSelect = (providerId: string, subModelId: string) => {
    setSelectedProviderId(providerId);
    setSelectedSubModelId(subModelId);
    const p = imageProviders.find((pr) => pr.id === providerId);
    if (p) {
      setAspectRatio(p.aspectRatios[0] || "1:1");
      setQuality(p.qualityOptions?.[1] || p.qualityOptions?.[0] || "2K");
      setQuantity(p.quantityOptions?.[0] || 1);
    }
  };

  const carouselModels = imageCarouselCards.map((c) => ({
    name: c.title,
    desc: c.desc,
    gradient: c.gradient,
    badge: c.badge,
  }));

  const handleCarouselSelect = (name: string) => {
    const card = imageCarouselCards.find((c) => c.title === name);
    if (card) handleModelSelect(card.providerId, card.subModelId);
  };

  return (
    <ErrorBoundary>
    <div className="flex flex-col h-[calc(100vh-var(--header-height,64px))] mesh-background">
      {/* Scrollable area: chat (welcome OR feed) + catalog below */}
      <div className="flex-1 overflow-y-auto w-full relative z-[1]">
        <div className="sticky top-0 z-20 flex justify-center py-2" style={{ background: "color-mix(in oklab, var(--c-bg) 85%, transparent)", backdropFilter: "blur(12px)" }}>
          <div className="relative" data-capsule-dropdown>
            <button onClick={() => setCapsuleOpen(!capsuleOpen)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-medium hover:opacity-90 transition-opacity" style={{ background: "var(--c-bg-1)", border: "1px solid var(--c-line)", color: "var(--c-fg)" }}>
              <ModelGlyph name={provider?.name || "Nano Banana"} size={20} />
              <span>{provider?.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono tabular-nums text-xs" style={{ color: "var(--c-accent-2)" }}>{subModel?.name}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            <AnimatePresence>
              {capsuleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] max-h-[400px] overflow-y-auto rounded-[14px] border p-1.5 shadow-2xl z-50"
                  style={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))" }}
                >
                  {imageProviders.map((p) => (
                    <div key={p.id}>
                      <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{p.name}</div>
                      {p.subModels.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { handleModelSelect(p.id, s.id); setCapsuleOpen(false); }}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm transition-colors text-left",
                            selectedSubModelId === s.id ? "bg-[rgba(232,84,32,0.12)]" : "hover:bg-secondary"
                          )}
                        >
                          <ModelGlyph name={p.name} size={24} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate" style={{ color: selectedSubModelId === s.id ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}>{s.name}</div>
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground shrink-0">{s.credits} cr</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {!hasGenerations ? (
          <WelcomeBlock
            modelName={provider?.name || "Изображения"}
            subModelName={subModel?.name}
            scenarios={welcomeScenarios}
            onScenarioClick={(scenario) => {
              setPrompt(scenario.prompt);
              if (scenario.providerId) {
                const prov = imageProviders.find(p => p.id === scenario.providerId);
                if (prov) {
                  setSelectedProviderId(prov.id);
                  if (scenario.subModelId) {
                    const sub = prov.subModels.find(s => s.id === scenario.subModelId);
                    if (sub) setSelectedSubModelId(sub.id);
                  }
                }
              }
              if (scenario.aspect) setAspectRatio(scenario.aspect);
              if (scenario.quality) setQuality(scenario.quality);
              if (scenario.quantity) setQuantity(scenario.quantity);
            }}
          />
        ) : (
          <>
            <MediaChatFeed generations={generations} />
            {isGenerating && <GenerationLoader type="image" model={subModel?.name} />}
            <div ref={feedEndRef} />
          </>
        )}

        {/* Каталог — только до первой генерации */}
        {!hasGenerations && (
          <div className="px-4 lg:px-8 py-6 space-y-6 border-t border-border mt-6">
            <PromptSuggestions suggestions={imagePromptSuggestions} onSelect={setPrompt} />
            <ModelCarousel models={carouselModels} onSelect={handleCarouselSelect} />
            <ScenariosCarousel title="Сценарии для изображений" scenarios={designScenarios} />
            <ModelsGrid3x3 models={designGridModels} />
          </div>
        )}
      </div>

      {/* Sticky input area */}
      <div className={cn("shrink-0 px-4 lg:px-6 pb-4 pt-1.5 bg-[var(--bg-primary)] relative z-[1]")}>
        <div className="max-w-[780px] mx-auto">
          <WorkspaceTabs variant="attached" />
          <div ref={inputAreaRef} className={isGenerating ? "glow-border-active" : "glow-border-idle"}>
            <PromptBlock
              prompt={prompt}
              onPromptChange={setPrompt}
              providers={imageProviders}
              selectedProviderId={selectedProviderId}
              selectedSubModelId={selectedSubModelId}
              onModelSelect={handleModelSelect}
              aspectRatio={aspectRatio}
              onAspectSelect={setAspectRatio}
              quantity={quantity}
              onQuantityChange={setQuantity}
              quality={quality}
              onQualityChange={setQuality}
              turbo={turbo}
              onTurboToggle={() => setTurbo(!turbo)}
              onGenerate={handleGenerate}
            />
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default DesignPage;
