import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Bell, Landmark } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "Vrindavan Temple Construction",
    status: "construction",
    desc: "Traditional temple complex with modern amenities and community spaces",
    location: "Vrindavan, Uttar Pradesh",
    progress: 75,
    budget: 5000000,
    raised: 3750000,
    expected: "Jun 2025",
    pm: "Shri Govind Das",
  },
  {
    title: "Goshala Expansion",
    status: "fundraising",
    desc: "Expanding cow shelter facility to accommodate 200 more cows",
    location: "Temple Premises",
    progress: 40,
    budget: 1500000,
    raised: 900000,
    expected: "Dec 2024",
    pm: "Gau Seva Committee",
  },
  {
    title: "Educational Complex",
    status: "planning",
    desc: "Vedic education center with modern facilities",
    location: "Mathura Road",
    progress: 10,
    budget: 3000000,
    raised: 600000,
    expected: "Oct 2026",
    pm: "Education Board",
  },
];

const statusColors = {
  construction: "bg-orange-100 text-orange-600",
  fundraising: "bg-pink-100 text-pink-600",
  planning: "bg-blue-100 text-blue-600",
};

const TempleProjects = () => {
  const navigate = useNavigate();

  // Dynamic notification state
  const [notifications, setNotifications] = useState(3);



  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Temple Projects</h1>
          <p className="text-lg text-gray-500">
            Admin Welcome back! Here's what's happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            ● System Online
          </div>
          <button className="relative">
            <Bell size={30} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Manage temple construction and development projects
        </p>
        <button
          className="px-5 py-3 flex justify-between items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => navigate("add-templeproject")}
        >
          <FiPlus size={20} /> New Project
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800 leading-snug w-48 max-w-xs break-words">
                {project.title}
              </h2>
              <span className="p-2 rounded-lg bg-orange-50 text-orange-500">
                <Landmark size={30} />
              </span>
            </div>

            <span
              className={`text-sm px-3 py-1 rounded-full font-medium w-fit mb-3 ${statusColors[project.status]}`}
            >
              {project.status}
            </span>

            <p className="text-gray-600 text-sm mb-3">{project.desc}</p>

            <p className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <FaMapMarkerAlt className="text-gray-400" /> {project.location}
            </p>

            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">
                Progress {project.progress}%
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gray-800 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">
                Raised {((project.raised / project.budget) * 100).toFixed(0)}%
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${(project.raised / project.budget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="text-sm mb-4">
              <p>
                <span className="font-medium">Budget:</span> ₹{project.budget.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Raised:</span>{" "}
                <span className="text-green-600">₹{project.raised.toLocaleString()}</span>
              </p>
            </div>

            <div className="mt-auto text-sm text-gray-600 border-t pt-3">
              <p>
                <span className="font-medium">Expected:</span> {project.expected}
              </p>
              <p className="flex items-center gap-2 mt-1">
                <FaUser className="text-gray-400" /> PM: {project.pm}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleProjects;
