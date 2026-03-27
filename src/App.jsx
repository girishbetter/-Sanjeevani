import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthScreen } from './components/auth/AuthScreen';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { CaretakerDashboard } from './components/caretaker/CaretakerDashboard';
import { LoadingScreen } from './components/shared/LoadingScreen';

function App() {
  const { session, role, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!session || !role) {
    return <AuthScreen />;
  }

  if (role === 'admin') {
    return <div className="p-8 text-center text-xl">Admin Dashboard (Coming soon)</div>;
  }

  return role === 'patient' ? <PatientDashboard /> : <CaretakerDashboard />;
}

export default App;
