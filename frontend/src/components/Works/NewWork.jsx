import React, { useEffect } from "react";
import { Landmark, BookOpenCheck, Sun } from "lucide-react"; 
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "पूजा–पाठ बुकिंग",
    icon: <BookOpenCheck size={30} />,
    points: [
      "मंदिर या घर पर पूजन (गृह प्रवेश, हवन, सत्यनारायण कथा आदि)",
      "ऑनलाइन बुकिंग सुविधा",
      "पंडितजी और सामग्री की संपूर्ण व्यवस्था",
    ],
  },
  {
    title: "ज्योतिष एवं परामर्श",
    icon: <Sun size={30} />,
    points: [
      "जन्म कुंडली और राशि विश्लेषण",
      "ऑनलाइन/ऑफलाइन परामर्श",
      "जीवन और करियर संबंधी मार्गदर्शन",
    ],
  },
];

const NewWork = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#fff6eb] py-12">
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-4xl md:text-5xl font-medium">
          <span className="text-orange-500">नई </span>सेवाएँ
        </h2>
        <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <p
          className="text-gray-700 mt-4 max-w-4xl text-lg mx-auto px-4"
          data-aos="fade-up"
        >
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Cards */}
      {/* Cards */}
<div className="max-w-4xl mx-auto flex flex-col md:flex-row md:flex-wrap justify-center gap-10 px-6">
  {services.map((service, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-xl p-6 flex flex-col space-y-4 h-[280px] w-full md:w-[45%] hover:shadow-xl"
      data-aos="zoom-in-up"
      data-aos-delay={index * 200} 
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-orange-400 text-white flex items-center justify-center rounded-lg">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900">
        {service.title}
      </h3>

      {/* Points */}
      <ul className="text-gray-700 space-y-2 text-md">
        {service.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

    </div>
  );
};

export default NewWork;
