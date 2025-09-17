import React, { useState } from "react";

const initialMembers = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    email: "rajesh@gmail.com",
    phone: "9876543210",
    address: "123 Main St, Delhi",
    joined: "Jan 15, 2024",
    membership: "Lifetime",
    status: "Active",
    role: "",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    address: "456 Park Ave, Mumbai",
    joined: "Feb 20, 2024",
    membership: "General",
    status: "Active",
    role: "Event Coordinator",
  },
];

const MemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col">
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-semibold">
          {member.initials}
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {member.name}
          </h3>
          <p className="text-sm text-gray-600">{member.email}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
          {member.membership}
        </span>
        <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
          {member.status}
        </span>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-700 space-y-2">
        <div>📞 {member.phone}</div>
        <div>📍 {member.address}</div>
        <div>📅 Joined {member.joined}</div>
        {member.role && <div>💼 {member.role}</div>}
      </div>
    </div>
  );
};

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(initialMembers);

  // Stats dynamically calculate 
  const stats = [
    {
      label: "Total Members",
      value: members.length,
      color: "text-blue-600",
      bg: "bg-blue-100",
      icon: "👤",
    },
    {
      label: "Lifetime Members",
      value: members.filter((m) => m.membership === "Lifetime").length,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: "⭐",
    },
    {
      label: "Active Volunteers",
      value: members.filter((m) => m.status === "Active").length,
      color: "text-green-600",
      bg: "bg-green-100",
      icon: "🧑‍🤝‍🧑",
    },
    {
      label: "New This Month",
      value: 0,
      color: "text-purple-600",
      bg: "bg-purple-100",
      icon: "🆕",
    },
  ];

  // Search Filter
  const filteredMembers = members.filter((member) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.phone.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Member Management</h1>
        <p className="text-sm text-gray-600">
          Manage community members and volunteers
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-6">
        <button className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
          ⬇ Export
        </button>
        <button
          onClick={() =>
            setMembers([
              ...members,
              {
                initials: "NK",
                name: "New Member",
                email: "new@example.com",
                phone: "9876543222",
                address: "789 Street, Lucknow",
                joined: "Sep 17, 2025",
                membership: "General",
                status: "Active",
                role: "Volunteer",
              },
            ])
          }
          className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
        >
          + Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full ${stat.bg} ${stat.color}`}
              >
                {stat.icon}
              </span>
              <span className="text-lg font-bold text-gray-900">
                {stat.value}
              </span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          className="w-full border rounded-lg px-4 py-2 mb-4 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Memberships</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Status</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Roles</option>
          </select>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 bg-orange-500 text-white rounded-lg">
              ⬜⬜
            </button>
            <button className="p-2 border rounded-lg">☰</button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Members ({filteredMembers.length})
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {filteredMembers.map((member, idx) => (
          <MemberCard key={idx} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
