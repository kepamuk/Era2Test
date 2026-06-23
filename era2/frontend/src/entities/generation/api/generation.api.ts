import { httpClient, type ApiListDto } from "@/shared/api";
import { MOCK_GENERATIONS, type Generation } from "../model/mock-generations";
import type { GenerationDto, GenerationListQueryDto } from "./generation.dto";
import { mapGenerationDto } from "./generation.mapper";

const GENERATION_ENDPOINTS = {
  list: "/api/generations",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getGenerations(query: GenerationListQueryDto = {}): Promise<Generation[]> {
  return httpClient
    .get<GenerationDto[] | ApiListDto<GenerationDto>>(GENERATION_ENDPOINTS.list, { params: query })
    .then((response) => unwrapList(response).map(mapGenerationDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/generations is available.
      const filtered = query.type ? MOCK_GENERATIONS.filter((item) => item.type === query.type) : MOCK_GENERATIONS;
      return typeof query.limit === "number" ? filtered.slice(0, query.limit) : filtered;
    });
}
