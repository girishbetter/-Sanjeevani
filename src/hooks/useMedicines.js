import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useMedicines = (patientId) => {
  const { session } = useAuth();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pendingCount = medicines.filter(m => m.status === 'pending').length;
  const missedCount = medicines.filter(m => m.status === 'missed').length;
  const allTaken = medicines.length > 0 && pendingCount === 0 && missedCount === 0;

  const fetchMedicines = useCallback(async () => {
    if (!patientId) return;
    setLoading(true);
    
    // Ensure today's logs are generated
    await supabase.rpc('generate_todays_logs', { p_patient_id: patientId });

    const todayStr = new Date().toLocaleDateString('en-CA'); // Gets YYYY-MM-DD local

    const { data, error: fetchErr } = await supabase
      .from('dose_logs')
      .select(`
        *,
        medicines (
          name, generic_name, pill_color, pill_shape, instructions
        )
      `)
      .eq('patient_id', patientId)
      .eq('scheduled_date', todayStr)
      .order('scheduled_time', { ascending: true });
      
    if (fetchErr) setError(fetchErr.message);
    else setMedicines(data || []);
    
    setLoading(false);
  }, [patientId]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  useEffect(() => {
    if (!patientId) return;

    const channel = supabase.channel('dose_logs_changes')
      .on('postgres_changes', {
        event: '*', 
        schema: 'public', 
        table: 'dose_logs',
        filter: `patient_id=eq.${patientId}`
      }, () => {
        fetchMedicines();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [patientId, fetchMedicines]);

  const markAsTaken = async (logId) => {
    const updatedDate = new Date().toISOString();
    setMedicines(prev => prev.map(m => m.id === logId ? { ...m, status: 'taken', taken_at: updatedDate } : m));
    
    const { error } = await supabase
      .from('dose_logs')
      .update({ status: 'taken', taken_at: updatedDate })
      .eq('id', logId);

    if (error) {
      console.error(error);
      fetchMedicines(); // Revert
    } else {
      supabase.rpc('update_streak', { p_patient_id: patientId }).catch(console.error);
    }
  };

  return { medicines, loading, error, markAsTaken, pendingCount, missedCount, allTaken, refetch: fetchMedicines };
};
