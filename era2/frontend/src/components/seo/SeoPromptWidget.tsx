import { useNavigate } from "@/shared/routing";
import { ChevronDown, Zap } from "lucide-react";

type Mode = "image" | "video" | "text" | "audio" | "agents";

interface SeoPromptWidgetProps {
  mode: Mode;
  placeholder: string;
  modelName: string;
  credits: number;
  redirectTo: string;
}

const modePills: Record<Mode, (modelName: string) => string[]> = {
  image: (m) => [m, "1:1", "1", "2K", "..."],
  video: (m) => [m, "16:9", "5s", "720p", "..."],
  text: (m) => [m],
  audio: (m) => [m, "RU"],
  agents: (m) => [m],
};

export function SeoPromptWidget({ mode, placeholder, modelName, credits, redirectTo }: SeoPromptWidgetProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: redirectTo });
  };

  const pills = modePills[mode](modelName);

  return (
    <div className="max-w-[900px] mx-auto px-4" style={{ paddingBottom: 60 }}>
      <p style={{ fontSize: 12, color: "var(--seo-text-muted)", textAlign: "center", marginBottom: 12 }}>
        Попробуйте прямо сейчас — введите свой промпт
      </p>
      <div
        onClick={handleClick}
        className="cursor-pointer"
        style={{
          borderRadius: 20,
          background: "var(--seo-card-bg)",
          border: "1px solid var(--seo-card-border)",
          padding: 24,
          boxShadow: "0 0 40px rgba(232, 84, 32,0.08)",
        }}
      >
        <div
          style={{
            height: 120,
            background: "var(--seo-table-alt)",
            borderRadius: 12,
            padding: 16,
            fontSize: 15,
            color: "var(--seo-text-muted)",
          }}
        >
          {placeholder}
        </div>

        <div className="flex items-center gap-2 flex-wrap" style={{ marginTop: 12 }}>
          {pills.map((pill, i) => (
            <span
              key={i}
              className="flex items-center gap-1"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 13,
                color: "var(--seo-text)",
              }}
            >
              {pill}
              {i === 0 && <ChevronDown size={12} />}
            </span>
          ))}
          <button
            className="ml-auto text-white font-semibold inline-flex items-center gap-1"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 20px",
              fontSize: 14,
            }}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            Генерировать <Zap className="h-3 w-3" />{credits}
          </button>
        </div>
      </div>
    </div>
  );
}
