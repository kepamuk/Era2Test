import { Link } from "@/shared/routing";
import {
  Heading1,
  FileText,
  TrendingUp,
  PenLine,
  Music2,
  Languages,
  UserSquare2,
  Clapperboard,
  Swords,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { assistants } from "@/entities/assistant";

const ICON_MAP: Record<string, LucideIcon> = {
  headlines: Heading1,
  referater: FileText,
  marketer: TrendingUp,
  copywriter: PenLine,
  "music-prompt": Music2,
  "lang-teacher": Languages,
  resume: UserSquare2,
  screenwriter: Clapperboard,
  "sun-tzu": Swords,
};

interface AssistantsListProps {
  onPick?: (assistantName: string) => void;
}

export function AssistantsList({ onPick }: AssistantsListProps) {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <span
            className="inline-block text-[10px] font-mono uppercase tracking-[0.14em] mb-2 px-2 py-0.5 rounded-full"
            style={{
              color: "hsl(var(--primary))",
              background: "rgba(232,84,32,0.1)",
              border: "1px solid rgba(232,84,32,0.2)",
            }}
          >
            ASSISTANTS
          </span>
          <h2
            className="text-[22px] font-bold tracking-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Готовые ассистенты
          </h2>
          <p
            className="text-[13px] mt-1"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Преднастроенные роли для типовых задач — кликните, чтобы начать
          </p>
        </div>
        <Link
          to="/agents"
          className="hidden sm:inline-flex items-center gap-1 text-[13px] font-medium transition-colors hover:opacity-80"
          style={{ color: "hsl(var(--primary))" }}
        >
          Все ассистенты <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {assistants.map((a) => {
          const Icon = ICON_MAP[a.id] ?? PenLine;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onPick?.(a.name)}
              className="group relative text-left rounded-[16px] p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.4)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px -16px rgba(232,84,32,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "hsl(var(--border))";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,84,32,0.18), rgba(255,122,61,0.08))",
                    border: "1px solid rgba(232,84,32,0.25)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-[14px] font-semibold truncate"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {a.name}
                    </h3>
                    {a.isNew && (
                      <span
                        className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          color: "hsl(var(--primary))",
                          background: "rgba(232,84,32,0.12)",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[12.5px] leading-snug mt-1 line-clamp-2"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {a.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "hsl(var(--primary))" }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
