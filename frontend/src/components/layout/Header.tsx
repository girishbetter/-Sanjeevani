import { Badge } from "../ui/Badge";
import { useStreak } from "../../hooks/useStreak";

export function Header() {
  const { streak } = useStreak();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <h1 className="text-xl font-bold text-primary">Sanjeevni</h1>
      <Badge>{streak} day streak</Badge>
    </header>
  );
}
