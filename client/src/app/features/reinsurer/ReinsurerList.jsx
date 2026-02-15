import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import Badge from "../../shared/Badge";
import ConfirmDialog from "../../shared/ConfirmDialog";
import DataTable from "../../shared/DataTable";
import ReinsurerForm from "./ReinsurerForm";
import Alert from "../../shared/Alert";
import { useAuth } from "../../hooks/useAuth";
import { isAllowed } from "../../common/utils";
import AppShell from "../../layouts/AppShell";
import {
  REINSURER_TABLE_COLUMNS,
  REINSURER_TOPBAR_LINKS,
} from "../../common/constants";
import EmptyState from "../../shared/EmptyState";

export default function ReinsurerList() {
  const [reinsurers, setReinsurers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const { loggedInUser } = useAuth();

  const isCreateAllowed = isAllowed(loggedInUser?.user?.permissions, "CREATE");
  const isEditAllowed = isAllowed(loggedInUser?.user?.permissions, "UPDATE");
  const isDeleteAllowed = isAllowed(loggedInUser?.user?.permissions, "DELETE");

  const fetchReinsurers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reinsurers");
      setReinsurers(res.data);
    } catch {
      setError("Failed to fetch reinsurers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReinsurers();
  }, []);

  const onCreate = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const onDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    setAlertMessage("");
    try {
      await api.delete(`/reinsurers/${itemToDelete._id}`);
      fetchReinsurers();
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setShowDeleteConfirmModal(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setItemToDelete(null);
  };

  const onModalClose = (reload = false) => {
    setShowModal(false);
    setSelectedItem(null);
    if (reload) fetchReinsurers();
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
    <AppShell links={REINSURER_TOPBAR_LINKS}>
      {!!alertMessage && (
        <Alert
          alertMessage={alertMessage}
          onDismiss={() => setAlertMessage("")}
        />
      )}

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Reinsurers</h5>
          {isCreateAllowed && (
            <button className="btn btn-success" onClick={onCreate}>
              <i className="bi bi-plus-lg me-1"></i>
              Create Reinsurer
            </button>
          )}
        </div>
        {!reinsurers.length && (
          <EmptyState title="No data found. Please click on 'Create Reinsurer' to proceed." />
        )}
        {reinsurers.length > 0 && (
          <DataTable
            columns={REINSURER_TABLE_COLUMNS}
            data={reinsurers}
            renderRow={(r) => (
              <tr key={r._id} height="50" className="align-middle">
                <td>{r.name}</td>
                <td>{r.code}</td>
                <td>{r.country}</td>
                <td>
                  <Badge type="dark" badgeText={r.rating} />
                </td>
                <td>
                  <Badge type={r.status} badgeText={r.status} />
                </td>

                <td>
                  <div className="d-flex justify-content-end">
                    {isEditAllowed && (
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => onEdit(r)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}

                    {isDeleteAllowed && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDeleteClick(r)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          />
        )}
      </div>

      <ReinsurerForm
        onClose={onModalClose}
        showModal={showModal}
        reinsurerData={selectedItem}
      />

      <ConfirmDialog
        showModal={showDeleteConfirmModal}
        title="Delete Reinsurer"
        message={`Are you sure you want to delete ${itemToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </AppShell>
  );
}
