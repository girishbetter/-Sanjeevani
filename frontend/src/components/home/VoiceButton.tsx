import { Mic } from "lucide-react";
import { Button } from "../ui/Button";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

interface Props {
  listening: boolean;
  onClick: () => void;
}

export function VoiceButton({ listening, onClick }: Props) {
  const lang = useUserStore((s) => s.language);
  return (
    <Button
      className="w-full justify-between rounded-[1.75rem] bg-gradient-to-r from-primary to-[#1f6f78] px-4 py-4 text-left text-white shadow-[0_18px_32px_rgba(44,156,152,0.3)]"
      onClick={onClick}
    >
      <span className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
          <Mic className="h-5 w-5" />
        </span>
        <span className="flex flex-col items-start">
          <span className="text-base font-semibold">{listening ? t(lang, "listening") : t(lang, "tapToSpeak")}</span>
          <span className="text-xs text-cyan-100">{t(lang, "askWhichMedicineToTakeNext")}</span>
        </span>
      </span>
      <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
        {listening ? t(lang, "active") : t(lang, "voice")}
      </span>
    </Button>
  );
}
