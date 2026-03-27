import React, { useState, useEffect } from 'react';
import { PillIcon } from '../shared/PillIcon';
import { formatTime, getMinutesRemaining } from '../../utils/timeUtils';

export const MedicineCard = ({ log, onTake, isReadOnly = false }) => {
  const { medicines: med, status, scheduled_time } = log;
  const [minsLeft, setMinsLeft] = useState(getMinutesRemaining(scheduled_time));

  useEffect(() => {
    if (status !== 'pending') return;
    const timer = setInterval(() => {
      setMinsLeft(getMinutesRemaining(scheduled_time));
    }, 60000);
    return () => clearInterval(timer);
  }, [scheduled_time, status]);

  const statusConfig = {
    pending: { border: 'border-yellow-400', badge: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    taken: { border: 'border-green-500', badge: 'bg-green-100 text-green-800', label: 'Taken' },
    missed: { border: 'border-red-500', badge: 'bg-red-100 text-red-800', label: 'Missed' }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-sm border-2 ${currentStatus.border} transition-all relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-4">
          <PillIcon shape={med.pill_shape} color={med.pill_color} className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
            <p className="text-sm text-gray-500">{formatTime(scheduled_time)} {med.instructions && `• ${med.instructions}`}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${currentStatus.badge}`}>
          {currentStatus.label}
        </span>
      </div>

      {status === 'pending' && (
        <div className="mb-4">
          <p className={`text-sm font-medium ${minsLeft < 0 ? 'text-red-500' : 'text-yellow-600'}`}>
            {minsLeft < 0 ? `Late by ${Math.abs(minsLeft)} mins` : `Due in ${minsLeft} mins`}
          </p>
        </div>
      )}

      {status === 'pending' && !isReadOnly && (
        <button 
          onClick={onTake}
          className="w-full min-h-[52px] bg-primary hover:bg-green-800 text-white font-bold rounded-2xl text-lg flex items-center justify-center gap-2 transition-colors active:scale-95"
          aria-label={`Mark ${med.name} as taken`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          TAP WHEN TAKEN
        </button>
      )}
    </div>
  );
};
