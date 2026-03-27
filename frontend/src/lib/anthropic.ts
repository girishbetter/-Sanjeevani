export async function fetchAIInsights(userId: string) {
  const base = import.meta.env.VITE_API_BASE_URL as string;
  const res = await fetch(`${base}/api/v1/ai/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) {
    throw new Error("Could not fetch AI insights");
  }
  return (await res.json()) as { insights: string[] };
}
