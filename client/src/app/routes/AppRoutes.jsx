import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import AppShell from "../../app/layouts/AppShell";
import ErrorBoundary from "../shared/ErrorBoundary";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={<AppShell>{/* Replace with proper components */}</AppShell>}
      />
    </Routes>
  );
}
