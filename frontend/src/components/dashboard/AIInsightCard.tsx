import { Card } from "../ui/Card";

export function AIInsightCard({ insight }: { insight: string }) {
  return (
    <Card className="border-l-4 border-primary">
      <p className="text-sm text-slate-700">{insight}</p>
    </Card>
  );
}
