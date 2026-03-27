import { useCallback, useEffect, useState } from "react";

import { apiJson, getApiBaseUrl } from "../lib/api";
import type { Medicine } from "../types";
import { useUserStore } from "../stores/userStore";

interface MedicineInput {
  name: string;
  dosage: string;
  time: string;
  label: string;
}

export function useCaretakerMedicines(enabled = true) {
  const userId = useUserStore((s) => s.userId);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicines = useCallback(async () => {
    if (!enabled) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await apiJson<Medicine[]>("/api/v1/medicines", {
        headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
      });
      setMedicines(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [enabled, userId]);

  const addMedicine = async (input: MedicineInput) => {
    const payload = {
      name: input.name,
      dosage: input.dosage,
      schedule: [{ time: input.time, label: input.label }],
      color: "teal",
      shape: "round",
      image_url: "/medicine-label.svg",
    };
    await apiJson<Medicine>("/api/v1/medicines", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
      body: JSON.stringify(payload),
    });
    await fetchMedicines();
  };

  const updateMedicine = async (id: string, input: MedicineInput) => {
    const payload = {
      name: input.name,
      dosage: input.dosage,
      schedule: [{ time: input.time, label: input.label }],
    };
    await apiJson<Medicine>(`/api/v1/medicines/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
      body: JSON.stringify(payload),
    });
    await fetchMedicines();
  };

  const deleteMedicine = async (id: string) => {
    const res = await fetch(`${getApiBaseUrl()}/api/v1/medicines/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
    });
    if (!res.ok) {
      throw new Error("Failed to delete medicine");
    }
    await fetchMedicines();
  };

  useEffect(() => {
    if (!enabled) {
      setMedicines([]);
      setLoading(false);
      setError("");
      return;
    }
    void fetchMedicines();
  }, [enabled, fetchMedicines]);

  return { medicines, loading, error, addMedicine, updateMedicine, deleteMedicine, refetchMedicines: fetchMedicines };
}
