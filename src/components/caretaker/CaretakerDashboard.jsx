import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCaretakerPatients } from '../../hooks/useCaretakerPatients';
import { Header } from '../shared/Header';
import { PatientSelector } from './PatientSelector';
import { PatientStatusView } from './PatientStatusView';
import { LinkPatientScreen } from './LinkPatientScreen';

export const CaretakerDashboard = () => {
  const { profile } = useAuth();
  const { patients, loading } = useCaretakerPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    if (!selectedPatientId && patients.length > 0) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId]);

  if (loading) return null;

  if (patients.length === 0) {
    return <LinkPatientScreen />;
  }

  return (
    <div className="pb-8 max-w-md mx-auto bg-background min-h-screen">
      <Header 
        title={profile?.full_name?.split(' ')[0] || 'Caretaker'}
        subtitle={`Managing ${patients.length} patient${patients.length !== 1 ? 's' : ''}`}
      />
      
      <div className="px-4">
        {patients.length > 1 && (
          <PatientSelector 
            patients={patients} 
            selectedId={selectedPatientId} 
            onSelect={setSelectedPatientId} 
          />
        )}
        
        {selectedPatientId && (
          <PatientStatusView patientId={selectedPatientId} />
        )}
      </div>
    </div>
  );
};
