export default function EmptyState({ title = "No Data Found" }) {
  return (
    <div className="text-center py-5 text-muted">
      <p className="mt-3">{title}</p>
    </div>
  );
}
