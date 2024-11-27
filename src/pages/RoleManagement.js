import React, { useState, useEffect } from "react";
import axios from "axios";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null);

  // Fetch roles and permissions
  useEffect(() => {
    axios
      .get("http://localhost:5000/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => {
        setError("Failed to load roles.");
        console.error(err);
      });

    axios
      .get("http://localhost:5000/permissions")
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((err) => {
        setError("Failed to load permissions.");
        console.error(err);
      });
  }, []);

  // Handle adding a new role
  const handleAddRole = () => {
    const newRole = {
      name: newRoleName,
      permissions: selectedPermissions // Send only IDs
    };
  
    axios
      .post("http://localhost:5000/roles", newRole)
      .then((response) => {
        setRoles([...roles, response.data]); // Response already includes full permission objects
        setShowModal(false);
        setNewRoleName("");
        setSelectedPermissions([]);
      })
      .catch((err) => {
        setError("Failed to add role.");
        console.error(err);
      });
  };
  

  // Handle editing a role
  const handleEditRole = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setEditingRole(role);
    setNewRoleName(role.name);
    setSelectedPermissions(role.permissions); // Already contains { id, name }
    setShowModal(true);
  };
  
  // Handle saving the edited role
  const handleSaveEditRole = () => {
    const updatedRole = {
      name: newRoleName,
      permissions: selectedPermissions,
    };

    axios
      .put(`http://localhost:5000/roles/${editingRole.id}`, updatedRole)
      .then((response) => {
        const updatedRoles = roles.map((role) =>
          role.id === editingRole.id ? response.data : role
        );
        setRoles(updatedRoles);
        setShowModal(false);
        setNewRoleName("");
        setSelectedPermissions([]);
        setEditingRole(null);
      })
      .catch((err) => {
        setError("Failed to update role.");
        console.error(err);
      });
  };

  // Handle deleting a role
  const handleDeleteRole = (roleId) => {
    axios
      .delete(`http://localhost:5000/roles/${roleId}`)
      .then(() => {
        setRoles(roles.filter((role) => role.id !== roleId));
      })
      .catch((err) => {
        setError("Failed to delete role.");
        console.error(err);
      });
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Role Management</h2>
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
                Add New Role
            </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <table className="min-w-full bg-white mt-6 border rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Role Name</th>
              <th className="py-3 px-6 text-left">Permissions</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-6">{role.name}</td>
                <td className="py-3 px-6"> 
                    {role.permissions.map((permission) => permission.name).join(", ")}
                </td>
                <td className="py-3 px-6 text-center space-x-3">
                  <button
                    onClick={() => handleEditRole(role.id)}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Adding or Editing Role */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">
                {editingRole ? "Edit Role" : "Add New Role"}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Permissions
                </label>
                <div className="mt-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        checked={selectedPermissions.some((p) => p.id === permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                             // Add the permission only if it's not already in the list
                            if (!selectedPermissions.find((p) => p.id === permission.id)) {
                                setSelectedPermissions([...selectedPermissions, permission]);
                            }
                          } else {
                            setSelectedPermissions(
                                selectedPermissions.filter((p) => p.id !== permission.id)
                              );
                          }
                        }}
                      />
                      <label
                        htmlFor={`permission-${permission.id}`}
                        className="ml-2"
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={editingRole ? handleSaveEditRole : handleAddRole}
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
                >
                  {editingRole ? "Save Changes" : "Add Role"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
