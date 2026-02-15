import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/apiClient";
import PolicyStepGeneral from "./PolicyStepGeneral";
import PolicyStepCoverage from "./PolicyStepCoverage";
import PolicyStepReview from "./PolicyStepReview";
import AppShell from "../../layouts/AppShell";
import PolicyWizardBreadcrumb from "./PolicyWizardBreadcrumb";
import Loader from "../../shared/Loader";
import { toYYYYMMDD } from "../../common/utils";
import { UNDERWRITER_LINKS } from "../../common/constants";

const CreatePolicyWizard = ({ mode }) => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const onNext = () => setStep((s) => s + 1);
  const onBack = () => setStep((s) => s - 1);
  const onCancel = () => navigate("/policy");

  const updateData = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const fetchPolicyDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/policies/${policyId}`);
      setFormData({
        ...res.data,
        effectiveFrom: toYYYYMMDD(res.data.effectiveFrom),
        effectiveTo: toYYYYMMDD(res.data.effectiveTo),
      });
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  useEffect(() => {
    if (mode === "edit" && policyId) {
      fetchPolicyDetails();
    }
  }, [mode, policyId, fetchPolicyDetails]);

  if (loading) {
    return (
      <AppShell links={UNDERWRITER_LINKS}>
        <Loader loaderStyle="spinner-grow spinner-grow text-success mt-4 px-3" />
      </AppShell>
    );
  }

  return (
    <AppShell links={UNDERWRITER_LINKS}>
      <div className="card m-4 shadow">
        <div className="card-header pt-4 px-4 bg-dark bg-gradient">
          <h3 className="text-white">
            {mode === "edit" ? "Edit Policy" : "Create Policy"}
          </h3>
          <PolicyWizardBreadcrumb currentStep={step} />
        </div>
        <div className="p-4">
          {step === 0 && (
            <PolicyStepGeneral
              data={formData}
              onNext={onNext}
              onChange={updateData}
              onCancel={onCancel}
            />
          )}

          {step === 1 && (
            <PolicyStepCoverage
              data={formData}
              onNext={onNext}
              onBack={onBack}
              onChange={updateData}
              onCancel={onCancel}
            />
          )}

          {step === 2 && (
            <PolicyStepReview
              data={formData}
              onBack={onBack}
              mode={mode}
              policyId={policyId}
              onCancel={onCancel}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default CreatePolicyWizard;
