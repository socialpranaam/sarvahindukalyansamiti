import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { ChevronLeft } from "lucide-react";

const MemberForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/members", memberData);

      Swal.fire({
        title: "Success!",
        text: `${memberData.name} has been added successfully.`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
      }).then(() => {
        navigate("/contact");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 bg-gray-50">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Register Here</h1>
          <p className="text-gray-600 mt-1">Enter Your details .</p>
        </div>
      </div>
      <div className="max-w-3xl w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Be a Member</h2>
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
        {/* <select
          name="status"
          value={memberData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select> */}
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
    </div>
  );
};

export default MemberForm;
