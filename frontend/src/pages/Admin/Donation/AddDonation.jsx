import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDonation = () => {
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    type: "Temple Construction",
    payment: "Cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationData({ ...donationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation Added:", donationData);

    Swal.fire({
      icon: "success",
      title: "Donation Submitted!",
      text: "Your donation has been added successfully.",
      confirmButtonColor: "#f97316",
    }).then(() => {
      navigate("/admin/donations");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-gray-100 p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Add Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={donationData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={donationData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={donationData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            pattern="[0-9]{10}"
            title="Enter 10 digit phone number"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            required
            value={donationData.amount}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            min="1"
          />
          <select
            name="type"
            value={donationData.type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option>Temple Construction</option>
            <option>Cow Protection</option>
            <option>Health Services</option>
            <option>Education</option>
          </select>
          <select
            name="payment"
            value={donationData.payment}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Netbanking</option>
          </select>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonation;
