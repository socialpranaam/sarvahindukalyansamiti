import { Outlet, NavLink } from "react-router-dom";
import { Calendar, HandCoins, HandHelping, Home, Landmark, Users } from "lucide-react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineContactPhone } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Home size={24} /> },
    { to: "/admin/donations", label: "Donations", icon: <HandCoins size={20} /> },
    { to: "/admin/projects", label: "Temple Projects", icon: <Landmark size={20} /> },
    { to: "/admin/events", label: "Events", icon: <Calendar size={20} /> },
    { to: "/admin/members", label: "Members", icon: <Users size={20} /> },
    { to: "/admin/pujabooking", label: "Puja Booking", icon: <HandHelping size={20} /> },
    { to: "/admin/newslist", label: "News", icon: <IoNewspaperOutline size={20} /> },
    { to: "/admin/contactlist", label: "Contacts", icon: <MdOutlineContactPhone size={20} /> },
    { to: "/admin/feedbacks", label: "FeedBacks", icon: <VscFeedback size={20} /> },
    { to: "/admin/services", label: "Services", icon: <GrServices size={20} /> },
  ];

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
          className={`fixed top-0 left-0 z-50 w-64 h-full bg-white border-r border-gray-300 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div>
            {/* Profile Section */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h2 className="font-semibold text-xl">Sarv Hindu</h2>
                <p className="text-md text-gray-500">Kalyan Samiti</p>
              </div>
            </div>
            <hr className="border-gray-300" />
            <p className="mt-2 font-medium">Main Menu</p>

            {/* Menu */}
            <nav className="flex flex-col mt-2 text-md gap-2 text-gray-700">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-orange-400 text-white font-semibold"
                        : "hover:bg-orange-100 hover:text-orange-600"
                    }`
                  }
                  onClick={() => sidebarOpen && setSidebarOpen(false)}
                >
                  {item.icon} {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Admin Info */}
          <hr className="w-full mt-4 border-gray-300" />
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
          <div className="bg-gray-50 p-3 shadow min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Tablet Responsive CSS */}
      <style>
        {`
          @media (min-width: 768px) and (max-width: 1024px) {
            aside.w-64 {
              width: 13rem !important; /* Narrower sidebar for tablet */
              border-right: 1px solid #d1d5db !important; /* keep vertical line */
            }
            main.md\\:ml-64 {
              margin-left: 13rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLayout;
