import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function StreakCard({ streak, points, nextBadgeAt }: { streak: number; points: number; nextBadgeAt: number }) {
  const progress = nextBadgeAt ? Math.min(100, Math.round((points / nextBadgeAt) * 100)) : 0;
  const lang = useUserStore((s) => s.language);
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{t(lang, "consistency")}</p>
          <p className="mt-2 text-3xl font-bold">
            {streak} {t(lang, "dayStreak")}
          </p>
          <p className="mt-1 text-sm text-slate-300">
            {points} {t(lang, "pointsEarned")}
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-300">{t(lang, "nextGoal")}</p>
          <p className="text-lg font-semibold">{nextBadgeAt} pts</p>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-teal-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-300">{t(lang, "youAreWayToNext", { progress })}</p>
    </Card>
  );
}
