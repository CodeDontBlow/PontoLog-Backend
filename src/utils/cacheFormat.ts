export const getKey = (entity: string, queryName: string, params: Record<string, any>): string => {
  const key = Object.entries(params)
    .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
    .map(([key, value]) => `${key}:${value ?? "null"}`)
    .join("|");
  return `${entity}:${queryName}:${key}`;
};
