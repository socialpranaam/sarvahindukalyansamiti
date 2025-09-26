// AddTempleProject.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTempleProject = () => {
  const navigate = useNavigate();
  const [templeData, setTempleData] = useState({
    title: "",
    status: "planning",
    desc: "",
    location: "",
    progress: "",
    budget: "",
    raised: "",
    expected: "",
    pm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempleData({ ...templeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Project Data:", templeData);

    Swal.fire({
      icon: "success",
      title: "Project Added!",
      text: "New temple project has been added successfully.",
      confirmButtonColor: "#f97316",
    }).then(() => {
      navigate("/admin/projects"); 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Temple Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={templeData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={templeData.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="planning">Planning</option>
            <option value="fundraising">Fundraising</option>
            <option value="construction">Construction</option>
          </select>

          {/* Description */}
          <textarea
            name="desc"
            placeholder="Project Description"
            value={templeData.desc}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            rows={3}
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={templeData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          {/* Budget & Raised */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="budget"
              placeholder="Budget (₹)"
              value={templeData.budget}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
            <input
              type="number"
              name="raised"
              placeholder="Raised (₹)"
              value={templeData.raised}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Progress & Expected Completion */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="progress"
              placeholder="Progress (%)"
              value={templeData.progress}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              min="0"
              max="100"
            />
            <input
              type="month"
              name="expected"
              value={templeData.expected}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          {/* Project Manager */}
          <input
            type="text"
            name="pm"
            placeholder="Project Manager"
            value={templeData.pm}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTempleProject;
