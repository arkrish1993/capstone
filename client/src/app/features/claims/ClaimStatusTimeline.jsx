import { useMemo } from "react";
import { toDDMMMYYYY } from "../../common/utils";

export default function ClaimStatusTimeline({ show, onClose, data }) {
  const timeline = useMemo(() => {
    try {
      return JSON.parse(data || "[]");
    } catch {
      return [];
    }
  }, [data]);

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-light bg-dark bg-gradient p-3">
              <h5 className="modal-title">Claim Status Timeline</h5>
            </div>
            <div className="modal-body">
              {timeline.length === 0 ? (
                <div className="text-muted">No remarks available.</div>
              ) : (
                <table className="table table-striped">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "35%" }}>Date</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline.map((obj, index) => (
                      <tr key={index}>
                        <td>{toDDMMMYYYY(obj.createdAt)}</td>
                        <td>{obj.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="d-flex justify-content-end p-4 pt-1">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
