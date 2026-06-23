import type { SearchableModelType } from "@/config/searchableModels";
import type { UseCaseType } from "@/config/useCases";

export interface SearchableModelDto {
  id: string;
  display_name: string;
  provider_name: string;
  type: SearchableModelType;
  credits_label: string;
  icon?: string;
  is_new?: boolean;
  route: string;
}

export interface UseCaseDto {
  id: string;
  type: UseCaseType;
  label: string;
  prompt: string;
  icon_key: string;
}

export interface PromoBannerDto {
  is_active: boolean;
  label: string;
  text: string;
  route: string;
}
