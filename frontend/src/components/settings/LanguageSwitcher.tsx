import type { Language } from "../../types";
import { useUserStore } from "../../stores/userStore";
import { Card } from "../ui/Card";
import { t } from "../../lib/i18n";

export function LanguageSwitcher() {
  const language = useUserStore((s) => s.language);
  const setLanguage = useUserStore((s) => s.setLanguage);
  const lang = language;
  const languages: Array<{ code: Language; label: string; helper: string }> = [
    { code: "en", label: t(lang, "english"), helper: t(lang, "forSimpleNavigation") },
    { code: "hi", label: t(lang, "hindi"), helper: t(lang, "useHindiPrompts") },
    { code: "mr", label: t(lang, "marathi"), helper: t(lang, "useMarathiPrompts") },
  ];
  return (
    <Card className="space-y-3">
      <div>
        <p className="font-semibold">{t(lang, "language")}</p>
        <p className="text-sm text-slate-600">{t(lang, "pickLanguage")}</p>
      </div>
      <div className="grid gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            aria-pressed={language === lang.code}
            className={`flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
              language === lang.code
                ? "border-primary bg-teal-50 text-slate-900 shadow-[0_10px_20px_rgba(44,156,152,0.12)]"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="flex flex-col">
              <span className="font-semibold">{lang.label}</span>
              <span className="text-xs text-slate-500">{lang.helper}</span>
            </span>
            <span className={`text-xs font-semibold uppercase tracking-wide ${language === lang.code ? "text-primary" : "text-slate-400"}`}>
              {lang.code}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
