import { mapGenerationDto } from "@/entities/generation/api/generation.mapper";
import type { HistoryItem } from "../model/mock-history";
import type { HistoryItemDto } from "./history.dto";

export function mapHistoryItemDto(dto: HistoryItemDto): HistoryItem {
  return {
    ...mapGenerationDto(dto),
    favorite: dto.favorite,
  };
}
