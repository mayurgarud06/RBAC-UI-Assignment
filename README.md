# Admin Dashboard

A responsive Admin Dashboard built with React, Chart.js, and Tailwind CSS. The dashboard provides an interactive interface for managing users, roles, and permissions with dynamic charts and statistics.

---

## Features

- **Role Distribution Pie Chart**: Visual representation of user roles.
- **User Statistics**: Total, active, and inactive user counts displayed as cards.
- **Permissions Per Role**: Breakdown of permissions assigned to each role.
- **Dynamic and Responsive Design**: Built with Tailwind CSS for seamless responsiveness.

---

## Tech Stack

- **Frontend**:
  - ReactJS
  - Chart.js (Pie and Bar Charts)
  - Tailwind CSS
- **Backend**:
  - JSON Server (for mock API endpoints)
- **Tools**:
  - Axios (for API calls)
  - Chart.js plugins for interactivity

---

## Requirements

Ensure you have the following installed on your system:
1. **Node.js** (v16 or above)
2. **npm** (Node Package Manager) or **yarn**
3. **Git** (for cloning the repository)

---

## Steps to Run the Project

### 1. Clone the Repository
'''
git clone https://github.com/mayurgarud06/RBAC-UI-Assignment.git
cd RBAC-UI-Assignment
'''
### 2. Install Dependencies
Run the following command to install all required dependencies:
npm install

### Start the JSON Server
npx json-server --watch db.json --port 5000

### Start the React Application
npm start
The application will run on http://localhost:3000.

##API Endpoints
The JSON Server provides the following mock API endpoints:

###Dashboard Message:

GET /dashboard

Example response:json

Copy code
{
  "message": "Welcome to the Admin Dashboard!"
}

###Users:

GET /users  :Retrieves all users.

Example response: json


[
  { "id": 1, "name": "John Doe", "status": "Active", "role": "Admin" },
  { "id": 2, "name": "Jane Smith", "status": "Inactive", "role": "User" }
]
###Roles:

GET /roles
Retrieves all roles and their permissions.
Example response:
json

[
  { "id": 1, "name": "Admin", "permissions": ["Add User", "Delete User"] },
  { "id": 2, "name": "User", "permissions": ["View Profile"] }
]
###Permissions:

GET /permissions
Retrieves all available permissions.
Example response:
json

[
  { "id": 1, "name": "Add User" },
  { "id": 2, "name": "Delete User" },
  { "id": 3, "name": "View Profile" }
]

##Json Server Data 
{
  "dashboard": { "message": "Welcome to the Admin Dashboard!" },
  "users": [
    { "id": 1, "name": "John Doe", "status": "Active", "role": "Admin" },
    { "id": 2, "name": "Jane Smith", "status": "Inactive", "role": "User" }
  ],
  "roles": [
    { "id": 1, "name": "Admin", "permissions": ["Add User", "Delete User"] },
    { "id": 2, "name": "User", "permissions": ["View Profile"] }
  ],
  "permissions": [
    { "id": 1, "name": "Add User" },
    { "id": 2, "name": "Delete User" },
    { "id": 3, "name": "View Profile" }
  ]
}



