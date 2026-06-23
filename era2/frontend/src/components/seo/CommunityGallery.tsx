import { Link } from "@/shared/routing";
import { aiPhotos, aiArt, aiVideo } from "@/entities/generation";

const names = ["anna_k", "dmitry_v", "masha_art", "alex_pro", "studio_42", "nina_design", "ivan_3d", "kate_photo"];

interface CommunityGalleryProps {
  title: string;
  count?: number;
  type?: "image" | "video";
}

export function CommunityGallery({ title, count = 8, type = "image" }: CommunityGalleryProps) {
  const images = type === "video" ? aiVideo : [...aiPhotos.slice(0, 4), ...aiArt.slice(0, 4)];

  return (
    <section style={{ padding: "60px 0" }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--seo-text-muted)", textTransform: "uppercase", letterSpacing: 1, textAlign: "center", marginBottom: 24 }}>
        {title}
      </h3>
      <div className="flex gap-3 overflow-x-auto" style={{ paddingLeft: 16, paddingRight: 16, scrollbarWidth: "none" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden"
            style={{ width: 200, height: 260, borderRadius: 16 }}
          >
            <img src={images[i % images.length]} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.2)", marginBottom: 4 }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>@{names[i % names.length]}</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--seo-text-muted)", marginTop: 16 }}>
        <Link to="/design" style={{ color: "var(--seo-text-muted)" }}>Показать больше →</Link>
      </p>
    </section>
  );
}
