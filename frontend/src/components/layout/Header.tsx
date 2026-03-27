import { Link } from "react-router-dom";

import { BrandLogo } from "../branding/BrandLogo";
import { Badge } from "../ui/Badge";
import { useStreak } from "../../hooks/useStreak";
import { useUserStore } from "../../stores/userStore";

export function Header() {
  const { streak } = useStreak();
  const role = useUserStore((s) => s.role);
  const today = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(new Date());
  const modeLabel = role === "caretaker" ? "Caretaker access" : role === "patient" ? "Patient access" : "Choose mode";
  return (
    <header className="sticky top-3 z-30 mx-4 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 px-4 py-3 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" className="shrink-0" />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-slate-500">Sanjeevani</p>
            <h1 className="text-xl font-bold text-slate-900">Care Companion</h1>
            <p className="text-xs text-slate-500">{today}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge>{streak} day streak</Badge>
          <p className="mt-1 text-xs font-semibold text-slate-500">{modeLabel}</p>
          <Link to="/" className="mt-1 inline-flex text-xs font-semibold text-primary transition hover:text-primary/80">
            Back to start
          </Link>
        </div>
      </div>
    </header>
  );
}
