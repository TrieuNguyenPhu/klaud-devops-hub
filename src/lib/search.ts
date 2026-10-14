export function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}
export function matchesSearch(text: string, query: string) {
  const haystack = normalize(text);
  return normalize(query).trim().split(/\s+/).every(token => haystack.includes(token));
}
export type SearchEntry = { title: string; description: string; href: string; kind: string; keywords: string };
export function queryValues(params: Record<string, string | string[] | undefined>): Record<string, string> {
  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value[0] || "" : value || ""]));
}
