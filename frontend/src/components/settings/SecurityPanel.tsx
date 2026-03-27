import { CheckCircle2 } from "lucide-react";
import { Card } from "../ui/Card";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function SecurityPanel() {
  const lang = useUserStore((s) => s.language);
  const items = [t(lang, "roleSelectionEnabled"), t(lang, "caretakerCodeGate"), t(lang, "httpsOnDeployment")];
  return (
    <Card className="space-y-3 rounded-[1.75rem] border border-slate-200 bg-white/95">
      <div>
        <p className="font-bold text-slate-950">{t(lang, "securityStatus")}</p>
        <p className="text-sm text-slate-600">{t(lang, "securityCopy")}</p>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
