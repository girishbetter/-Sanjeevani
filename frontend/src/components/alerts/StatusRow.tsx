import { Card } from "../ui/Card";

export function StatusRow({ name, status }: { name: string; status: string }) {
  return (
    <Card className="flex items-center justify-between">
      <span>{name}</span>
      <span className="text-sm font-semibold capitalize">{status}</span>
    </Card>
  );
}
