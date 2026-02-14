/**
 * TO DO:
 * 1. Error handling and success alerts
 * 2. Loading spinner for modal buttons
 * 3. Validations for modal
 * 4. Disable save button for create
 * 5. Implement permission based check
 */
import { useEffect, useState } from "react";
import api from "../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import Badge from "../../shared/Badge";
import ConfirmDialog from "../../shared/ConfirmDialog";
import DataTable from "../../shared/DataTable";
import UserForm from "./UserForm";
import { USER_TABLE_COLUMNS } from "../../shared/constants";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onCreate = () => {
    setShowModal(true);
    setSelectedItem(null);
  };

  const onEdit = (user) => {
    setSelectedItem(user);
    setShowModal(true);
  };

  const onDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/users/${userToDelete._id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    } finally {
      setShowDeleteConfirmModal(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setUserToDelete(null);
  };

  const onModalClose = (reload = false) => {
    setShowModal(false);
    setSelectedItem(null);
    if (reload) fetchUsers();
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
          <h5 className="mb-0">Users</h5>
          <button className="btn btn-success" onClick={onCreate}>
            <i className="bi bi-plus-lg me-1"></i>
            Create User
          </button>
        </div>

        <DataTable
          columns={USER_TABLE_COLUMNS}
          data={users}
          renderRow={(user) => (
            <tr key={user._id} height="50" className="align-middle">
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Badge type="dark" badgeText={user.role} />
              </td>
              <td>
                <Badge type={user.status} badgeText={user.status} />
              </td>
              <td>
                {!user.isRootUser && (
                  <>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => onEdit(user)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDeleteClick(user)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          )}
        />
      </div>

      {showModal && (
        <UserForm
          onClose={() => onModalClose(true)}
          showModal={showModal}
          userData={selectedItem}
        />
      )}

      <ConfirmDialog
        showModal={showDeleteConfirmModal}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.username}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}
