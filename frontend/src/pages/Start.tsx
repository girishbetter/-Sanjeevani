import { ArrowRight, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { BrandLogo } from "../components/branding/BrandLogo";
import { Card } from "../components/ui/Card";
import { useUserStore } from "../stores/userStore";

export default function Start() {
  const navigate = useNavigate();
  const lastRole = useUserStore((s) => s.role);
  const setRole = useUserStore((s) => s.setRole);

  const goPatient = () => {
    setRole("patient");
    navigate("/patient");
  };

  const goCaretaker = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(87,201,232,0.16),_transparent_32%),radial-gradient(circle_at_85%_20%,_rgba(44,156,152,0.14),_transparent_28%),linear-gradient(180deg,_#f7fcfd_0%,_#eef8f7_54%,_#e5f4f2_100%)] px-4 py-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-4rem] top-12 h-44 w-44 rounded-full bg-[rgba(87,201,232,0.12)] blur-3xl" />
        <div className="absolute right-[-4rem] top-44 h-56 w-56 rounded-full bg-[rgba(44,156,152,0.12)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4">
        <Card className="space-y-4 rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="space-y-3">
            <div className="flex justify-start">
              <BrandLogo size="lg" className="h-28 w-28" />
            </div>
            <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white">
              Sanjeevani
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
              <Sparkles className="h-4 w-4" />
              <span>Simple access</span>
            </div>
            <h1 className="text-3xl font-black leading-tight text-slate-950">Who are you?</h1>
            <p className="text-sm leading-6 text-slate-600">
              Choose one big button. Patient mode opens the pillbox. Caretaker mode opens a tiny code screen.
            </p>
          </div>

          {lastRole ? (
            <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Last used: {lastRole === "patient" ? "Patient" : "Caretaker"}
            </p>
          ) : null}
        </Card>

        <button type="button" className="group w-full text-left" onClick={goPatient}>
          <Card className="rounded-[2rem] border border-slate-900 bg-slate-950 p-5 text-white shadow-[0_22px_44px_rgba(15,23,42,0.28)] transition group-active:scale-[0.99]">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-cyan-200">
                <UserRound className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold">I am a Patient</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">See todays medicines and tap once when each pill is taken.</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-white/80" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100">High contrast</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100">Large buttons</span>
                </div>
              </div>
            </div>
          </Card>
        </button>

        <button type="button" className="group w-full text-left" onClick={goCaretaker}>
          <Card className="rounded-[2rem] border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-5 shadow-[0_22px_44px_rgba(44,156,152,0.14)] transition group-active:scale-[0.99]">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-teal-500/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold text-slate-950">I am a Caretaker</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">Open the caretaker code screen to add medicines and check alerts.</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">Medicine manager</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Alert feed</span>
                </div>
              </div>
            </div>
          </Card>
        </button>

        <p className="px-2 text-center text-xs leading-5 text-slate-500">This demo uses role choice as the sign-in step, then a caretaker code for the protected side.</p>
      </div>
    </div>
  );
}
