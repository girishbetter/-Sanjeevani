import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMedicines } from '../../hooks/useMedicines';
import { Header } from '../shared/Header';
import { StreakBanner } from './StreakBanner';
import { StatusMessage } from './StatusMessage';
import { MedicineCard } from './MedicineCard';
import { EmergencyButton } from './EmergencyButton';
import { useVoice } from '../../hooks/useVoice';

export const PatientDashboard = () => {
  const { profile } = useAuth();
  const { medicines, loading, markAsTaken, pendingCount, missedCount, allTaken } = useMedicines(profile?.id);
  const { speak, speaking } = useVoice(profile?.language || 'hi');

  const handleVoice = () => {
    if (speaking) return;
    if (medicines.length === 0) {
      speak("No medicines scheduled for today.");
      return;
    }
    if (allTaken) {
      speak("All your medicines are taken today. Very good!");
    } else if (pendingCount > 0) {
      const pendingNames = medicines.filter(m => m.status === 'pending').map(m => m.medicines.name).join(', ');
      speak(`You have ${pendingCount} medicines left. ${pendingNames}.`);
    } else {
      speak(`You have missed ${missedCount} medicines today.`);
    }
  };

  if (loading) return null;

  return (
    <div className="pb-24 max-w-md mx-auto bg-background min-h-screen relative">
      <Header 
        title={`Namaste, ${profile?.full_name?.split(' ')[0] || 'Ji'}`}
        subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        rightElement={
          <button 
            onClick={handleVoice}
            className={`p-2 rounded-xl transition-colors ${speaking ? 'bg-yellow-400 text-yellow-900 animate-pulse' : 'bg-green-800 text-white hover:bg-green-900'}`}
            aria-label="Speak medicines"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 10v4a2 2 0 002 2h2l4 4V4L9 8H7a2 2 0 00-2 2z" />
            </svg>
          </button>
        }
      />
      
      <div className="px-4 space-y-6">
        <StreakBanner patientId={profile?.id} />
        <StatusMessage pending={pendingCount} missed={missedCount} allTaken={allTaken} total={medicines.length} />
        
        <div className="space-y-4">
          {medicines.length === 0 ? (
            <div className="bg-white p-6 rounded-3xl text-center shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No medicines scheduled for today.</p>
            </div>
          ) : (
            medicines.map((log) => (
              <MedicineCard key={log.id} log={log} onTake={() => markAsTaken(log.id)} />
            ))
          )}
        </div>
      </div>
      
      <EmergencyButton patientId={profile?.id} />
    </div>
  );
};
