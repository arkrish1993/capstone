import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/capstone.svg";
import api from "../../services/apiClient";
import Alert from "../../shared/Alert";
import { useAuth } from "../../hooks/useAuth";

const getRerouteURL = (role) => {
  switch (role) {
    case "ADMIN":
    case "UNDERWRITER":
    case "CLAIMS_ADJUSTER":
    case "REINSURANCE_ANALYST":
      return "/dashboard";
    default:
      return "/error";
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoginCredentials } = useAuth();

  const submit = async (e) => {
    try {
      e.preventDefault();
      setAuthError(null);
      setIsLoading(true);

      const res = await api.post("/auth/login", form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setLoginCredentials(res.data);

      navigate(getRerouteURL(res.data.user?.role));
    } catch (error) {
      setAuthError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {authError && (
        <Alert
          alertMessage="Access denied. Please check your credentials."
          onDismiss={() => setAuthError(null)}
        />
      )}

      <div
        className="container-fluid vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #198754 0%, #0f5132 100%)",
        }}
      >
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ maxWidth: 920, width: "100%" }}
        >
          <div className="row g-0">
            <div className="col-md-5 bg-dark text-white d-flex flex-column align-items-center justify-content-center p-5 rounded-start-4">
              <img src={logo} alt="Logo" width={90} className="mb-3" />
              <h4
                className="fw-bold text-uppercase text-center mb-2"
                style={{ letterSpacing: "6px" }}
              >
                CAPSTONE
              </h4>
              <p className="text-center opacity-75" style={{ fontSize: 14 }}>
                Insurance Policy & Claims Management System
              </p>
            </div>

            <div className="col-md-7 p-5">
              <form onSubmit={submit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={!form.email || !form.password || isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
