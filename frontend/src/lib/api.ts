const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "http://localhost:8000";

export function getApiBaseUrl() {
  return apiBase;
}

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, init);
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`);
  }
  if (!contentType.includes("application/json")) {
    throw new Error(`Expected JSON response for ${path}, got ${contentType || "unknown content-type"}`);
  }
  return (await res.json()) as T;
}
