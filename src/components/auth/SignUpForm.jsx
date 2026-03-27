import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const SignUpForm = ({ onSuccess }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'patient',
    language: 'hi'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.name,
        phone: formData.phone,
        role: formData.role,
        language: formData.language
      });
      // Optionally show success message
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl border border-red-200">{error}</div>}
      
      <div>
        <label className="block text-gray-700 text-lg mb-1">Type of User</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-lg">
            <input type="radio" name="role" value="patient" checked={formData.role === 'patient'} onChange={handleChange} className="w-5 h-5 text-primary focus:ring-primary" /> Patient
          </label>
          <label className="flex items-center gap-2 text-lg">
            <input type="radio" name="role" value="caretaker" checked={formData.role === 'caretaker'} onChange={handleChange} className="w-5 h-5 text-primary focus:ring-primary" /> Caretaker
          </label>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-lg mb-1">Full Name</label>
        <input type="text" name="name" required className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg" value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-gray-700 text-lg mb-1">Phone Number</label>
        <input type="tel" name="phone" required className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg" value={formData.phone} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-gray-700 text-lg mb-1">Email</label>
        <input type="email" name="email" required className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg" value={formData.email} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-gray-700 text-lg mb-1">Password</label>
        <input type="password" name="password" required className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg" value={formData.password} onChange={handleChange} />
      </div>
      
      <div>
        <label className="block text-gray-700 text-lg mb-1">Preferred Language</label>
        <select name="language" className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg bg-white" value={formData.language} onChange={handleChange}>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="en">English</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="mr">मराठी (Marathi)</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-green-800 text-white font-bold py-4 rounded-2xl text-xl mt-6 transition-colors shadow-md min-h-[52px]">
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};
