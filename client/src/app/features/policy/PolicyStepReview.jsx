import { useNavigate } from "react-router-dom";
import api from "../../services/apiClient";
import { convertToCurrency, toDDMMMYYYY } from "../../common/utils";
import { useState } from "react";
import Alert from "../../shared/Alert";

const Row = ({ label, value }) => (
  <div className="row mb-2">
    <div className="col-5 text-muted fw-semibold">{label}</div>
    <div className="col-7">{value || "-"}</div>
  </div>
);

const PolicyStepReview = ({ data, onBack, onCancel, mode, policyId }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const onSave = async () => {
    try {
      if (mode === "edit") {
        await api.put(`/policies/${policyId}`, data);
      } else {
        await api.post("/policies/", data);
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <>
      {!!alertMessage && (
        <Alert
          alertMessage={alertMessage}
          onDismiss={() => setAlertMessage("")}
        />
      )}
      <h4>Review Policy</h4>
      <div className="card border-success shadow-sm p-3 my-3">
        <div className="card-body">
          <Row label="Line of Business" value={data.lineOfBusiness} />
          <Row label="Insured Type" value={data.insuredType} />
          <Row label="Insured Name" value={data.insuredName} />
          <Row label="Sum Insured" value={convertToCurrency(data.sumInsured)} />
          <Row label="Premium" value={convertToCurrency(data.premium)} />
          <Row
            label="Retention Limit"
            value={convertToCurrency(data.retentionLimit)}
          />
          <Row label="Effective From" value={toDDMMMYYYY(data.effectiveFrom)} />
          <Row label="Effective To" value={toDDMMMYYYY(data.effectiveTo)} />
        </div>
      </div>

      <div className="d-flex justify-content-end pt-2">
        <button className="btn btn-outline-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={onBack}>
          Back
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => {
            onSave();
            if (!alertMessage) {
              navigate("/policy");
            }
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default PolicyStepReview;
