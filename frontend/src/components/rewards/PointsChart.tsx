import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function PointsChart({ points }: { points: number }) {
  const lang = useUserStore((s) => s.language);
  const data = [
    { week: "W1", points: Math.round(points * 0.2) },
    { week: "W2", points: Math.round(points * 0.35) },
    { week: "W3", points: Math.round(points * 0.45) },
  ];
  return (
    <Card className="space-y-3">
      <div>
        <p className="font-semibold text-slate-900">{t(lang, "pointsProgress")}</p>
        <p className="text-sm text-slate-600">{t(lang, "quickLookRewards")}</p>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Bar dataKey="points" fill="#0F6E56" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
