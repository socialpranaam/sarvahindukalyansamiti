import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Team = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // animation ki speed (ms me)
      once: true,     // ek hi baar chale, scroll karne par repeat na ho
    });
  }, []);

  return (
    <section className="bg-[#fff6eb] py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-stretch gap-8 relative">
        
        {/* Left Side - Image */}
        <div
          className="w-full md:w-1/2 relative z-30"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
        >
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

        {/* Right Side - Content */}
        <div
          className="bg-orange-100 shadow-md px-8 md:pl-16 md:pr-12 py-10 flex flex-col justify-center w-full md:w-[65%] relative z-10 -mt-16 md:mt-0 md:-ml-16 text-gray-900"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
          data-aos-delay="200"
          style={{
            clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 92%)", 
            borderRadius: "1.5rem",
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-medium mb-6">
            हमारे <span className="text-orange-500">अध्यक्ष</span> के बारे में
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
