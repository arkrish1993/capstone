const statusMap = {
  INACTIVE: "secondary",
  ACTIVE: "success",
  DRAFT: "secondary",
  REJECTED: "danger",
  APPROVED: "primary",
};

export default function Badge({ type, badgeText = "" }) {
  return (
    <span className={`badge bg-${statusMap[type] || type || "secondary"}`}>
      {badgeText}
    </span>
  );
}
