import { Card } from "../ui/Card";

export function HeatmapCalendar({ data }: { data: Array<{ date: string; adherence_pct: number }> }) {
  return (
    <Card>
      <h3 className="mb-2 font-semibold">30-Day Heatmap</h3>
      <div className="grid grid-cols-10 gap-1">
        {data.map((d) => (
          <div
            key={d.date}
            className={`h-5 rounded ${d.adherence_pct === 100 ? "bg-emerald-500" : d.adherence_pct > 0 ? "bg-amber-400" : "bg-red-400"}`}
            title={`${d.date} ${d.adherence_pct}%`}
          />
        ))}
      </div>
    </Card>
  );
}
