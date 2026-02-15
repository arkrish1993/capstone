import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import AccessDenied from "../shared/AccessDenied";
import UserList from "../features/admin/UserList";
import PolicyList from "../features/policy/PolicyList";
import CreatePolicyWizard from "../features/policy/CreatePolicyWizard";
import ClaimsList from "../features/claims/ClaimsList";
import ReinsurerList from "../features/reinsurer/ReinsurerList";
import TreatyList from "../features/treaty/TreatyList";

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
      <Route path="/claim" element={<ClaimsList />} />
      <Route path="/reinsurer" element={<ReinsurerList />} />
      <Route path="/treaty" element={<TreatyList />} />
      <Route path="/error" element={<AccessDenied />} />
    </Routes>
  );
}
