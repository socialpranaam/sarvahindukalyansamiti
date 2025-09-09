import React from "react";
import { FaQrcode, FaFileInvoice } from "react-icons/fa";

const DonationOption = () => {
  const options = [
    {
      icon: <FaQrcode className="text-orange-500 text-7xl mb-4" />,
      title: "QR कोड स्कैन करें",
      desc: "अपने UPI ऐप से QR कोड स्कैन करें",
      highlight: "तुरंत और आसान",
    },
    {
      icon: <FaFileInvoice className="text-orange-500 text-7xl mb-4" />,
      title: "ऑनलाइन फ़ॉर्म",
      desc: "कार्ड/नेट बैंकिंग से भुगतान करें",
      highlight: "सभी बैंक स्वीकार",
    },
  ];

  return (
    <section className="bg-orange-50 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-orange-600">दान</span> का तरीका चुनें
        </h2>
        <p className="text-gray-700 leading-relaxed">
          आपका सहयोग – हमारी शक्ति।  
          आपका हर छोटा-बड़ा योगदान मंदिर निर्माण, शिक्षा, गो सेवा और समाज कल्याण के लिए अमूल्य है।
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {options.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-8 text-center min-h-[300px] cursor-pointer hover:shadow-lg transition"
          >
            {/* Icon Center */}
            <div className="flex justify-center">{item.icon}</div>

            {/* Title & Text */}
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.desc}</p>
            <p className="text-orange-500 font-medium">{item.highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationOption;
