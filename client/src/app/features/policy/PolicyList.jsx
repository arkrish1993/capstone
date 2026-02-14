import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import EmptyState from "../../shared/EmptyState";
import Badge from "../../shared/Badge";
import DataTable from "../../shared/DataTable";
import { POLICY_TABLE_COLUMNS } from "../../shared/constants";
import { toDDMMMYYYY } from "../../shared/utils";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/policies");
      setPolicies(res.data);
    } catch {
      setError("Failed to fetch policies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onCreate = () => {
    navigate("/policy/create");
  };

  const onEdit = (policyId) => {
    navigate(`/policy/edit/${policyId}`);
  };

  const submitForApproval = (policyId) => {
    console.log(policyId);
  };

  if (loading) {
    return (
      <Loader loaderStyle="spinner-grow spinner-grow text-success mt-4 px-3" />
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Policies</h5>
          <button className="btn btn-success" onClick={onCreate}>
            <i className="bi bi-plus-lg me-1"></i>
            Create Policy
          </button>
        </div>
        {!policies.length && (
          <EmptyState title="No data found. Please click on 'Create Policy' to proceed." />
        )}
        {policies.length > 0 && (
          <DataTable
            columns={POLICY_TABLE_COLUMNS}
            data={policies}
            renderRow={(policy) => (
              <tr key={policy._id} height="50" className="align-middle">
                <td>{policy.policyNumber}</td>
                <td>{policy.insuredName}</td>
                <td>
                  <Badge type="dark" badgeText={policy.insuredType} />
                </td>
                <td>
                  <Badge type="dark" badgeText={policy.lineOfBusiness} />
                </td>
                <td>₹{policy.sumInsured}</td>
                <td>₹{policy.premium}</td>
                <td>₹{policy.retentionLimit}</td>
                <td>
                  <Badge type={policy.status} badgeText={policy.status} />
                </td>
                <td>{toDDMMMYYYY(policy.effectiveFrom)}</td>
                <td>{toDDMMMYYYY(policy.effectiveTo)}</td>
                <td>{policy.createdBy ? policy.createdBy.username : ""}</td>
                <td>{policy.appovedBy ? policy.appovedBy.username : "-"}</td>
                <td>
                  <>
                    {!policy.appovedBy && (
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => onEdit(policy._id)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                    {!policy.appovedBy && (
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => submitForApproval(policy._id)}
                        title="Submit for approval"
                      >
                        <i className="bi bi-check-circle"></i>
                      </button>
                    )}
                  </>
                </td>
              </tr>
            )}
          />
        )}
      </div>
    </>
  );
}
