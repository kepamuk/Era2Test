import type { SearchableModelType } from "@/config/searchableModels";
import type { UseCaseType } from "@/config/useCases";
import type { PromoBannerDto, SearchableModelDto, UseCaseDto } from "./content.dto";

export interface ContentSearchableModel {
  id: string;
  name: string;
  provider: string;
  type: SearchableModelType;
  credits: string;
  icon?: string;
  isNew?: boolean;
  route: string;
}

export interface ContentUseCase {
  id: string;
  type: UseCaseType;
  label: string;
  prompt: string;
  iconKey: string;
}

export interface PromoBanner {
  isActive: boolean;
  label: string;
  text: string;
  route: string;
}

export function mapSearchableModelDto(dto: SearchableModelDto): ContentSearchableModel {
  return {
    id: dto.id,
    name: dto.display_name,
    provider: dto.provider_name,
    type: dto.type,
    credits: dto.credits_label,
    icon: dto.icon,
    isNew: dto.is_new,
    route: dto.route,
  };
}

export function mapUseCaseDto(dto: UseCaseDto): ContentUseCase {
  return {
    id: dto.id,
    type: dto.type,
    label: dto.label,
    prompt: dto.prompt,
    iconKey: dto.icon_key,
  };
}

export function mapPromoBannerDto(dto: PromoBannerDto): PromoBanner {
  return {
    isActive: dto.is_active,
    label: dto.label,
    text: dto.text,
    route: dto.route,
  };
}
