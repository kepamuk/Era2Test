import {
  imageCarouselCards,
  imageGridCards,
  imagePromptSuggestions,
} from "../model/image-models";
import {
  textQuickActions,
} from "../model/text-models";
import {
  videoCarouselCards,
  videoGridCards,
  videoPromptSuggestions,
} from "../model/video-models";
import { httpClient, type ApiListDto } from "@/shared/api";
import type {
  AiCatalogCarouselCardDto,
  AiCatalogGridCardDto,
  AiCatalogPromptSuggestionDto,
  AiCatalogQuickActionDto,
} from "./ai-catalog.dto";
import {
  mapAiCatalogCarouselCardDto,
  mapAiCatalogGridCardDto,
  mapAiCatalogPromptSuggestionDto,
  mapAiCatalogQuickActionDto,
  type AiCatalogCarouselCard,
  type AiCatalogGridCard,
  type AiCatalogPromptSuggestion,
  type AiCatalogQuickAction,
} from "./ai-catalog.mapper";

const AI_CATALOG_ENDPOINTS = {
  textQuickActions: "/api/ai/catalog/text/quick-actions",
  imageGridCards: "/api/ai/catalog/image/grid-cards",
  imageCarouselCards: "/api/ai/catalog/image/carousel-cards",
  imagePromptSuggestions: "/api/ai/catalog/image/prompt-suggestions",
  videoGridCards: "/api/ai/catalog/video/grid-cards",
  videoCarouselCards: "/api/ai/catalog/video/carousel-cards",
  videoPromptSuggestions: "/api/ai/catalog/video/prompt-suggestions",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getTextQuickActions(): Promise<AiCatalogQuickAction[]> {
  return httpClient
    .get<AiCatalogQuickActionDto[] | ApiListDto<AiCatalogQuickActionDto>>(
      AI_CATALOG_ENDPOINTS.textQuickActions,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogQuickActionDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/text/quick-actions is available.
      return textQuickActions.map((item) => ({
        id: item.title.toLowerCase().replace(/\s+/g, "-"),
        title: item.title,
        description: item.description,
        prompt: item.prompt,
        iconKey: item.Icon.displayName ?? item.Icon.name ?? "Circle",
      }));
    });
}

export async function getImageGridCards(): Promise<AiCatalogGridCard[]> {
  return httpClient
    .get<AiCatalogGridCardDto[] | ApiListDto<AiCatalogGridCardDto>>(
      AI_CATALOG_ENDPOINTS.imageGridCards,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogGridCardDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/image/grid-cards is available.
      return imageGridCards.map((item) => ({
        providerId: item.providerId,
        subModelId: item.subModelId,
        label: item.label,
        shortDescription: item.shortDesc,
        credits: item.credits,
        isNew: item.isNew,
        badge: item.badge,
      }));
    });
}

export async function getImageCarouselCards(): Promise<AiCatalogCarouselCard[]> {
  return httpClient
    .get<AiCatalogCarouselCardDto[] | ApiListDto<AiCatalogCarouselCardDto>>(
      AI_CATALOG_ENDPOINTS.imageCarouselCards,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogCarouselCardDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/image/carousel-cards is available.
      return imageCarouselCards.map((item) => ({
        providerId: item.providerId,
        subModelId: item.subModelId,
        title: item.title,
        description: item.desc,
        gradient: item.gradient,
        badge: item.badge,
      }));
    });
}

export async function getImagePromptSuggestions(): Promise<AiCatalogPromptSuggestion[]> {
  return httpClient
    .get<AiCatalogPromptSuggestionDto[] | ApiListDto<AiCatalogPromptSuggestionDto>>(
      AI_CATALOG_ENDPOINTS.imagePromptSuggestions,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogPromptSuggestionDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/image/prompt-suggestions is available.
      return imagePromptSuggestions.map((value, index) => ({ id: `image-${index + 1}`, value }));
    });
}

export async function getVideoGridCards(): Promise<AiCatalogGridCard[]> {
  return httpClient
    .get<AiCatalogGridCardDto[] | ApiListDto<AiCatalogGridCardDto>>(
      AI_CATALOG_ENDPOINTS.videoGridCards,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogGridCardDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/video/grid-cards is available.
      return videoGridCards.map((item) => ({
        providerId: item.providerId,
        subModelId: item.subModelId,
        label: item.label,
        shortDescription: item.shortDesc,
        credits: item.credits,
        isNew: item.isNew,
        icon: item.icon,
      }));
    });
}

export async function getVideoCarouselCards(): Promise<AiCatalogCarouselCard[]> {
  return httpClient
    .get<AiCatalogCarouselCardDto[] | ApiListDto<AiCatalogCarouselCardDto>>(
      AI_CATALOG_ENDPOINTS.videoCarouselCards,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogCarouselCardDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/video/carousel-cards is available.
      return videoCarouselCards.map((item) => ({
        providerId: item.providerId,
        subModelId: item.subModelId,
        title: item.title,
        description: item.desc,
        gradient: item.gradient,
        badge: item.badge,
      }));
    });
}

export async function getVideoPromptSuggestions(): Promise<AiCatalogPromptSuggestion[]> {
  return httpClient
    .get<AiCatalogPromptSuggestionDto[] | ApiListDto<AiCatalogPromptSuggestionDto>>(
      AI_CATALOG_ENDPOINTS.videoPromptSuggestions,
    )
    .then((response) => unwrapList(response).map(mapAiCatalogPromptSuggestionDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/catalog/video/prompt-suggestions is available.
      return videoPromptSuggestions.map((value, index) => ({ id: `video-${index + 1}`, value }));
    });
}
