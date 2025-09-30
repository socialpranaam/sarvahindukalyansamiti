import React, { useEffect } from "react";
import { Phone, HandHeart, Users, Info } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactCard = () => {
  const options = [
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "पूजा बुकिंग",
      desc: "तुरंत संपर्क",
      color: "bg-orange-500",
    },
    {
      icon: <HandHeart className="w-8 h-8 text-white" />,
      title: "दान सहायता",
      desc: "मार्गदर्शन",
      color: "bg-orange-500",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "स्वयंसेवक",
      desc: "पंजीकरण",
      color: "bg-orange-500",
    },
    {
      icon: <Info className="w-8 h-8 text-white" />,
      title: "सामान्य जानकारी",
      desc: "सभी सेवाएं",
      color: "bg-orange-500",
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
          {/* Triangle */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[150px] md:border-l-[250px] border-r-[150px] md:border-r-[250px] border-b-[100px] md:border-b-[180px] 
            border-l-transparent border-r-transparent border-b-[#fdf3e7]"
          ></div>

          {/* Heading + Line */}
          <div className="relative mt-[-30px] md:mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 whitespace-nowrap">
              <span className="text-orange-500">संपर्क</span> करें
            </h2>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>

          <div className="max-w-xl mx-auto text-center mt-6 px-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              हमसे जुड़ें और अपने सवाल, सुझाव या सेवा संबंधी जानकारी के लिए संपर्क करें।
            </p>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 pb-16">
        {options.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 cursor-pointer transition p-6 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay={index * 150} 
          >
            {/* Icon Box */}
            <div className={`${item.color} p-3 rounded-xl shadow-md mb-4`}>
              {item.icon}
            </div>
            {/* Text */}
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactCard;
