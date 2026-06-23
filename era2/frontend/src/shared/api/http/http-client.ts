import { ApiError } from "./api-error";
import { requestCache, type RequestCache } from "./request-cache";
import { createQueryKey, stableSerialize, type QueryKeyParams } from "./query-key";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  params?: QueryKeyParams;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
  dedupe?: boolean;
}

export interface HttpClientConfig {
  baseUrl?: string;
  fetcher?: typeof fetch;
  cache?: RequestCache;
  defaultHeaders?: HeadersInit;
}

export interface HttpClient {
  request<TResponse, TBody = unknown>(path: string, options?: RequestOptions<TBody>): Promise<TResponse>;
  get<TResponse>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<TResponse>;
  post<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<RequestOptions<TBody>, "method" | "body">): Promise<TResponse>;
  put<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<RequestOptions<TBody>, "method" | "body">): Promise<TResponse>;
  patch<TResponse, TBody = unknown>(path: string, body?: TBody, options?: Omit<RequestOptions<TBody>, "method" | "body">): Promise<TResponse>;
  delete<TResponse>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<TResponse>;
}

function readDefaultBaseUrl(): string {
  const processEnv = globalThis.process?.env;
  return processEnv?.NEXT_PUBLIC_API_URL ?? processEnv?.VITE_API_URL ?? "";
}

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function appendParams(url: URL, params?: QueryKeyParams): void {
  if (!params) return;

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          url.searchParams.append(key, String(item));
        }
      });
      return;
    }

    url.searchParams.set(key, String(value));
  });
}

function createUrl(path: string, baseUrl: string, params?: QueryKeyParams): string {
  const base = trimTrailingSlash(baseUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!base) {
    const search = new URLSearchParams();
    appendParams({ searchParams: search } as URL, params);
    const query = search.toString();
    return query ? `${normalizedPath}?${query}` : normalizedPath;
  }

  const url = new URL(`${base}${normalizedPath}`);
  appendParams(url, params);
  return url.toString();
}

async function readPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
}

export function createHttpClient(config: HttpClientConfig = {}): HttpClient {
  const baseUrl = config.baseUrl ?? readDefaultBaseUrl();
  const fetcher = config.fetcher ?? fetch;
  const cache = config.cache ?? requestCache;

  async function execute<TResponse, TBody = unknown>(path: string, options: RequestOptions<TBody> = {}): Promise<TResponse> {
    const method = options.method ?? "GET";
    const url = createUrl(path, baseUrl, options.params);
    const headers = new Headers(config.defaultHeaders);

    if (options.body !== undefined && !(options.body instanceof FormData)) {
      headers.set("content-type", "application/json");
    }

    new Headers(options.headers).forEach((value, key) => headers.set(key, value));

    const promise = fetcher(url, {
      method,
      headers,
      signal: options.signal,
      body:
        options.body === undefined
          ? undefined
          : options.body instanceof FormData
            ? options.body
            : JSON.stringify(options.body),
    }).then(async (response) => {
      const payload = await readPayload(response);
      if (!response.ok) {
        throw new ApiError(`API request failed with status ${response.status}`, {
          status: response.status,
          statusText: response.statusText,
          url,
          payload,
        });
      }

      return payload as TResponse;
    });

    if (method !== "GET" || options.dedupe === false) {
      return promise;
    }

    return cache.dedupe<TResponse>(createQueryKey(method, path, options.params ?? null, stableSerialize(options.headers ?? null)), () => promise);
  }

  return {
    request: execute,
    get: (path, options) => execute(path, { ...options, method: "GET" }),
    post: (path, body, options) => execute(path, { ...options, method: "POST", body }),
    put: (path, body, options) => execute(path, { ...options, method: "PUT", body }),
    patch: (path, body, options) => execute(path, { ...options, method: "PATCH", body }),
    delete: (path, options) => execute(path, { ...options, method: "DELETE" }),
  };
}

export const httpClient = createHttpClient();
