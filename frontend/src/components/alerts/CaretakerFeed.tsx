import { AlertTriangle, MessageCircle, ShieldCheck } from "lucide-react";

import { t } from "../../lib/i18n";
import { useUserStore } from "../../stores/userStore";
import { Card } from "../ui/Card";

type AlertItem = { id: string; message: string; type: string; read?: boolean };

function toneForType(type: string) {
  if (type === "sos") {
    return { icon: AlertTriangle, wrap: "bg-red-600/10 border-red-200 text-red-900", labelKey: "sosCta" as const };
  }
  if (type === "missed_dose") {
    return { icon: MessageCircle, wrap: "bg-orange-600/10 border-orange-200 text-orange-900", labelKey: "missed" as const };
  }
  return { icon: ShieldCheck, wrap: "bg-primary/10 border-primary/20 text-slate-900", labelKey: "alerts" as const };
}

export function CaretakerFeed({ items }: { items: AlertItem[] }) {
  const lang = useUserStore((s) => s.language);
  if (!items.length) {
    return (
      <Card className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
        <p className="text-lg font-bold text-slate-950">{t(lang, "caretakerFeedTitle")}</p>
        <p className="mt-1 text-sm text-slate-600">{t(lang, "caretakerFeedEmpty")}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((a) => {
        const tone = toneForType(a.type);
        const Icon = tone.icon;
        return (
          <div key={a.id} className="flex">
            <Card className={`w-full rounded-[1.5rem] border p-4 ${tone.wrap}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <p className="text-sm font-semibold">{t(lang, tone.labelKey)}</p>
                </div>
                {a.read === false ? <span className="rounded-full bg-white/60 px-2 py-1 text-[11px] font-bold">{t(lang, "new")}</span> : null}
              </div>
              <p className="mt-2 text-sm font-semibold leading-5">{a.message}</p>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
