export interface AiCatalogQuickActionDto {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon_key: string;
}

export interface AiCatalogPromptSuggestionDto {
  id: string;
  value: string;
}

export interface AiCatalogGridCardDto {
  provider_id: string;
  sub_model_id: string;
  label: string;
  short_description: string;
  credits: number;
  is_new?: boolean;
  badge?: string;
  icon?: string;
}

export interface AiCatalogCarouselCardDto {
  provider_id: string;
  sub_model_id: string;
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}
