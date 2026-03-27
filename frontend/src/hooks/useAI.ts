import { useEffect, useState } from "react";

import { fetchAIInsights } from "../lib/anthropic";
import { useUserStore } from "../stores/userStore";

export function useAI() {
  const userId = useUserStore((s) => s.userId);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    void fetchAIInsights(userId)
      .then((res) => setInsights(res.insights))
      .finally(() => setLoading(false));
  }, [userId]);

  return { insights, loading };
}
