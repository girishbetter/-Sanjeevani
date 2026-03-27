import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CaretakerFeed } from "../components/alerts/CaretakerFeed";
import { CaretakerMedicineManager } from "../components/alerts/CaretakerMedicineManager";
import { SOSButton } from "../components/alerts/SOSButton";
import { StatusRow } from "../components/alerts/StatusRow";
import { Card } from "../components/ui/Card";
import { useCaretakerMedicines } from "../hooks/useCaretakerMedicines";
import { useMedicines } from "../hooks/useMedicines";
import { useRealtime } from "../hooks/useRealtime";
import { apiJson } from "../lib/api";
import { useUserStore } from "../stores/userStore";

export default function Alerts() {
  const userId = useUserStore((s) => s.userId);
  const role = useUserStore((s) => s.role);
  const isCaretaker = role === "caretaker";
  const { todayDoses, refetch: refetchTodayDoses } = useMedicines();
  const { medicines, loading, error, addMedicine, updateMedicine, deleteMedicine, refetchMedicines } = useCaretakerMedicines(isCaretaker);
  const [feed, setFeed] = useState<Array<{ id: string; message: string; type: string; read?: boolean }>>([]);

  const unreadCriticalCount = feed.filter((a) => a.read === false && (a.type === "sos" || a.type === "missed_dose")).length;

  const fetchFeed = useCallback(async () => {
    try {
      const data = await apiJson<Array<{ id: string; message: string; type: string; read?: boolean }>>(`/api/v1/alerts/feed?patient_id=${userId}`, {
        headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
      });
      setFeed(data);
    } catch {
      setFeed([]);
    }
  }, [userId]);

  const refreshAll = useCallback(() => {
    void fetchFeed();
    void refetchTodayDoses();
    if (isCaretaker) {
      void refetchMedicines();
    }
  }, [fetchFeed, isCaretaker, refetchMedicines, refetchTodayDoses]);

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  useRealtime(refreshAll);

  const sendSOS = async () => {
    try {
      await apiJson<{ id: string }>("/api/v1/alerts/caretaker", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
        body: JSON.stringify({ patient_id: userId, type: "sos", message: "Immediate help needed." }),
      });
    } catch {
      // no-op: UI remains usable even when alert API is temporarily unavailable.
    }
    refreshAll();
  };

  return (
    <div className="space-y-3">
      {unreadCriticalCount > 0 ? (
        <Card className="rounded-[1.6rem] border border-red-200 bg-red-600/10 px-4 py-3 text-red-900">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-700">Emergency</p>
          <p className="mt-1 text-lg font-black">You have {unreadCriticalCount} new alerts</p>
        </Card>
      ) : null}
      <Card
        className={
          isCaretaker
            ? "overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-900 text-white shadow-[0_20px_48px_rgba(15,23,42,0.18)]"
            : "overflow-hidden rounded-[1.8rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_20px_48px_rgba(15,23,42,0.08)]"
        }
      >
        <div className="space-y-2">
          <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.32em] ${isCaretaker ? "text-cyan-200" : "text-slate-500"}`}>
            {isCaretaker ? "Caretaker side" : "Patient side"}
          </p>
          <h2 className={`text-2xl font-bold ${isCaretaker ? "text-white" : "text-slate-900"}`}>
            {isCaretaker ? "Manage medicines and keep watch" : "Check doses and reach your caretaker fast"}
          </h2>
          <p className={`max-w-[24rem] text-sm leading-6 ${isCaretaker ? "text-slate-200" : "text-slate-600"}`}>
            {isCaretaker
              ? "Add medicines, review the feed, and stay ahead of missed doses."
              : "Patient mode keeps the medicine editor hidden. Use the home screen for tracking and this page for alerts."}
          </p>
        </div>
        <Link
          to="/"
          className={
            isCaretaker
              ? "mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/20"
              : "mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          }
        >
          Back to start
        </Link>
      </Card>

      {isCaretaker ? (
        <CaretakerMedicineManager medicines={medicines} loading={loading} error={error} onAdd={addMedicine} onUpdate={updateMedicine} onDelete={deleteMedicine} />
      ) : (
        <Card className="rounded-[1.6rem] border border-dashed border-slate-300 bg-white/90 text-sm text-slate-600">
          Patient mode keeps the medicine editor hidden. Switch to caretaker mode if you need to add or edit medicines.
        </Card>
      )}

      {!isCaretaker ? <SOSButton onClick={() => void sendSOS()} /> : null}
      {todayDoses.map((d) => (
        <StatusRow key={d.id} name={d.medicines?.name || "Medicine"} status={d.status} />
      ))}
      <CaretakerFeed items={feed} />
    </div>
  );
}
