import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCaretakerPatients } from '../../hooks/useCaretakerPatients';
import { Header } from '../shared/Header';

export const LinkPatientScreen = () => {
  const { profile } = useAuth();
  const { linkPatient } = useCaretakerPatients();
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('other');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await linkPatient(phone, relationship);
    } catch (err) {
      setError(err.message || 'Failed to link patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-8 max-w-md mx-auto bg-background min-h-screen">
      <Header 
        title={profile?.full_name?.split(' ')[0] || 'Caretaker'}
        subtitle="No patients linked yet"
      />
      
      <div className="px-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mt-6">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 text-blue-500 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Link a Patient</h2>
          <p className="text-center text-gray-500 mb-6 font-medium">Enter your patient's registered phone number to start managing their medicines.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl border border-red-200">{error}</div>}
            
            <div>
              <label className="block text-gray-700 text-lg mb-1">Patient Phone Number</label>
              <input 
                type="tel" required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg" 
                placeholder="e.g. 9876543210"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg mb-1">Relationship</label>
              <select 
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg bg-white"
              >
                <option value="son">Son</option>
                <option value="daughter">Daughter</option>
                <option value="spouse">Spouse</option>
                <option value="sibling">Sibling</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-green-800 text-white font-bold py-4 rounded-2xl text-xl mt-4 min-h-[52px]"
            >
              {loading ? 'Linking...' : 'Link Patient'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
