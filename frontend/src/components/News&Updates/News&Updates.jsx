import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const newsData = [
  {
    id: 1,
    title: "नया मंदिर उद्घाटन",
    desc: "गुड़गांव में नवनिर्मित श्री राम मंदिर का भव्य उद्घाटन समारोह।",
    date: "15 जनवरी 2024",
    img: "/images/aarti.jpg",
  },
  {
    id: 2,
    title: "निःशुल्क स्वास्थ्य शिविर",
    desc: "दिल्ली के 10 केंद्रों में निःशुल्क चिकित्सा जांच और परामर्श।",
    date: "20–22 जनवरी 2024",
    img: "/images/aarti.jpg",
  },
];

const NewsUpdates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === newsData.length - 1 ? 0 : prev + 1));
  };

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
          {newsData.map((item) => (
            <div
              key={item.id}
              className="min-w-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6"
              data-aos="zoom-in"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-60 object-cover rounded-xl"
              />
              <div className="mt-5 flex flex-col justify-between flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 text-lg">{item.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-orange-500 text-lg font-medium">
                    {item.date}
                  </span>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 cursor-pointer rounded-md text-md font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    data-aos="fade-up"
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
        {newsData.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-60 object-cover rounded-xl"
            />
            <div className="mt-5 flex flex-col justify-between flex-1">
              <h3 className="text-3xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 text-lg max-w-xs">{item.desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-orange-500 text-lg font-medium">
                  {item.date}
                </span>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 cursor-pointer rounded-md text-md font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  data-aos="zoom-in-up"
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
