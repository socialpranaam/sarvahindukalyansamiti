import React from "react";
import {FaArrowRight} from "react-icons/fa" 

const Prachar = () => {
  return (
    <div className="bg-[#fff4ec] flex justify-center py-10">
      <div className="relative w-[90%] md:w-[85%] lg:w-[80%] rounded-xl overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="temple"
          className="w-full h-[350px] md:h-[400px] lg:h-[450px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0  bg-black/30 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-semibold text-white leading-snug">
            मंदिर निर्माण और सनातन <br /> धर्म का प्रचार
          </h1>
          <p className="text-gray-200 mt-4 max-w-2xl text-base text-md md:text-lg">
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का
            प्रचार पारंपरिक वास्तुकला दें।
          </p><br />
          <button className="px-8 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3">
                              दान करें अभी <FaArrowRight />
                            </button>
        </div>
      </div>
    </div>
  );
};

export default Prachar;
