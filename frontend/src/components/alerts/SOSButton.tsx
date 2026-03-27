import { Button } from "../ui/Button";

export function SOSButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={onClick}>
      SOS - Alert Caretaker
    </Button>
  );
}
