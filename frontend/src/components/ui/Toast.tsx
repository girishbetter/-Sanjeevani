interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }
  return (
    <div
      aria-live="polite"
      role="status"
      className="fixed bottom-24 left-1/2 z-50 w-[min(92%,420px)] -translate-x-1/2 rounded-2xl border border-white/70 bg-slate-900/95 px-4 py-3 text-sm text-white shadow-[0_18px_36px_rgba(15,23,42,0.24)] backdrop-blur"
    >
      {message}
    </div>
  );
}
