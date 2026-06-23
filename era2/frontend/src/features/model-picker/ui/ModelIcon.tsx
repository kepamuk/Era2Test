interface Props {
  providerId: string;
  size?: number;
  className?: string;
}

const configs: Record<string, { gradient: [string, string]; symbol: string; symbolColor?: string }> = {
  chatgpt: { gradient: ["#10a37f", "#1a7f64"], symbol: "✦", symbolColor: "#fff" },
  claude: { gradient: ["#d97706", "#b45309"], symbol: "✳", symbolColor: "#fff" },
  gemini: { gradient: ["#4285f4", "#1a73e8"], symbol: "✦", symbolColor: "#fff" },
  deepseek: { gradient: ["#0ea5e9", "#0284c7"], symbol: "✦", symbolColor: "#fff" },
  grok: { gradient: ["#2a2a3e", "#1a1a2e"], symbol: "✕", symbolColor: "#fff" },
  perplexity: { gradient: ["#14b8a6", "#0d9488"], symbol: "✦", symbolColor: "#fff" },
  qwen: { gradient: ["hsl(var(--primary))", "#4f46e5"], symbol: "✦", symbolColor: "#fff" },
};

export function ModelIcon({ providerId, size = 24, className = "" }: Props) {
  const cfg = configs[providerId] || configs.chatgpt;
  const fontSize = size * 0.5;

  return (
    <div
      className={`shrink-0 rounded-full flex items-center justify-center font-bold select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${cfg.gradient[0]}, ${cfg.gradient[1]})`,
        fontSize,
        color: cfg.symbolColor || "#fff",
        lineHeight: 1,
      }}
    >
      {cfg.symbol}
    </div>
  );
}
