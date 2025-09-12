import React from "react";

const Hero = () => {
  return (
    <div
      className="relative h-[630px] w-full bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
      }}
    >
      {/* Left Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 md:px-12 text-left text-white ml-24 flex flex-col justify-center h-full">
        <h1 className="text-3xl md:text-5xl font-md leading-snug">
          आइए, मिलकर बनाएँ <span className="text-orange-500">मंदिर</span>, <br />
          बचाएँ <span className="text-orange-500">संस्कृति</span> और करें <br />
          समाज की सेवा।
        </h1>
        <p className="mt-6 text-base md:text-md text-gray-200 max-w-xl">
          धर्म, सेवा और समाज कल्याण की दिशा में – सर्व हिन्द कल्याण समिति धर्म, सेवा और 
समाज कल्याण की दिशा में कल्याण समिति धर्म, सेवा और समाज कल्याण की दिशा में 
हिन्द कल्याण समिति ।
        </p>
      </div>
    </div>
  );
};

export default Hero;
