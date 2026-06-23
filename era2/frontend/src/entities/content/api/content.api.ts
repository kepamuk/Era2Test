import { modelTypeToRoute, searchableModels } from "@/config/searchableModels";
import { PROMO_ACTIVE, PROMO_LABEL, PROMO_TEXT } from "@/config/promo";
import { useCases, type UseCaseType } from "@/config/useCases";
import { httpClient, type ApiListDto } from "@/shared/api";
import type { PromoBannerDto, SearchableModelDto, UseCaseDto } from "./content.dto";
import {
  mapPromoBannerDto,
  mapSearchableModelDto,
  mapUseCaseDto,
  type ContentSearchableModel,
  type ContentUseCase,
  type PromoBanner,
} from "./content.mapper";

const CONTENT_ENDPOINTS = {
  searchableModels: "/api/content/searchable-models",
  useCases: "/api/content/use-cases",
  promoBanner: "/api/content/promo-banner",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

function fallbackSearchableModels(): ContentSearchableModel[] {
  return searchableModels.map((item) => ({
    id: item.id,
    name: item.name,
    provider: item.provider,
    type: item.type,
    credits: item.credits,
    icon: item.icon,
    isNew: item.isNew,
    route: modelTypeToRoute[item.type],
  }));
}

function fallbackUseCases(): ContentUseCase[] {
  return (Object.entries(useCases) as [UseCaseType, typeof useCases[UseCaseType]][]).flatMap(([type, items]) =>
    items.map((item) => ({
      id: `${type}-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
      type,
      label: item.label,
      prompt: item.prompt,
      iconKey: item.Icon.displayName ?? item.Icon.name ?? "Circle",
    })),
  );
}

export async function getSearchableModels(): Promise<ContentSearchableModel[]> {
  return httpClient
    .get<SearchableModelDto[] | ApiListDto<SearchableModelDto>>(CONTENT_ENDPOINTS.searchableModels)
    .then((response) => unwrapList(response).map(mapSearchableModelDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/content/searchable-models is available.
      return fallbackSearchableModels();
    });
}

export async function getUseCases(type?: UseCaseType): Promise<ContentUseCase[]> {
  return httpClient
    .get<UseCaseDto[] | ApiListDto<UseCaseDto>>(CONTENT_ENDPOINTS.useCases, {
      params: type ? { type } : undefined,
    })
    .then((response) => unwrapList(response).map(mapUseCaseDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/content/use-cases is available.
      const items = fallbackUseCases();
      return type ? items.filter((item) => item.type === type) : items;
    });
}

export async function getPromoBanner(): Promise<PromoBanner> {
  return httpClient
    .get<PromoBannerDto>(CONTENT_ENDPOINTS.promoBanner)
    .then(mapPromoBannerDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/content/promo-banner is available.
      return {
        isActive: PROMO_ACTIVE,
        label: PROMO_LABEL,
        text: PROMO_TEXT,
        route: "/pricing",
      };
    });
}
