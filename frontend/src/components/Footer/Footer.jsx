import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-200">
      {/* Middle Section */}
      <div className="py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            {/* <Link to="/" className="text-white flex items-center gap-1 font-medium mt-2 hover:text-orange-600"> */}
              सर्व हिन्दू कल्याण समिति
            
            <p className="text-white mt-4 text-sm leading-relaxed">
              धर्म, सेवा और समाज कल्याण की दिशा में आपका विश्वसनीय साथी
            </p>
          </div>

          {/* हमारे कार्य */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">हमारे कार्य</h3>
            <ul className="space-y-2 text-white text-sm">
              <li><Link to="/ourworks" className="hover:text-orange-600">मंदिर निर्माण</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">शिक्षा और संस्कार</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">गो सेवा</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">समाज सेवा</Link></li>
            </ul>
          </div>

          {/* सेवाएं */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">सेवाएं</h3>
            <ul className="space-y-2 text-white text-sm">
              <li><Link to="/ourworks" className="hover:text-orange-600">पूजा-पाठ बुकिंग</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">ज्योतिष परामर्श</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">धार्मिक अनुस्थान</Link></li>
              <li><Link to="/ourworks" className="hover:text-orange-600">स्वयंसेवा</Link></li>
            </ul>
          </div>

          {/* संपर्क */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">संपर्क</h3>
            <ul className="space-y-3 text-white text-sm">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-white" />
                <a href="tel:+919876543210" className="hover:text-orange-600">
                  +91-9876543210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-white" />
                <a href="mailto:info@sarvhindukalyan.org" className="hover:text-orange-600 break-all">
                  info@sarvhindukalyan.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-white" />
                <a
                  href="https://www.google.com/maps/search/123+धर्म+मार्ग,+नई+दिल्ली"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600"
                >
                  123 धर्म मार्ग, नई दिल्ली
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-4 text-sm text-white bg-[#0a0a0a]">
        © 2025 सर्व हिन्दू कल्याण समिति — सभी अधिकार सुरक्षित
      </div>
    </footer>
  );
};

export default Footer;
