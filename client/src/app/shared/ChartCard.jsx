export default function ChartCard({ title, hasData, children }) {
  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card shadow h-100 p-3">
        <h6 className="mb-3">{title}</h6>

        {!hasData ? (
          <div className="text-center text-muted my-auto py-5">
            No data available
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
