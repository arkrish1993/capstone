import { useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import FormField from "../../shared/FormField"; // ← add this
import {
  REINSURER_ANALYST_LINKS,
  RISK_ALLOCATION_VIEW_COLUMNS,
} from "../../common/constants";
import AppShell from "../../layouts/AppShell";
import DataTable from "../../shared/DataTable";
import { convertToCurrency } from "../../common/utils";

export default function RiskAllocationView() {
  const [policyId, setPolicyId] = useState("");
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!policyId.trim()) return;
    setLoading(true);
    setMessage("");
    setError("");
    setAllocations([]);
    try {
      const { data } = await api.get(`/risk-allocations/${policyId}`);
      if (data.length > 0) {
        setAllocations(data);
        return;
      }
      setMessage(data.message);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell links={REINSURER_ANALYST_LINKS}>
      <div className="card shadow m-4 mt-5 rounded-2">
        <h5 className="bg-dark bg-gradient text-white p-4 rounded-top-2">
          Risk Allocation View
        </h5>
        <h6 className="text-muted pt-2 px-4">
          Please enter the Policy ID to proceed.{" "}
        </h6>

        <div className="d-flex gap-3 p-4 align-items-end">
          <div className="flex-grow-1">
            <FormField
              label="Policy ID"
              type="text"
              value={policyId}
              inputStyles="text-uppercase"
              onChange={(e) => setPolicyId(e.target.value.toUpperCase())}
            />
          </div>

          <button
            className="btn btn-success mb-2"
            style={{ position: "relative", top: -8 }}
            onClick={handleCheck}
            disabled={loading}
          >
            Check
          </button>
        </div>

        {loading && (
          <div className="text-center mb-3">
            <Loader loaderStyle="spinner-grow text-success" />
          </div>
        )}

        {!!message && (
          <div className="text-center text-muted mx-4 mb-4">{message}</div>
        )}
        {!!error && (
          <div className="text-center text-danger mx-4 mb-4">{error}</div>
        )}

        {!loading && allocations.length > 0 && (
          <div className="px-4 pb-4">
            <DataTable
              columns={RISK_ALLOCATION_VIEW_COLUMNS}
              data={allocations}
              renderRow={(allocation) => (
                <tr key={allocation._id} height="50" className="align-middle">
                  <td>{`${allocation.allocations[0].reinsurerId.name} (${allocation.allocations[0].reinsurerId.code})`}</td>
                  <td>{allocation.allocations[0].treatyId.treatyName}</td>
                  <td>
                    {convertToCurrency(
                      allocation.allocations[0].treatyId.retentionLimit,
                    )}
                  </td>
                  <td>
                    {convertToCurrency(
                      allocation.allocations[0].treatyId.treatyLimit,
                    )}
                  </td>
                  <td>
                    {convertToCurrency(
                      allocation.allocations[0].allocatedAmount,
                    )}
                  </td>
                  <td>{allocation.allocations[0].allocatedPercentage}%</td>
                </tr>
              )}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}
