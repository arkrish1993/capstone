import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./TopBar.css";
import logo from "../../../assets/capstone.svg";

export default function TopBar({ links }) {
  const navigate = useNavigate();
  const { setLoginCredentials } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    setLoginCredentials(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark bg-gradient shadow px-4 py-3 sticky-top">
      <div className="container-fluid d-flex align-items-center">
        <span
          className="navbar-brand mb-0 h1 text-white"
          style={{ letterSpacing: 9 }}
        >
          <img src={logo} className="me-2" alt="CAPSTONE Logo" width={40} />
          CAPSTONE
        </span>

        <button
          className="menu-toggle ms-auto"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>

        <div className={`animated-collapse ${isMenuOpen ? "open" : "closed"}`}>
          <ul className="navbar-nav mb-2 mt-2 flex-lg-row align-items-lg-center">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  to={link.url}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link nav-success-link ${isActive ? "active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className="btn btn-sm btn-outline-light mb-2 mb-lg-0 ms-lg-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
