import { useCallback, useEffect, useState } from "react";

import { apiJson } from "../lib/api";
import type { DoseLog } from "../types";
import { useMedicineStore } from "../stores/medicineStore";
import { useUserStore } from "../stores/userStore";
import { useRealtime } from "./useRealtime";

export function useMedicines() {
  const userId = useUserStore((s) => s.userId);
  const todayDoses = useMedicineStore((s) => s.todayDoses);
  const setTodayDoses = useMedicineStore((s) => s.setTodayDoses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchToday = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError("");
    try {
      const data = await apiJson<DoseLog[]>("/api/v1/doses/today", {
        headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
      });
      setTodayDoses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [setTodayDoses, userId]);

  const takeDose = async (medicineId: string, scheduledAt: string) => {
    await apiJson<{ ok: boolean }>("/api/v1/doses/take", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
      body: JSON.stringify({ medicine_id: medicineId, scheduled_at: scheduledAt }),
    });
    await fetchToday(true);
  };

  const refreshFromRealtime = useCallback(() => {
    void fetchToday(true);
  }, [fetchToday]);

  useEffect(() => {
    void fetchToday();
  }, [fetchToday]);

  useRealtime(refreshFromRealtime);

  return { todayDoses, loading, error, takeDose, refetch: fetchToday };
}
