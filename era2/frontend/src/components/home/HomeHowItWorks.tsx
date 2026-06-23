const steps = [
  { num: "01", title: "Выберите нейросеть", desc: "ChatGPT, MidJourney, Sora или любая из 90+ моделей. Все в одном интерфейсе." },
  { num: "02", title: "Введите запрос", desc: "Опишите что нужно создать — на русском или английском. Текст, изображение, видео или аудио." },
  { num: "03", title: "Получите результат", desc: "Генерация за секунды. Скачайте, поделитесь или продолжите работу." },
];

export function HomeHowItWorks() {
  return (
    <section className="max-w-[900px] mx-auto" style={{ padding: "80px 16px" }}>
      <h2 className="text-foreground" style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Как это работает</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num}>
            <span className="font-mono tabular-nums" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1, color: "hsl(var(--primary))", letterSpacing: "-0.02em" }}>
              {s.num}
            </span>
            <h3 className="text-foreground" style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>{s.title}</h3>
            <p className="text-muted-foreground" style={{ fontSize: 14, marginTop: 8 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
