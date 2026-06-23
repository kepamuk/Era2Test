import { httpClient, type ApiListDto } from "@/shared/api";
import { MOCK_HISTORY, type HistoryItem } from "../model/mock-history";
import type { HistoryItemDto, HistoryListQueryDto } from "./history.dto";
import { mapHistoryItemDto } from "./history.mapper";

const HISTORY_ENDPOINTS = {
  list: "/api/history",
} as const;

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

export async function getHistoryItems(query: HistoryListQueryDto = {}): Promise<HistoryItem[]> {
  return httpClient
    .get<HistoryItemDto[] | ApiListDto<HistoryItemDto>>(HISTORY_ENDPOINTS.list, { params: query })
    .then((response) => unwrapList(response).map(mapHistoryItemDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/history is available.
      const filtered = MOCK_HISTORY.filter((item) => {
        if (query.type && item.type !== query.type) return false;
        if (query.favorite !== undefined && Boolean(item.favorite) !== query.favorite) return false;
        return true;
      });
      return typeof query.limit === "number" ? filtered.slice(0, query.limit) : filtered;
    });
}
