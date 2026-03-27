import { useEffect, useState } from "react";

import type { DoseLog } from "../types";
import { useMedicineStore } from "../stores/medicineStore";
import { useUserStore } from "../stores/userStore";

const base = import.meta.env.VITE_API_BASE_URL as string;

export function useMedicines() {
  const userId = useUserStore((s) => s.userId);
  const todayDoses = useMedicineStore((s) => s.todayDoses);
  const setTodayDoses = useMedicineStore((s) => s.setTodayDoses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchToday = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${base}/api/v1/doses/today`, {
        headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
      });
      if (!res.ok) throw new Error("Failed loading doses");
      setTodayDoses((await res.json()) as DoseLog[]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const takeDose = async (medicineId: string, scheduledAt: string) => {
    const res = await fetch(`${base}/api/v1/doses/take`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
      body: JSON.stringify({ medicine_id: medicineId, scheduled_at: scheduledAt }),
    });
    if (!res.ok) throw new Error("Could not mark as taken");
    await fetchToday();
  };

  useEffect(() => {
    void fetchToday();
  }, []);

  return { todayDoses, loading, error, takeDose, refetch: fetchToday };
}
