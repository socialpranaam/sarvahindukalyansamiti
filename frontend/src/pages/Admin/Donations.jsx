import React, { useState } from "react";
import { Bell } from "lucide-react";
import { FiFileText, FiPlus } from "react-icons/fi";


const initialDonations = [
  {
    date: "15 Jun 2023",
    name: "Rahul Sharma",
    id: "SHKS-1001",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    amount: "₹5,000",
    amountValue: 5000,
    type: "Temple Construction",
    typeColor: "bg-orange-100 text-orange-700",
    payment: "Netbanking",
    status: "Completed",
  },
  {
    date: "12 Jun 2023",
    name: "Priya Patel",
    id: "SHKS-1002",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    amount: "₹10,000",
    amountValue: 10000,
    type: "Cow Protection",
    typeColor: "bg-green-100 text-green-700",
    payment: "UPI",
    status: "Completed",
  },
  {
    date: "10 Jun 2023",
    name: "Amit Verma",
    id: "SHKS-1003",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    amount: "₹2,500",
    amountValue: 2500,
    type: "Health Services",
    typeColor: "bg-blue-100 text-blue-700",
    payment: "Cash",
    status: "Completed",
  },
  {
    date: "08 Jun 2023",
    name: "Sunita Gupta",
    id: "SHKS-1004",
    email: "sunita@example.com",
    phone: "+91 65432 10987",
    amount: "₹7,500",
    amountValue: 7500,
    type: "Education",
    typeColor: "bg-purple-100 text-purple-700",
    payment: "Netbanking",
    status: "Completed",
  },
  {
    date: "05 Jun 2023",
    name: "Rajesh Kumar",
    id: "SHKS-1005",
    email: "rajesh@example.com",
    phone: "+91 54321 09876",
    amount: "₹2,500",
    amountValue: 2500,
    type: "Temple Construction",
    typeColor: "bg-orange-100 text-orange-700",
    payment: "Cash",
    status: "Completed",
  },
  {
    date: "05 Jun 2023",
    name: "Mahesh Kumar",
    id: "SHKS-1008",
    email: "rajesh@example.com",
    phone: "+91 54321 09876",
    amount: "₹2,000",
    amountValue: 2000,
    type: "Temple Construction",
    typeColor: "bg-orange-100 text-orange-700",
    payment: "UPI",
    status: "Completed",
  },
];

const Donations = () => {
  const [donations] = useState(initialDonations); // ab setDonations ki need nahi
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [methodFilter, setMethodFilter] = useState("All Methods");

  // Filter logic
  const filteredDonations = donations.filter((d) => {
    const searchMatch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.toLowerCase().includes(search.toLowerCase());

    const typeMatch =
      typeFilter === "All Types" ? true : d.type === typeFilter;

    const methodMatch =
      methodFilter === "All Methods" ? true : d.payment === methodFilter;

    return searchMatch && typeMatch && methodMatch;
  });

  // Total calculation
  const totalAmount = filteredDonations.reduce(
    (sum, d) => sum + d.amountValue,
    0
  );
  const totalDonations = filteredDonations.length;

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Donor Name",
      "Donor ID",
      "Email",
      "Phone",
      "Amount",
      "Type",
      "Payment Method",
      "Status",
    ];

    const rows = filteredDonations.map((d) => [
      d.date,
      d.name,
      d.id,
      d.email,
      d.phone,
      d.amount,
      d.type,
      d.payment,
      d.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" min-h-screen ">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Donations</h1>
          <p className="text-gray-500 text-lg">Welcome back, Admin</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            ● System Online
          </div>
          <div className="relative">
             <button>
            <Bell size={30} className="text-gray-600" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold">
            Donation Management
            <span className="ml-2 text-gray-500 text-sm">
              Total: ₹{totalAmount.toLocaleString()} – {totalDonations} donations
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-5 py-3 border border-gray-300 flex justify-between items-center gap-2 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiFileText size={20}/> Export CSV
            </button>
            <button
              className="px-5 py-3 flex justify-between items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
            >
              <FiPlus size={20}/> Add Donation
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-50">
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
            {filteredDonations.length > 0 ? (
              filteredDonations.map((d, index) => (
                <tr key={index} className="text-sm">
                  <td className="p-4 text-gray-700">{d.date}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{d.name}</div>
                    <div className="text-gray-500 text-xs">{d.id}</div>
                    <div className="text-gray-500 text-xs">{d.email}</div>
                    <div className="text-gray-500 text-xs">{d.phone}</div>
                  </td>
                  <td className="p-4 font-semibold text-green-600">
                    {d.amount}
                  </td>
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500 text-sm"
                >
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
