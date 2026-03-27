import { useEffect } from "react";

import { getSupabaseClient } from "../lib/supabase";

export function useRealtime(onChange: () => void) {
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return;
    }
    const channel = supabase
      .channel("sanjeevni-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "dose_logs" }, () => onChange())
      .on("postgres_changes", { event: "*", schema: "public", table: "alerts" }, () => onChange())
      .on("postgres_changes", { event: "*", schema: "public", table: "medicines" }, () => onChange())
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onChange]);
}
