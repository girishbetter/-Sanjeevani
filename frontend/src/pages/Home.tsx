import { Card } from "../components/ui/Card";
import { MedicineCard } from "../components/home/MedicineCard";
import { VoiceButton } from "../components/home/VoiceButton";
import { useMedicines } from "../hooks/useMedicines";
import { useVoice } from "../hooks/useVoice";
import { useUserStore } from "../stores/userStore";
import { t } from "../lib/i18n";

export default function Home() {
  const { todayDoses, loading, error, takeDose } = useMedicines();
  const { transcript, listening, start, speak } = useVoice();
  const lang = useUserStore((s) => s.language);

  const onVoice = () => {
    start();
    speak("Aaj ki medicines screen par dikh rahi hain.");
  };

  return (
    <div className="space-y-3">
      <VoiceButton listening={listening} onClick={onVoice} />
      <Card>{transcript || t(lang, "voicePrompt")}</Card>
      {loading && <Card>Loading medicines...</Card>}
      {error && <Card>{error}</Card>}
      {todayDoses.map((dose) => (
        <MedicineCard key={dose.id} dose={dose} onTake={() => void takeDose(dose.medicine_id, dose.scheduled_at)} />
      ))}
    </div>
  );
}
