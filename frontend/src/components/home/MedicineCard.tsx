import { CheckCircle2 } from "lucide-react";
import type { DoseLog } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { PillImage } from "./PillImage";

interface Props {
  dose: DoseLog;
  onTake: () => void;
}

export function MedicineCard({ dose, onTake }: Props) {
  const done = dose.status === "taken";
  return (
    <Card className={done ? "border-emerald-300 bg-emerald-50" : ""}>
      <div className="flex items-center gap-3">
        <PillImage src={dose.medicines?.image_url} alt={dose.medicines?.name || "medicine"} />
        <div className="flex-1">
          <p className="text-lg font-semibold">{dose.medicines?.name}</p>
          <p className="text-sm text-slate-600">{dose.medicines?.dosage}</p>
          <p className="text-sm text-slate-500">{new Date(dose.scheduled_at).toLocaleTimeString()}</p>
        </div>
        <Button onClick={onTake} disabled={done} className="w-24">
          {done ? <CheckCircle2 className="mx-auto" /> : "Take"}
        </Button>
      </div>
    </Card>
  );
}
