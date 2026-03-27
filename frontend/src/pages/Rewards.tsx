import { BadgeGrid } from "../components/rewards/BadgeGrid";
import { PointsChart } from "../components/rewards/PointsChart";
import { StreakCard } from "../components/rewards/StreakCard";
import { useStreak } from "../hooks/useStreak";

export default function Rewards() {
  const { streak, points, badges, unlocked, nextBadgeAt } = useStreak();
  return (
    <div className="space-y-3">
      <StreakCard streak={streak} points={points} nextBadgeAt={nextBadgeAt} />
      <BadgeGrid badges={badges} unlocked={unlocked} />
      <PointsChart points={points} />
    </div>
  );
}
