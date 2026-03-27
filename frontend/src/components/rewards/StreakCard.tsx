import { Card } from "../ui/Card";

export function StreakCard({ streak, points }: { streak: number; points: number }) {
  return (
    <Card>
      <p className="text-xl font-bold">{streak} Day Streak</p>
      <p className="text-slate-600">{points} points earned</p>
    </Card>
  );
}
