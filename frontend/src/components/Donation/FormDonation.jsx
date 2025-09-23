import React, { useState } from "react";

const OnlinePaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "नाम आवश्यक है";
    if (!formData.email) tempErrors.email = "ईमेल आवश्यक है";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "सही ईमेल डालें";
    if (!formData.phone) tempErrors.phone = "मोबाइल नंबर आवश्यक है";
    if (!formData.amount) tempErrors.amount = "राशि आवश्यक है";
    if (!formData.paymentMethod) tempErrors.paymentMethod = "भुगतान विकल्प चुनें";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      setSuccess("भुगतान फ़ॉर्म सफलतापूर्वक भेजा गया!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        amount: "",
        paymentMethod: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffeed8]">
      <form
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">ऑनलाइन फ़ॉर्म</h2>
        <p className="text-sm text-center text-gray-500">सभी बैंक स्वीकार</p>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="नाम"
          className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
            errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ईमेल"
          className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="मोबाइल नंबर"
          className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
            errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="भुगतान राशि"
          className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
            errors.amount ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
          }`}
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={`border rounded-lg p-3 focus:outline-none focus:ring-2 ${
            errors.paymentMethod ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-orange-400"
          }`}
        >
          <option value="">भुगतान विकल्प चुनें</option>
          <option value="card">क्रेडिट / डेबिट कार्ड</option>
          <option value="netbanking">नेट बैंकिंग</option>
        </select>
        {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg p-3 transition-colors"
        >
          भुगतान करें
        </button>

        {success && <p className="text-green-500 text-center mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default OnlinePaymentForm;
