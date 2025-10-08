import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Backend connection added here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !phone || !subject || !message) {
      Swal.fire({
        icon: "error",
        title: "सभी फील्ड भरें",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "फोन नंबर 10 अंकों का होना चाहिए और 6/7/8/9 से शुरू होना चाहिए",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "सही ईमेल डालें",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "आपका फॉर्म सफलतापूर्वक भेज दिया गया है।",
          confirmButtonColor: "#f97316",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: data.error || "कुछ गलती हुई है।",
          confirmButtonColor: "#f97316",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "सर्वर से कनेक्शन नहीं हो सका!",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <section className="bg-[#fdf3e7] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8" data-aos="fade-up">
        <h2 className="text-5xl font-medium text-center mb-8" data-aos="zoom-in">
          संपर्क <span className="text-orange-500">फ़ॉर्म</span>
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16" data-aos="fade-up" data-aos-delay="100">
            <div>
              <label className="block text-md font-bold mb-1">नाम</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना नाम लिखें"
                required
              />
            </div>
            <div>
              <label className="block text-md font-bold mb-1">ईमेल</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="अपना ईमेल लिखें"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-aos="fade-up" data-aos-delay="200">
            <div>
              <label className="block text-md font-bold mb-1">फोन नंबर</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="फोन नंबर डालें"
                required
              />
            </div>
            <div>
              <label className="block text-md font-bold mb-1">विषय</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="विषय लिखें"
                required
              />
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <label className="block text-md font-bold mb-1">संदेश</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="अपना संदेश लिखें"
              required
            ></textarea>
          </div>

          <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="400">
            <button
              type="submit"
              className="px-8 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600"
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
