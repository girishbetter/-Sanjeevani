import { CheckCircle2 } from "lucide-react";

import type { DoseLog } from "../../types";
import { t } from "../../lib/i18n";
import { cx } from "../../lib/utils";
import { useUserStore } from "../../stores/userStore";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { PillImage } from "./PillImage";

interface Props {
  dose: DoseLog;
  onTake: () => void;
}

export function MedicineCard({ dose, onTake }: Props) {
  const done = dose.status === "taken";
  const displayTime = new Date(dose.scheduled_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const lang = useUserStore((s) => s.language);

  return (
    <Card
      className={cx(
        "space-y-4 rounded-[1.6rem] border border-slate-200 bg-white/90 shadow-[0_10px_24px_rgba(15,23,42,0.08)]",
        done && "border-emerald-200 bg-emerald-50/70",
      )}
    >
      <div className="flex items-start gap-3">
        <PillImage src={dose.medicines?.image_url} alt={dose.medicines?.name || "medicine"} />
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-black tracking-tight text-slate-950">{dose.medicines?.name}</p>
          <p className="mt-1 text-base font-medium text-slate-700">{dose.medicines?.dosage}</p>
        </div>
        <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", done ? "bg-emerald-100 text-emerald-700" : "bg-cyan-100 text-cyan-700")}>
          {done ? t(lang, "taken") : t(lang, "upcoming")}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          {displayTime}
        </div>
        <Button
          className={cx(
            "flex-1 rounded-2xl px-4 py-4 text-lg font-black shadow-none",
            done ? "bg-emerald-600 text-white" : "bg-slate-950 text-white hover:bg-slate-800",
          )}
          disabled={done}
          onClick={onTake}
        >
          {done ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              {t(lang, "taken")}
            </span>
          ) : (
            t(lang, "take")
          )}
        </Button>
      </div>
    </Card>
  );
}
