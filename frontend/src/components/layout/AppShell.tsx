import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5rem] top-8 h-44 w-44 rounded-full bg-[rgba(87,201,232,0.18)] blur-3xl" />
        <div className="absolute right-[-4rem] top-40 h-56 w-56 rounded-full bg-[rgba(44,156,152,0.14)] blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col pb-28">
        <Header />
        <main className="flex-1 space-y-4 px-4 py-4">{children ?? <Outlet />}</main>
        <BottomNav />
      </div>
    </div>
  );
}
