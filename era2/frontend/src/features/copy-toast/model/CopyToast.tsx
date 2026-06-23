import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

let showToastGlobal: ((msg: string) => void) | null = null;

export function useCopyToast() {
  return (text: string, message = "Скопировано") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (showToastGlobal) showToastGlobal(message);
  };
}

export function CopyToastProvider() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    showToastGlobal = (m: string) => {
      setMsg(m);
      setTimeout(() => setMsg(null), 2000);
    };
    return () => {
      showToastGlobal = null;
    };
  }, []);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium shadow-lg"
          style={{
            background: "hsl(var(--foreground))",
            color: "hsl(var(--background))",
          }}
        >
          <Check className="h-4 w-4" />
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
