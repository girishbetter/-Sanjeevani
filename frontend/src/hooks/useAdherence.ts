import { useCallback, useEffect, useState } from "react";

import { apiJson } from "../lib/api";
import { useUserStore } from "../stores/userStore";
import { useRealtime } from "./useRealtime";

export function useAdherence() {
  const userId = useUserStore((s) => s.userId);
  const [summary, setSummary] = useState({ adherence_pct: 0, taken_count: 0, missed_count: 0 });
  const [heatmap, setHeatmap] = useState<Array<{ date: string; adherence_pct: number; taken: number; total: number }>>([]);
  const [weekly, setWeekly] = useState<Array<{ day: string; adherence_pct: number }>>([]);

  const refresh = useCallback(async () => {
    const headers = { Authorization: "Bearer demo-token", "x-user-id": userId };
    const [summaryResult, heatmapResult, weeklyResult] = await Promise.allSettled([
      apiJson<{ adherence_pct: number; taken_count: number; missed_count: number }>("/api/v1/adherence/summary", { headers }),
      apiJson<Array<{ date: string; adherence_pct: number; taken: number; total: number }>>("/api/v1/adherence/heatmap?days=30", { headers }),
      apiJson<Array<{ day: string; adherence_pct: number }>>("/api/v1/adherence/weekly", { headers }),
    ]);

    setSummary(summaryResult.status === "fulfilled" ? summaryResult.value : { adherence_pct: 0, taken_count: 0, missed_count: 0 });
    setHeatmap(heatmapResult.status === "fulfilled" ? heatmapResult.value : []);
    setWeekly(weeklyResult.status === "fulfilled" ? weeklyResult.value : []);
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useRealtime(refresh);

  return { summary, heatmap, weekly };
}
