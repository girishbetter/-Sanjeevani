import React from 'react';
import { useStreak } from '../../hooks/useStreak';

export const StreakBanner = ({ patientId }) => {
  const { streak, longestStreak } = useStreak(patientId);

  if (streak === 0 && longestStreak === 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-100" fill="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-lg">Daily Streak</h3>
          <p className="text-orange-100 text-sm">Longest: {longestStreak} days</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-3xl font-black drop-shadow-sm">{streak}</span>
        <span className="text-xl font-bold ml-1">days</span>
      </div>
    </div>
  );
};
