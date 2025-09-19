import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Prachar = () => {
  return (
    <div className="bg-[#fff4ec] flex justify-center py-10">
      <div
        className="relative w-[90%] md:w-[85%] lg:w-[80%] rounded-xl overflow-hidden"
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="temple"
          className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 flex flex-col justify-center px-8 md:px-16"
          data-aos="fade-up"
          data-aos-duration="1400"
          data-aos-delay="200"
        >
          <h1
            className="text-3xl md:text-5xl font-semibold text-white leading-snug"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            मंदिर निर्माण और सनातन <br /> धर्म का प्रचार
          </h1>

          <p
            className="text-gray-200 mt-4 max-w-2xl text-base text-md md:text-lg"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का
            प्रचार पारंपरिक वास्तुकला दें।
          </p>
          <br />

          <button
            className="px-8 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3
          transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600"
            data-aos="zoom-in-up"
            data-aos-delay="700"
          >
            दान करें अभी <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prachar;
