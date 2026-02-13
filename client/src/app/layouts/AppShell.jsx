import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ hideSideBar = false, children }) {
  return (
    <>
      <TopBar />
      <div className="d-flex">
        {!hideSideBar && <Sidebar />}
        <div className="flex-grow-1">
          <div className="container-fluid mt-3">{children}</div>
        </div>
      </div>
    </>
  );
}
