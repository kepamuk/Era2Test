import { httpClient, type ApiListDto } from "@/shared/api";
import { getToolPageData, toolPages, type ToolPageData } from "../model/tool-pages";
import type { ToolPageDto } from "./tool.dto";
import { mapToolPageDto } from "./tool.mapper";

const TOOL_ENDPOINTS = {
  list: "/api/tools",
  detail: (slug: string) => `/api/tools/${encodeURIComponent(slug)}`,
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getToolPages(): Promise<ToolPageData[]> {
  return httpClient
    .get<ToolPageDto[] | ApiListDto<ToolPageDto>>(TOOL_ENDPOINTS.list)
    .then((response) => unwrapList(response).map(mapToolPageDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/tools is available.
      return toolPages;
    });
}

export async function getToolPage(slug: string): Promise<ToolPageData | undefined> {
  return httpClient
    .get<ToolPageDto>(TOOL_ENDPOINTS.detail(slug))
    .then(mapToolPageDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/tools/:slug is available.
      return getToolPageData(slug);
    });
}
