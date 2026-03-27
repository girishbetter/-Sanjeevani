import type { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
}

export function Dialog({ open, title, children }: DialogProps) {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-40 bg-black/50 p-4">
      <div className="mx-auto mt-24 max-w-sm rounded-2xl bg-white p-4">
        <h3 className="mb-3 text-lg font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}
