interface Scenario {
  icon?: string;
  title: string;
  description: string;
}

interface ScenariosGridProps {
  heading: string;
  items: Scenario[];
  images?: string[];
}

export const ScenariosGrid = ({ heading, items, images }: ScenariosGridProps) => (
  <section style={{ padding: "80px 0" }} className="px-4">
    <div className="max-w-[1200px] mx-auto">
      <h2
        className="text-center"
        style={{ fontSize: 28, fontWeight: 700, color: "var(--seo-heading)", marginBottom: 40 }}
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--seo-card-border)" }}
          >
            {images && images[i] ? (
              <img src={images[i]} alt="" loading="lazy" className="w-full object-cover" style={{ height: 160 }} />
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  height: 160,
                  background: ["linear-gradient(135deg, #1a0533, #2d1250)", "linear-gradient(135deg, #0d1b2a, #1b2838)", "linear-gradient(135deg, #1a0a2e, #2a1a3e)", "linear-gradient(135deg, #0a1628, #162040)"][i % 4],
                  fontSize: 48,
                }}
              >
                {item.icon}
              </div>
            )}
            <div style={{ background: "var(--seo-card-bg)", padding: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--seo-heading)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--seo-text-muted)", marginTop: 4 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
