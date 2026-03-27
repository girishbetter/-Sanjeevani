import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl border border-red-200">{error}</div>}
      
      <div>
        <label className="block text-gray-700 text-lg mb-1">Email</label>
        <input 
          type="email" 
          required 
          className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-lg mb-1">Password</label>
        <input 
          type="password" 
          required 
          className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-primary hover:bg-green-800 text-white font-bold py-4 rounded-2xl text-xl mt-6 transition-colors shadow-md min-h-[52px]"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
