import React, { useEffect } from "react";
import { Phone, HandHeart, Users, Info } from "lucide-react";
import { CalendarDays } from 'lucide-react';
import { LuLandmark } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCard = () => {
  const navigate = useNavigate();

  const options = [
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "पूजा बुकिंग",
      desc: "तुरंत संपर्क",
      color: "bg-orange-500",
      path: "/contact/pujabookingform",
    },
    {
      icon: <CalendarDays  className="w-8 h-8 text-white" />,
      title: "कार्यक्रम",
      desc: "कार्यक्रम आयोजन",
      color: "bg-orange-500",
      path: "/contact/eventform",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "स्वयंसेवक",
      desc: "पंजीकरण",
      color: "bg-orange-500",
      path: "/contact/memberform",
    },
    {
      icon: <LuLandmark  className="w-8 h-8 text-white" />,
      title: "प्रोजेक्ट",
      desc: "मंदिर निर्माण",
      color: "bg-orange-500",
      path: "/contact/projectform",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative bg-[#fdf3e7] overflow-x-hidden">
     

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 pb-16">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 cursor-pointer transition p-6 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className={`${item.color} p-3 rounded-xl shadow-md mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactCard;
