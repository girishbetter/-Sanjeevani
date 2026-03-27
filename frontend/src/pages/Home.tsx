import { AlertTriangle, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { useEffect, useMemo } from "react";

import { SOSButton } from "../components/alerts/SOSButton";
import { MedicineCard } from "../components/home/MedicineCard";
import { Card } from "../components/ui/Card";
import { Toast } from "../components/ui/Toast";
import { apiJson } from "../lib/api";
import { t } from "../lib/i18n";
import { useMedicines } from "../hooks/useMedicines";
import { useStreak } from "../hooks/useStreak";
import { useAlertStore } from "../stores/alertStore";
import { useUserStore } from "../stores/userStore";

const formatTime = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export default function Home() {
  const { todayDoses, loading, error, takeDose } = useMedicines();
  const { streak } = useStreak();
  const userId = useUserStore((s) => s.userId);
  const lang = useUserStore((s) => s.language);
  const alertMessage = useAlertStore((s) => s.message);
  const setAlertMessage = useAlertStore((s) => s.setMessage);

  const orderedDoses = useMemo(
    () => [...todayDoses].sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()),
    [todayDoses],
  );

  const summary = useMemo(() => {
    const taken = orderedDoses.filter((dose) => dose.status === "taken").length;
    const missed = orderedDoses.filter((dose) => dose.status === "missed").length;
    const pending = orderedDoses.filter((dose) => dose.status === "pending").length;
    const nextDose = orderedDoses.find((dose) => dose.status !== "taken") ?? null;
    const completion = orderedDoses.length ? Math.round((taken / orderedDoses.length) * 100) : 0;
    return { taken, missed, pending, nextDose, completion };
  }, [orderedDoses]);

  const hasCriticalMiss = useMemo(
    () =>
      orderedDoses.some((dose) => {
        if (dose.status === "taken") {
          return false;
        }

        const scheduled = new Date(dose.scheduled_at).getTime();
        return Date.now() - scheduled > 30 * 60 * 1000;
      }),
    [orderedDoses],
  );

  const heroBadge = hasCriticalMiss
    ? {
        label: t(lang, "needsAttention"),
        icon: AlertTriangle,
        tone: "bg-red-500/15 text-red-100",
      }
    : summary.completion === 100 && orderedDoses.length > 0
      ? {
          label: t(lang, "allDone"),
          icon: CheckCircle2,
          tone: "bg-teal-400/15 text-teal-100",
        }
      : {
          label: t(lang, "today"),
          icon: Clock3,
          tone: "bg-white/10 text-cyan-100",
        };

  const heroTitle =
    orderedDoses.length === 0
      ? t(lang, "noMedicinesScheduled")
      : hasCriticalMiss
        ? t(lang, "oneDoseOverdue")
        : summary.completion === 100
          ? t(lang, "greatWorkToday")
          : t(lang, "stayOnTrack");

  const heroCopy =
    orderedDoses.length === 0
      ? t(lang, "askCaretakerAddPlan")
      : hasCriticalMiss
        ? t(lang, "tapAlertButtonForHelp")
        : summary.nextDose
          ? t(lang, "nextDoseAt", { time: formatTime(summary.nextDose.scheduled_at) })
          : t(lang, "allMedicinesComplete");

  const HeroIcon = heroBadge.icon;

  const alertCaretaker = async () => {
    if (hasCriticalMiss) {
      try {
        await apiJson<{ id: string }>("/api/v1/alerts/caretaker", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
          body: JSON.stringify({ patient_id: userId, type: "sos", message: t(lang, "sosFromPatientCritical") }),
        });
        setAlertMessage(t(lang, "sosSent"));
      } catch {
        setAlertMessage(t(lang, "canNotSendSOS"));
      }
      return;
    }

    setAlertMessage(t(lang, "noUrgentAlert"));
  };

  useEffect(() => {
    if (!alertMessage) {
      return;
    }

    const timer = window.setTimeout(() => setAlertMessage(""), 2800);
    return () => window.clearTimeout(timer);
  }, [alertMessage, setAlertMessage]);

  const stats = [
    {
      label: t(lang, "streak"),
      value: `${streak}d`,
      note: t(lang, "keepChainGoing"),
      icon: Sparkles,
      tone: "bg-slate-50 text-slate-700",
    },
    {
      label: t(lang, "takenCard"),
      value: summary.taken,
      note: `${summary.completion}% ${t(lang, "today")}`,
      icon: CheckCircle2,
      tone: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="space-y-4">
      <Card
        className={`overflow-hidden rounded-[2rem] text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)] ${
          hasCriticalMiss
            ? "bg-gradient-to-br from-red-700 via-rose-700 to-slate-950"
            : summary.completion === 100 && orderedDoses.length > 0
              ? "bg-gradient-to-br from-teal-600 via-cyan-700 to-slate-950"
              : "bg-gradient-to-br from-slate-950 via-cyan-950 to-[#0b5a61]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${heroBadge.tone}`}>
              <HeroIcon className="h-4 w-4" />
              {heroBadge.label}
            </span>
            <h2 className="text-3xl font-black leading-tight">{heroTitle}</h2>
            <p className="max-w-[18rem] text-sm leading-6 text-white/85">{heroCopy}</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4 text-right backdrop-blur">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cyan-200">{t(lang, "completion")}</p>
            <p className="mt-1 text-3xl font-black">{summary.completion}%</p>
            <p className="text-xs text-cyan-100">{t(lang, "today")}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t(lang, "nextDose")}</p>
            <p className="mt-1 text-base font-semibold text-white">
              {summary.nextDose?.medicines?.name ?? t(lang, "nothingPending")}
            </p>
            <p className="text-xs text-cyan-100">
              {summary.nextDose
                ? `${summary.nextDose.medicines?.dosage || t(lang, "doseFallback")} - ${formatTime(summary.nextDose.scheduled_at)}`
                : t(lang, "enjoyCalmDay")}
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{t(lang, "leftToday")}</p>
            <p className="mt-1 text-base font-semibold">{summary.pending}</p>
            <p className="text-xs text-cyan-100">
              {summary.missed > 0 ? `${summary.missed} ${t(lang, "missed")}` : t(lang, "noMisses")}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label} className={`space-y-2 rounded-[1.5rem] border border-white/60 ${stat.tone}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.note}</p>
            </Card>
          );
        })}
      </div>

      <SOSButton onClick={() => void alertCaretaker()} />

      {loading && <Card className="rounded-[1.5rem] text-slate-600">{t(lang, "loadingMedicines")}</Card>}
      {error && <Card className="rounded-[1.5rem] border border-red-200 bg-red-50 text-red-700">{error}</Card>}

      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-slate-900">{t(lang, "todaysMedicines")}</p>
          <p className="text-sm text-slate-600">{t(lang, "tapToMarkTaken")}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
          {orderedDoses.length} {t(lang, "total")}
        </span>
      </div>

      {orderedDoses.length === 0 ? (
        <Card className="rounded-[1.5rem] border-dashed border-slate-300 bg-white/80 text-center text-slate-600">
          <p className="text-base font-semibold text-slate-900">{t(lang, "noMedicinesScheduled")}</p>
          <p className="mt-1 text-sm">{t(lang, "askCaretakerAddPlan")}</p>
        </Card>
      ) : (
        orderedDoses.map((dose) => <MedicineCard key={dose.id} dose={dose} onTake={() => void takeDose(dose.medicine_id, dose.scheduled_at)} />)
      )}

      <Toast message={alertMessage} />
    </div>
  );
}
