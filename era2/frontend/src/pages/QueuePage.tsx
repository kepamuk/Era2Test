import { useEffect } from "react";
import { GenerationQueue } from "@/widgets/generation-queue";

export default function QueuePage() {
  useEffect(() => {
    document.title = "ERA2 — Очередь генераций";
  }, []);

  return <GenerationQueue />;
}
