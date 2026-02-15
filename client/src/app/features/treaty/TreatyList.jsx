import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import Badge from "../../shared/Badge";
import DataTable from "../../shared/DataTable";
import TreatyForm from "./TreatyForm";
import { useAuth } from "../../hooks/useAuth";
import { isAllowed, toDDMMMYYYY } from "../../common/utils";
import AppShell from "../../layouts/AppShell";
import {
  TREATY_TABLE_COLUMNS,
  REINSURER_ANALYST_PORTAL_LINKS,
} from "../../common/constants";
import EmptyState from "../../shared/EmptyState";

export default function TreatyList() {
  const [treaties, setTreaties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { loggedInUser } = useAuth();

  const isCreateAllowed = isAllowed(loggedInUser?.user?.permissions, "CREATE");
  const isEditAllowed = isAllowed(loggedInUser?.user?.permissions, "UPDATE");

  const fetchTreaties = async () => {
    try {
      setLoading(true);
      const res = await api.get("/treaties");
      setTreaties(res.data);
    } catch {
      setError("Failed to fetch treaties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreaties();
  }, []);

  const onCreate = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <AppShell links={REINSURER_ANALYST_PORTAL_LINKS}>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Treaties</h5>
          {isCreateAllowed && (
            <button className="btn btn-success" onClick={onCreate}>
              <i className="bi bi-plus-lg me-1"></i>Create Treaty
            </button>
          )}
        </div>

        {!treaties.length && (
          <EmptyState title="No data found. Please click on 'Create Treaty' to proceed." />
        )}

        {treaties.length > 0 && (
          <DataTable
            columns={TREATY_TABLE_COLUMNS}
            data={treaties}
            renderRow={(treaty) => (
              <tr key={treaty._id} height="50" className="align-middle">
                <td>{treaty.treatyName}</td>
                <td>{treaty.treatyType}</td>
                <td>{treaty.reinsurerId.code}</td>
                <td>{treaty.sharePercentage}%</td>
                <td>₹{treaty.retentionLimit}</td>
                <td>₹{treaty.treatyLimit}</td>
                <td>{toDDMMMYYYY(treaty.effectiveFrom)}</td>
                <td>{toDDMMMYYYY(treaty.effectiveTo)}</td>
                <td>
                  <Badge type={treaty.status} badgeText={treaty.status} />
                </td>
                <td className="text-end">
                  {isEditAllowed && treaty.status !== "EXPIRED" && (
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => onEdit(treaty)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                </td>
              </tr>
            )}
          />
        )}
      </div>

      <TreatyForm
        onClose={(reload) => {
          setShowModal(false);
          if (reload) fetchTreaties();
        }}
        showModal={showModal}
        treatyData={selectedItem}
      />
    </AppShell>
  );
}
