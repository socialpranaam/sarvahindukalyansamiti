import React from "react";

const Team = () => {
  return (
    <section className="bg-[#fff6eb] py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-stretch gap-8 relative">
        
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 relative z-30">
          <div
            className="overflow-hidden shadow-md h-full"
            style={{
              clipPath: "polygon(0 0, 100% 12%, 100% 88%, 0 100%)",
              borderRadius: "3rem",
            }}
          >
            <img
              src="/images/boy1.jpg"
              alt="Team Member"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Content Box (slanted shape) */}
        <div
          className="bg-orange-100 shadow-md p-10 flex flex-col justify-center w-full md:w-[65%] relative z-10 -ml-16 text-gray-900"
          style={{
            clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 92%)", 
            borderRadius: "1.5rem",
          }}
        >
          <h2 className="text-3xl md:text-4xl text-center font-medium mb-6">
            हमारे  <span className="text-orange-500">अध्यक्ष</span> के बारे में 
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
            जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
            सहारा बनाने के लिए कार्यरत है।
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
            जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
            सहारा बनाने के लिए कार्यरत है।
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
            जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
            सहारा बनाने के लिए कार्यरत है।
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
