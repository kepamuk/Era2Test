export type GenType = "text" | "image" | "video" | "audio";

export type TaskStatus = "queued" | "running" | "done" | "failed" | "canceled";

export interface GenerationTask {
  id: string;
  type: GenType;
  prompt: string;
  model: string;
  status: TaskStatus;
  progress: number;
  credits: number;
  etaSeconds?: number;
  durationSeconds?: number;
  queuePosition?: number;
  error?: string;
  createdAt: number;
  updatedAt: number;
}
