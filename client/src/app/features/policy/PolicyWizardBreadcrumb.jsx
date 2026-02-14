const steps = ["General", "Coverage", "Review"];

const PolicyWizardBreadcrumb = ({ currentStep }) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step}
              className="flex-fill text-center position-relative text-white"
            >
              <div
                className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center 
                  ${isActive ? "bg-success" : ""}
                  ${isCompleted ? "border border-success text-success" : ""}
                  ${!isActive && !isCompleted ? "border" : ""}
                `}
                style={{ width: 40, height: 40 }}
              >
                {index + 1}
              </div>
              <div
                className={`small fw-semibold
                  ${isActive || isCompleted ? "text-success" : ""}
                `}
              >
                {step}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`position-absolute top-50 start-100 translate-middle-y w-100`}
                  style={{ height: 2, zIndex: -1 }}
                >
                  <div
                    className={`h-100 ${
                      isCompleted ? "bg-success" : "bg-light"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyWizardBreadcrumb;
