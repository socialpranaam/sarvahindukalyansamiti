import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // animation ki duration
      once: true,     // ek hi baar chale scroll par
    });
  }, []);

  return (
    <div className="relative bg-[#fdf3e7] overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* White Triangle Box Full Width */}
      <div className="relative z-10 text-center pt-48 md:pt-80 pb-12">
        <div className="bg-[#fdf3e7] relative inline-block w-full">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[150px] md:border-l-[250px] border-r-[150px] md:border-r-[250px] border-b-[100px] md:border-b-[180px] 
            border-l-transparent border-r-transparent border-b-[#fdf3e7]"
          ></div>

          <div className="relative mt-[-30px] md:mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 whitespace-nowrap">
              हमारे <span className="text-orange-500">बारे</span> में
            </h2>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>

          {/* Text Content */}
          <div className="max-w-4xl mx-auto text-center flex justify-center mt-6 px-6">
            <p className="text-lg text-[#222222] max-w-lg leading-relaxed">
              सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है, जो भारत
              की सनातन संस्कृति, परंपराओं और आध्यात्मिकता को सशक्त बनाने के लिए
              कार्यरत है।
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="pb-16 max-w-5xl mx-auto text-center mt-0 md:mt-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div
            className="relative rounded-xl overflow-hidden text-white h-[450px] flex items-start"
            style={{
              backgroundImage: "url('/images/aarti.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-aos="fade-down"
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 w-full">
              <div className="bg-[#e5721b]/60 p-6 rounded-b-2xl mx-4 md:mx-9 inline-block">
                <h3 className="text-4xl md:text-5xl font-medium text-white text-center mt-6">
                  हमारा मिशन
                </h3>
                <p className="text-base leading-relaxed mt-4 text-white">
                  धर्म, सेवा और समाज कल्याण को एकजुट कर हर गाँव और नगर में मंदिर
                  निर्माण करना। <br />
                  हमारा लक्ष्य है कि प्रत्येक व्यक्ति को आस्था का केंद्र मिले,
                  जहाँ भक्ति, संस्कार और एकता का दीप सदैव प्रज्ज्वलित रहे।{" "}
                  <br />
                  साथ ही हम शिक्षा, भोजन, स्वास्थ्य और गौसेवा जैसी सेवाओं
                  द्वारा समाज को सशक्त बनाना चाहते हैं।
                </p>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className="relative rounded-xl overflow-hidden text-white h-[450px] flex items-start"
            style={{
              backgroundImage: "url('/images/deep.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-12 w-full">
              <div className="bg-orange-500/60 p-6 rounded-b-2xl mx-4 md:mx-9 inline-block">
                <h3 className="text-4xl md:text-5xl font-medium text-white text-center mt-6">
                  हमारा विज़न
                </h3>
                <p className="leading-relaxed mt-4 text-white">
                  धर्म, सेवा और समाज कल्याण को एकजुट कर हर गाँव और नगर में मंदिर
                  निर्माण करना। <br />
                  हमारा लक्ष्य है कि प्रत्येक व्यक्ति को आस्था का केंद्र मिले,
                  जहाँ भक्ति, संस्कार और एकता का दीप सदैव प्रज्ज्वलित रहे।{" "}
                  <br />
                  साथ ही हम शिक्षा, भोजन, स्वास्थ्य और गौसेवा जैसी सेवाओं
                  द्वारा समाज को सशक्त बनाना चाहते हैं।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
