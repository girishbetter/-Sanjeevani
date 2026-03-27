import React from 'react';

export const PatientSelector = ({ patients, selectedId, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {patients.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`flex-shrink-0 px-5 py-3 rounded-2xl font-bold transition-colors whitespace-nowrap min-h-[52px] ${
            selectedId === p.id 
              ? 'bg-primary text-white shadow-md' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          {p.profile.full_name}
        </button>
      ))}
    </div>
  );
};
