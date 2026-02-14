import { BadgeColorMap } from "../common/constants";

export default function Badge({ type, badgeText = "" }) {
  return (
    <span className={`badge bg-${BadgeColorMap[type] || type}`}>
      {badgeText}
    </span>
  );
}
