import React from "react";

const ReligiousWork = () => {
  const projects = [
    {
      title: "12 माह में 100 मंदिर निर्माण का संकल्प",
      desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार",
      img: "/images/mahadev.webp",
    },
    {
      title: "प्राचीन शिल्पकला और वैदिक परंपरा अनुसार मंदिर निर्माण",
      desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार",
      img: "/images/deep.jpg",
    },
    {
      title: "धार्मिक अनुष्ठान, भजन, सत्संग और यज्ञ",
      desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार",
      img: "/images/temple.jpg",
    },
  ];

  return (
    <section className="bg-orange-50 py-12">
<div className="relative w-full">
      {/* Heading */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold ">
           <span className="text-orange-500">धार्मिक</span> कार्य
        </h2>
        <div className="w-16 h-[2px] bg-black mx-auto "></div>
      </div>

      {/* Content */}
      <div className="pb-16 max-w-4xl mx-auto text-center px-6">
        <p className="text-lg text-gray-800 mb-10">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
        </div>
        </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {projects.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReligiousWork;
