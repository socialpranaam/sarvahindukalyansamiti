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

    // ✨ Auto-trim for name and remove extra spaces
    if (name === "name") {
      setDonationData({ ...donationData, [name]: value.replace(/\s+/g, " ") });
    } else {
      setDonationData({ ...donationData, [name]: value });
    }
  };

  // ✅ Validation function
  const validateForm = () => {
    const { name, email, phone, amount } = donationData;

    // ✅ Name validation
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(name.trim())) {
      Swal.fire(
        "Validation Error",
        "Please enter a valid name (only letters, at least 3 characters).",
        "warning"
      );
      return false;
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Validation Error", "Please enter a valid email address.", "warning");
      return false;
    }

    // ✅ Phone validation (6–9 start, total 10 digits)
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      Swal.fire(
        "Validation Error",
        "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.",
        "warning"
      );
      return false;
    }

    // ✅ Amount validation
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Swal.fire("Validation Error", "Please enter a valid donation amount.", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...donationData,
          amount: parseInt(donationData.amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit donation");
      }

      await response.json();

      Swal.fire({
        icon: "success",
        title: "Donation Submitted!",
        text: "Your donation has been added successfully.",
        confirmButtonColor: "#f97316",
      }).then(() => navigate("/admin/donations"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "There was an error submitting your donation.",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Add Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={donationData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={donationData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={donationData.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            maxLength="10"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
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
            <option>Health</option>
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
