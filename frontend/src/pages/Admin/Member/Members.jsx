import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiArrowDownTray } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { Phone, MapPin, CalendarDays, BriefcaseBusiness, Users } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";

// PDF libraries
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialMembers = [];

// Member Card component
const MemberCard = ({ member, onDelete }) => {
  const statusColor =
    member.status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-semibold">
          {member.initials}
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.email}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{member.membership}</span>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>{member.status}</span>
      </div>

      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex items-center gap-2"><Phone size={16} /> {member.phone}</div>
        <div className="flex items-center gap-2"><MapPin size={16} /> {member.address}</div>
        <div className="flex items-center gap-2"><CalendarDays size={16} /> Joined {member.joined}</div>
        {member.role && <div className="flex items-center gap-2"><BriefcaseBusiness size={16} /> {member.role}</div>}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(member.id)}
        className="mt-4 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

// Members Component
const Members = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(initialMembers);

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/members");
        const membersWithInitials = res.data.map((m) => ({
          ...m,
          initials: m.name
            .trim()
            .split(" ")
            .map((n) => n[0]?.toUpperCase())
            .join(""),
          joined: m.createdAt
            ? new Date(m.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
        }));
        setMembers(membersWithInitials);
      } catch (error) {
        console.error("Error fetching members:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch members!",
        });
      }
    };
    fetchMembers();
  }, []);

  // Delete member handler with SweetAlert
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/members/${id}`);
        setMembers(prev => prev.filter(m => m.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Member has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting member:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete member.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  // Filter members based on search term
  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return member.name.toLowerCase().includes(searchLower) ||
           member.email.toLowerCase().includes(searchLower) ||
           member.phone.toLowerCase().includes(searchLower);
  });

  // Stats calculations
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const stats = [
    { label: "Total Members", value: members.length, color: "text-blue-600", bg: "bg-blue-200", icon: <Users size={25} className="text-sm"/> },
    { label: "Lifetime Members", value: members.filter((m) => m.membership === "Lifetime").length, color: "text-yellow-600", bg: "bg-yellow-100", icon: <FaRegStar size={25} className="text-sm"/> },
    { label: "Active Volunteers", value: members.filter((m) => m.status === "Active").length, color: "text-green-600", bg: "bg-green-100", icon: <FiUserCheck size={25} className="text-sm"/> },
    { label: "New This Month",
      value: members.filter((m) => {
        if (!m.createdAt) return false;
        const createdDate = new Date(m.createdAt);
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
      }).length,
      color: "text-purple-600", bg: "bg-purple-100", icon: <FiUserPlus size={25} className="text-sm"/> }
  ];

  // Export members to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Members List", 14, 20);

    const tableColumn = ["Name", "Email", "Phone", "Address", "Membership", "Status", "Role", "Joined"];
    const tableRows = filteredMembers.map(member => [
      member.name,
      member.email,
      member.phone,
      member.address,
      member.membership,
      member.status,
      member.role || "-",
      member.joined,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [242, 115, 19] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      didParseCell: function (data) {
        if (data.column.index === 5) {
          if (data.cell.raw === "Active") data.cell.styles.fillColor = [198, 239, 206]; // green
          else if (data.cell.raw === "Inactive") data.cell.styles.fillColor = [255, 199, 206]; // red
        }
      }
    });

    doc.save("members_list.pdf");
    Swal.fire({
      icon: "success",
      title: "Exported!",
      text: "Members PDF has been downloaded.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Member Management</h1>
        <p className="text-lg text-gray-600">Manage community members and volunteers</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={exportPDF}
          className="px-5 py-3 flex justify-between border border-gray-300 rounded-lg gap-2 text-gray-700 hover:bg-gray-100"
        >
          <HiArrowDownTray size={20}/> Export
        </button>
        <button
          onClick={() => navigate("add-member")}
          className="px-5 py-3 flex justify-between items-center gap-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        >
          <GoPlus size={25}/> Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-start">
            <div>
              <p className="text-lg text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-semibold`}>{stat.value}</p>
            </div>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.bg}`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="w-full border rounded-lg px-4 py-2 mb-4 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Members List */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Members ({filteredMembers.length})</h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} onDelete={handleDelete} />
        ))}
      </div>   
    </div>
  );
};

export default Members;
