interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }
  return <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">{message}</div>;
}
