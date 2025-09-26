import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, IndianRupee, User, Phone, Calendar, Clock, MapPin, Flame } from "lucide-react";
import Swal from "sweetalert2";

const AddPujaBooking = ({ onAddBooking }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    puja: "",
    client: "",
    date: "",
    time: "",
    location: "",
    phone: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.puja || !formData.client || !formData.date || !formData.phone || !formData.amount) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please fill all required fields!',
      });
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
      status: "Pending",
      payment: "Pending",
    };

    // Simulate saving booking
    console.log("New Booking Data:", newBooking);
    Swal.fire({
      icon: 'success',
      title: 'Booking Added!',
      text: 'Your Puja booking has been successfully added.',
      timer: 2000,
      showConfirmButton: true,
    }).then(() => {
      navigate(-1);
    });

    // If you want to pass back to parent:
    // onAddBooking(newBooking);
  };

  return (
    <div className="h-full w-full p-4 md:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">New Puja Booking</h1>
          <p className="text-gray-600 mt-1">Enter the details for the new booking.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Puja Name */}
            <div className="md:col-span-2">
              <label htmlFor="puja" className="block text-sm font-medium text-gray-700 mb-1">
                Puja Name
              </label>
              <div className="relative">
                <Flame className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="text"
                  name="puja"
                  id="puja"
                  value={formData.puja}
                  onChange={handleChange}
                  placeholder="e.g., Satyanarayan Puja"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Client Name */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="text"
                  name="client"
                  id="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="e.g., Ramesh Yadav"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., 9988776655"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location / Address
              </label>
              <div className="relative">
                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Home, Office Premises"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g., 2000"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPujaBooking;
