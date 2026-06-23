import { useNavigate } from "@/shared/routing";
import { useAuth } from "@/features/auth";

interface Pill {
  label: string;
}

interface SeoPromptBlockProps {
  placeholder: string;
  pills: Pill[];
  actionLabel: string;
  actionCredits: string;
  targetRoute: string;
}

export function SeoPromptBlock({ placeholder, pills, actionLabel, actionCredits, targetRoute }: SeoPromptBlockProps) {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: isAuthed ? targetRoute : "/auth" });
  };

  return (
    <div className="relative z-10 max-w-[900px] mx-auto px-4" style={{ marginTop: -40 }}>
      <div
        className="cursor-pointer bg-background dark:bg-[#16161f] border border-gray-200 dark:border-white/[0.06]"
        style={{ borderRadius: 20, padding: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
        onClick={handleClick}
      >
        <div
          className="w-full bg-transparent text-gray-900 dark:text-white pointer-events-none"
          style={{ minHeight: 80, fontSize: 15, resize: "none", border: "none", outline: "none" }}
        >
          <span className="text-gray-400 dark:text-white/30">{placeholder}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-3">
          {pills.map((pill, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60"
              style={{ borderRadius: 10, padding: "6px 12px", fontSize: 13 }}
            >
              {pill.label}
            </span>
          ))}
          <button
            className="ml-auto text-white font-medium"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), #ff7a3d)",
              padding: "8px 20px",
              borderRadius: 10,
              fontSize: 13,
            }}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
          >
            {actionLabel} <span className="font-mono tabular-nums ml-1">{actionCredits} cr</span>
          </button>
        </div>
      </div>

      <p className="text-center mt-3 text-gray-400 dark:text-white/25" style={{ fontSize: 12 }}>
        ERA2.ai — 90+ нейросетей · Без VPN · Оплата в ₽
      </p>
    </div>
  );
}
