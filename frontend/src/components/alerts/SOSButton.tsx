import { Button } from "../ui/Button";
import { useUserStore } from "../../stores/userStore";
import { t } from "../../lib/i18n";

export function SOSButton({ onClick }: { onClick: () => void }) {
  const lang = useUserStore((s) => s.language);
  return (
    <Button className="w-full rounded-[1.75rem] bg-gradient-to-r from-red-600 to-rose-600 py-4 text-base shadow-[0_12px_28px_rgba(220,38,38,0.28)] hover:from-red-500 hover:to-rose-500" onClick={onClick}>
      {t(lang, "sosCta")}
    </Button>
  );
}
