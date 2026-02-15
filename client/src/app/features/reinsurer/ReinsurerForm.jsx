import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import FormField from "../../shared/FormField";
import Alert from "../../shared/Alert";
import { REINSURER_RATING_OPTIONS } from "../../common/constants";

export default function ReinsurerForm({
  onClose,
  showModal,
  reinsurerData = null,
}) {
  const isEdit = !!reinsurerData;
  const [alertMessage, setAlertMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    country: "",
    rating: "",
    contactEmail: "",
    status: true,
  });

  useEffect(() => {
    if (reinsurerData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: reinsurerData.name || "",
        country: reinsurerData.country || "",
        rating: reinsurerData.rating || "",
        contactEmail: reinsurerData.contactEmail || "",
        status: reinsurerData.status === "ACTIVE",
      });
    } else {
      setForm({
        name: "",
        country: "",
        rating: "",
        contactEmail: "",
        status: true,
      });
    }
  }, [reinsurerData, showModal]);

  if (!showModal) return null;

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isActionDisabled = () => {
    return !form.name || !form.country || !form.rating || !form.contactEmail;
  };

  const onSubmitHandler = async () => {
    setAlertMessage("");
    const payload = {
      name: form.name,
      country: form.country,
      rating: form.rating,
      contactEmail: form.contactEmail,
      status: form.status ? "ACTIVE" : "INACTIVE",
    };

    try {
      if (isEdit) {
        await api.put(`/reinsurers/${reinsurerData._id}`, payload);
      } else {
        await api.post("/reinsurers/create", payload);
      }
    } catch (error) {
      setAlertMessage(error.message);
      return;
    }

    onClose(true);
  };

  return (
    <>
      {!!alertMessage && (
        <Alert
          alertMessage={alertMessage}
          onDismiss={() => setAlertMessage("")}
        />
      )}

      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-light bg-dark bg-gradient p-4">
              <h5 className="modal-title">
                {isEdit ? "Update Reinsurer" : "Create Reinsurer"}
              </h5>
            </div>

            <div className="modal-body px-5">
              <FormField
                label="Name"
                name="name"
                value={form.name}
                placeholder="Enter name"
                onChange={onChangeHandler}
              />

              <FormField
                label="Country"
                name="country"
                value={form.country}
                placeholder="Enter country"
                onChange={onChangeHandler}
              />

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  name="rating"
                  value={form.rating}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Rating</option>
                  {REINSURER_RATING_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Contact Email"
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                placeholder="Enter email"
                onChange={onChangeHandler}
              />

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
            </div>

            <div className="d-flex justify-content-end text-light p-4 pt-2">
              <button
                className="btn btn-outline-secondary me-3"
                onClick={() => onClose(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={onSubmitHandler}
                disabled={isActionDisabled()}
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
