import React, { useState, useRef } from "react";
import { FaQrcode, FaFileInvoice } from "react-icons/fa";
import QrDonation from "./QRDonation";
import FormDonation from "./FormDonation";

const DonationOption = () => {
  const [active, setActive] = useState(null);
  const scrollRef = useRef(null); 
  const options = [
    {
      id: "qr",
      icon: <FaQrcode className="text-orange-500 text-8xl mb-4" />,
      title: "QR कोड स्कैन करें",
      desc: "अपने UPI ऐप से QR कोड स्कैन करें",
      highlight: "तुरंत और आसान",
    },
    {
      id: "form",
      icon: <FaFileInvoice className="text-orange-500 text-8xl mb-4" />,
      title: "ऑनलाइन फ़ॉर्म",
      desc: "कार्ड/नेट बैंकिंग से भुगतान करें",
      highlight: "सभी बैंक स्वीकार",
    },
  ];

  const handleClick = (id) => {
    setActive(id);
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="relative bg-[#fdf3e7] overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/deep.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Triangle Heading */}
      <div className="relative z-10 text-center pt-48 md:pt-80 pb-12">
        <div className="bg-[#fdf3e7] relative inline-block w-full">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[150px] md:border-l-[250px] border-r-[150px] md:border-r-[250px] border-b-[100px] md:border-b-[180px] 
            border-l-transparent border-r-transparent border-b-[#fdf3e7]"
          ></div>

          <div className="relative mt-[-30px] md:mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 whitespace-nowrap">
              <span className="text-orange-500">दान</span> का तरीका<br /> चुनें
            </h2>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>

          <div className="max-w-lg mx-auto text-center mt-6 px-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              आपका सहयोग – हमारी शक्ति।  
              आपका हर छोटा-बड़ा योगदान मंदिर निर्माण, शिक्षा, गो सेवा और समाज कल्याण के लिए अमूल्य है।
            </p>
          </div>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="flex md:grid md:grid-cols-2 gap-8 overflow-x-auto scrollbar-hide">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex-shrink-0 md:flex-shrink bg-white rounded-2xl overflow-hidden cursor-pointer 
                transition p-6 text-center  hover:bg-orange-100 hover:border-2 border-orange-400 ${
                  active === item.id ? "border-2 border-orange-300" : ""
                } md:w-auto w-72`}
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-2xl font-semibold mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.desc}</p>
              <p className="text-orange-500 font-sm">{item.highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Display with Scroll */}
      <div ref={scrollRef} className="w-full mx-auto text-center">
        {active === "qr" && <QrDonation />}
        {active === "form" && <FormDonation />}
      </div>
    </section>
  );
};

export default DonationOption;
