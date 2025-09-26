// AddMemberPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMember = ({ addMember }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    membership: "General",
    status: "Active",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create initials from name
    const initials = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    // Add new member
    addMember({ ...formData, initials, joined: new Date().toLocaleDateString() });

    // Redirect to Members page
    navigate("/admin/members");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <select
          name="membership"
          value={formData.membership}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="General">General</option>
          <option value="Lifetime">Lifetime</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="text"
          name="role"
          placeholder="Role (optional)"
          value={formData.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
