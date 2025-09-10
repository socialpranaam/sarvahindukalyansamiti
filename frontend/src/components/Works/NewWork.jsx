import React from "react";
import { Landmark } from "lucide-react";

const services = [
  {
    title: "पूजा–पाठ बुकिंग",
    points: [
      "मंदिर या घर पर पूजन (गृह प्रवेश, हवन, सत्यनारायण कथा आदि)",
      "ऑनलाइन बुकिंग सुविधा",
      "पंडितजी और सामग्री की संपूर्ण व्यवस्था",
    ],
  },
  {
    title: "ज्योतिष एवं परामर्श",
    points: [
      "मंदिर या घर पर पूजन (गृह प्रवेश, हवन, सत्यनारायण कथा आदि)",
      "ऑनलाइन बुकिंग सुविधा",
      "पंडितजी और सामग्री की संपूर्ण व्यवस्था",
    ],
  },
];

const NewServices = () => {
  return (
    <div className="bg-[#fff2e5] py-12 font-sans">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="text-orange-600">नई </span>सेवाएँ
        </h2>
        <div className="w-16 h-[3px] bg-black mx-auto mt-2"></div>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto px-4">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col space-y-4 h-[320px] w-full max-w-sm"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-orange-400 text-white flex items-center justify-center rounded-lg">
              <Landmark size={28} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900">
              {service.title}
            </h3>

            {/* Points */}
            <ul className="text-gray-700 space-y-2 list-disc list-inside text-sm">
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewServices;
