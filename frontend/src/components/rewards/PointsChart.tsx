import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card } from "../ui/Card";

export function PointsChart({ points }: { points: number }) {
  const data = [
    { week: "W1", points: Math.round(points * 0.2) },
    { week: "W2", points: Math.round(points * 0.35) },
    { week: "W3", points: Math.round(points * 0.45) },
  ];
  return (
    <Card>
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
