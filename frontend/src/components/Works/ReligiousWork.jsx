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
    <section className="relative bg-orange-50">
      {/* Background Image with Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-72 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/deep.jpg')", // apni image ka path
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Triangle Heading */}
      <div className="relative z-10 text-center pt-80 pb-12">
        <div className="bg-orange-50 relative inline-block w-full">
          {/* Triangle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[180px] border-r-[180px] border-b-[180px] 
            border-l-transparent border-r-transparent border-b-orange-50 ">
          </div>

          {/* Heading + Line */}
          <div className="relative mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-900 whitespace-nowrap">
              <span className="text-orange-500">धार्मिक</span> कार्य
            </h2>
            <div className="w-20 h-[2px] bg-gray-400 mt-2"></div>
          </div>

          {/* Short Intro */}
          <div className="max-w-4xl mx-auto text-center mt-6 px-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
              जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
              सशक्त बनाने के लिए कार्यरत है।
            </p>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 pb-16">
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
