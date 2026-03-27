import { Card } from "../ui/Card";

export function StatusRow({ name, status }: { name: string; status: string }) {
  const tone =
    status === "taken"
      ? "bg-emerald-100 text-emerald-700"
      : status === "missed"
        ? "bg-red-100 text-red-700"
        : "bg-cyan-100 text-cyan-700";
  return (
    <Card className="flex items-center justify-between gap-3">
      <span className="font-medium text-slate-900">{name}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${tone}`}>{status}</span>
    </Card>
  );
}
