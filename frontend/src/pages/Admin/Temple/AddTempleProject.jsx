// AddTempleProject.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AddTempleProject = () => {
  const navigate = useNavigate();
  const [templeData, setTempleData] = useState({
    title: "",
    status: "planning",
    description: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert expected month input to YYYY-MM-DD
      let expectedDate = templeData.expected
        ? new Date(templeData.expected + "-01") // month input => first day of month
        : new Date();

      const payload = {
        ...templeData,
        expected: expectedDate,
      };

      const response = await axios.post("http://localhost:8000/projects", payload);
      
      Swal.fire({
        icon: "success",
        title: "Project Added!",
        text: "New temple project has been added successfully.",
        confirmButtonColor: "#f97316",
      }).then(() => {
        navigate("/admin/projects");
      });
    } catch (err) {
      console.error("Error adding project:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add project. Please try again.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Temple Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Project Title" value={templeData.title} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" required />
          <select name="status" value={templeData.status} onChange={handleChange} className="w-full border px-4 py-2 rounded-md">
            <option value="planning">Planning</option>
            <option value="fundraising">Fundraising</option>
            <option value="construction">Construction</option>
          </select>
          <textarea name="description" placeholder="Project Description" value={templeData.description} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" rows={3} required />
          <input type="text" name="location" placeholder="Location" value={templeData.location} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" required />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" name="budget" placeholder="Budget (₹)" value={templeData.budget} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" required />
            <input type="number" name="raised" placeholder="Raised (₹)" value={templeData.raised} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" name="progress" placeholder="Progress (%)" value={templeData.progress} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" min="0" max="100" />
            <input type="month" name="expected" value={templeData.expected} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
          </div>
          <input type="text" name="pm" placeholder="Project Manager" value={templeData.pm} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" required />
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">Add Project</button>
        </form>
      </div>
    </div>
  );
};

export default AddTempleProject;
