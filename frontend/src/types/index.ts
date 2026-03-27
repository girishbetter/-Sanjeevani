export type Language = "en" | "hi" | "mr";
export type Role = "patient" | "caretaker";

export interface Medicine {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  schedule: { time: string; label: string }[];
  color?: string;
  shape?: string;
  image_url?: string;
  is_active: boolean;
}

export interface DoseLog {
  id: string;
  medicine_id: string;
  user_id: string;
  scheduled_at: string;
  taken_at?: string | null;
  status: "pending" | "taken" | "missed";
  medicines?: Pick<Medicine, "name" | "dosage" | "image_url">;
}
