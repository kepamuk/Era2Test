import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";

const models = [
  { name: "ChatGPT" },
  { name: "Claude" },
  { name: "Gemini" },
  { name: "MidJourney" },
  { name: "Nano Banana" },
  { name: "Sora" },
  { name: "Kling" },
  { name: "Seedance" },
  { name: "Veo" },
  { name: "Flux" },
  { name: "ElevenLabs" },
  { name: "Suno" },
  { name: "DeepSeek" },
  { name: "Grok" },
  { name: "Perplexity" },
];

export function ModelsMarquee() {
  return (
    <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="inline-flex items-center" style={{ gap: 32 }}>
            {models.map((m) => (
              <div key={m.name + dup} className="flex items-center" style={{ gap: 8 }}>
                <ModelGlyph name={m.name} size={28} />
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--seo-text-muted)", whiteSpace: "nowrap" }}>{m.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        .marquee-track {
          display: inline-flex;
          gap: 32px;
          animation: marquee-scroll 30s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
