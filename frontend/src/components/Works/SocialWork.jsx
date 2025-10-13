import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const SocialWork = () => {
  const [services, setServices] = useState([]);
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8000/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // Auto slide
  useEffect(() => {
    if (!services.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [services]);

  // Navigation
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  if (!services.length) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#ffeed8] py-12">
      <div className="text-center mb-8" data-aos="fade-down">
        <h2 className="text-3xl md:text-5xl font-medium">
          <span className="text-orange-400">सामाजिक </span>कार्य
        </h2>
        <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <p
          className="text-gray-700 mt-6 max-w-4xl text-lg mx-auto px-4"
          data-aos="fade-up"
        >
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Slider */}
      <div
        className="relative max-w-5xl mx-auto mt-20 px-6"
        data-aos="zoom-in-up"
      >
        <div
          className="bg-orange-500 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-all duration-200 ease-in-out h-[600px] md:h-[350px]"
        >
          {/* Image */}
          <div className="w-full md:w-1/2 h-full p-4" data-aos="fade-right" data-aos-delay="200">
            <img
              src={services[current].image || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={services[current].title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 text-white p-6 md:p-10 mt-4 md:mt-0" data-aos="fade-left" data-aos-delay="400">
            <h3 className="text-xl md:text-4xl font-semibold leading-snug mb-4">
              {services[current].title}
            </h3>
            <p className="text-sm md:text-base max-w-4xl mb-6">
              {services[current].description}
            </p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold cursor-pointer shadow-md hover:bg-gray-100 flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" data-aos="zoom-in" data-aos-delay="600">
              और जानें
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <button onClick={prevSlide} className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-14 bg-white shadow p-3 rounded-full z-20" data-aos="fade-right">
          <ChevronLeft className="w-10 h-10 text-black" />
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-14 bg-white shadow p-3 rounded-full z-20" data-aos="fade-left">
          <ChevronRight className="w-10 h-10 text-black" />
        </button>
      </div>
    </div>
  );
};

export default SocialWork;
