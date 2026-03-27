import { useEffect } from "react";

import { getSupabaseClient } from "../lib/supabase";

export function useRealtime(onChange: () => void) {
  useEffect(() => {
    const channel = getSupabaseClient()
      .channel("sanjeevni-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "dose_logs" }, () => onChange())
      .on("postgres_changes", { event: "*", schema: "public", table: "alerts" }, () => onChange())
      .subscribe();
    return () => {
      void getSupabaseClient().removeChannel(channel);
    };
  }, [onChange]);
}
