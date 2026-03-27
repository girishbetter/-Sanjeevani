import { useEffect, useState } from "react";

import { CaretakerFeed } from "../components/alerts/CaretakerFeed";
import { SOSButton } from "../components/alerts/SOSButton";
import { StatusRow } from "../components/alerts/StatusRow";
import { useMedicines } from "../hooks/useMedicines";
import { useUserStore } from "../stores/userStore";

const base = import.meta.env.VITE_API_BASE_URL as string;

export default function Alerts() {
  const userId = useUserStore((s) => s.userId);
  const { todayDoses } = useMedicines();
  const [feed, setFeed] = useState<Array<{ id: string; message: string; type: string }>>([]);

  const fetchFeed = async () => {
    const res = await fetch(`${base}/api/v1/alerts/feed?patient_id=${userId}`, {
      headers: { Authorization: "Bearer demo-token", "x-user-id": userId },
    });
    setFeed(await res.json());
  };

  useEffect(() => {
    void fetchFeed();
  }, []);

  const sendSOS = async () => {
    await fetch(`${base}/api/v1/alerts/caretaker`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer demo-token", "x-user-id": userId },
      body: JSON.stringify({ patient_id: userId, type: "sos", message: "Immediate help needed." }),
    });
    await fetchFeed();
  };

  return (
    <div className="space-y-3">
      <SOSButton onClick={() => void sendSOS()} />
      {todayDoses.map((d) => (
        <StatusRow key={d.id} name={d.medicines?.name || "Medicine"} status={d.status} />
      ))}
      <CaretakerFeed items={feed} />
    </div>
  );
}
