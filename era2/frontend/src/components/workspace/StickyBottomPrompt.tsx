import { Plus, Zap, Sparkles } from "lucide-react";

interface StickyBottomPromptProps {
  prompt: string;
  onPromptChange: (v: string) => void;
  selectedModel: string;
  credits?: number;
  onGenerate: () => void;
}

export function StickyBottomPrompt({ prompt, onPromptChange, selectedModel, credits = 2, onGenerate }: StickyBottomPromptProps) {
  return (
    <div className="sticky bottom-0 z-10 px-4 py-3 bg-[hsl(var(--background))]/95 backdrop-blur-md">
      <div className="w-full rounded-[22px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 flex items-center gap-3 transition-colors focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--primary))]/20">
        <button className="w-9 h-9 shrink-0 border border-dashed border-[hsl(var(--border))] rounded-[8px] flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/60 hover:text-[hsl(var(--foreground))] transition-colors">
          <Plus size={16} />
        </button>
        <input
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Введите свою идею..."
          className="flex-1 bg-transparent outline-none text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
        />
        <span className="font-mono text-[12px] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] rounded-full px-2.5 py-1 hidden sm:inline truncate max-w-[200px] bg-[hsl(var(--secondary))]">
          {selectedModel}
        </span>
        <button
          onClick={onGenerate}
          disabled={!prompt.trim()}
          className="inline-flex items-center gap-1 px-4 h-9 rounded-full gradient-accent text-white text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] disabled:opacity-50"
        >
          <Sparkles size={12} />
          <span className="font-mono tabular-nums inline-flex items-center gap-1"><Zap size={12} /> {credits}</span>
        </button>
      </div>
    </div>
  );
}
