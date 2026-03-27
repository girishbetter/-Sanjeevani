import React, { useState } from 'react';
import { useAlerts } from '../../hooks/useAlerts';
import { Toast } from '../shared/Toast';

export const EmergencyButton = ({ patientId }) => {
  const { sendAlert, alertLoading } = useAlerts();
  const [toastMessage, setToastMessage] = useState('');

  const handleEmergency = async () => {
    if (window.confirm('Are you sure you want to send an emergency alert?')) {
      await sendAlert('emergency', patientId);
      setToastMessage('Alert sent to your caretaker.');
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center pointer-events-none">
        <button 
          onClick={handleEmergency}
          disabled={alertLoading}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg pointer-events-auto flex items-center gap-2 transition-transform active:scale-95 border-4 border-red-200"
          aria-label="Send Emergency Alert"
        >
          {alertLoading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          <span className="text-xl">EMERGENCY</span>
        </button>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </>
  );
};
