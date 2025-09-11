import React from "react";

const ContactForm = () => {
  return (
    <section className="bg-[#fdf3e7] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">
          संपर्क <span className="text-orange-500">फ़ॉर्म</span>
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                नाम
              </label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना नाम लिखें"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ईमेल
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना ईमेल लिखें"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                फोन नंबर
              </label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="फोन नंबर डालें"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                विषय
              </label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="विषय लिखें"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              संदेश
            </label>
            <textarea
              rows="6"
              className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="अपना संदेश लिखें"
            ></textarea>
          </div>

          
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              संपर्क करें अभी →
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
