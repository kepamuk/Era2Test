import { Zap, Sparkles, Image as ImageIcon, Hash, Gem } from "lucide-react";
import { TwoPanelModelSelector, InlinePillDropdown } from "@/features/model-picker";
import { AttachmentButton } from "@/shared/ui/era";
import type { ImageProvider } from "@/entities/ai-model";

const ASPECT_DESC: Record<string, string> = {
  "1:1": "Квадрат",
  "16:9": "Горизонтальный",
  "9:16": "Вертикальный",
  "4:3": "Классический",
  "3:4": "Портретный",
  "3:2": "Фото",
  "2:3": "Портрет",
  "21:9": "Кинематограф",
  "4:5": "Соцсети",
  "5:4": "Альбом",
  "auto": "Авто",
};

const QUALITY_DESC: Record<string, string> = {
  "1K": "Быстрая генерация",
  "2K": "Баланс качества",
  "4K": "Максимальная детализация",
};

interface PromptBlockImageProps {
  prompt: string;
  onPromptChange: (v: string) => void;
  providers: ImageProvider[];
  selectedProviderId: string;
  selectedSubModelId: string;
  onModelSelect: (providerId: string, subModelId: string) => void;
  aspectRatio: string;
  onAspectSelect: (r: string) => void;
  quantity: number;
  onQuantityChange: (n: number) => void;
  quality: string;
  onQualityChange: (q: string) => void;
  turbo: boolean;
  onTurboToggle: () => void;
  onGenerate: () => void;
  modelTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function PromptBlock({
  prompt, onPromptChange,
  providers, selectedProviderId, selectedSubModelId, onModelSelect,
  aspectRatio, onAspectSelect,
  quantity, onQuantityChange,
  quality, onQualityChange,
  turbo, onTurboToggle,
  onGenerate,
  modelTriggerRef,
}: PromptBlockImageProps) {
  const provider = providers.find((p) => p.id === selectedProviderId);
  const subModel = provider?.subModels.find((s) => s.id === selectedSubModelId);
  const credits = subModel?.credits ?? 0;

  if (!provider) return null;

  const selectorProviders = providers.map((p) => ({
    id: p.id, name: p.name, icon: p.icon, badge: p.badge,
    subModels: p.subModels.map((s) => ({
      id: s.id, name: s.name, credits: s.credits, isNew: s.isNew, isDefault: s.isDefault, badge: s.badge,
      desc: s.desc, time: s.time,
    })),
  }));

  return (
    <div className="rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 sm:p-4 w-full transition-all duration-200 has-[textarea:focus]:border-[hsl(var(--primary))] has-[textarea:focus]:shadow-[0_0_0_3px_rgba(232,84,32,0.18),0_2px_8px_rgba(20,11,5,0.1)]">
      <div className="flex items-start gap-3 mb-3">
        <AttachmentButton current={0} max={provider.maxUploads} />
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Введите свою идею для генерации"
          rows={3}
          className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] resize-none min-h-[80px] py-3 px-1 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] placeholder:opacity-60"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 sm:overflow-visible sm:flex-wrap">
        <TwoPanelModelSelector
          providers={selectorProviders}
          selectedProviderId={selectedProviderId}
          selectedSubModelId={selectedSubModelId}
          onSelect={onModelSelect}
          triggerButtonRef={modelTriggerRef}
        />

        <InlinePillDropdown
          icon={<ImageIcon />}
          value={aspectRatio}
          options={provider.aspectRatios.map((r) => ({
            value: r,
            label: r,
            desc: ASPECT_DESC[r],
          }))}
          onSelect={onAspectSelect}
        />

        {provider.quantityOptions && provider.quantityOptions.length > 1 && (
          <InlinePillDropdown
            icon={<Hash />}
            value={String(quantity)}
            options={provider.quantityOptions.map((q) => ({
              value: String(q),
              label: String(q),
            }))}
            onSelect={(v) => onQuantityChange(Number(v))}
          />
        )}

        {provider.qualityOptions && provider.qualityOptions.length > 0 && (
          <InlinePillDropdown
            icon={<Gem />}
            value={quality}
            options={provider.qualityOptions.map((q) => ({
              value: q,
              label: q,
              desc: QUALITY_DESC[q],
            }))}
            onSelect={onQualityChange}
          />
        )}

        {provider.hasTurbo && (
          <button
            type="button"
            onClick={onTurboToggle}
            className={
              "inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-[12px] font-medium border transition-all " +
              (turbo
                ? "bg-[hsl(var(--primary))]/15 border-[hsl(var(--primary))]/40 text-[hsl(var(--primary))]"
                : "bg-[hsl(var(--secondary))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]")
            }
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums leading-none">{turbo ? "ON" : "OFF"}</span>
          </button>
        )}

        <button
          onClick={onGenerate}
          disabled={!prompt.trim()}
          className="ml-auto inline-flex items-center gap-1.5 px-5 h-10 rounded-full gradient-accent text-white text-[14px] font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" /> Генерировать
          <span className="inline-flex items-center gap-1 ml-1 font-mono tabular-nums">
            <Zap className="w-3 h-3" /> {credits}
          </span>
        </button>
      </div>
    </div>
  );
}
