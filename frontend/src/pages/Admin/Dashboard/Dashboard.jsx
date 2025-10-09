import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Users,
  CalendarDays,
  HandCoins,
  Handshake,
  IndianRupee,
  Calendar,
  Landmark,
} from "lucide-react";
import { FiUserPlus } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(0);

  const [totalDonations, setTotalDonations] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(0);
  const [templeProjects, setTempleProjects] = useState(0);
  const [activeVolunteers, setActiveVolunteers] = useState(0);
  const [pujaBookings, setPujaBookings] = useState(0);

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // -------------------- Donations --------------------
        const donationRes = await axios.get("http://localhost:8000/donations");
        const donations = donationRes.data;
        const total = donations.reduce((acc, curr) => acc + Number(curr.amount), 0);
        setTotalDonations(total);

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        ];
        const monthly = months.map((m, i) => {
          const monthTotal = donations
            .filter(d => {
              const date = new Date(d.date || d.createdAt);
              return date.getMonth() === i && !isNaN(date);
            })
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
          return { month: m, amount: monthTotal };
        });
        setMonthlyData(monthly);

        const categories = [...new Set(donations.map(d => d.type))];
        const categoryAmounts = categories.map(c => ({
          category: c,
          amount: donations
            .filter(d => d.type === c)
            .reduce((acc, curr) => acc + Number(curr.amount), 0),
        }));
        setCategoryData(categoryAmounts);

        // 🔹 Latest Donation
        const latestDonation = donations.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0];
        const donationItem = latestDonation && {
          type: "donation",
          name: latestDonation.name,
          amount: latestDonation.amount,
          purpose: latestDonation.type,
          time: new Date(latestDonation.date || latestDonation.createdAt),
        };

        // -------------------- Members --------------------
        const memberRes = await axios.get("http://localhost:8000/members");
        const members = memberRes.data;

        // Total Members
        setActiveMembers(members.length);

        // Active Volunteers (status = "Active")
        const activeCount = members.filter((m) => m.status === "Active").length;
        setActiveVolunteers(activeCount);

        // 🔹 Latest Member
        const latestMember = members.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0];
        const memberItem = latestMember && {
          type: "member",
          name: latestMember.name,
          time: new Date(latestMember.joinedAt || latestMember.createdAt),
        };

        // -------------------- Events --------------------
        const eventRes = await axios.get("http://localhost:8000/events");
        const events = eventRes.data;
        setUpcomingEvents(events.length);

        // 🔹 Latest Event
        const latestEvent = events.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0];
        const eventItem = latestEvent && {
          type: "event",
          title: latestEvent.title,
          date: new Date(latestEvent.date || latestEvent.createdAt),
          time: new Date(latestEvent.date || latestEvent.createdAt),
        };

        // -------------------- Projects --------------------
        const projectRes = await axios.get("http://localhost:8000/projects");
        setTempleProjects(projectRes.data.length);

        // -------------------- Puja Bookings --------------------
        const pujaRes = await axios.get("http://localhost:8000/pujabookings");
        const pujas = pujaRes.data;
        setPujaBookings(pujas.length);

        // 🔹 Latest Puja Booking
        const latestPuja = pujas.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))[0];
        const pujaItem = latestPuja && {
          type: "booking",
          name: latestPuja.name,
          service: latestPuja.pujaType || latestPuja.service || "Puja",
          amount: latestPuja.amount,
          time: new Date(latestPuja.date || latestPuja.createdAt),
        };

        //  Combine all latest activities
        const finalActivity = [donationItem, memberItem, eventItem, pujaItem].filter(Boolean);
        setRecentActivity(finalActivity);

      } catch (error) {
        console.error("Dashboard Data Fetch Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-lg text-gray-500">Admin User</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-72 shadow-sm">
            <Search size={18} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search..." className="outline-none w-full text-sm"/>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
              ● System Online
            </div>
          </div>
          <button className="relative">
            <Bell size={30} className="text-gray-600"/>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Donations"
          value={`₹ ${totalDonations}`}
          valueColor="text-green-500"
          icon={<IndianRupee className="text-orange-400"/>}
          color="bg-orange-100"
        />
        <StatCard title="Total Members" value={activeMembers} icon={<Users className="text-blue-500"/>} color="bg-blue-100"/>
        <StatCard title="Upcoming Events" value={upcomingEvents} icon={<Calendar className="text-purple-500"/>} color="bg-purple-100"/>
        <StatCard title="Temple Projects" value={templeProjects} icon={<Landmark className="text-red-500"/>} color="bg-red-100"/>
        <StatCard title="Active Volunteers" value={activeVolunteers} icon={<Handshake className="text-green-500"/>} color="bg-green-100"/>
        <StatCard title="Puja Bookings" value={pujaBookings} icon={<span className="text-yellow-500 text-xl">🕉️</span>} color="bg-yellow-100"/>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Donations Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2} dot/>
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Donations by Category">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="amount" fill="#818cf8"/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, idx) => <ActivityItem key={idx} item={item}/>)
          ) : (
            <p className="text-gray-500 text-sm">No recent activity found</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction icon={<HandCoins className="text-orange-500 mb-2"/>} label="Add Donation" to="/admin/donations/add-donation"/>
          <QuickAction icon={<CalendarDays className="text-purple-500 mb-2"/>} label="Schedule Event" to="/admin/events/add-event"/>
          <QuickAction icon={<FiUserPlus className="text-blue-500 mb-2 text-2xl"/>} label="Add Member" to="/admin/members/add-member"/>
          <QuickAction icon={<Landmark className="text-red-500 mb-2"/>} label="Temple Project" to="/admin/projects/add-templeproject"/>
        </div>
      </div>
    </div>
  );
};

// ---------------------- Reusable Components ----------------------
const StatCard = ({ title, value, icon, color, valueColor }) => (
  <div className="p-6 bg-white rounded-xl shadow flex justify-between items-center">
    <div>
      <h3 className="text-gray-500 text-md">{title}</h3>
      <p className={`text-2xl font-semibold mt-2 ${valueColor}`}>{value}</p>
    </div>
    <div className={`p-3 ${color} rounded-lg`}>{icon}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const ActivityItem = ({ item }) => {
  if (item.type === "donation") {
    return (
      <div className="flex items-start gap-3">
        <div className="p-2 bg-orange-100 rounded-full">
          <HandCoins className="text-orange-500" size={22}/>
        </div>
        <div>
          <p className="font-medium">New donation received</p>
          <p className="text-sm text-gray-500">{item.name} donated ₹{item.amount} for {item.purpose}</p>
          <span className="text-xs text-gray-400">{item.time.toLocaleString()}</span>
        </div>
      </div>
    );
  } else if (item.type === "member") {
    return (
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Users className="text-blue-500" size={22}/>
        </div>
        <div>
          <p className="font-medium">New member joined</p>
          <p className="text-sm text-gray-500">{item.name}</p>
          <span className="text-xs text-gray-400">{item.time.toLocaleString()}</span>
        </div>
      </div>
    );
  } else if (item.type === "event") {
    return (
      <div className="flex items-start gap-3">
        <div className="p-2 bg-purple-100 rounded-full">
          <CalendarDays className="text-purple-500" size={22}/>
        </div>
        <div>
          <p className="font-medium">Event scheduled</p>
          <p className="text-sm text-gray-500">{item.title} on {item.date.toLocaleDateString()}</p>
        </div>
      </div>
    );
  } else if (item.type === "booking") {
    return (
      <div className="flex items-start gap-3">
        <div className="p-2 bg-green-100 rounded-full">
          <Landmark className="text-green-600" size={22}/>
        </div>
        <div>
          <p className="font-medium">New Puja Booking Confirmed</p>
          <p className="text-sm text-gray-500">{item.name} booked {item.service} for ₹{item.amount}</p>
          <span className="text-xs text-gray-400">{item.time.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

const QuickAction = ({ icon, label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => to && navigate(to)}
      className="p-4 bg-gray-50 rounded-xl flex flex-col items-center justify-center hover:bg-gray-100 transition"
    >
      {icon}
      <span className="font-medium text-gray-700">{label}</span>
    </button>
  );
};

export default Dashboard;
