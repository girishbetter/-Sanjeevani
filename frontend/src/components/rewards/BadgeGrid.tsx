import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

export function BadgeGrid({ badges, unlocked }: { badges: string[]; unlocked: string[] }) {
  return (
    <Card className="grid grid-cols-2 gap-2">
      {badges.map((b) => (
        <Badge key={b} className={unlocked.includes(b) ? "" : "bg-slate-200 text-slate-500"}>
          {b}
        </Badge>
      ))}
    </Card>
  );
}
