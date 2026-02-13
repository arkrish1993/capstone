/**
 * TO DO:
 * 1. Validations for save
 * 2. Error styling and alerts
 */
import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import FormField from "../../shared/FormField";

const ROLE_OPTIONS = [
  "ADMIN",
  "UNDERWRITER",
  "CLAIMS_ADJUSTER",
  "REINSURANCE_ANALYST",
];

const PERMISSION_OPTIONS = ["CREATE", "EDIT", "DELETE"];

export default function UserForm({ onClose, showModal, userData = null }) {
  const isEdit = !!userData;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    status: true,
    permissions: [],
  });

  useEffect(() => {
    if (userData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        username: userData.username || "",
        email: userData.email || "",
        password: "",
        role: userData.role || "",
        status: userData.status === "ACTIVE",
        permissions: userData.permissions || [],
      });
    } else {
      setForm({
        username: "",
        email: "",
        password: "",
        role: "",
        status: true,
        permissions: [],
      });
    }
  }, [userData, showModal]);

  if (!showModal) return null;

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (value) => {
    setForm((prev) => {
      const exists = prev.permissions.includes(value);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== value)
          : [...prev.permissions, value],
      };
    });
  };

  const onSubmitHandler = async () => {
    const payload = {
      username: form.username,
      email: form.email,
      role: form.role,
      status: form.status ? "ACTIVE" : "INACTIVE",
      permissions: form.permissions,
    };

    if (form.password.trim()) {
      payload.password = form.password;
    }

    try {
      if (isEdit) {
        await api.put("/users/" + userData._id, payload);
      } else {
        await api.post("/users/create", payload);
      }
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-light bg-dark bg-gradient p-4">
              <h5 className="modal-title">
                {isEdit ? "Update User" : "Create User"}
              </h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body px-5">
              <FormField
                label="Username"
                name="username"
                value={form.username}
                onChange={onChangeHandler}
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChangeHandler}
              />

              <FormField
                label={`Password ${isEdit ? "(Leave blank to keep unchanged)" : ""}`}
                type="password"
                name="password"
                value={form.password}
                onChange={onChangeHandler}
              />

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Role</option>
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label d-block">Status</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={form.status}
                    onChange={() => setForm({ ...form, status: !form.status })}
                  />
                  <label className="form-check-label">
                    {form.status ? "ACTIVE" : "INACTIVE"}
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Permissions</label>
                {PERMISSION_OPTIONS.map((p) => (
                  <div key={p} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={form.permissions.includes(p)}
                      onChange={() => togglePermission(p)}
                    />
                    <label className="form-check-label">{p}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer text-light bg-dark bg-gradient px-4">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={onSubmitHandler}>
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
