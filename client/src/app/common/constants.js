export const BadgeColorMap = {
  INACTIVE: "secondary",
  ACTIVE: "success",
  DRAFT: "secondary",
  APPROVED: "success",
  REJECTED: "danger",
  EXPIRED: "secondary",
  SUBMITTED: "secondary",
  IN_REVIEW: "primary",
  SETTLED: "secondary",
};

export const USER_TABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

export const USER_ROLE_OPTIONS = [
  "ADMIN",
  "UNDERWRITER",
  "CLAIMS_ADJUSTER",
  "REINSURANCE_ANALYST",
];

export const USER_PERMISSION_OPTIONS = {
  ADMIN: ["CREATE", "UPDATE", "DELETE"],
  UNDERWRITER: ["CREATE", "UPDATE", "APPROVE"],
  CLAIMS_ADJUSTER: ["CREATE", "UPDATE", "APPROVE"],
  REINSURANCE_ANALYST: ["CREATE", "UPDATE", "APPROVE"],
};

export const POLICY_TABLE_COLUMNS = [
  { key: "policyNumber", label: "Policy Number" },
  { key: "insuredName", label: "Insured Name" },
  { key: "insuredType", label: "Insured Type" },
  { key: "lineOfBusiness", label: "Line of Business" },
  { key: "sumInsured", label: "Sum Insured" },
  { key: "premium", label: "Premium" },
  { key: "retentionLimit", label: "Retention Limit" },
  { key: "status", label: "Status" },
  { key: "effectiveFrom", label: "Effective from" },
  { key: "effectiveTo", label: "Effective to" },
  { key: "createdBy", label: "Created By" },
  { key: "approvedBy", label: "Approved By" },
  { key: "actions", label: "Actions" },
];

export const POLICY_INSURED_TYPE_OPTIONS = ["INDIVIDUAL", "CORPORATE"];

export const POLICY_LOB_OPTIONS = ["HEALTH", "MOTOR", "LIFE", "PROPERTY"];

export const CLAIM_TABLE_COLUMNS = [
  { key: "claimNumber", label: "Claim Number" },
  { key: "policyId", label: "Policy ID" },
  { key: "claimAmount", label: "Claim Amount" },
  { key: "approvedAmount", label: "Approved Amount" },
  { key: "status", label: "Status" },
  { key: "incidentDate", label: "Incident Date" },
  { key: "reportedDate", label: "Reported Date" },
  { key: "handledBy", label: "Handled By" },
  { key: "actions", label: "Actions" },
];
