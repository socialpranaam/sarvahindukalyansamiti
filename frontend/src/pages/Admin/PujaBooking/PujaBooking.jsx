import React, { useState, useEffect, useMemo } from "react";
import {Calendar,Clock,MapPin,Phone,Flame,IndianRupee,} from "lucide-react";
import { HiArrowDownTray } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

const PujaBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Bookings");
  const navigate = useNavigate();

  // ---- Fetch Bookings ----
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/pujabookings");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch bookings",
        });
      }
    };
    fetchBookings();
  }, []);

  // ---- Confirm Booking ----
   const confirmBooking = async (id) => {
    try {
      const booking = bookings.find((b) => b.id === id);
      const updatedBooking = { ...booking, status: "Confirmed", payment: "Done" };

      await axios.put(`http://localhost:8000/pujabookings/${id}`, {
  status: "Confirmed",
  payment: "Done",
});
      setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
      Swal.fire({ icon: "success", title: "Confirmed!" });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to confirm booking" });
    }
  };

  // ---- Cancel Booking ----
  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/pujabookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to cancel booking" });
    }
  };

  // ---- Export PDF ----
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Sarv Hindu Kalyan Samiti", 14, 15);
    doc.setFontSize(12);
    doc.text("Puja Booking Report", 14, 22);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = [
      "ID",
      "Puja Name",
      "Client",
      "Phone",
      "Date",
      "Time",
      "Location",
      "Amount (₹)",
      "Status",
      "Payment",
    ];
    const tableRows = [];

    bookings.forEach((b) => {
      const rowData = [
        b.id,
        b.puja,
        b.client,
        b.phone,
        new Date(b.date).toLocaleDateString("en-GB"),
        b.time,
        b.location,
        b.amount,
        b.status,
        b.payment,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 9 },
    });

    const totalAmount = bookings.reduce(
      (sum, b) => sum + (Number(b.amount) || 0),
      0
    );
    doc.text(`Total Revenue: ₹${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("Puja_Bookings_Report.pdf");
  };

  // ---- Stats ----
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
    const receivedRevenue = bookings.reduce(
      (sum, b) => sum + (b.payment === "Done" ? Number(b.amount) : 0),
      0
    );
    const pendingRevenue = bookings.reduce(
      (sum, b) => sum + (b.payment === "Pending" ? Number(b.amount) : 0),
      0
    );
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = bookings.filter((b) => {
      const d = new Date(b.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    return {
      total,
      pending,
      confirmed,
      totalRevenue,
      receivedRevenue,
      pendingRevenue,
      thisMonth,
    };
  }, [bookings]);

  // ---- Filtered Data ----
  const filteredBookings = bookings.filter((b) => {
    const searchMatch =
      b.client.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    if (activeTab === "Pending") return b.status === "Pending" && searchMatch;
    if (activeTab === "Today") {
      const today = new Date().toISOString().split("T")[0];
      return b.date === today && searchMatch;
    }
    return searchMatch;
  });

  return (
    <div className="h-full w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Puja Bookings
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 mt-1">
            Manage online puja requests and scheduling
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={exportPDF}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 flex items-center justify-center gap-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <HiArrowDownTray size={20} /> Export
          </button>

          <button
            className="w-full sm:w-auto px-4 sm:px-6 py-2 flex justify-center sm:justify-between items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => navigate("add-pujabooking")}
          >
            <LuPlus size={20} /> New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-orange-500" size={25} />
            <p className="text-gray-500 text-sm sm:text-base">Total Bookings</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
          <p className="text-xs sm:text-sm text-gray-400">+{stats.thisMonth} this month</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-yellow-500" size={25} />
            <p className="text-gray-500 text-sm sm:text-base">Pending Approval</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.pending}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FiCheckCircle className="text-blue-500" size={25} />
            <p className="text-gray-500 text-sm sm:text-base">Confirmed</p>
          </div>
          <h2 className="text-2xl font-bold">{stats.confirmed}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-green-600" size={25} />
            <p className="text-gray-500 text-sm sm:text-base">Total Revenue</p>
          </div>
          <h2 className="text-2xl font-bold text-green-700">
            ₹{stats.totalRevenue}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">All bookings payment</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by client name, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-sm flex flex-col"
            >
              <h3 className="text-lg font-semibold">{b.puja}</h3>
              <p className="text-gray-600 mb-3">{b.client}</p>

              <div className="space-y-2 text-gray-600 text-sm mb-3">
                <p className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  {new Date(b.date).toLocaleDateString("en-GB")}
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

              <div className="flex flex-wrap gap-2 mb-4">
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

              <div className="flex flex-col sm:flex-row gap-3">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PujaBooking;
