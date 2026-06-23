import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";

export interface WelcomeScenario {
  Icon: LucideIcon;
  title: string;
  desc: string;
  prompt: string;
  // Preset fields (optional)
  providerId?: string;
  subModelId?: string;
  aspect?: string;
  quality?: string;
  quantity?: number;
  duration?: string;
  resolution?: string;
}

interface Props {
  modelName: string;
  subModelName?: string;
  description?: string;
  scenarios: WelcomeScenario[];
  onScenarioClick: (scenario: WelcomeScenario) => void;
}

export function WelcomeBlock({
  modelName,
  subModelName,
  description = "Единый доступ к 90+ нейросетям",
  scenarios,
  onScenarioClick,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,64px)-200px)] px-4 py-4">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ModelGlyph name={modelName} size={40} className="mb-3" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="text-[22px] font-semibold mb-0.5 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {modelName}
        </motion.h1>
        {subModelName && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="text-[13px] mb-0.5 font-mono tabular-nums"
            style={{ color: "var(--text-secondary)" }}
          >
            {subModelName}
          </motion.p>
        )}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="text-[13px] mb-5"
          style={{ color: "var(--text-tertiary)" }}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-2 max-w-lg"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
          }}
        >
          {scenarios.map((s) => (
            <motion.button
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onScenarioClick(s)}
              className="px-4 py-2.5 rounded-full text-[13px] text-muted-foreground font-medium transition-all hover:text-foreground"
              style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--secondary))" }}
            >
              {s.title}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
