import { useMemo } from "react";

import { useAdherence } from "./useAdherence";

const badges = ["First Week", "Perfect Day", "14-Day Star", "Month Hero", "Consistent", "On Time"];

export function useStreak() {
  const { summary, weekly } = useAdherence();
  const points = summary.taken_count * 10;
  const streak = useMemo(() => weekly.filter((w) => w.adherence_pct === 100).length, [weekly]);
  const nextBadgeAt = Math.min(60, (Math.floor(points / 100) + 1) * 100);
  const unlocked = badges.slice(0, Math.min(badges.length, Math.floor(streak / 2) + 1));
  return { points, streak, badges, unlocked, nextBadgeAt };
}
