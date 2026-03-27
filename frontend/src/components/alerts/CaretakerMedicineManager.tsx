import { useMemo, useState } from "react";

import type { Medicine } from "../../types";
import { t } from "../../lib/i18n";
import { useUserStore } from "../../stores/userStore";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface FormState {
  name: string;
  dosage: string;
  time: string;
  label: string;
}

interface Props {
  medicines: Medicine[];
  loading: boolean;
  error: string;
  onAdd: (data: FormState) => Promise<void>;
  onUpdate: (id: string, data: FormState) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const emptyForm: FormState = { name: "", dosage: "", time: "08:00", label: "Morning" };

export function CaretakerMedicineManager({ medicines, loading, error, onAdd, onUpdate, onDelete }: Props) {
  const lang = useUserStore((s) => s.language);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");

  const submitLabel = useMemo(() => (editingId ? t(lang, "updateMedicine") : t(lang, "addMedicine")), [editingId, lang]);

  const onSubmit = async () => {
    setSubmitError("");
    try {
      if (editingId) {
        await onUpdate(editingId, form);
      } else {
        await onAdd(form);
      }
      setEditingId(null);
      setForm(emptyForm);
    } catch (err) {
      setSubmitError((err as Error).message);
    }
  };

  const startEdit = (medicine: Medicine) => {
    const first = medicine.schedule?.[0] ?? { time: "08:00", label: "Morning" };
    setEditingId(medicine.id);
    setForm({ name: medicine.name, dosage: medicine.dosage, time: first.time, label: first.label });
  };

  return (
    <Card className="space-y-4 rounded-[1.75rem] border border-cyan-100 bg-white/95 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-slate-950">{t(lang, "manageMedicines")}</h3>
        <p className="text-sm text-slate-600">{t(lang, "manageMedicinesCopy")}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <input
          className="h-14 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder={t(lang, "manageMedicines")}
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        <input
          className="h-14 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Dosage (e.g. 500mg)"
          value={form.dosage}
          onChange={(e) => setForm((p) => ({ ...p, dosage: e.target.value }))}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            className="h-14 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            type="time"
            value={form.time}
            onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
          />
          <input
            className="h-14 rounded-2xl border border-slate-200 px-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Label"
            value={form.label}
            onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
          />
        </div>
        <div className="flex gap-3">
          <Button className="flex-1 rounded-2xl bg-slate-950 py-4 text-lg" onClick={() => void onSubmit()}>
            {submitLabel}
          </Button>
          {editingId ? (
            <Button
              className="flex-1 rounded-2xl border border-slate-200 bg-white py-4 text-lg text-slate-900 shadow-none hover:bg-slate-50"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              {t(lang, "cancel")}
            </Button>
          ) : null}
        </div>
      </div>
      {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
      {loading ? <p className="text-sm text-slate-600">{t(lang, "loadingMedicines")}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="space-y-3">
        {medicines.map((medicine) => {
          const first = medicine.schedule?.[0] ?? { time: "--:--", label: "Schedule" };
          return (
            <Card key={medicine.id} className="flex items-center justify-between gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50/90">
              <div>
                <p className="font-bold text-slate-950">{medicine.name}</p>
                <p className="text-sm text-slate-600">
                  {medicine.dosage} - {first.time} ({first.label})
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="rounded-2xl bg-slate-950 px-4 py-3 text-sm" onClick={() => startEdit(medicine)}>
                  {t(lang, "edit")}
                </Button>
                <Button className="rounded-2xl bg-red-600 px-4 py-3 text-sm" onClick={() => void onDelete(medicine.id)}>
                  {t(lang, "delete")}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}
