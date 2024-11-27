import React, { useState, useEffect } from "react";
import axios from "axios";

const PermissionsManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({ name: "", desc: "" });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/permissions")
      .then((response) => {
        setPermissions(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load permissions.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleSave = () => {
    if (editingPermission) {
      // Update existing permission
      axios
        .put(`http://localhost:5000/permissions/${editingPermission.id}`, newPermission)
        .then(() => {
          fetchPermissions();
          setIsModalOpen(false);
        })
        .catch((err) => {
          setError("Failed to update permission.");
          console.error(err);
        });
    } else {
      // Create new permission
      axios
        .post("http://localhost:5000/permissions", newPermission)
        .then(() => {
          fetchPermissions();
          setIsModalOpen(false);
        })
        .catch((err) => {
          setError("Failed to create permission.");
          console.error(err);
        });
    }
  };

  const handleDelete = (permissionId) => {
    axios
      .delete(`http://localhost:5000/permissions/${permissionId}`)
      .then(() => fetchPermissions())
      .catch((err) => {
        setError("Failed to delete permission.");
        console.error(err);
      });
  };

  const openModal = (permission) => {
    setEditingPermission(permission);
    setNewPermission(permission || { name: "", desc: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPermission(null);
    setNewPermission({ name: "", desc: "" });
  };

  return (
    <div className="flex">
      <div className="flex-1 p-5">
        <h2 className="text-2xl font-semibold mb-4">Permissions Management</h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">Manage your permissions</p>
          <button
            onClick={() => openModal(null)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Permission
          </button>
        </div>
        {loading && <p>Loading permissions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && permissions.length === 0 && !error && (
          <p className="text-gray-600">No permissions available.</p>
        )}
        {/* <button
          onClick={() => openModal(null)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Permission
        </button> */}
        {permissions.length > 0 && (
          <table className="min-w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Permission Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-t">
                  <td className="border border-gray-300 px-4 py-2">{permission.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{permission.desc}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(permission)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(permission.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-1/3">
              <h3 className="text-lg font-semibold mb-4">
                {editingPermission ? "Edit Permission" : "Add Permission"}
              </h3>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Permission Name</label>
                <input
                  type="text"
                  value={newPermission.name}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Description</label>
                <input
                  type="text"
                  value={newPermission.desc}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, desc: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionsManagement;
