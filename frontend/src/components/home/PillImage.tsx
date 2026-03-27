import { useState } from "react";

export function PillImage({ src, alt }: { src?: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div
        aria-label={alt}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-200 text-sm font-bold text-primary shadow-inner"
      >
        Rx
      </div>
    );
  }

  return <img className="h-12 w-12 rounded-2xl border border-cyan-100 object-cover shadow-sm" src={src || "/medicine-label.svg"} alt={alt} onError={() => setBroken(true)} />;
}
