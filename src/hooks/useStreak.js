import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useStreak = (patientId) => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    if (!patientId) return;

    const fetchStreak = async () => {
      const { data } = await supabase
        .from('streaks')
        .select('current_streak, longest_streak')
        .eq('patient_id', patientId)
        .single();
      
      if (data) {
        setStreak(data.current_streak);
        setLongestStreak(data.longest_streak);
      }
    };

    fetchStreak();

    const channel = supabase.channel('streak_updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'streaks',
        filter: `patient_id=eq.${patientId}`
      }, payload => {
        if (payload.new) {
          setStreak(payload.new.current_streak);
          setLongestStreak(payload.new.longest_streak);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [patientId]);

  return { streak, longestStreak };
};
