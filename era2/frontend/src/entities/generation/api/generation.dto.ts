import type { IsoDateString, QueryKeyParams } from "@/shared/api";
import type { GenType } from "../model/mock-generations";

export interface GenerationDto {
  id: string;
  type: GenType;
  provider_id: string;
  model_name: string;
  credits: number;
  prompt: string;
  created_at: IsoDateString;
  text?: string;
  gradient?: string;
  aspect?: "1:1" | "16:9" | "9:16" | "4:3";
  duration?: string;
}

export interface GenerationListQueryDto extends QueryKeyParams {
  type?: GenType;
  limit?: number;
}
