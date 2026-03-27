import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Language, Role } from "../types";

interface UserState {
  userId: string;
  language: Language;
  role: Role | null;
  setLanguage: (value: Language) => void;
  setRole: (value: Role | null) => void;
  clearRole: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "demo-user",
      language: "en",
      role: null,
      setLanguage: (language) => set({ language }),
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    {
      name: "sanjeevani-user",
      storage: typeof window !== "undefined" ? createJSONStorage(() => window.localStorage) : undefined,
      partialize: (state) => ({ language: state.language, role: state.role }),
    },
  ),
);
