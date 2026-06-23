export type QueryKeyPart = string | number | boolean | null | undefined | QueryKeyParams | readonly QueryKeyPart[];

export type QueryKeyParams = {
  readonly [key: string]: QueryKeyPart | readonly QueryKeyPart[];
};

export type QueryKey = readonly QueryKeyPart[];

function normalizePart(part: QueryKeyPart): unknown {
  if (Array.isArray(part)) {
    return part.map(normalizePart);
  }

  if (part && typeof part === "object") {
    return Object.keys(part)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        const value = (part as QueryKeyParams)[key];
        if (value !== undefined) {
          acc[key] = normalizePart(value);
        }
        return acc;
      }, {});
  }

  return part ?? null;
}

export function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map((item) => normalizePart(item as QueryKeyPart)));
  }

  if (value && typeof value === "object") {
    return JSON.stringify(normalizePart(value as QueryKeyPart));
  }

  return JSON.stringify(value ?? null);
}

export function createQueryKey(scope: string, ...parts: QueryKeyPart[]): QueryKey {
  return [scope, ...parts] as const;
}

export function queryKeyToString(queryKey: QueryKey): string {
  return stableSerialize(queryKey);
}
