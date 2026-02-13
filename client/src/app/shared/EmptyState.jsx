export default function EmptyState({ title = "No Data Found" }) {
  return (
    <div className="text-center py-5 text-muted">
      <i className="bi bi-inbox fs-1"></i>
      <h5 className="mt-3">{title}</h5>
    </div>
  );
}
