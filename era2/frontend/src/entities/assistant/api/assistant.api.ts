import { httpClient, type ApiListDto } from "@/shared/api";
import { assistants, type Assistant } from "../model/assistants";
import type { AssistantDto } from "./assistant.dto";
import { mapAssistantDto } from "./assistant.mapper";

const ASSISTANT_ENDPOINTS = {
  list: "/api/assistants",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getAssistants(): Promise<Assistant[]> {
  return httpClient
    .get<AssistantDto[] | ApiListDto<AssistantDto>>(ASSISTANT_ENDPOINTS.list)
    .then((response) => unwrapList(response).map(mapAssistantDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/assistants is available.
      return assistants;
    });
}
