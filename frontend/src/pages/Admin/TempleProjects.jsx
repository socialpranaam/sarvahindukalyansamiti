import React from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdOutlineTempleHindu } from "react-icons/md";

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
  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Temple Projects</h1>
          <p className="text-sm text-gray-500">
            Admin Welcome back! Here's what's happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            ● System Online
          </span>
          <button className="relative p-2 bg-gray-100 rounded-full">
            🔔
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Manage temple construction and development projects
        </p>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          + New Project
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col border border-gray-200 hover:shadow-md transition"
          >
            {/* Title & Icon */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800 leading-snug">
                {project.title}
              </h2>
              <span className="p-2 rounded-lg bg-orange-50 text-orange-500">
                <MdOutlineTempleHindu size={24} />
              </span>
            </div>

            {/* Status */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium inline-block mb-3 ${statusColors[project.status]}`}
            >
              {project.status}
            </span>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">{project.desc}</p>

            {/* Location */}
            <p className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <FaMapMarkerAlt className="text-gray-400" /> {project.location}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
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

            {/* Budget & Raised */}
            <div className="text-sm mb-4">
              <p>
                <span className="font-medium">Budget:</span>{" "}
                ₹{project.budget.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Raised:</span>{" "}
                <span className="text-green-600">
                  ₹{project.raised.toLocaleString()}
                </span>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto text-sm text-gray-600 border-t pt-3">
              <p>
                <span className="font-medium">Expected:</span>{" "}
                {project.expected}
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
