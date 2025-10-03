import { Outlet, NavLink } from "react-router-dom";
import { Calendar, HandCoins, HandHelping, Home, Landmark, Users } from "lucide-react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-font">
      {/* Mobile Header */}
      <header className="bg-white p-4 shadow md:hidden flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div>
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h2 className="font-semibold text-xl">Sarv Hindu</h2>
                <p className="text-md text-gray-500">Kalyan Samiti</p>
              </div>
            </div>
            <hr />
            <p className="mt-4 font-medium">Main Menu</p>

            {/* Menu */}
            <nav className="flex flex-col mt-4 text-lg gap-2 text-gray-700">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <Home size={24} /> Dashboard
              </NavLink>

              <NavLink
                to="/admin/donations"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <HandCoins size={20}/> Donations
              </NavLink>

              <NavLink
                to="/admin/projects"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <Landmark size={20}/> Temple Projects
              </NavLink>

              <NavLink
                to="/admin/events"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <Calendar size={20}/> Events
              </NavLink>

              <NavLink
                to="/admin/members"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <Users size={20}/> Members
              </NavLink>

              <NavLink
                to="/admin/pujabooking"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-orange-400 text-white font-semibold"
                      : "hover:bg-orange-100 hover:text-orange-600"
                  }`
                }
              >
                <HandHelping size={20}/> Puja Booking
              </NavLink>
            </nav>
          </div>

          {/* Admin Info */}
          <hr className="w-full mt-4" />
          <div className="flex items-center gap-3 mt-4">
            <div className="h-10 w-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-500">Super Administrator</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 h-screen overflow-y-auto">
          <div className="bg-white p-6 shadow min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
