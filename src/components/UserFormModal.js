import React, { useState, useEffect } from "react";
import axios from "axios";

const UserFormModal = ({ isOpen, onClose, userForm, setUserForm, onSave, roles,users }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userForm);
  };


  const handleClose = () => {
    onClose();
  };
  // Set default value for status if not provided
  useEffect(() => {
    if (!userForm.status) {
      setUserForm((prev) => ({
        ...prev,
        status: "Active",  // Default to "Active"
      }));
    }
  }, [userForm, setUserForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-2xl font-semibold mb-4">
          {userForm.id ? "Edit User" : "Add New User"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Role</label>
            <select
              name="role"
              value={userForm.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name} -  {role.permissions.map((permission) => permission.name).join(", ")}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Status</label>
            <select
              name="status"
              value={userForm.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {userForm.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
