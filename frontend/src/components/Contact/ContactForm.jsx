import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-[#fdf3e7] py-16 px-4">
      <div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8"
        data-aos="fade-up"
      >
        {/* Heading */}
        <h2
          className="text-5xl font-medium text-center mb-8"
          data-aos="zoom-in"
        >
          संपर्क <span className="text-orange-500">फ़ॉर्म</span>
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {/* Name & Email */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div>
              <label className="block text-md font-bold mb-1">नाम</label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना नाम लिखें"
              />
            </div>
            <div>
              <label className="block text-md font-bold mb-1">ईमेल</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना ईमेल लिखें"
              />
            </div>
          </div>

          {/* Phone & Subject */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div>
              <label className="block text-md font-bold mb-1">फोन नंबर</label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="फोन नंबर डालें"
              />
            </div>
            <div>
              <label className="block text-md font-bold mb-1">विषय</label>
              <input
                type="text"
                className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="विषय लिखें"
              />
            </div>
          </div>

          {/* Message */}
          <div data-aos="fade-up" data-aos-delay="300">
            <label className="block text-md font-bold mb-1">संदेश</label>
            <textarea
              rows="6"
              className="w-full border border-gray-200  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="अपना संदेश लिखें"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div
            className="flex justify-center"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <button
              type="submit"
              className="px-8 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3
              transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600"
            >
              संपर्क करें अभी <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
