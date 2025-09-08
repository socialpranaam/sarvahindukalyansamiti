import React from "react";

const Hero = () => {
  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        

      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-left text-white flex flex-col justify-center h-full">
        <h1 className="text-3xl md:text-6xl font-bold leading-snug">
          आइए, मिलकर बनाएँ <span className="text-orange-500">मंदिर</span>, <br />
          बचाएँ <span className="text-orange-500">संस्कृति</span> और करें <br />
          समाज की सेवा।
        </h1>
        <p className="mt-6 text-lg md:text-lg text-gray-200 max-w-3xl">
          धर्म, सेवा और समाज कल्याण की दिशा में – सर्व हिन्दू कल्याण समिति। <br />
          धर्म, सेवा और समाज कल्याण की दिशा में – सर्व हिन्दू कल्याण समिति।
        </p>
      </div>
    </div>
  );
};

export default Hero;
