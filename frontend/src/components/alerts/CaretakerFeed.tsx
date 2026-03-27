import { Card } from "../ui/Card";

export function CaretakerFeed({ items }: { items: Array<{ id: string; message: string; type: string }> }) {
  return (
    <div className="space-y-2">
      {items.map((a) => (
        <Card key={a.id}>
          <p className="text-sm font-semibold">{a.type}</p>
          <p className="text-sm text-slate-600">{a.message}</p>
        </Card>
      ))}
    </div>
  );
}
