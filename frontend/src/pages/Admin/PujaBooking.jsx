import React, { useState, useMemo } from "react";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import { Flame, Hourglass, CheckCircle2, IndianRupee } from "lucide-react";
import { HiArrowDownTray } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

const PujaBooking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      puja: "Ganesh Puja",
      client: "Meera Gupta",
      date: "2025-01-25",
      time: "11:00",
      location: "Office Premises",
      phone: "9876543221",
      amount: 1500,
      status: "Pending",
      payment: "Pending",
    },
    {
      id: 2,
      puja: "Satyanarayan Puja",
      client: "Ramesh Yadav",
      date: "2025-01-20",
      time: "10:00",
      location: "Home",
      phone: "9988776655",
      amount: 2000,
      status: "Confirmed",
      payment: "Done",
    },
    {
      id: 3,
      puja: "Lakshmi Puja",
      client: "Priya Sharma",
      date: new Date().toISOString().split("T")[0], 
      time: "08:00",
      location: "Temple",
      phone: "9123456789",
      amount: 1700,
      status: "Pending",
      payment: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // ---- Functions ----
  const confirmBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Confirmed", payment: "Done" } : b
      )
    );
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // ---- Stats ----
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const revenue = bookings.reduce(
      (sum, b) => sum + (b.payment === "Done" ? b.amount : 0),
      0
    );
    const pendingRevenue = bookings.reduce(
      (sum, b) => sum + (b.payment === "Pending" ? b.amount : 0),
      0
    );
    return { total, pending, confirmed, revenue, pendingRevenue };
  }, [bookings]);

  // ---- Filter ----
  const filteredBookings = bookings.filter((b) => {
    const searchMatch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);

    if (activeTab === "Pending") return b.status === "Pending" && searchMatch;
    if (activeTab === "Today") {
      const today = new Date().toISOString().split("T")[0];
      return b.date === today && searchMatch;
    }
    return searchMatch;
  });

  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
        <h1 className="text-3xl font-semibold text-gray-800">Puja Bookings</h1>
        <p className="text-lg text-gray-600">
            Manage online puja requests and sheduling 
          </p>
          </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 flex items-center gap-4 border rounded-lg text-gray-600 hover:bg-gray-100">
           <HiArrowDownTray size={20} /> Export
          </button>
          <button className="px-8 py-3 w-fit mx-auto md:mx-0 cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3 
          transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600">
            <LuPlus size={20}/> New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Bookings */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-orange-100 rounded-lg flex items-center justify-center">
               <Flame className="text-orange-500" size={25} />
            </span>
            <p className="text-gray-500">Total Bookings</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
          <p className="text-sm text-gray-400">+0 this month</p>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="text-yellow-500" size={25} /></span>
            <p className="text-gray-500">Pending Approval</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.pending}</h2>
          <p className="text-sm text-yellow-600">Requires attention</p>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-blue-100 rounded-lg flex items-center justify-center">
            <FiCheckCircle className="text-blue-500" size={25} /></span>
            <p className="text-gray-500">Confirmed</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.confirmed}</h2>
        </div>

        {/* Revenue */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-green-100 rounded-lg flex items-center justify-center">
            <IndianRupee className="text-green-600" size={25} /></span>
            <p className="text-gray-500">Revenue</p>
          </div>
          <h2 className="text-2xl font-semibold flex items-center ">
            <IndianRupee/>{stats.revenue}
          </h2>
          <p className="text-sm text-gray-400">
            ₹{stats.pendingRevenue} pending
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by client name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-300 mb-4">
        {["All Bookings", "Pending", "Today"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}{" "}
            {tab === "All Bookings" && `(${stats.total})`}
            {tab === "Pending" && `(${stats.pending})`}
            {tab === "Today" &&
              `(${bookings.filter(
                (b) => b.date === new Date().toISOString().split("T")[0]
              ).length})`}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        filteredBookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-5 mb-4 "
          >
            <h3 className="text-lg font-semibold">{b.puja}</h3>
            <p className="text-gray-600 mb-3">{b.client}</p>

            <div className="space-y-2 text-gray-600 text-sm mb-3">
              <p className="flex items-center gap-2">
                <Calendar size={16} />{" "}
                {new Date(b.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> {b.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {b.location}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {b.phone}
              </p>
              <p className="font-semibold text-gray-800">₹{b.amount}</p>
            </div>

            {/* Status */}
            <div className="flex gap-2 mb-4">
              <span
                className={`px-3 py-1 text-xs rounded-lg ${
                  b.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {b.status}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-lg ${
                  b.payment === "Done"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                Payment: {b.payment}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {b.status === "Pending" && (
                <button
                  onClick={() => confirmBooking(b.id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                  ✓ Confirm
                </button>
              )}
              <button
                onClick={() => cancelBooking(b.id)}
                className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PujaBooking;
