import { Home, LayoutDashboard, AlertTriangle, Trophy, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";
import { cx } from "../../lib/utils";

export function BottomNav() {
  const lang = useUserStore((s) => s.language);
  const role = useUserStore((s) => s.role);
  const homePath = role === "caretaker" ? "/caretaker" : role === "patient" ? "/patient" : "/";
  const tabs = [
    { to: homePath, icon: Home, key: "home" as const, end: true },
    { to: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
    { to: "/alerts", icon: AlertTriangle, key: "alerts" as const },
    { to: "/rewards", icon: Trophy, key: "rewards" as const },
    { to: "/settings", icon: Settings, key: "settings" as const },
  ];
  return (
    <nav className="fixed bottom-3 left-1/2 z-40 grid w-[min(92%,420px)] -translate-x-1/2 grid-cols-5 rounded-full border border-white/70 bg-white/90 p-1 shadow-[0_12px_30px_rgba(15,23,42,0.14)] backdrop-blur">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cx(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-full px-2 py-2 text-[11px] font-medium transition",
              isActive
                ? "bg-primary text-white shadow-[0_10px_24px_rgba(239,122,74,0.28)]"
                : "text-slate-500 hover:text-slate-900",
            )
          }
        >
          <tab.icon size={18} />
          <span>{t(lang, tab.key)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
