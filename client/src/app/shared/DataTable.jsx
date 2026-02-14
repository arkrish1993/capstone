export default function DataTable({ columns, data, renderRow }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr height="60" className="align-middle">
            {columns.map((col) => (
              <th key={col.key} className="bg-dark bg-gradient text-white">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </div>
  );
}
