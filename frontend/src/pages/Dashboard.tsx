import { AIInsightCard } from "../components/dashboard/AIInsightCard";
import { HeatmapCalendar } from "../components/dashboard/HeatmapCalendar";
import { PieChart } from "../components/dashboard/PieChart";
import { WeeklyChart } from "../components/dashboard/WeeklyChart";
import { Card } from "../components/ui/Card";
import { useAI } from "../hooks/useAI";
import { useAdherence } from "../hooks/useAdherence";

export default function Dashboard() {
  const { summary, heatmap, weekly } = useAdherence();
  const { insights, loading } = useAI();
  return (
    <div className="space-y-3">
      <Card className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-2xl font-bold">{summary.adherence_pct}%</p>
          <p className="text-xs text-slate-600">Adherence</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{summary.taken_count}</p>
          <p className="text-xs text-slate-600">Taken</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{summary.missed_count}</p>
          <p className="text-xs text-slate-600">Missed</p>
        </div>
      </Card>
      <HeatmapCalendar data={heatmap} />
      <WeeklyChart data={weekly} />
      <PieChart taken={summary.taken_count} missed={summary.missed_count} />
      {loading ? <Card>Loading AI insights...</Card> : insights.map((i) => <AIInsightCard key={i} insight={i} />)}
    </div>
  );
}
