import React from "react";

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
        <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-snug">
            मंदिर निर्माण और सनातन <br /> धर्म का प्रचार
          </h1>
          <p className="text-gray-200 mt-4 max-w-2xl text-base md:text-md">
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का
            प्रचार पारंपरिक वास्तुकला दें।
          </p>
          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md w-fit cursor-pointer">
            दान करें अभी →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prachar;
