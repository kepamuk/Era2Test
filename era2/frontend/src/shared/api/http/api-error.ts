export type ApiErrorPayload = unknown;

export interface ApiErrorOptions {
  status: number;
  statusText?: string;
  url?: string;
  payload?: ApiErrorPayload;
}

export class ApiError extends Error {
  readonly status: number;
  readonly statusText?: string;
  readonly url?: string;
  readonly payload?: ApiErrorPayload;

  constructor(message: string, options: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.statusText = options.statusText;
    this.url = options.url;
    this.payload = options.payload;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
