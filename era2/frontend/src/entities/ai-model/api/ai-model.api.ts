import { httpClient, type ApiListDto } from "@/shared/api";
import { imageProviders } from "../model/image-models";
import { models, type AIModel, type ModelCategory } from "../model/models";
import { textProviders } from "../model/text-models";
import { videoProviders } from "../model/video-models";
import type { AiModelDto, AiModelsQueryDto, AiProviderDto } from "./ai-model.dto";
import { mapAiModelDto, mapImageProviderDto, mapTextProviderDto, mapVideoProviderDto } from "./ai-model.mapper";

const AI_MODEL_ENDPOINTS = {
  models: "/api/ai/models",
  providers: "/api/ai/providers",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getAiModels(query: AiModelsQueryDto = {}): Promise<AIModel[]> {
  return httpClient
    .get<AiModelDto[] | ApiListDto<AiModelDto>>(AI_MODEL_ENDPOINTS.models, { params: query })
    .then((response) => unwrapList(response).map(mapAiModelDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/models is available.
      return query.category ? models.filter((model) => model.category === query.category) : models;
    });
}

export async function getAiModelsByCategory(category: ModelCategory): Promise<AIModel[]> {
  return getAiModels({ category });
}

export async function getTextProviders() {
  return httpClient
    .get<AiProviderDto[] | ApiListDto<AiProviderDto>>(AI_MODEL_ENDPOINTS.providers, { params: { category: "text" } })
    .then((response) => unwrapList(response).map(mapTextProviderDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/providers?category=text is available.
      return textProviders;
    });
}

export async function getImageProviders() {
  return httpClient
    .get<AiProviderDto[] | ApiListDto<AiProviderDto>>(AI_MODEL_ENDPOINTS.providers, { params: { category: "image" } })
    .then((response) => unwrapList(response).map(mapImageProviderDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/providers?category=image is available.
      return imageProviders;
    });
}

export async function getVideoProviders() {
  return httpClient
    .get<AiProviderDto[] | ApiListDto<AiProviderDto>>(AI_MODEL_ENDPOINTS.providers, { params: { category: "video" } })
    .then((response) => unwrapList(response).map(mapVideoProviderDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/ai/providers?category=video is available.
      return videoProviders;
    });
}
