import AppShell from "../../layouts/AppShell";
import PolicyList from "./PolicyList";

export default function PolicyDashboard() {
  return (
    <AppShell hideSideBar="true">
      <PolicyList />
    </AppShell>
  );
}
