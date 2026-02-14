import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import FormField from "../../shared/FormField";
import Alert from "../../shared/Alert";
import { toYYYYMMDD } from "../../common/utils";

export default function ClaimsForm({
  mode,
  onClose,
  showModal,
  claimData = null,
}) {
  const isEdit = !!claimData;
  const today = new Date().toISOString().split("T")[0];
  const [alertMessage, setAlertMessage] = useState("");

  const [form, setForm] = useState({
    policyId: "",
    claimAmount: 0,
    approvedAmount: 0,
    incidentDate: null,
  });

  useEffect(() => {
    if (claimData) {
      //eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        policyId: claimData.policyId?.policyNumber,
        claimAmount: claimData.claimAmount,
        incidentDate: toYYYYMMDD(claimData.incidentDate),
      });
    } else {
      setForm({
        policyId: "",
        claimAmount: 0,
        incidentDate: null,
      });
    }
  }, [claimData, showModal]);

  if (!showModal) return null;

  const isActionDisabled = () => {
    if (!isEdit) {
      return !form.policyId || !form.claimAmount || !form.incidentDate;
    } else {
      if (mode === "edit") {
        return !form.policyId || !form.claimAmount || !form.incidentDate;
      } else {
        return !form.approvedAmount;
      }
    }
  };

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async () => {
    const payload = {
      policyId: form.policyId,
      claimAmount: form.claimAmount,
      incidentDate: form.incidentDate,
    };

    if (form.approvedAmount) {
      payload.approvedAmount = form.approvedAmount;
    }

    try {
      if (isEdit) {
        await api.put(`/claims/${claimData._id}`, {
          ...payload,
          status: mode === "approve" ? "APPROVED" : "IN_REVIEW",
        });
      } else {
        await api.post("/claims/", payload);
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
    onClose();
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
                {isEdit ? "Update Claim" : "Create Claim"}
              </h5>
            </div>

            <div className="modal-body px-5">
              <FormField
                label="Policy ID"
                name="policyId"
                value={form.policyId}
                readOnly={mode === "approve"}
                placeholder="Enter policy ID"
                onChange={onChangeHandler}
              />
              <FormField
                type="number"
                label="Claim amount"
                name="claimAmount"
                value={form.claimAmount}
                min={0}
                readOnly={mode === "approve"}
                placeholder="Enter claim amount"
                onChange={onChangeHandler}
              />
              {mode === "approve" && (
                <FormField
                  type="number"
                  label="Approved amount"
                  name="approvedAmount"
                  value={form.approvedAmount}
                  min={0}
                  placeholder="Enter approved amount"
                  onChange={onChangeHandler}
                />
              )}
              <FormField
                type="date"
                label="Incident date"
                name="incidentDate"
                readOnly={mode === "approve"}
                max={today}
                value={form.incidentDate || ""}
                onChange={onChangeHandler}
              />
            </div>

            <div className="d-flex justify-content-end text-light p-4 pt-2">
              <button
                className="btn btn-outline-secondary me-3"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={onSubmitHandler}
                disabled={isActionDisabled()}
              >
                {isEdit
                  ? mode === "approve"
                    ? "Approve"
                    : "Re-submit"
                  : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
