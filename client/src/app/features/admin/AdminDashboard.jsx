import AppShell from "../../layouts/AppShell";
import UserList from "./UserList";

export default function AdminDashboard() {
  return (
    <AppShell hideSideBar="true">
      <UserList />
    </AppShell>
  );
}
