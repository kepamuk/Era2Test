import { queryKeyToString, type QueryKey } from "./query-key";

export class RequestCache {
  private readonly inFlight = new Map<string, Promise<unknown>>();

  get<T>(key: QueryKey): Promise<T> | undefined {
    return this.inFlight.get(queryKeyToString(key)) as Promise<T> | undefined;
  }

  set<T>(key: QueryKey, promise: Promise<T>): Promise<T> {
    const cacheKey = queryKeyToString(key);
    this.inFlight.set(cacheKey, promise);
    promise.finally(() => {
      this.inFlight.delete(cacheKey);
    });

    return promise;
  }

  dedupe<T>(key: QueryKey, factory: () => Promise<T>): Promise<T> {
    const existing = this.get<T>(key);
    if (existing) return existing;

    return this.set(key, factory());
  }

  clear(): void {
    this.inFlight.clear();
  }
}

export const requestCache = new RequestCache();
