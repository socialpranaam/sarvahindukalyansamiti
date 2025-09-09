import React from "react";

const AboutMission = () => {
  return (
    <div className="relative w-full bg-[#fff7f0]">
      {/* Heading */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold">
          हमारे <span className="text-orange-500">बारे</span> में
        </h2>
        <div className="w-16 h-[2px] bg-black mx-auto mt-2"></div>
      </div>

      {/* Content */}
      <div className="pb-16 max-w-4xl mx-auto text-center px-6">
        <p className="text-lg text-gray-800 mb-10">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div
            className="relative rounded-xl overflow-hidden text-white h-[450px] flex items-start"
            style={{
              backgroundImage: "url('/images/aarti.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative  top-0 left-0 right-0 z-10">
              <div className="bg-orange-500/40 p-4 rounded-md mx-8 inline-block">
                <h3 className="text-2xl font-bold text-white text-center mb-3 pt-6">
                  हमारा मिशन
                </h3>
                <p className="text-base leading-relaxed text-white">
                  धर्म, सेवा और समाज कल्याण को एकजुट कर हर गाँव और नगर में मंदिर निर्माण करना। <br />
                  हमारा लक्ष्य है कि प्रत्येक व्यक्ति को आस्था का केंद्र मिले,
                  जहाँ भक्ति, संस्कार और एकता का दीप सदैव प्रज्ज्वलित रहे। <br />
                  साथ ही हम शिक्षा, भोजन, स्वास्थ्य और गौसेवा जैसी सेवाओं द्वारा
                  समाज को सशक्त बनाना चाहते हैं।
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
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative  top-0 left-0 right-0 z-10">
              <div className="bg-orange-500/40 p-4 rounded-md mx-8 inline-block">
                <h3 className="text-2xl font-bold text-white text-center mb-3 pt-6">
                  हमारा विज़न
                </h3>
                <p className="text-base leading-relaxed text-white">
                  धर्म, सेवा और समाज कल्याण को एकजुट कर हर गाँव और नगर में मंदिर निर्माण करना। <br />
                  हमारा लक्ष्य है कि प्रत्येक व्यक्ति को आस्था का केंद्र मिले,
                  जहाँ भक्ति, संस्कार और एकता का दीप सदैव प्रज्ज्वलित रहे। <br />
                  साथ ही हम शिक्षा, भोजन, स्वास्थ्य और गौसेवा जैसी सेवाओं द्वारा
                  समाज को सशक्त बनाना चाहते हैं।
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
