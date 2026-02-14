import {
  POLICY_INSURED_TYPE_OPTIONS,
  POLICY_LOB_OPTIONS,
} from "../../common/constants";
import FormField from "../../shared/FormField";

const PolicyStepGeneral = ({ data, onNext, onChange, onCancel }) => {
  return (
    <>
      <h4>General Details</h4>
      <FormField
        label="Insured name"
        name="insuredName"
        value={data.insuredName || ""}
        placeholder="Enter name"
        onChange={(e) => onChange({ insuredName: e.target.value })}
      />
      <div className="mb-3">
        <label className="form-label">Insured type</label>
        <select
          className="form-select mb-2"
          value={data.insuredType || ""}
          onChange={(e) => onChange({ insuredType: e.target.value })}
        >
          <option value="">Select Type</option>
          {POLICY_INSURED_TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Line of business</label>
        <select
          className="form-select mb-3"
          value={data.lineOfBusiness || ""}
          onChange={(e) => onChange({ lineOfBusiness: e.target.value })}
        >
          <option value="">Line of Business</option>
          {POLICY_LOB_OPTIONS.map((lob) => (
            <option key={lob} value={lob}>
              {lob}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end pt-2">
        <button className="btn btn-outline-secondary me-3" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={onNext}
          disabled={
            !data.insuredName || !data.insuredType || !data.lineOfBusiness
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PolicyStepGeneral;
