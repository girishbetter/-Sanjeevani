import type { Language } from "../../types";
import { useUserStore } from "../../stores/userStore";
import { Card } from "../ui/Card";

export function LanguageSwitcher() {
  const language = useUserStore((s) => s.language);
  const setLanguage = useUserStore((s) => s.setLanguage);
  return (
    <Card>
      <p className="mb-2 font-semibold">Language</p>
      <div className="flex gap-2">
        {(["en", "hi", "mr"] as Language[]).map((lang) => (
          <button
            key={lang}
            className={`h-12 rounded-2xl px-4 ${language === lang ? "bg-primary text-white" : "bg-slate-100"}`}
            onClick={() => setLanguage(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </Card>
  );
}
