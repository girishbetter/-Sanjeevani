import { create } from "zustand";
import type { Language } from "../types";

interface UserState {
  userId: string;
  language: Language;
  setLanguage: (value: Language) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: "demo-user",
  language: "en",
  setLanguage: (language) => set({ language }),
}));
