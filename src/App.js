import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import PermissionsManagement from './pages/PermissionsManagement';

const App =() => {
  // State to control which component/view to display
  const [currentView, setCurrentView] = useState("dashboard");
  const setView=(view)=>{
    setCurrentView(view);
  }


  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard/>;
      case 'users':
        return <UserManagement/>;
      case 'roles':
        return <RoleManagement/>;
      case 'permissions':
        return <PermissionsManagement/>;
      default:
        return <Dashboard/>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold">Admin Panel</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setView("dashboard")}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-md transition"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView("users")}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-md transition"
                >
                  User Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView("roles")}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-md transition"
                >
                  Role Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView("permissions")}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-md transition"
                >
                  Permissions Management
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {renderView()}
      </main>
    </div>
  );
};

// const Dashboard = () => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800">Welcome to the Dashboard!</h2>
//     <p className="text-lg text-gray-600 mt-2">Here you can manage your admin panel.</p>
//   </div>
// );

// const UserManagement = () => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800">Manage Users</h2>
//     <p className="text-lg text-gray-600 mt-2">Here you can add, edit, and delete users.</p>
//   </div>
// );

// const RoleManagement = () => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800">Manage Roles</h2>
//     <p className="text-lg text-gray-600 mt-2">Here you can assign roles and permissions.</p>
//   </div>
// );

// const PermissionManagement = () => (
//   <div className="p-6 bg-white rounded-lg shadow-md">
//     <h2 className="text-3xl font-semibold text-gray-800">Manage Permissions</h2>
//     <p className="text-lg text-gray-600 mt-2">Here you can manage user permissions for different roles and actions.</p>
//     {/* Example Permissions List */}
//     <ul className="mt-4">
//       <li className="flex justify-between py-2">
//         <span className="text-gray-700">View Dashboard</span>
//         <span className="text-gray-500">Assigned to: Admin, Manager</span>
//       </li>
//       <li className="flex justify-between py-2">
//         <span className="text-gray-700">Edit Users</span>
//         <span className="text-gray-500">Assigned to: Admin</span>
//       </li>
//       <li className="flex justify-between py-2">
//         <span className="text-gray-700">Manage Roles</span>
//         <span className="text-gray-500">Assigned to: Admin, HR</span>
//       </li>
//       {/* Add more permissions as needed */}
//     </ul>
//   </div>
// );

export default App;
