import { redisClient } from "../cache/index";

export const getCacheKey = (method: string, params: Record<string, any>): string => {
  const prefix = "fatoCache:";
  const sortedParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
    .join("|");

  return `${prefix}${method}|${sortedParams}`;
};

export const getCacheValue = async (method: string, params: Record<string, any>): Promise<string | null> => {
  const cacheKey = getCacheKey(method, params);
  const cached = await redisClient.get(cacheKey);
  return cached;
};
