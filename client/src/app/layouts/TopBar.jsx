import { useNavigate } from "react-router-dom";
import logo from "../../assets/capstone.svg";
import { useAuth } from "../context/AuthContext";

export default function TopBar() {
  const navigate = useNavigate();
  const { setLoginCredentials } = useAuth();

  const logout = () => {
    localStorage.clear();
    setLoginCredentials(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-dark bg-gradient shadow p-4 sticky-top">
      <span
        className="navbar-brand mb-0 h1 text-white"
        style={{ letterSpacing: "9px" }}
      >
        <img src={logo} className="me-3" alt="CAPSTONE Logo" width={48} />
        CAPSTONE
      </span>
      <button className="btn btn-sm btn-outline-light" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
