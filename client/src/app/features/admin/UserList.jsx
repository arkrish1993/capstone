/**
 * TO DO:
 * 1. Error handling alerts
 * 2. Confirm modal for delete operation
 * 3. Loading spinner for modal buttons
 * 4. Validations for modal
 * 5. Disable save button for create
 */
import { useEffect, useState } from "react";
import api from "../../../services/apiClient";
import Loader from "../../shared/Loader";
import ErrorState from "../../shared/ErrorState";
import Badge from "../../shared/Badge";
import UserForm from "./UserForm";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    setSelectedUser(null);
  };

  const onEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const onDelete = async (id) => {
    try {
      await api.delete("/users/" + id);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const onModalClose = (reload = false) => {
    setShowModal(false);
    setSelectedUser(null);
    if (reload) {
      fetchUsers();
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
    <>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-dark bg-gradient text-white">
          <h5 className="mb-0">Users</h5>
          <button className="btn btn-success" onClick={onCreate}>
            <i className="bi bi-plus-lg me-1"></i>
            Create User
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr height="60" className="align-middle">
                <th width="500" className="bg-dark bg-gradient text-white">
                  Name
                </th>
                <th width="500" className="bg-dark bg-gradient text-white">
                  Email
                </th>
                <th width="500" className="bg-dark bg-gradient text-white">
                  Role
                </th>
                <th width="500" className="bg-dark bg-gradient text-white">
                  Status
                </th>
                <th width="150" className="bg-dark bg-gradient text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
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
                          title="Edit User"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(user._id)}
                          title="Delete User"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <UserForm
          onClose={() => onModalClose(true)}
          showModal={showModal}
          userData={selectedUser}
        />
      )}
    </>
  );
}
