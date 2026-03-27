import { useCallback, useEffect, useState } from "react";

import { fetchAIInsights } from "../lib/anthropic";
import { useUserStore } from "../stores/userStore";
import { useRealtime } from "./useRealtime";

export function useAI() {
  const userId = useUserStore((s) => s.userId);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAIInsights(userId);
      setInsights(res.insights);
    } catch (err) {
      setError((err as Error).message);
      setInsights(["AI insights are temporarily unavailable."]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useRealtime(refresh);

  return { insights, loading, error };
}
