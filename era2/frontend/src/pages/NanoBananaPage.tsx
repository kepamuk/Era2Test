import { useEffect } from "react";
import { Link } from "@/shared/routing";
import { useAuth } from "@/features/auth";
import { Footer } from "@/components/shared/Footer";
import { FAQ } from "@/components/shared/FAQ";
import { aiPhotos, aiArt, aiLandscapes } from "@/entities/generation";
import { Zap, Target, Lock, Type, Image as ImageIcon, Palette, Ratio, Globe, CreditCard, Wallet, Sailboat, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";

const features: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Target, title: "Фотореализм", desc: "Генерация изображений с фотографической детализацией. Кожа, текстуры, освещение — неотличимо от реальных фото." },
  { Icon: Lock, title: "Неизменные сюжеты", desc: "Контроль консистентности персонажей и сцен. Один и тот же человек в разных ракурсах и ситуациях." },
  { Icon: Type, title: "Текст на изображениях", desc: "Точная генерация текста, надписей и типографики прямо на картинке." },
  { Icon: ImageIcon, title: "Разрешение до 4K", desc: "Генерация в высоком разрешении без потери качества и деталей." },
  { Icon: Palette, title: "Любые стили", desc: "От фотореализма до аниме, от масляной живописи до минималистичных иллюстраций." },
  { Icon: Ratio, title: "Гибкие пропорции", desc: "Поддержка всех форматов: 1:1, 16:9, 9:16, 4:3, 3:2, 21:9 и auto." },
];

const pricing = [
  { name: "Nano Banana 2", credits: 300 },
  { name: "Nano Banana Pro", credits: 150 },
  { name: "Nano Banana", credits: 80 },
];

const whyEra2: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Globe, title: "Без VPN", desc: "Nano Banana работает напрямую из России. Никаких блокировок." },
  { Icon: CreditCard, title: "Оплата в рублях", desc: "Не нужна иностранная карта. Оплата любым российским банком." },
  { Icon: Wallet, title: "Дешевле подписки", desc: "Платите только за использование. Не нужна отдельная подписка за $30/мес." },
];

const steps = [
  { num: "01", title: "Откройте генератор", desc: "Перейдите в раздел «Изображения» и выберите Nano Banana 2" },
  { num: "02", title: "Напишите промпт", desc: "Опишите что хотите увидеть — на русском или английском" },
  { num: "03", title: "Скачайте результат", desc: "Получите изображение за ~30 секунд в разрешении до 4K" },
];

const otherModels = [
  { name: "MidJourney", badge: "Топ", credits: 80 },
  { name: "Seedream 5 Lite", badge: "NEW", credits: 2 },
  { name: "GPT Image 1.5", badge: "Premium", credits: 40 },
  { name: "Flux", badge: "SOTA", credits: 15 },
  { name: "Imagen 4", badge: "Google", credits: 8 },
  { name: "Higgsfield Soul", badge: "NEW", credits: 15 },
];

const faqItems = [
  { q: "Что такое Nano Banana 2?", a: "Nano Banana 2 — это нейросеть для генерации фотореалистичных изображений премиум-класса. Отличается от других моделей неизменной консистентностью персонажей и высочайшей детализацией." },
  { q: "Сколько стоит генерация?", a: "Одна генерация Nano Banana 2 стоит 300 кредитов. Также доступны Nano Banana Pro (150 cr) и Nano Banana (80 cr) с более доступной ценой." },
  { q: "Можно ли использовать без VPN?", a: "Да. На ERA2 Nano Banana работает напрямую из России без VPN и ограничений." },
  { q: "Чем отличается от MidJourney?", a: "Nano Banana 2 специализируется на фотореализме и консистентности персонажей. MidJourney лучше для арт-стилистики и иллюстраций. Оба доступны на ERA2." },
  { q: "Какие форматы поддерживаются?", a: "Все стандартные пропорции: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 21:9 и auto. Разрешение до 4K." },
];

const NanoBananaPage = () => {
  const { isAuthed } = useAuth();
  const cta = isAuthed ? "/design" : "/auth";
  useEffect(() => {
    document.title = "Nano Banana 2 — генерация изображений с ИИ | ERA2.ai";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Генерация фотореалистичных изображений с Nano Banana 2. Без VPN, с оплатой в рублях. Разрешение до 4K, неизменные персонажи.");
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <section className="pt-28 pb-16 px-4" style={{ background: "linear-gradient(180deg, #1a0533 0%, transparent 60%)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <div className="mx-auto"><ModelGlyph name="Nano Banana" size={64} /></div>
          <h1 className="text-[clamp(28px,5vw,40px)] font-extrabold mt-5" style={{ color: "var(--text-primary)" }}>
            Nano Banana 2 — генерация изображений
          </h1>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(232, 84, 32,0.2)] text-primary">NEW</span>
          <p className="text-base max-w-[600px] mx-auto mt-4 mb-6" style={{ color: "var(--text-secondary)" }}>
            Премиум-генерация изображений нового поколения. Высшее качество на рынке с неизменными сюжетами и фотореалистичной детализацией.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to={cta} className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition">
              Попробовать бесплатно
            </Link>
            <Link to="/pricing" className="px-8 py-3.5 rounded-xl font-semibold text-sm transition" style={{ border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
              Смотреть тарифы
            </Link>
          </div>
          <p className="text-[13px] mt-4" style={{ color: "var(--text-tertiary)" }}>от 300 cr · ~30 сек · до 4K</p>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-[900px] mx-auto rounded-[22px] p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
          <div className="rounded-xl p-4 text-sm" style={{ background: "var(--bg-card-hover)", color: "var(--text-tertiary)" }}>
            Фотореалистичный портрет девушки в осеннем парке...
          </div>
          <div className="flex items-center gap-3 mt-3 text-xs flex-wrap" style={{ color: "var(--text-tertiary)" }}>
            <span className="px-2.5 py-1 rounded-md" style={{ background: "var(--bg-pill)" }}>Nano Banana 2</span>
            <span className="px-2.5 py-1 rounded-md" style={{ background: "var(--bg-pill)" }}>1:1</span>
            <span className="px-2.5 py-1 rounded-md" style={{ background: "var(--bg-pill)" }}>1</span>
            <span className="px-2.5 py-1 rounded-md" style={{ background: "var(--bg-pill)" }}>2K</span>
            <span className="ml-auto bg-primary text-white px-3 py-1 rounded-md font-medium inline-flex items-center gap-1"><Zap className="h-3 w-3" /> Генерировать 300</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[28px] font-bold text-center mb-10" style={{ color: "var(--text-primary)" }}>Возможности Nano Banana 2</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-card)" }}>
                <div className="w-9 h-9 rounded-full bg-[rgba(232, 84, 32,0.15)] flex items-center justify-center mb-3"><f.Icon size={18} style={{ color: "hsl(var(--primary))" }} /></div>
                <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-[13px] mt-1.5" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Идеальное соответствие персонажей */}
      <section className="max-w-[1000px] mx-auto px-4" style={{ padding: "80px 0" }}>
        <h2 className="text-[28px] font-bold text-center" style={{ color: "var(--text-primary)", marginBottom: 12 }}>Идеальное соответствие персонажей</h2>
        <p className="text-center max-w-[600px] mx-auto" style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 48 }}>
          Создавайте одного и того же персонажа в разных сценах, ракурсах и ситуациях с идеальной консистентностью
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div>
            <p className="uppercase mb-3" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", letterSpacing: 1 }}>Исходное изображение</p>
            <div className="flex flex-col gap-2">
              {[aiPhotos[0], aiPhotos[1]].map((src, i) => (
                <div key={i} className="overflow-hidden" style={{ width: 140, height: 180, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <span style={{ fontSize: 24, color: "var(--text-tertiary)" }}>→</span>
          <div>
            <p className="uppercase mb-3" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-tertiary)", letterSpacing: 1 }}>Выходное изображение</p>
            <div className="flex gap-2">
              {[aiPhotos[2], aiPhotos[3], aiPhotos[4]].map((src, i) => (
                <div key={i} className="overflow-hidden" style={{ width: 140, height: 180, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center italic" style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 24 }}>
          Надейте серьги, как показано на рисунке 2, на уши женщины
        </p>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[28px] font-bold text-center mb-10" style={{ color: "var(--text-primary)" }}>Стоимость генерации</h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-card)" }}>
            <div className="grid grid-cols-2 px-6 py-3 text-xs font-semibold" style={{ color: "var(--text-tertiary)", borderBottom: "1px solid var(--border-primary)" }}>
              <span>Модель</span><span className="text-right">Цена за 1 генерацию</span>
            </div>
            {pricing.map((p, i) => (
              <div key={p.name} className="grid grid-cols-2 px-6 py-4 text-sm" style={{ background: i % 2 === 1 ? "var(--bg-table-row-alt)" : "transparent" }}>
                <span className="font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                <span className="text-right text-primary font-medium">{p.credits} cr</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[13px] text-primary mt-4">
            Кредиты входят в подписку ERA2. <Link to="/pricing" className="underline hover:no-underline">Посмотреть тарифы →</Link>
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[28px] font-bold text-center mb-10" style={{ color: "var(--text-primary)" }}>Почему использовать Nano Banana через ERA2?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {whyEra2.map((w) => (
              <div key={w.title} className="rounded-2xl p-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-card)" }}>
                <div className="inline-flex items-center justify-center mb-3" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(232, 84, 32, 0.15)" }}><w.Icon size={22} style={{ color: "hsl(var(--primary))" }} /></div>
                <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{w.title}</h3>
                <p className="text-[13px] mt-2" style={{ color: "var(--text-secondary)" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* В тренде */}
      <section className="max-w-[1100px] mx-auto px-4" style={{ padding: "80px 0" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>В тренде</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: "КЛОНИРОВАНИЕ", desc: "Создание точных копий персонажей", img: aiPhotos[5] },
            { title: "СИЛА ДВИЖЕНИЯ", desc: "Динамичные позы и действия", img: aiPhotos[6] },
            { title: "СТИЛИЗАЦИЯ", desc: "Трансформация стиля изображения", img: aiArt[0] },
            { title: "ФОТОСЕССИЯ", desc: "Профессиональные портреты с ИИ", img: aiLandscapes[0] },
          ].map((c) => (
            <div key={c.title} className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]" style={{ height: 280, borderRadius: 16 }}>
              <img src={c.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masonry галерея */}
      <section className="max-w-[1200px] mx-auto px-4" style={{ padding: "80px 0" }}>
        <h2 className="text-center" style={{ fontSize: 28, fontWeight: 700, color: "var(--text-primary)", marginBottom: 32 }}>Создано с Nano Banana 2</h2>
        <div className="columns-2 md:columns-4" style={{ columnGap: 12 }}>
          {[200, 280, 240, 320, 180, 260, 200, 280, 240, 320, 180, 260].map((h, i) => {
            const imgs = [...aiPhotos, ...aiArt];
            return (
              <div
                key={i}
                className="hover:opacity-85 transition-opacity duration-300"
                style={{ breakInside: "avoid", marginBottom: 12, borderRadius: 16, overflow: "hidden", height: h }}
              >
                <img src={imgs[i % imgs.length]} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
        <div className="text-center" style={{ marginTop: 24 }}>
          <button
            className="hover:border-primary/40 transition-colors"
            style={{ background: "transparent", border: "1px solid var(--border-primary)", borderRadius: 12, padding: "10px 28px", fontSize: 14, color: "var(--text-secondary)", cursor: "pointer" }}
          >
            Показать ещё
          </button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[28px] font-bold text-center mb-12" style={{ color: "var(--text-primary)" }}>Как использовать Nano Banana 2 на ERA2</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="text-[64px] font-extrabold leading-none bg-primary bg-clip-text text-transparent">{s.num}</div>
                <h3 className="text-base font-semibold mt-3" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
                <p className="text-[13px] mt-2" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[22px] font-bold mb-6" style={{ color: "var(--text-primary)" }}>Другие модели для изображений</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {otherModels.map((m) => (
              <div key={m.name} className="flex-shrink-0 w-[180px] rounded-2xl p-4 transition cursor-pointer" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-card)" }}>
                <div className="mb-2"><ModelGlyph name={m.name} size={32} /></div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{m.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: "var(--bg-tag)", color: "var(--text-secondary)" }}>{m.badge}</span>
                </div>
                <div className="text-xs text-primary mt-2">от {m.credits} cr</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[800px] mx-auto">
          <FAQ items={faqItems} title="Частые вопросы" />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-[700px] mx-auto text-center p-10 rounded-[22px] bg-gradient-to-br from-[rgba(232, 84, 32,0.1)] to-[rgba(255, 122, 61,0.06)]">
          <h2 className="text-[28px] font-bold" style={{ color: "var(--text-primary)" }}>Попробуйте Nano Banana 2 на ERA2</h2>
          <p className="mt-2 mb-6" style={{ color: "var(--text-secondary)" }}>Бесплатный старт — без карты, без VPN</p>
          <Link to={cta} className="inline-block px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 transition">
            Начать генерацию →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NanoBananaPage;
