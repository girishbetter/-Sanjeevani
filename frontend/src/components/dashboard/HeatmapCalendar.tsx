import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function HeatmapCalendar({ data }: { data: Array<{ date: string; adherence_pct: number }> }) {
  const lang = useUserStore((s) => s.language);
  return (
    <Card>
      <h3 className="mb-2 font-semibold">{t(lang, "heatmap30")}</h3>
      <div className="grid grid-cols-10 gap-1">
        {data.map((d) => (
          <div
            key={d.date}
            className={`h-5 rounded ${d.adherence_pct === 100 ? "bg-emerald-500" : d.adherence_pct > 0 ? "bg-cyan-400" : "bg-red-400"}`}
            title={`${d.date} ${d.adherence_pct}%`}
          />
        ))}
      </div>
    </Card>
  );
}
