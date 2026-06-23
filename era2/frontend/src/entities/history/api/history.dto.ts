import type { GenerationDto } from "@/entities/generation/api/generation.dto";
import type { QueryKeyParams } from "@/shared/api";
import type { GenType } from "@/entities/generation";

export interface HistoryItemDto extends GenerationDto {
  favorite?: boolean;
}

export interface HistoryListQueryDto extends QueryKeyParams {
  type?: GenType;
  favorite?: boolean;
  limit?: number;
}
