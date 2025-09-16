import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between fixed h-full">
        {/* Profile Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <h2 className="font-semibold">Sarv Hindu</h2>
              <p className="text-sm text-gray-500">Kalyan Samiti</p>
            </div>
          </div>
          <hr />
          <p className="mt-4 font-medium">Main Menu</p>

          {/* Menu */}
          <nav className="flex flex-col mt-4 gap-2 text-gray-700">
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
              🏠 Dashboard
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
              💰 Donations
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
              🏛 Temple Projects
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
              📅 Events
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
              👥 Members
            </NavLink>

            <NavLink
              to="/admin/puja"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-orange-400 text-white font-semibold"
                    : "hover:bg-orange-100 hover:text-orange-600"
                }`
              }
            >
              🙏 Puja Booking
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
      <main className="flex-1 ml-64 h-screen overflow-y-auto ">
        {/* Dynamic Nested Routes */}
        <div className="bg-white p-6  shadow min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
