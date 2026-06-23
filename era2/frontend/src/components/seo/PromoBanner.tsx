import { Link } from "@/shared/routing";

interface PromoBannerProps {
  badge: string;
  title: string;
  description: string;
  link: string;
}

export const PromoBanner = ({ badge, title, description, link }: PromoBannerProps) => (
  <section style={{ padding: "0 0 0 0" }} className="px-4">
    <div
      className="max-w-[1200px] mx-auto flex items-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a0533 0%, #2d1250 40%, #0d0d12 100%)",
        borderRadius: 24,
        minHeight: 200,
      }}
    >
      <div className="relative z-10" style={{ padding: 40, maxWidth: "50%" }}>
        <span
          style={{
            background: "rgba(255, 122, 61,0.2)",
            color: "#ff7a3d",
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: 20,
            display: "inline-block",
            marginBottom: 12,
          }}
        >
          {badge}
        </span>
        <h3
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 2,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "8px 0 20px" }}>
          {description}
        </p>
        <Link
          to={link}
          className="inline-block font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
            padding: "10px 24px",
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          Попробовать →
        </Link>
      </div>

      <div
        className="absolute right-0 top-0 bottom-0 hidden md:block"
        style={{ width: "50%" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 50%, rgba(232, 84, 32,0.3), transparent 70%)" }} />
        <div className="absolute" style={{ width: 120, height: 120, borderRadius: "50%", background: "hsl(var(--primary))", opacity: 0.2, filter: "blur(40px)", top: "20%", right: "20%" }} />
        <div className="absolute" style={{ width: 80, height: 80, borderRadius: "50%", background: "#ff7a3d", opacity: 0.2, filter: "blur(40px)", bottom: "15%", right: "35%" }} />
        <div className="absolute" style={{ width: 60, height: 60, borderRadius: "50%", background: "hsl(var(--primary))", opacity: 0.15, filter: "blur(40px)", top: "50%", right: "10%" }} />
      </div>
    </div>
  </section>
);
