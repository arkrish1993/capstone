import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function HighClaimBarChart({ data }) {
  return (
    <ResponsiveContainer width="95%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip formatter={(v) => `₹ ${v.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="totalClaimAmount" fill="#ffc107" />
      </BarChart>
    </ResponsiveContainer>
  );
}
