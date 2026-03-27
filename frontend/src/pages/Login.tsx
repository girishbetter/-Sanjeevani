import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BrandLogo } from "../components/branding/BrandLogo";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { t } from "../lib/i18n";
import { useUserStore } from "../stores/userStore";

const CARETAKER_CODE = "2468";

export default function Login() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const role = useUserStore((s) => s.role);
  const setRole = useUserStore((s) => s.setRole);
  const lang = useUserStore((s) => s.language);

  useEffect(() => {
    if (role === "caretaker") {
      navigate("/caretaker", { replace: true });
    }
  }, [navigate, role]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.trim() !== CARETAKER_CODE) {
      setError(`Use the demo code ${CARETAKER_CODE}.`);
      return;
    }

    setError("");
    setRole("caretaker");
    navigate("/caretaker", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(87,201,232,0.14),_transparent_30%),radial-gradient(circle_at_85%_20%,_rgba(44,156,152,0.12),_transparent_28%),linear-gradient(180deg,_#f7fcfd_0%,_#eef8f7_100%)] px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-4rem] top-16 h-44 w-44 rounded-full bg-[rgba(87,201,232,0.14)] blur-3xl" />
        <div className="absolute right-[-4rem] top-36 h-56 w-56 rounded-full bg-[rgba(44,156,152,0.12)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md items-center">
        <Card className="w-full space-y-5 rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="space-y-3">
            <BrandLogo size="lg" className="h-24 w-24" />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-teal-700">{t(lang, "caretakerSide")}</p>
            <h1 className="text-3xl font-black text-slate-950">{t(lang, "loginTitle")}</h1>
            <p className="text-sm leading-6 text-slate-600">
              This demo keeps caretaker sign-in very simple. Use the code to open medicine management and alerts.
            </p>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="caretaker-code">
                Access code
              </label>
              <input
                id="caretaker-code"
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={4}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-lg font-semibold tracking-[0.35em] text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="2468"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  if (error) {
                    setError("");
                  }
                }}
              />
            </div>

            {error ? (
              <p className="text-sm font-semibold text-red-600">{error}</p>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Demo code: {CARETAKER_CODE}</p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Button className="rounded-2xl bg-slate-950 py-4 text-lg shadow-[0_18px_32px_rgba(15,23,42,0.2)]" type="submit">
                {t(lang, "verify")}
              </Button>
              <Button className="rounded-2xl border border-slate-200 bg-white py-4 text-lg text-slate-900 shadow-none hover:bg-slate-50" type="button" onClick={() => navigate("/")}>
                {t(lang, "backToStart")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
