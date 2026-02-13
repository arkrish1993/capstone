import { useNavigate } from "react-router-dom";

export default function AccessDenied({
  title = "Access Denied",
  message = "You do not have permission to view this page.",
}) {
  const navigate = useNavigate();
  return (
    <div className="container-fluid bg-dark bg-gradient vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card border-danger shadow p-5 text-center"
        style={{ maxWidth: 500 }}
      >
        <h4 className="text-danger mb-3">{title}</h4>
        <p className="text-muted">{message}</p>
        <button
          className="btn btn-success py-3 mt-3"
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
