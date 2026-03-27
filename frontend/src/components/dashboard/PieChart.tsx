import { Pie, PieChart as RePieChart, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function PieChart({ taken, missed }: { taken: number; missed: number }) {
  const lang = useUserStore((s) => s.language);
  const data = [
    { name: t(lang, "takenCard"), value: taken, color: "#2C9C98" },
    { name: t(lang, "missedCard"), value: missed, color: "#EF4444" },
  ];
  return (
    <Card>
      <h3 className="mb-2 font-semibold">{t(lang, "takenVsMissed")}</h3>
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
