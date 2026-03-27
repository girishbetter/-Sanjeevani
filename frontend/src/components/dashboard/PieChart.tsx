import { Pie, PieChart as RePieChart, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../ui/Card";

export function PieChart({ taken, missed }: { taken: number; missed: number }) {
  const data = [
    { name: "Taken", value: taken, color: "#0F6E56" },
    { name: "Missed", value: missed, color: "#EF4444" },
  ];
  return (
    <Card>
      <h3 className="mb-2 font-semibold">Taken vs Missed</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
