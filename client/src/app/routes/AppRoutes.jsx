import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import AdminDashboard from "../features/admin/AdminDashboard";
import AccessDenied from "../shared/AccessDenied";
import PolicyDashboard from "../features/policy/PolicyDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/policy" element={<PolicyDashboard />} />
      <Route path="/error" element={<AccessDenied />} />
    </Routes>
  );
}
