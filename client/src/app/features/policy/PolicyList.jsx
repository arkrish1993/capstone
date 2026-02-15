import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import EmptyState from "../../shared/EmptyState";
import Badge from "../../shared/Badge";
import DataTable from "../../shared/DataTable";
import {
  POLICY_TABLE_COLUMNS,
  UNDERWRITER_LINKS,
} from "../../common/constants";
import { isAllowed, toDDMMMYYYY } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import AppShell from "../../layouts/AppShell";
import { useAuth } from "../../hooks/useAuth";
import ConfirmDialog from "../../shared/ConfirmDialog";

export default function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const { loggedInUser } = useAuth();

  const isCreateAllowed = isAllowed(loggedInUser?.user?.permissions, "CREATE");
  const isEditAllowed = isAllowed(loggedInUser?.user?.permissions, "UPDATE");
  const isApproveAllowed = isAllowed(
    loggedInUser?.user?.permissions,
    "APPROVE",
  );

  const fetchPolicies = async () => {
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
    fetchPolicies();
  }, []);

  const onCreate = () => {
    navigate("/policy/create");
  };

  const onEdit = (policyId) => {
    navigate(`/policy/edit/${policyId}`);
  };

  const onSubmit = (policy) => {
    setSelectedItem(policy);
    setShowConfirmModal(true);
  };

  const submitForApproval = async (policyId) => {
    try {
      setLoading(true);
      await api.post(`/policies/${policyId}/approve`);
      fetchPolicies();
    } catch (error) {
      setError(error.message);
    } finally {
      setSelectedItem(null);
      setLoading(false);
    }
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
    <AppShell links={UNDERWRITER_LINKS}>
      <div className="card shadow-sm">
        <div className="card-header w-100 d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Policies</h5>
          {isCreateAllowed && (
            <button className="btn btn-success" onClick={onCreate}>
              <i className="bi bi-plus-lg me-1"></i>
              Create Policy
            </button>
          )}
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
                <td>{policy.approvedBy ? policy.approvedBy.username : "-"}</td>
                <td>
                  <div className="d-flex justify-content-end">
                    {isEditAllowed &&
                      !policy.approvedBy &&
                      policy.status !== "EXPIRED" && (
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={() => onEdit(policy._id)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                      )}
                    {isApproveAllowed &&
                      !policy.approvedBy &&
                      policy.status !== "EXPIRED" && (
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={() => onSubmit(policy)}
                          title="Submit for approval"
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </div>

      <ConfirmDialog
        showModal={showConfirmModal}
        title="Submit for approval"
        message={`Are you sure you want to submit this policy for approval?`}
        onConfirm={() => submitForApproval(selectedItem._id)}
        onCancel={() => setShowConfirmModal(false)}
      />
    </AppShell>
  );
}
