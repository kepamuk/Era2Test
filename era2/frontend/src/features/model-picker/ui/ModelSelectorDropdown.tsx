import { useState, useRef, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { getModelsByCategory, type AIModel, type SubModel } from "@/entities/ai-model";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { cn } from "@/shared/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedModelId: string;
  selectedSubModelId?: string;
  onSelect: (model: AIModel, subModel?: SubModel) => void;
}

export function ModelSelectorDropdown({ open, onClose, selectedModelId, selectedSubModelId, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const textModels = getModelsByCategory("text");

  useEffect(() => {
    if (!open) {
      setSearch("");
      setExpandedProvider(null);
    }
  }, [open]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  const q = search.toLowerCase();
  const filtered = textModels.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.provider.toLowerCase().includes(q) ||
      m.subModels?.some((s) => s.name.toLowerCase().includes(q))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/20 dark:bg-black/40">
      <div
        ref={ref}
        className="w-full max-w-[480px] max-h-[500px] bg-popover border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск нейросетей..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {expandedProvider ? (
            <SubModelList
              model={filtered.find((m) => m.id === expandedProvider)!}
              selectedSubModelId={selectedSubModelId}
              selectedModelId={selectedModelId}
              onBack={() => setExpandedProvider(null)}
              onSelect={(model, sub) => { onSelect(model, sub); onClose(); }}
            />
          ) : (
            <ProviderList
              models={filtered}
              selectedModelId={selectedModelId}
              onExpand={setExpandedProvider}
              onSelect={(model) => { onSelect(model); onClose(); }}
            />
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2 border-t border-border text-[11px] text-muted-foreground flex gap-4">
          <span>↑↓ Навигация</span>
          <span>↵ Выбор</span>
          <span>Esc Закрыть</span>
        </div>
      </div>
    </div>
  );
}

function ProviderList({
  models, selectedModelId, onExpand, onSelect,
}: {
  models: AIModel[];
  selectedModelId: string;
  onExpand: (id: string) => void;
  onSelect: (model: AIModel) => void;
}) {
  return (
    <div className="py-1">
      {models.map((m) => (
        <button
          key={m.id}
          onClick={() => (m.subModels?.length ? onExpand(m.id) : onSelect(m))}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left",
            selectedModelId === m.id && "bg-muted/40"
          )}
        >
          <ModelGlyph name={m.name} size={24} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{m.name}</div>
            <div className="text-xs text-muted-foreground">Модель {m.provider}</div>
          </div>
          <span className="font-mono text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full shrink-0">
            {m.credits} cr
          </span>
          {m.subModels?.length ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : selectedModelId === m.id ? (
            <Check className="w-4 h-4 text-primary shrink-0" />
          ) : null}
        </button>
      ))}
      {models.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">Ничего не найдено</div>
      )}
    </div>
  );
}

function SubModelList({
  model, selectedSubModelId, selectedModelId, onBack, onSelect,
}: {
  model: AIModel;
  selectedSubModelId?: string;
  selectedModelId: string;
  onBack: () => void;
  onSelect: (model: AIModel, sub: SubModel) => void;
}) {
  if (!model) return null;
  return (
    <div className="py-1">
      <button
        onClick={onBack}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted/60 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Назад
      </button>
      <div className="px-4 py-2 flex items-center gap-2">
        <ModelGlyph name={model.name} size={20} />
        <span className="text-sm font-semibold">{model.name}</span>
      </div>
      {model.subModels?.map((sub) => {
        const isSelected = selectedModelId === model.id && selectedSubModelId === sub.id;
        return (
          <button
            key={sub.id}
            onClick={() => onSelect(model, sub)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left",
              isSelected && "bg-muted/40"
            )}
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm">{sub.name}</span>
              {sub.isNew && (
                <span className="ml-2 text-[10px] font-mono font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <span className="font-mono text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full shrink-0">
              {sub.credits} cr
            </span>
            {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}
