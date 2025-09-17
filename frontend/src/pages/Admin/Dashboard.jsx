import { Search, Bell, Users, CalendarDays, Building, HandCoins, Handshake } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Dashboard = () => {
  // Dummy Data
  const monthlyData = [
    { month: "Jan", amount: 15000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 16000 },
    { month: "Apr", amount: 21000 },
    { month: "May", amount: 24000 },
    { month: "Jun", amount: 27000 },
  ];

  const categoryData = [
    { category: "Temple", amount: 12000 },
    { category: "Education", amount: 7000 },
    { category: "Health", amount: 4000 },
    { category: "Marriage", amount: 2000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Admin User</p>
        </div>

        {/* Search + Status + Notifications */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-72 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full text-sm"
            />
          </div>

          {/* Online Status */}
          <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
            ● System Online
          </span>

          {/* Notification */}
          <button className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Donations */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Total Donations</h3>
            <p className="text-2xl font-bold mt-2">₹26,500</p>
            <p className="text-green-500 text-sm mt-1">+12.5% vs last month</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <HandCoins className="text-orange-500" />
          </div>
        </div>

        {/* Active Members */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Active Members</h3>
            <p className="text-2xl font-bold mt-2">3</p>
            <p className="text-green-500 text-sm mt-1">+8.2% vs last month</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="text-blue-500" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Upcoming Events</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <CalendarDays className="text-purple-500" />
          </div>
        </div>

        {/* Temple Projects */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Temple Projects</h3>
            <p className="text-2xl font-bold mt-2">1</p>
            <p className="text-green-500 text-sm mt-1">+25% vs last month</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <Building className="text-red-500" />
          </div>
        </div>

        {/* Active Volunteers */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Active Volunteers</h3>
            <p className="text-2xl font-bold mt-2">3</p>
            <p className="text-green-500 text-sm mt-1">+15% vs last month</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Handshake className="text-green-500" />
          </div>
        </div>

        {/* Puja Bookings */}
        <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-gray-500 text-sm">Puja Bookings</h3>
            <p className="text-2xl font-bold mt-2">1</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <span className="text-yellow-500 text-xl">🕉️</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Monthly Donations Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Donations by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-full">
              <HandCoins className="text-orange-500" size={18} />
            </div>
            <div>
              <p className="font-medium">New donation received</p>
              <p className="text-sm text-gray-500">
                Rajesh Kumar donated ₹5,000 for Temple Construction
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <CalendarDays className="text-purple-500" size={18} />
            </div>
            <div>
              <p className="font-medium">Event scheduled</p>
              <p className="text-sm text-gray-500">
                Bhajan Sandhya next Friday at 6 PM
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="text-blue-500" size={18} />
            </div>
            <div>
              <p className="font-medium">New member joined</p>
              <p className="text-sm text-gray-500">
                Priya Sharma became a Lifetime Member
              </p>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <Building className="text-red-500" size={18} />
            </div>
            <div>
              <p className="font-medium">Project milestone</p>
              <p className="text-sm text-gray-500">
                Vrindavan Temple construction reached new stage
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-orange-50 rounded-xl flex flex-col items-center justify-center hover:bg-orange-100 transition">
            <HandCoins className="text-orange-500 mb-2" />
            <span className="font-medium text-orange-600">Add Donation</span>
          </button>

          <button className="p-4 bg-purple-50 rounded-xl flex flex-col items-center justify-center hover:bg-purple-100 transition">
            <CalendarDays className="text-purple-500 mb-2" />
            <span className="font-medium text-purple-600">Schedule Event</span>
          </button>

          <button className="p-4 bg-blue-50 rounded-xl flex flex-col items-center justify-center hover:bg-blue-100 transition">
            <Users className="text-blue-500 mb-2" />
            <span className="font-medium text-blue-600">Add Member</span>
          </button>

          <button className="p-4 bg-red-50 rounded-xl flex flex-col items-center justify-center hover:bg-red-100 transition">
            <Building className="text-red-500 mb-2" />
            <span className="font-medium text-red-600">Temple Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
