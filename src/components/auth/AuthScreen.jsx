import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center bg-white p-6 rounded-3xl shadow-md border-t-8 border-primary">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sanjeevani</h1>
          <p className="text-gray-600 mb-8">Aapki Sehat, Hamari Zimmedaari</p>
          
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              className={`flex-1 py-3 text-lg font-medium rounded-md transition-colors ${isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-lg font-medium rounded-md transition-colors ${!isLogin ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignUpForm onSuccess={() => setIsLogin(true)} />}
        </div>
      </div>
    </div>
  );
};
