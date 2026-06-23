export interface PaginationParamsDto {
  page?: number;
  per_page?: number;
}

export interface CursorPaginationParamsDto {
  cursor?: string;
  limit?: number;
}

export interface PaginationMetaDto {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface CursorPaginationMetaDto {
  next_cursor: string | null;
  has_more: boolean;
}

export interface PaginatedDto<TItem> {
  data: TItem[];
  meta: PaginationMetaDto;
}

export interface CursorPaginatedDto<TItem> {
  data: TItem[];
  meta: CursorPaginationMetaDto;
}
