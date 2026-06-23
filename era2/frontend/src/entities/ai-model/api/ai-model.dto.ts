import type { QueryKeyParams } from "@/shared/api";
import type { ModelCategory } from "../model/models";

export interface AiSubModelDto {
  id: string;
  display_name: string;
  credits: number;
  is_new?: boolean;
  is_default?: boolean;
  badge?: string;
  description?: string;
  estimated_time?: string;
}

export interface AiModelDto {
  id: string;
  provider_id: string;
  provider_name: string;
  display_name: string;
  category: ModelCategory;
  min_credits: number;
  description: string;
  icon: string;
  slug: string;
  is_new?: boolean;
  sub_models?: AiSubModelDto[];
}

export interface AiProviderDto {
  id: string;
  display_name: string;
  icon: string;
  badge?: string;
  badge_color?: string;
  description?: string;
  sub_models: AiSubModelDto[];
  aspect_ratios?: string[];
  duration_options?: string[];
  resolution_options?: string[];
  quality_options?: string[];
  quantity_options?: number[];
  max_uploads?: number;
  has_turbo?: boolean;
  has_advanced?: boolean;
  functions?: string[];
  styles?: string[];
}

export interface AiModelsQueryDto extends QueryKeyParams {
  category?: ModelCategory;
}
