import { Home, LayoutDashboard, AlertTriangle, Trophy, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

const tabs = [
  { to: "/", icon: Home, key: "home" as const },
  { to: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
  { to: "/alerts", icon: AlertTriangle, key: "alerts" as const },
  { to: "/rewards", icon: Trophy, key: "rewards" as const },
  { to: "/settings", icon: Settings, key: "settings" as const },
];

export function BottomNav() {
  const lang = useUserStore((s) => s.language);
  return (
    <nav className="fixed bottom-0 left-0 right-0 grid grid-cols-5 border-t bg-white">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className="flex min-h-12 flex-col items-center justify-center py-2 text-xs text-slate-700">
          <tab.icon size={20} />
          <span>{t(lang, tab.key)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
