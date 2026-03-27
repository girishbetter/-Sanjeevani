import { create } from "zustand";
import type { DoseLog } from "../types";

interface MedicineState {
  todayDoses: DoseLog[];
  setTodayDoses: (rows: DoseLog[]) => void;
}

export const useMedicineStore = create<MedicineState>((set) => ({
  todayDoses: [],
  setTodayDoses: (rows) => set({ todayDoses: rows }),
}));
