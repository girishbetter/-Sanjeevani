import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useAlerts = () => {
  const { profile } = useAuth();
  const [alertLoading, setAlertLoading] = useState(false);

  const sendAlert = async (type, patientId, medicineId = null) => {
    setAlertLoading(true);
    try {
      const { data: links } = await supabase
        .from('caretaker_patient_links')
        .select('caretaker_profile_id')
        .eq('patient_id', patientId)
        .eq('is_active', true);

      if (links && links.length > 0) {
        for (const link of links) {
          await supabase.functions.invoke('send-alert', {
            body: {
              patientId,
              medicineId,
              caretakerProfileId: link.caretaker_profile_id,
              alertType: type,
              channel: 'sms'
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to send alert', error);
    } finally {
      setAlertLoading(false);
    }
  };

  return { sendAlert, alertLoading };
};
