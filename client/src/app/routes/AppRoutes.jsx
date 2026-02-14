import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import AccessDenied from "../shared/AccessDenied";
import UserList from "../features/admin/UserList";
import PolicyList from "../features/policy/PolicyList";
import CreatePolicyWizard from "../features/policy/CreatePolicyWizard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<UserList />} />
      <Route path="/policy" element={<PolicyList />} />
      <Route
        path="/policy/create"
        element={<CreatePolicyWizard mode="create" />}
      />
      <Route
        path="/policy/edit/:policyId"
        element={<CreatePolicyWizard mode="edit" />}
      />
      <Route path="/error" element={<AccessDenied />} />
    </Routes>
  );
}
