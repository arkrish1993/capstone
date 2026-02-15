import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import Badge from "../../shared/Badge";
import DataTable from "../../shared/DataTable";
import {
  CLAIM_TABLE_COLUMNS,
  CLAIMS_ADJUSTER_LINKS,
} from "../../common/constants";
import Alert from "../../shared/Alert";
import { useAuth } from "../../hooks/useAuth";
import { isAllowed, toDDMMMYYYY } from "../../common/utils";
import AppShell from "../../layouts/AppShell";
import EmptyState from "../../shared/EmptyState";
import ClaimsForm from "./ClaimsForm";
import ClaimStatusTimeline from "./ClaimStatusTimeline";
import ConfirmDialog from "../../shared/ConfirmDialog";

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [timelineData, setTimelineData] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mode, setMode] = useState("create");

  const { loggedInUser } = useAuth();

  const isCreateAllowed = isAllowed(loggedInUser?.user?.permissions, "CREATE");
  const isEditAllowed = isAllowed(loggedInUser?.user?.permissions, "UPDATE");
  const isReviewAllowed = isAllowed(loggedInUser?.user?.permissions, "APPROVE");

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await api.get("/claims");
      setClaims(res.data);
    } catch {
      setError("Failed to fetch claims.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const onCreate = () => {
    setShowModal(true);
    setSelectedItem(null);
  };

  const onEdit = (claim) => {
    setMode("edit");
    setSelectedItem(claim);
    setShowModal(true);
  };

  const onReject = async () => {
    setAlertMessage("");
    try {
      await api.put(`/claims/${selectedItem._id}`, {
        status: "REJECTED",
      });
      fetchClaims();
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const onApprove = (claim) => {
    setMode("approve");
    setSelectedItem(claim);
    setShowModal(true);
  };

  const onSettle = async (claimId) => {
    setAlertMessage("");
    try {
      await api.put(`/claims/${claimId}`, {
        status: "SETTLED",
      });
      fetchClaims();
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const onModalClose = (reload = false) => {
    setShowModal(false);
    setSelectedItem(null);
    if (reload) fetchClaims();
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
    <AppShell links={CLAIMS_ADJUSTER_LINKS}>
      {!!alertMessage && (
        <Alert
          alertMessage={alertMessage}
          onDismiss={() => setAlertMessage("")}
        />
      )}
      <div className="card shadow-sm">
        <div className="card-header w-100 d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Claims</h5>
          {isCreateAllowed && (
            <button className="btn btn-success" onClick={onCreate}>
              <i className="bi bi-plus-lg me-1"></i>
              Create Claim
            </button>
          )}
        </div>
        {!claims.length && (
          <EmptyState title="No data found. Please click on 'Create Claim' to proceed." />
        )}
        {claims.length > 0 && (
          <DataTable
            columns={CLAIM_TABLE_COLUMNS}
            data={claims}
            renderRow={(claim) => (
              <tr key={claim._id} height="50" className="align-middle">
                <td>{claim.claimNumber}</td>
                <td>{claim.policyId.policyNumber}</td>
                <td>₹{claim.claimAmount}</td>
                <td>₹{claim.approvedAmount}</td>
                <td>
                  <Badge type={claim.status} badgeText={claim.status} />
                </td>
                <td>{toDDMMMYYYY(claim.incidentDate)}</td>
                <td>{toDDMMMYYYY(claim.reportedDate)}</td>
                <td>{claim.handledBy ? claim.handledBy.username : "-"}</td>
                <td>
                  <div className="d-flex justify-content-end">
                    {isEditAllowed && claim.status === "IN_REVIEW" && (
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => onEdit(claim)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
                    {isReviewAllowed && claim.status === "IN_REVIEW" && (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm me-2"
                          onClick={() => onApprove(claim)}
                          title="Approve Claim"
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm me-2"
                          onClick={() => {
                            setSelectedItem(claim);
                            setShowConfirmModal(true);
                          }}
                          title="Reject Claim"
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </>
                    )}
                    {isReviewAllowed && claim.status === "APPROVED" && (
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => onSettle(claim._id)}
                        title="Settle Claim"
                      >
                        <i className="bi bi-cash-coin"></i>
                      </button>
                    )}
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => setTimelineData(claim.remarks)}
                      title="View timeline"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </div>

      <ClaimsForm
        mode={mode}
        onClose={() => onModalClose(true)}
        showModal={showModal}
        claimData={selectedItem}
      />

      <ClaimStatusTimeline
        show={!!timelineData}
        onClose={() => setTimelineData("")}
        data={timelineData}
      />

      <ConfirmDialog
        showModal={showConfirmModal}
        title="Confirm Rejection"
        message={`Are you sure you want to reject this claim?`}
        onConfirm={onReject}
        onCancel={() => setShowConfirmModal(false)}
      />
    </AppShell>
  );
}
