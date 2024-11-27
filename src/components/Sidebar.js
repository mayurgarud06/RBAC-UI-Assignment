import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed top-0 left-0 flex flex-col py-6">
      <ul className="space-y-4">
        <li>
          <Link
            to="/users"
            className="block px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white transition duration-300"
          >
            User Management
          </Link>
        </li>
        <li>
          <Link
            to="/roles"
            className="block px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white transition duration-300"
          >
            Role Management
          </Link>
        </li>
        <li>
          <Link
            to="/permissions"
            className="block px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white transition duration-300"
          >
            Permissions Management
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
