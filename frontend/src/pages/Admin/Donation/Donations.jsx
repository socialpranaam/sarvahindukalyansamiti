import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { FiFileText, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [methodFilter, setMethodFilter] = useState("All Methods");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New donation from Ramesh" },
    { id: 2, message: "Priya Patel updated her donation" },
    { id: 3, message: "System backup completed" },
  ]);

  const navigate = useNavigate();

  // Fetch donations from backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:8000/donations");
        if (!response.ok) throw new Error("Failed to fetch donations");

        const data = await response.json();

        // Format data for table display
        const formattedData = data.map((d) => ({
          ...d,
          amount: `₹${Number(d.amount).toLocaleString()}`,
          amountValue: Number(d.amount),
          date: new Date(d.createdAt).toLocaleDateString("en-GB"),
          id: `SHKS-${d.id}`,
          typeColor:
            d.type === "Temple Construction"
              ? "bg-orange-100 text-orange-700"
              : d.type === "Cow Protection"
              ? "bg-green-100 text-green-700"
              : d.type === "Health Services"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700",
          status: d.status || "Completed",
        }));

        setDonations(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDonations();
  }, []);

  // Filtered donations based on search & filters
  const filteredDonations = donations.filter((d) => {
    const searchMatch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.toLowerCase().includes(search.toLowerCase());

    const typeMatch = typeFilter === "All Types" ? true : d.type === typeFilter;
    const methodMatch =
      methodFilter === "All Methods" ? true : d.payment === methodFilter;

    return searchMatch && typeMatch && methodMatch;
  });

  const totalAmount = filteredDonations.reduce(
    (sum, d) => sum + d.amountValue,
    0
  );
  const totalDonations = filteredDonations.length;

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Donations</h1>
          <p className="text-gray-500 text-lg">Welcome back, Admin</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            ● System Online
          </div>
          <div className="relative">
            <button onClick={() => setNotifications([])}>
              <Bell size={30} className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold flex-1">
            Donation Management
            <span className="ml-2 text-gray-500 text-sm">
              Total: ₹{totalAmount.toLocaleString()} – {totalDonations} donations
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 flex gap-2 items-center rounded-lg text-gray-700 hover:bg-gray-100">
              <FiFileText size={20} /> Export CSV
            </button>
            <button
              onClick={() => navigate("add-donation")}
              className="px-4 py-2 flex gap-2 items-center rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              <FiPlus size={20} /> Add Donation
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <input
            type="text"
            placeholder="Search donors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option>All Types</option>
            <option>Temple Construction</option>
            <option>Cow Protection</option>
            <option>Health Services</option>
            <option>Education</option>
          </select>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option>All Methods</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Netbanking</option>
          </select>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="bg-white rounded-lg shadow overflow-auto max-h-[500px]">
        <table className="w-full min-w-[600px]">
          <thead className="bg-orange-50 sticky top-0 z-10">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">Date</th>
              <th className="p-4">Donor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Type</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDonations.map((d, i) => (
              <tr key={i} className="text-sm">
                <td className="p-4 text-gray-700">{d.date}</td>
                <td className="p-4">
                  <div className="font-medium text-gray-900">{d.name}</div>
                  <div className="text-gray-500 text-xs">{d.id}</div>
                  <div className="text-gray-500 text-xs">{d.email}</div>
                  <div className="text-gray-500 text-xs">{d.phone}</div>
                </td>
                <td className="p-4 font-semibold text-green-600">{d.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${d.typeColor}`}
                  >
                    {d.type}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{d.payment}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
