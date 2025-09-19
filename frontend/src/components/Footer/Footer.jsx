import React from "react";
import { Landmark } from "lucide-react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200">
      {/* Middle Section */}
      <div className=" py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* About */}
          <div>
            <p className="text-white flex items-center gap-1 font-medium mt-2">
              <Landmark size={20}/> सर्व हिन्दू कल्याण समिति
            </p>
            <p className="text-white mt-4 text-sm leading-relaxed">
              धर्म, सेवा और समाज कल्याण की दिशा में आपका विश्वसनीय साथी
            </p>
          </div>

          {/* हमारे कार्य */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              हमारे कार्य
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li> मंदिर निर्माण</li>
              <li> शिक्षा और संस्कार</li>
              <li> गो सेवा</li>
              <li> समाज सेवा</li>
            </ul>
          </div>

          {/* सेवाएं */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              सेवाएं
            </h3>
            <ul className="space-y-2 text-white text-sm">
              <li> पूजा-पाठ बुकिंग</li>
              <li> ज्योतिष परामर्श</li>
              <li> धार्मिक अनुस्थान</li>
              <li> स्वयंसेवा</li>
            </ul>
          </div>

          {/* संपर्क */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              संपर्क
            </h3>
            <ul className="space-y-3 text-white text-sm">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-white" /> +91-9876543210
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-white" /> @sarvhindukalyan.org
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-white" /> 123 धर्म मार्ग, नई दिल्ली
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-4 text-sm text-white  bg-gray-900">
        © 2025 सर्व हिन्दू कल्याण समिति — सभी अधिकार सुरक्षित
      </div>
    </footer>
  );
};

export default Footer;
