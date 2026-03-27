import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useMedicines } from '../../hooks/useMedicines';

export const AddMedicineForm = ({ patientId, onComplete }) => {
  const { profile } = useAuth();
  const { refetch } = useMedicines(patientId);
  const [formData, setFormData] = useState({
    name: '',
    generic_name: '',
    pill_color: '#15803d',
    pill_shape: 'round',
    scheduled_time: '08:00',
    instructions: '',
    isDaily: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    // Default to daily (empty array or null in our schema logic)
    const days = formData.isDaily ? null : []; // Simplification for MVP

    try {
      const { data, error: insertErr } = await supabase
        .from('medicines')
        .insert({
          patient_id: patientId,
          name: formData.name,
          generic_name: formData.generic_name,
          pill_color: formData.pill_color,
          pill_shape: formData.pill_shape,
          scheduled_time: formData.scheduled_time,
          instructions: formData.instructions,
          days_of_week: days,
          added_by_profile_id: profile.id
        })
        .select('id')
        .single();

      if (insertErr) throw insertErr;

      // Force generation of today's dose if applicable
      await supabase.rpc('generate_todays_logs', { p_patient_id: patientId });
      
      refetch();
      if (onComplete) onComplete();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm mb-2">Failed to add medicine. Please try again.</div>}
      
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Medicine Name *</label>
        <input 
          type="text" required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
          placeholder="e.g. Metformin 500mg"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Shape</label>
          <select 
            value={formData.pill_shape}
            onChange={(e) => setFormData({...formData, pill_shape: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white"
          >
            <option value="round">Round</option>
            <option value="oval">Oval</option>
            <option value="capsule">Capsule</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={formData.pill_color}
              onChange={(e) => setFormData({...formData, pill_color: e.target.value})}
              className="w-10 h-10 rounded border-0 cursor-pointer p-0" 
            />
            <span className="text-sm text-gray-500 uppercase">{formData.pill_color}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Time *</label>
        <input 
          type="time" required
          value={formData.scheduled_time}
          onChange={(e) => setFormData({...formData, scheduled_time: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Instructions</label>
        <input 
          type="text" 
          value={formData.instructions}
          onChange={(e) => setFormData({...formData, instructions: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
          placeholder="e.g. After meals"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary hover:bg-green-800 text-white font-bold py-3 rounded-xl mt-4 min-h-[52px]"
      >
        {loading ? 'Adding...' : 'Save Medicine'}
      </button>
    </form>
  );
};
