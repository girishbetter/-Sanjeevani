import { useMemo, useState } from "react";

import { useUserStore } from "../stores/userStore";

const langMap = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

export function useVoice() {
  const language = useUserStore((s) => s.language);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const recognition = useMemo(() => {
    const AnyWindow = window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition };
    if (!("SpeechRecognition" in window) && !AnyWindow.webkitSpeechRecognition) {
      return null;
    }
    const Ctor = (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ?? AnyWindow.webkitSpeechRecognition;
    if (!Ctor) return null;
    const rec = new Ctor();
    rec.lang = langMap[language];
    rec.onresult = (e) => setTranscript(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    return rec;
  }, [language]);

  const speak = (text: string) => {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = langMap[language];
    window.speechSynthesis.speak(utt);
  };

  const start = () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
  };

  return { transcript, listening, start, speak };
}
