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

export const USER_PERMISSION_OPTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "APPROVE",
];

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
