import { useEffect, useState } from "react";

import { useUserStore } from "../stores/userStore";

const base = import.meta.env.VITE_API_BASE_URL as string;

export function useAdherence() {
  const userId = useUserStore((s) => s.userId);
  const [summary, setSummary] = useState({ adherence_pct: 0, taken_count: 0, missed_count: 0 });
  const [heatmap, setHeatmap] = useState<Array<{ date: string; adherence_pct: number; taken: number; total: number }>>([]);
  const [weekly, setWeekly] = useState<Array<{ day: string; adherence_pct: number }>>([]);

  useEffect(() => {
    const headers = { Authorization: "Bearer demo-token", "x-user-id": userId };
    void fetch(`${base}/api/v1/adherence/summary`, { headers }).then((r) => r.json()).then(setSummary);
    void fetch(`${base}/api/v1/adherence/heatmap?days=30`, { headers }).then((r) => r.json()).then(setHeatmap);
    void fetch(`${base}/api/v1/adherence/weekly`, { headers }).then((r) => r.json()).then(setWeekly);
  }, [userId]);

  return { summary, heatmap, weekly };
}
