import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import FormField from "../../shared/FormField";
import Alert from "../../shared/Alert";
import { TREATY_TYPE_OPTIONS, LOB_OPTIONS } from "../../common/constants";
import { toYYYYMMDD } from "../../common/utils";

export default function TreatyForm({ onClose, showModal, treatyData = null }) {
  const today = new Date().toISOString().split("T")[0];
  const isEdit = !!treatyData;
  const [alertMessage, setAlertMessage] = useState("");

  const [form, setForm] = useState({
    treatyName: "",
    treatyType: "",
    sharePercentage: "",
    retentionLimit: "",
    treatyLimit: "",
    applicableLOBs: [],
    effectiveFrom: "",
    effectiveTo: "",
  });

  useEffect(() => {
    if (treatyData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        treatyName: treatyData.treatyName || "",
        treatyType: treatyData.treatyType || "",
        reinsurerId: treatyData.reinsurerId?.code || "",
        sharePercentage: treatyData.sharePercentage || "",
        retentionLimit: treatyData.retentionLimit || "",
        treatyLimit: treatyData.treatyLimit || "",
        applicableLOBs: treatyData.applicableLOBs || [],
        effectiveFrom: toYYYYMMDD(treatyData.effectiveFrom),
        effectiveTo: toYYYYMMDD(treatyData.effectiveTo),
      });
    } else {
      setForm({
        treatyName: "",
        treatyType: "",
        reinsurerId: "",
        sharePercentage: "",
        retentionLimit: "",
        treatyLimit: "",
        applicableLOBs: [],
        effectiveFrom: "",
        effectiveTo: "",
      });
    }
  }, [treatyData, showModal]);

  if (!showModal) return null;

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLobChange = (lob) => {
    const updated = form.applicableLOBs.includes(lob)
      ? form.applicableLOBs.filter((l) => l !== lob)
      : [...form.applicableLOBs, lob];
    setForm({ ...form, applicableLOBs: updated });
  };

  const isActionDisabled = () => {
    return (
      !form.treatyName ||
      !form.treatyType ||
      !form.reinsurerId ||
      !form.sharePercentage ||
      !form.retentionLimit ||
      !form.treatyLimit ||
      !form.applicableLOBs ||
      !form.effectiveFrom ||
      !form.effectiveTo
    );
  };

  const onSubmitHandler = async () => {
    setAlertMessage("");

    const payload = { ...form, reinsurerId: form.reinsurerId.toUpperCase() };
    try {
      if (isEdit) {
        await api.put(`/treaties/${treatyData._id}`, payload);
      } else {
        await api.post("/treaties/create", payload);
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
            <div className="modal-header bg-dark text-white p-4">
              <h5 className="modal-title">
                {isEdit ? "Update Treaty" : "Create Treaty"}
              </h5>
            </div>

            <div className="modal-body px-5">
              <FormField
                label="Treaty Name"
                name="treatyName"
                value={form.treatyName}
                placeholder="Enter treaty name"
                onChange={onChangeHandler}
              />

              <div className="mb-3">
                <label className="form-label">Treaty Type</label>
                <select
                  className="form-select"
                  name="treatyType"
                  value={form.treatyType}
                  onChange={onChangeHandler}
                >
                  <option value="">Select Type</option>
                  {TREATY_TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Reinsurer ID"
                name="reinsurerId"
                value={form.reinsurerId}
                placeholder="Enter reinsurer ID"
                onChange={onChangeHandler}
              />

              <FormField
                label="Share %"
                type="number"
                name="sharePercentage"
                value={form.sharePercentage}
                placeholder="Enter share %"
                min={0}
                max={100}
                onChange={onChangeHandler}
              />

              <FormField
                label="Retention Limit"
                type="number"
                name="retentionLimit"
                value={form.retentionLimit}
                min={0}
                placeholder="Enter retention limit"
                onChange={onChangeHandler}
              />

              <FormField
                label="Treaty Limit"
                type="number"
                name="treatyLimit"
                value={form.treatyLimit}
                min={0}
                placeholder="Enter treaty limit"
                onChange={onChangeHandler}
              />

              <div className="mb-3">
                <label className="form-label d-block">Applicable LOBs</label>
                {LOB_OPTIONS.map((lob) => (
                  <div className="form-check form-check-inline" key={lob}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={form.applicableLOBs.includes(lob)}
                      onChange={() => onLobChange(lob)}
                    />
                    <label className="form-check-label">{lob}</label>
                  </div>
                ))}
              </div>
              <FormField
                type="date"
                label="Effective From"
                name="effectiveFrom"
                value={form.effectiveFrom || ""}
                min={today}
                onChange={onChangeHandler}
              />
              <FormField
                type="date"
                label="Effective To"
                name="effectiveTo"
                value={form.effectiveTo || ""}
                min={form.effectiveFrom || today}
                onChange={onChangeHandler}
              />
            </div>

            <div className="d-flex justify-content-end p-4 pt-2">
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
