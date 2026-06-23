export interface ApiSuccessDto<TData> {
  data: TData;
}

export interface ApiListDto<TItem> {
  data: TItem[];
}

export interface ApiErrorDto {
  message: string;
  code?: string;
  details?: unknown;
}

export type IsoDateString = string;
