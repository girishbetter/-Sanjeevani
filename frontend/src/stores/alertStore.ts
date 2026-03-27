import { create } from "zustand";

interface AlertState {
  message: string;
  setMessage: (value: string) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  message: "",
  setMessage: (message) => set({ message }),
}));
