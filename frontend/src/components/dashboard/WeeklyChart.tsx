import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";

export function WeeklyChart({ data }: { data: Array<{ day: string; adherence_pct: number }> }) {
  return (
    <Card>
      <h3 className="mb-2 font-semibold">Weekly Trend</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" hide />
            <YAxis domain={[0, 100]} />
            <Bar dataKey="adherence_pct" fill="#0F6E56" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
