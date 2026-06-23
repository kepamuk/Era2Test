import { Link } from "@/shared/routing";

const modelTags = [
  "ChatGPT", "Claude", "Gemini", "DeepSeek", "Grok", "Perplexity",
  "Midjourney", "Nano Banana 2", "Nano Banana Pro", "Seedream 5 Lite",
  "GPT Image 1.5", "Flux", "Imagen 4", "Higgsfield Soul",
  "Kling 3.0", "Kling 2.5 Turbo", "Seedance 2.0", "Veo 3",
  "Sora 2", "Wan AI", "Hailuo AI", "Vidu AI", "ElevenLabs", "Suno",
];

export function ModelTagsCloud() {
  return (
    <section style={{ padding: "60px 0" }}>
      <h2 className="text-2xl font-bold text-center mb-8">Все нейросети на ERA2</h2>
      <div
        className="flex flex-wrap justify-center gap-2 mx-auto px-4"
        style={{ maxWidth: 900 }}
      >
        {modelTags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="transition-all duration-200 hover:text-[hsl(var(--primary))] hover:bg-[rgba(232, 84, 32,0.1)] hover:border-[rgba(232, 84, 32,0.3)]"
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--seo-pill-text)",
              background: "var(--seo-pill-bg)",
              border: "1px solid var(--seo-pill-border)",
            }}
          >
            {tag}
          </a>
        ))}
      </div>
    </section>
  );
}
