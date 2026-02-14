import FormField from "../../shared/FormField";

const PolicyStepCoverage = ({ data, onNext, onBack, onChange, onCancel }) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <h4>Coverage Details</h4>
      <FormField
        type="number"
        label="Sum insured"
        name="insuredName"
        value={data.sumInsured}
        min={0}
        placeholder="Enter sum insured"
        onChange={(e) => onChange({ sumInsured: Number(e.target.value) })}
      />
      <FormField
        type="number"
        label="Premium"
        name="premium"
        value={data.premium}
        min={0}
        placeholder="Enter premium"
        onChange={(e) => onChange({ premium: Number(e.target.value) })}
      />
      <FormField
        type="number"
        label="Retention Limit"
        name="retentionLimit"
        value={data.retentionLimit}
        min={0}
        placeholder="Enter retention limit"
        onChange={(e) => onChange({ retentionLimit: Number(e.target.value) })}
      />
      <FormField
        type="date"
        label="Effective From"
        name="effectiveFrom"
        value={data.effectiveFrom || ""}
        min={today}
        onChange={(e) => {
          onChange({ effectiveFrom: e.target.value, effectiveTo: "" });
        }}
      />
      <FormField
        type="date"
        label="Effective To"
        name="effectiveTo"
        value={data.effectiveTo || ""}
        min={data.effectiveFrom || today}
        onChange={(e) => onChange({ effectiveTo: e.target.value })}
      />
      <div className="d-flex justify-content-end pt-2">
        <button className="btn btn-outline-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={onBack}>
          Back
        </button>
        <button
          className="btn btn-success"
          onClick={onNext}
          disabled={
            !data.sumInsured ||
            !data.premium ||
            !data.retentionLimit ||
            !data.effectiveFrom ||
            !data.effectiveTo
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PolicyStepCoverage;
