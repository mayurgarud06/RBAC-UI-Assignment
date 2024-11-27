import React, { useState, useEffect } from "react";
import axios from "axios";
import UserFormModal from "../components/UserFormModal"; // Import the modal component

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: ""
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setError("Failed to load users.");
        console.error(err);
      });

      axios
      .get("http://localhost:5000/roles")
      .then((response) => {
        setRoles(response.data); // Assuming roles are stored in the server under /roles
      })
      .catch((err) => {
        setError("Failed to load roles.");
        console.error(err);
      });
  }, []);

  // Open modal with user data for editing or empty for adding a new user
  const handleOpenModal = (user = null) => {
    if (user) {
      setUserForm(user); // Populate form with existing user data for editing
    } else {
      setUserForm({
        id: "",
        name: "",
        email: "",
        role: "",
        status: ""
      });
    }
    setIsModalOpen(true);
  };

  // Handle form submission (add or update user)
  const handleSaveUser = () => {
    if (userForm.id) {
      // Update user
      axios
        .put(`http://localhost:5000/users/${userForm.id}`, userForm)
        .then((response) => {
          setUsers(users.map((user) => (user.id === userForm.id ? userForm : user)));
          setIsModalOpen(false);
        })
        .catch((err) => {
          setError("Failed to update user.");
          console.error(err);
        });
    } else {
      // Add new user
      const newUser = { ...userForm, id: (users.length+1).toString() }; // Use a timestamp-based ID
      axios
        .post("http://localhost:5000/users", newUser)
        .then((response) => {
          setUsers((prev) => [...prev, response.data]);
          setIsModalOpen(false);
        })
        .catch((err) => {
          setError("Failed to add user.");
          console.error(err);
        });
    }
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => {
        setError("Failed to delete user.");
        console.error(err);
      });
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6 ml-64 lg:ml-0 mt-16">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">User Management</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
          >
            Add New User
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-4">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.status}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* UserFormModal to add or edit user */}
        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userForm={userForm}
          setUserForm={setUserForm}
          onSave={handleSaveUser}
          roles={roles}
          users={users}
        />
      </div>
    </div>
  );
};

export default UserManagement;
