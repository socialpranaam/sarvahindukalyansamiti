import React, { useState } from "react";

const FormDonation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
    upiId: "",
    bank: "",
    accountNumber: "",
    ifsc: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "नाम आवश्यक है";
    if (!formData.email) tempErrors.email = "ईमेल आवश्यक है";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "सही ईमेल डालें";
    if (!formData.phone) tempErrors.phone = "मोबाइल नंबर आवश्यक है";
    if (!formData.amount) tempErrors.amount = "राशि आवश्यक है";
    if (!formData.paymentMethod)
      tempErrors.paymentMethod = "भुगतान विकल्प चुनें";

    // Card Validation
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber) tempErrors.cardNumber = "कार्ड नंबर आवश्यक है";
      else if (!/^\d{16}$/.test(formData.cardNumber))
        tempErrors.cardNumber = "16 अंकों का सही कार्ड नंबर डालें";

      if (!formData.expiry) tempErrors.expiry = "समाप्ति तिथि आवश्यक है";

      if (!formData.cvv) tempErrors.cvv = "CVV आवश्यक है";
      else if (!/^\d{3,4}$/.test(formData.cvv))
        tempErrors.cvv = "सही CVV डालें";

      if (!formData.cardName) tempErrors.cardName = "कार्ड पर लिखा नाम आवश्यक है";
    }

    // UPI Validation
    if (formData.paymentMethod === "upi") {
      if (!formData.upiId) tempErrors.upiId = "UPI ID आवश्यक है";
      else if (!/^\S+@\S+$/.test(formData.upiId))
        tempErrors.upiId = "सही UPI ID डालें (जैसे name@upi)";
    }

    // Net Banking Validation
    if (formData.paymentMethod === "netbanking") {
      if (!formData.bank) tempErrors.bank = "बैंक चुनना आवश्यक है";
      if (!formData.accountNumber)
        tempErrors.accountNumber = "खाता नंबर आवश्यक है";
      else if (!/^\d{9,18}$/.test(formData.accountNumber))
        tempErrors.accountNumber = "सही खाता नंबर डालें";

      if (!formData.ifsc) tempErrors.ifsc = "IFSC कोड आवश्यक है";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc))
        tempErrors.ifsc = "सही IFSC कोड डालें (जैसे SBIN0001234)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
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
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardName: "",
        upiId: "",
        bank: "",
        accountNumber: "",
        ifsc: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen h-auto flex items-center justify-center bg-[#ffeed8] py-10">
      <form
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          ऑनलाइन फ़ॉर्म
        </h2>
        <p className="text-sm text-center text-gray-500">सभी बैंक स्वीकार</p>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="नाम"
          className={`border rounded-lg p-3 ${
            errors.name
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-orange-400"
          } focus:outline-none focus:ring-2`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ईमेल"
          className={`border rounded-lg p-3 ${
            errors.email
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-orange-400"
          } focus:outline-none focus:ring-2`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="मोबाइल नंबर"
          className={`border rounded-lg p-3 ${
            errors.phone
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-orange-400"
          } focus:outline-none focus:ring-2`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* Amount */}
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="भुगतान राशि"
          className={`border rounded-lg p-3 ${
            errors.amount
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-orange-400"
          } focus:outline-none focus:ring-2`}
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

        {/* Payment Method */}
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className={`border rounded-lg p-3 ${
            errors.paymentMethod
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-orange-400"
          } focus:outline-none focus:ring-2`}
        >
          <option value="">भुगतान विकल्प चुनें</option>
          <option value="card">क्रेडिट / डेबिट कार्ड</option>
          <option value="netbanking">नेट बैंकिंग</option>
          <option value="upi">यूपीआई (UPI)</option>
        </select>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
        )}

        {/* Card Fields */}
        {formData.paymentMethod === "card" && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="कार्ड नंबर (16 अंक)"
              maxLength="16"
              className={`border rounded-lg p-3 ${
                errors.cardNumber
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`w-1/2 border rounded-lg p-3 ${
                  errors.expiry
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-400"
                } focus:outline-none focus:ring-2`}
              />
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                maxLength="4"
                className={`w-1/2 border rounded-lg p-3 ${
                  errors.cvv
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-400"
                } focus:outline-none focus:ring-2`}
              />
            </div>
            {errors.expiry && (
              <p className="text-red-500 text-sm">{errors.expiry}</p>
            )}
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="कार्ड पर लिखा नाम"
              className={`border rounded-lg p-3 ${
                errors.cardName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm">{errors.cardName}</p>
            )}
          </div>
        )}

        {/* UPI Fields */}
        {formData.paymentMethod === "upi" && (
          <div>
            <input
              type="text"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              placeholder="UPI ID (जैसे name@upi)"
              className={`border rounded-lg p-3 ${
                errors.upiId
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            />
            {errors.upiId && (
              <p className="text-red-500 text-sm">{errors.upiId}</p>
            )}
          </div>
        )}

        {/* Net Banking Fields */}
        {formData.paymentMethod === "netbanking" && (
          <div className="flex flex-col gap-3">
            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className={`border rounded-lg p-3 ${
                errors.bank
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            >
              <option value="">बैंक चुनें</option>
              <option value="sbi">स्टेट बैंक ऑफ इंडिया (SBI)</option>
              <option value="icici">ICICI बैंक</option>
              <option value="hdfc">HDFC बैंक</option>
              <option value="axis">Axis बैंक</option>
              <option value="ubi">Union Bank Of India (UBI)</option>
              <option value="ib">Indian बैंक</option>
              <option value="bob">बैंक ऑफ बड़ौदा (BOB)</option>
              <option value="pnb">PNB</option>
            </select>
            {errors.bank && <p className="text-red-500 text-sm">{errors.bank}</p>}

            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="खाता नंबर"
              className={`border rounded-lg p-3 ${
                errors.accountNumber
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm">{errors.accountNumber}</p>
            )}

            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="IFSC कोड (जैसे SBIN0001234)"
              className={`border rounded-lg p-3 ${
                errors.ifsc
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-orange-400"
              } focus:outline-none focus:ring-2`}
            />
            {errors.ifsc && (
              <p className="text-red-500 text-sm">{errors.ifsc}</p>
            )}
          </div>
        )}

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

export default FormDonation;
