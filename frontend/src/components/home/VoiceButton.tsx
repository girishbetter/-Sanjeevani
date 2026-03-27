import { Mic } from "lucide-react";
import { Button } from "../ui/Button";

interface Props {
  listening: boolean;
  onClick: () => void;
}

export function VoiceButton({ listening, onClick }: Props) {
  return (
    <Button className="h-20 w-full text-lg" onClick={onClick}>
      <Mic className="mr-2 inline" />
      {listening ? "Listening..." : "Tap to Speak"}
    </Button>
  );
}
