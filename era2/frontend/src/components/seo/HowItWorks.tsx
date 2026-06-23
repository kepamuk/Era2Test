const steps = [
  { num: "01", title: "Выберите нейросеть", desc: "Найдите подходящую модель из каталога ERA2" },
  { num: "02", title: "Напишите промпт", desc: "Опишите что хотите создать — на русском языке" },
  { num: "03", title: "Получите результат", desc: "Скачайте готовый контент за несколько секунд" },
];

export const HowItWorks = () => (
  <section style={{ padding: "80px 0" }} className="px-4">
    <div className="max-w-[1200px] mx-auto">
      <h2
        className="text-center"
        style={{ fontSize: 28, fontWeight: 700, color: "var(--seo-heading)", marginBottom: 48 }}
      >
        Как это работает
      </h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-6 justify-center items-center md:items-start">
        {steps.map((s) => (
          <div key={s.num} className="text-center" style={{ maxWidth: 300 }}>
            <div
              className="font-mono tabular-nums"
              style={{
                fontSize: 56,
                fontWeight: 500,
                color: "hsl(var(--primary))",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {s.num}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--seo-heading)", margin: "12px 0 8px" }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--seo-text)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
