import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function WeeklyChart({ data }: { data: Array<{ day: string; adherence_pct: number }> }) {
  const lang = useUserStore((s) => s.language);
  return (
    <Card>
      <h3 className="mb-2 font-semibold">{t(lang, "weeklyTrend")}</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" hide />
            <YAxis domain={[0, 100]} />
            <Bar dataKey="adherence_pct" fill="#2C9C98" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
