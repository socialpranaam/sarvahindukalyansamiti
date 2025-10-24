import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Bell, Landmark } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const statusColors = {
  construction: "bg-orange-100 text-orange-600",
  fundraising: "bg-pink-100 text-pink-600",
  planning: "bg-blue-100 text-blue-600",
};

const TempleProjects = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/projects");
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err.response || err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading projects...
      </p>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-[2rem] font-semibold text-gray-800">
            Temple Projects
          </h1>
          <p className="text-sm sm:text-base md:text-[1rem] text-gray-500 mt-1">
            Admin Welcome back! Here's what's happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <div className="bg-green-100 text-green-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base">
            ● System Online
          </div>
          <button className="relative">
            <Bell size={28} className="text-gray-600 sm:text-gray-700" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <p className="text-gray-600 text-sm sm:text-base md:text-[0.95rem]">
          Manage temple construction and development projects
        </p>
        <button
          className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-2.5 flex justify-center sm:justify-between items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600 text-sm sm:text-base md:text-[0.95rem] w-full sm:w-auto"
          onClick={() => navigate("add-templeproject")}
        >
          <FiPlus size={18} /> New Project
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-5">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 flex flex-col border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base sm:text-lg md:text-[1.05rem] font-semibold text-gray-800 leading-snug break-words">
                {project.title}
              </h2>
              <span className="p-2 md:p-2.5 rounded-lg bg-orange-50 text-orange-500">
                <Landmark size={22} className="md:size-6" />
              </span>
            </div>

            <span
              className={`text-xs sm:text-sm md:text-[0.9rem] px-2 sm:px-3 py-1 rounded-full font-medium w-fit mb-3 ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>

            <p className="text-gray-600 text-xs sm:text-sm md:text-[0.9rem] mb-3">
              {project.description}
            </p>

            <p className="flex items-center gap-2 text-xs sm:text-sm md:text-[0.9rem] text-gray-500 mb-3 break-words">
              <FaMapMarkerAlt className="text-gray-400" /> {project.location}
            </p>

            <div className="mb-3">
              <p className="text-xs sm:text-sm md:text-[0.9rem] text-gray-600 mb-1">
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
              <p className="text-xs sm:text-sm md:text-[0.9rem] text-gray-600 mb-1">
                Raised {((project.raised / project.budget) * 100).toFixed(0)}%
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{
                    width: `${(project.raised / project.budget) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="text-xs sm:text-sm md:text-[0.9rem] mb-4">
              <p>
                <span className="font-medium">Budget:</span>{" "}
                ₹{Number(project.budget).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Raised:</span>{" "}
                <span className="text-green-600">
                  ₹{Number(project.raised).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-auto text-xs sm:text-sm md:text-[0.9rem] text-gray-600 border-t pt-2 sm:pt-3">
              <p>
                <span className="font-medium">Expected:</span>{" "}
                {new Date(project.expected).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
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
