import { Card } from "../ui/Card";

const items = ["OTP login enabled", "RLS policies configured", "HTTPS on deployment"];

export function SecurityPanel() {
  return (
    <Card>
      <p className="mb-2 font-semibold">Security Status</p>
      <ul className="space-y-1 text-sm text-slate-700">
        {items.map((i) => (
          <li key={i}>- {i}</li>
        ))}
      </ul>
    </Card>
  );
}
