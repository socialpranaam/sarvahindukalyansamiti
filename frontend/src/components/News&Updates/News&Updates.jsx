import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const NewsUpdates = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Backend se news fetch karna
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/news");
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  // Slider Controls
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newsData.length - 1 ? 0 : prev + 1));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0]; // YYYY-MM-DD
  };

  if (newsData.length === 0) {
    return (
      <div className="py-20 text-center text-gray-600 text-xl">
        समाचार लोड हो रहा है...
      </div>
    );
  }

  return (
    <div className="bg-[#fff4ec] py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
          ताजा <span className="text-orange-500">समाचार</span> और{" "}
          <span className="text-orange-500">अपडेट</span>
        </h2>
        <div className="w-36 h-1 mx-auto mt-2 bg-gradient-to-r from-transparent via-black to-transparent"></div>
      </div>

      {/* Small screen slider */}
      <div className="md:hidden relative max-w-lg mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {newsData.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6"
              data-aos="zoom-in"
            >
              <img
                src={item.img || `http://localhost:8000/uploads/${item.image}`}
                alt={item.title}
                className="w-full h-60 object-cover rounded-xl"
              />
              <div className="mt-5 flex flex-col justify-between flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 text-lg">
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : item.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-orange-500 text-lg font-medium">
                    {formatDate(item.date)}
                  </span>
                  <button
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 cursor-pointer rounded-md text-md font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    अधिक जानें
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition"
          data-aos="fade-right"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition"
          data-aos="fade-left"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Large screen grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {newsData.slice(0, 2).map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <img
              src={item.img || `http://localhost:8000/uploads/${item.image}`}
              alt={item.title}
              className="w-full h-60 object-cover rounded-xl"
            />
            <div className="mt-5 flex flex-col justify-between flex-1">
              <h3 className="text-3xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 text-lg max-w-md">
                {item.description.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-orange-500 text-lg font-medium">
                  {formatDate(item.date)}
                </span>
                <button
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 cursor-pointer rounded-md text-md font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  अधिक जानें
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;
