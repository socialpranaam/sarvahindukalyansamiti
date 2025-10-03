import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddMember = ({ addMember }) => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    membership: "General",
    status: "Active",
    role: "",
  });

  const handleChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const initials = memberData.name
      .trim()
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("");

    const newMember = {
      ...memberData,
      initials,
      joined: new Date().toLocaleDateString(),
    };

    console.log("New Member Added:", newMember);

    if (addMember) {
      addMember(newMember);
    }

    // SweetAlert Success
    Swal.fire({
      title: "Success!",
      text: `${memberData.name} has been added successfully.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#f97316", 
    }).then(() => {
      navigate("/admin/members");
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={memberData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={memberData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={memberData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={memberData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />
        <select
          name="membership"
          value={memberData.membership}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="General">General</option>
          <option value="Lifetime">Lifetime</option>
        </select>
        <select
          name="status"
          value={memberData.status}
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
          value={memberData.role}
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
