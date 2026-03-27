import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function BadgeGrid({ badges, unlocked }: { badges: string[]; unlocked: string[] }) {
  const lang = useUserStore((s) => s.language);
  return (
    <Card className="space-y-3">
      <div>
        <p className="font-semibold text-slate-900">{t(lang, "badges")}</p>
        <p className="text-sm text-slate-600">{t(lang, "unlockMilestones")}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {badges.map((b) => (
          <div
            key={b}
            className={`rounded-2xl px-3 py-2 text-sm font-semibold ${
              unlocked.includes(b) ? "border border-cyan-100 bg-cyan-50 text-slate-800" : "border border-slate-200 bg-slate-100 text-slate-500"
            }`}
          >
            {b}
          </div>
        ))}
      </div>
    </Card>
  );
}
