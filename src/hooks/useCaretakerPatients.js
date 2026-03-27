import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useCaretakerPatients = () => {
  const { profile } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = useCallback(async () => {
    if (!profile || profile.role !== 'caretaker') return;
    setLoading(true);

    const { data: links, error } = await supabase
      .from('caretaker_patient_links')
      .select(`
        patient_id,
        relationship,
        patients (
          id, age, medical_conditions,
          profiles ( full_name, phone, avatar_url )
        )
      `)
      .eq('caretaker_profile_id', profile.id)
      .eq('is_active', true);
      
    if (!error && links) {
      setPatients(links.map(l => ({
        id: l.patient_id,
        relationship: l.relationship,
        ...l.patients,
        profile: l.patients?.profiles || {}
      })));
    }
    setLoading(false);
  }, [profile]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const linkPatient = async (phone, relationship) => {
    const { data: patientProfile, error: profileErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone', phone)
      .eq('role', 'patient')
      .single();

    if (profileErr || !patientProfile) throw new Error("Patient not registered.");

    const { data: patientData, error: patientErr } = await supabase
      .from('patients')
      .select('id')
      .eq('profile_id', patientProfile.id)
      .single();

    if (patientErr || !patientData) throw new Error("Patient data not found.");

    const { error: linkErr } = await supabase
      .from('caretaker_patient_links')
      .insert({
        caretaker_profile_id: profile.id,
        patient_id: patientData.id,
        relationship
      });

    if (linkErr) throw linkErr;
    fetchPatients();
  };

  return { patients, loading, linkPatient, refetch: fetchPatients };
};
