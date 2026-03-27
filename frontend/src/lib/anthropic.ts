import { apiJson } from "./api";

export async function fetchAIInsights(userId: string) {
  return await apiJson<{ insights: string[] }>("/api/v1/ai/insights", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
    body: JSON.stringify({ user_id: userId }),
  });
}
