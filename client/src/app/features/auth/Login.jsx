import api from "../../../services/apiClient";
import { useState } from "react";
import logo from "../../../assets/capstone.svg";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../../shared/ErrorAlert";
import Loader from "../../shared/Loader";

export default function Login() {
  const [form, setForm] = useState({});
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoginCredentials } = useAuth();

  const submit = async (e) => {
    try {
      e.preventDefault();
      setAuthError(null);
      setIsLoading(true);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setLoginCredentials(res.data);
      window.location.href = "/home";
      setIsLoading(false);
    } catch (err) {
      setAuthError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {authError && (
        <ErrorAlert
          alertMessage="Access denied. Please check your credentials."
          onDismiss={() => setAuthError(null)}
        />
      )}
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg border-0"
          style={{ maxWidth: 900, width: "100%" }}
        >
          <div className="row g-0">
            <div className="col-md-5 bg-dark bg-gradient text-white d-flex flex-column align-items-center justify-content-center p-4">
              <img src={logo} alt="Logo" width={90} className="mb-3" />
              <h4
                className="fw-bold text-uppercase text-center"
                style={{ letterSpacing: "9px" }}
              >
                CAPSTONE
              </h4>
              <p className="text-center mt-2" style={{ fontSize: 14 }}>
                Insurance Policy & Claims Management System
              </p>
            </div>

            <div className="col-md-7 p-5">
              <h4 className="mb-4 fw-semibold">Login</h4>

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-3"
                  disabled={!form.email || !form.password || isLoading}
                >
                  {isLoading ? <Loader /> : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
