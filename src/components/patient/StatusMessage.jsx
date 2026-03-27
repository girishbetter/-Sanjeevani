import React from 'react';

export const StatusMessage = ({ pending, missed, allTaken, total }) => {
  if (total === 0) return null;

  if (allTaken) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-4 flex items-center gap-3">
        <div className="bg-green-500 text-white rounded-full p-1 border-4 border-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-green-800">All taken today! Very good.</h2>
      </div>
    );
  }

  if (missed > 0 && pending === 0) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-4 flex items-center gap-3">
        <div className="bg-red-500 text-white rounded-full p-1 border-4 border-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-red-800">You missed {missed} {missed === 1 ? 'dose' : 'doses'}.</h2>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 flex items-center gap-3">
      <div className="bg-blue-500 text-white rounded-full p-1 border-4 border-white shadow-sm">
        <span className="h-6 w-6 flex items-center justify-center font-bold">{pending}</span>
      </div>
      <h2 className="text-xl font-bold text-blue-800">{pending} {pending === 1 ? 'dose' : 'doses'} remaining today.</h2>
    </div>
  );
};
