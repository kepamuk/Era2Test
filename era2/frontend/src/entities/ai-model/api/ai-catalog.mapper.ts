import type {
  AiCatalogCarouselCardDto,
  AiCatalogGridCardDto,
  AiCatalogPromptSuggestionDto,
  AiCatalogQuickActionDto,
} from "./ai-catalog.dto";

export interface AiCatalogQuickAction {
  id: string;
  title: string;
  description: string;
  prompt: string;
  iconKey: string;
}

export interface AiCatalogPromptSuggestion {
  id: string;
  value: string;
}

export interface AiCatalogGridCard {
  providerId: string;
  subModelId: string;
  label: string;
  shortDescription: string;
  credits: number;
  isNew?: boolean;
  badge?: string;
  icon?: string;
}

export interface AiCatalogCarouselCard {
  providerId: string;
  subModelId: string;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}

export function mapAiCatalogQuickActionDto(dto: AiCatalogQuickActionDto): AiCatalogQuickAction {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    prompt: dto.prompt,
    iconKey: dto.icon_key,
  };
}

export function mapAiCatalogPromptSuggestionDto(
  dto: AiCatalogPromptSuggestionDto,
): AiCatalogPromptSuggestion {
  return {
    id: dto.id,
    value: dto.value,
  };
}

export function mapAiCatalogGridCardDto(dto: AiCatalogGridCardDto): AiCatalogGridCard {
  return {
    providerId: dto.provider_id,
    subModelId: dto.sub_model_id,
    label: dto.label,
    shortDescription: dto.short_description,
    credits: dto.credits,
    isNew: dto.is_new,
    badge: dto.badge,
    icon: dto.icon,
  };
}

export function mapAiCatalogCarouselCardDto(
  dto: AiCatalogCarouselCardDto,
): AiCatalogCarouselCard {
  return {
    providerId: dto.provider_id,
    subModelId: dto.sub_model_id,
    title: dto.title,
    description: dto.description,
    gradient: dto.gradient,
    badge: dto.badge,
  };
}
