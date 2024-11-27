import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [dashboardMessage, setDashboardMessage] = useState(""); // Dashboard message
  const [roleData, setRoleData] = useState({});
  const [userData, setUserData] = useState({});
  const [permissionsData, setPermissionsData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from JSON server
        const dashboardRes = await axios.get("http://localhost:5000/dashboard");
        const usersRes = await axios.get("http://localhost:5000/users");
        const rolesRes = await axios.get("http://localhost:5000/roles");
        const permissionsRes = await axios.get("http://localhost:5000/permissions");

        // Set dashboard message
        setDashboardMessage(dashboardRes.data.message);

        // Process user data
        const activeUsers = usersRes.data.filter((user) => user.status === "Active").length;
        const inactiveUsers = usersRes.data.filter((user) => user.status === "Inactive").length;

        setUserData({
          totalUsers: usersRes.data.length,
          activeUsers,
          inactiveUsers,
        });

        // Process role data for pie chart
        const roleLabels = rolesRes.data.map((role) => role.name);
        const roleCounts = roleLabels.map((roleName) =>
          usersRes.data.filter((user) => user.role === roleName).length
        );

        setRoleData({
          labels: roleLabels,
          datasets: [
            {
              data: roleCounts,
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"], // Customize as needed
            },
          ],
        });

        // Process permissions data
        const permissionsPerRole = rolesRes.data.map((role) => ({
          role: role.name,
          permissions: role.permissions.length,
        }));

        setPermissionsData({
          totalPermissions: permissionsRes.data.length,
          permissionsPerRole,
        });

        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  // Role Distribution Pie Chart
  const roleDistributionChart = (
    <div
            className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg"
            style={{ height: "100%" }}
          >
            <div className="w-full" style={{ maxHeight: "400px", maxWidth: "600px" }}>
            <p className="items-center">Role Distribution Pie Chart</p>
              <Pie
                data={roleData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        font: {
                          size: 13,
                        },
                      },
                    },
                  },
                }}
              />
             
            </div>
          </div>
  );

  // User Statistics Cards
  const userStatsCards = (
    <div className="flex space-x-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h4 className="text-lg font-semibold text-gray-600">Total Users</h4>
        <p className="text-2xl font-bold text-gray-800">{userData.totalUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h4 className="text-lg font-semibold text-gray-600">Active Users</h4>
        <p className="text-2xl font-bold text-gray-800">{userData.activeUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h4 className="text-lg font-semibold text-gray-600">Inactive Users</h4>
        <p className="text-2xl font-bold text-gray-800">{userData.inactiveUsers}</p>
      </div>
    </div>
  );

  // Permissions per Role List
  const permissionsCard = (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Permissions per Role</h3>
      <ul>
        {permissionsData.permissionsPerRole &&
          permissionsData.permissionsPerRole.map((item) => (
            <li key={item.role} className="flex justify-between mb-2">
              <span className="text-gray-600">{item.role}</span>
              <span className="font-bold text-gray-800">{item.permissions} permissions</span>
            </li>
          ))}
      </ul>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">{dashboardMessage}</p>

        {/* User Statistics */}
        {userStatsCards}
        {/* Permissions Info */}
        {permissionsCard}

        {/* User Growth and Role Distribution Charts */}
        <div
            className="flex-1 items-center justify-center bg-white p-6 rounded-lg shadow-sm"
            style={{ height: "60%" }}
          >
          {roleDistributionChart}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
