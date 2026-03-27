import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { AppShell } from "./components/layout/AppShell";
import Alerts from "./pages/Alerts";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import Settings from "./pages/Settings";
import Start from "./pages/Start";
import { useUserStore } from "./stores/userStore";

function RequireRole() {
  const role = useUserStore((s) => s.role);

  return role ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireRole />}>
        <Route element={<AppShell />}>
          <Route path="patient" element={<Home />} />
          <Route path="home" element={<Navigate to="/patient" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="caretaker" element={<Alerts />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
