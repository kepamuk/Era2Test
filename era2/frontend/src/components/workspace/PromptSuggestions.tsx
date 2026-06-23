import { RotateCcw } from "lucide-react";

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelect: (s: string) => void;
}

export function PromptSuggestions({ suggestions, onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mt-1">
      <button
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors"
        style={{ border: "1px solid var(--border-primary)", color: "var(--text-tertiary)" }}
        onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
        onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; e.currentTarget.style.borderColor = "var(--border-primary)"; }}
      >
        <RotateCcw size={12} />
      </button>
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="shrink-0 px-3 py-1.5 rounded-full text-[13px] bg-transparent transition-colors truncate max-w-[200px]"
          style={{ border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}
          onMouseOver={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
          onMouseOut={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-primary)"; }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
