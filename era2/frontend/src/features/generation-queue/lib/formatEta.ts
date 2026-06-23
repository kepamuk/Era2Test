import type { GenType } from "@/entities/generation-task";

export function formatEta(seconds?: number): string {
  if (seconds == null) return "";
  if (seconds < 60) return `≈ ${seconds} сек`;
  const minutes = Math.round(seconds / 60);
  return `≈ ${minutes} мин`;
}

export function formatDuration(seconds?: number): string {
  if (seconds == null) return "";
  if (seconds < 60) return `за ${seconds} сек`;
  const minutes = Math.round(seconds / 60);
  return `за ${minutes} мин`;
}

export function formatDoneMeta(seconds?: number, credits?: number): string {
  if (seconds == null) return formatCredits(credits ?? 0);
  const duration = seconds < 60 ? `${seconds} сек` : `${Math.round(seconds / 60)} мин`;
  return `готово за ${duration} · ${formatCredits(credits ?? 0)}`;
}

export function formatCredits(credits: number): string {
  return `${credits} cr`;
}

export function formatQueueMeta(task: {
  status: string;
  etaSeconds?: number;
  durationSeconds?: number;
  credits: number;
  queuePosition?: number;
  error?: string;
}): string {
  if (task.status === "failed" && task.error) return task.error.toLowerCase();
  if (task.status === "canceled") return "отменено пользователем";
  if (task.status === "queued" && task.queuePosition) {
    return `позиция ${task.queuePosition} в очереди · ${formatCredits(task.credits)}`;
  }
  if (task.status === "done") {
    return formatDoneMeta(task.durationSeconds, task.credits);
  }
  const eta = formatEta(task.etaSeconds);
  if (eta) return `${eta} · ${formatCredits(task.credits)}`;
  return formatCredits(task.credits);
}

export function pluralizeGenerations(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "генерация";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "генерации";
  return "генераций";
}

const GENERATION_TITLES: Record<GenType, string> = {
  text: "Генерация текста",
  image: "Генерация изображения",
  video: "Генерация видео",
  audio: "Генерация аудио",
};

export function getGenerationTitle(type: GenType): string {
  return GENERATION_TITLES[type];
}
