import React, { useState } from 'react';
import { useMedicines } from '../../hooks/useMedicines';
import { useStreak } from '../../hooks/useStreak';
import { MedicineCard } from '../patient/MedicineCard';
import { AddMedicineForm } from './AddMedicineForm';
import { AlertHistory } from './AlertHistory';

export const PatientStatusView = ({ patientId }) => {
  const { medicines, loading, pendingCount, missedCount, allTaken } = useMedicines(patientId);
  const { streak } = useStreak(patientId);
  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) return (
    <div className="flex justify-center p-8">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Patient Stats Summary */}
      <div className="bg-white rounded-3xl p-5 shadow-sm flex justify-between items-center border border-gray-100">
        <div className="text-center flex-1 border-r border-gray-100">
          <p className="text-sm font-bold text-gray-500 mb-1">Status</p>
          <p className={`text-xl font-black ${allTaken && medicines.length > 0 ? 'text-green-500' : missedCount > 0 ? 'text-red-500' : 'text-yellow-500'}`}>
            {allTaken && medicines.length > 0 ? 'All Taken' : missedCount > 0 ? `${missedCount} Missed` : `${pendingCount} Pending`}
          </p>
        </div>
        <div className="text-center flex-1">
          <p className="text-sm font-bold text-gray-500 mb-1">Streak</p>
          <p className="text-xl font-black text-orange-500">{streak} Days</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Today's Medicines</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-green-800 text-white p-2 rounded-xl transition-colors shadow-sm"
          aria-label={showAddForm ? "Cancel Add" : "Add medicine"}
        >
          {showAddForm ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Add New Medicine</h3>
          <AddMedicineForm patientId={patientId} onComplete={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {medicines.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-4">No medicines scheduled today.</p>
        ) : (
          medicines.map((log) => (
            <MedicineCard key={log.id} log={log} isReadOnly={true} />
          ))
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Alert History</h2>
        <AlertHistory patientId={patientId} />
      </div>
    </div>
  );
};
