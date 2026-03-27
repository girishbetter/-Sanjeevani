import { useMemo } from "react";

import { useAdherence } from "./useAdherence";

const badges = ["First Week", "Perfect Day", "14-Day Star", "Month Hero", "Consistent", "On Time"];

export function useStreak() {
  const { summary, weekly } = useAdherence();
  const points = summary.taken_count * 10;
  const streak = useMemo(() => {
    let run = 0;
    for (let i = weekly.length - 1; i >= 0; i -= 1) {
      if (weekly[i]?.adherence_pct === 100) {
        run += 1;
      } else {
        break;
      }
    }
    return run;
  }, [weekly]);
  const nextBadgeAt = Math.max(100, Math.ceil((points + 1) / 100) * 100);
  const unlocked = badges.slice(0, Math.min(badges.length, Math.floor(points / 100) + 1));
  return { points, streak, badges, unlocked, nextBadgeAt };
}
