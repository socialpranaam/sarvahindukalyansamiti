import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const services = [
  {
    title: "मंदिर निर्माण और सनातन धर्म का प्रचार",
    desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रचार। मंदिर निर्माण, गौशाला, शिक्षा और समाज सेवा के लिए दान दें।",
    img: "/images/deep.jpg",
  },
  {
    title: "गौशाला और सेवा",
    desc: "गौशाला का निर्माण और गौ सेवा। धर्म और समाज कल्याण में योगदान।",
    img: "/images/aarti.jpg",
  },
  {
    title: "शिक्षा और समाज कल्याण",
    desc: "धर्म और समाज के लिए शिक्षा का प्रसार। बच्चों और युवाओं को संस्कार देना।",
    img: "/images/hero.jpg",
  },
  {
    title: "समाज सेवा और स्वास्थ्य",
    desc: "स्वास्थ्य शिविर और सामाजिक कल्याण में योगदान। समाज के लिए जागरूकता अभियान।",
    img: "/images/aarti.jpg",
  },
  {
    title: "धार्मिक कार्यक्रम और आयोजन",
    desc: "भजन, कीर्तन और धार्मिक आयोजन। समाज में सांस्कृतिक और धार्मिक चेतना बढ़ाना।",
    img: "/images/deep.jpg",
  },
  {
    title: "नया कार्ड 6",
    desc: "यह एक नया कार्ड है यह देखने के लिए कि कोड डायनामिक हुआ है या नहीं।",
    img: "/images/hero.jpg",
  },
  {
    title: "नया कार्ड 7",
    desc: "यह एक और नया कार्ड है। अब आप जितने चाहें उतने कार्ड्स जोड़ सकते हैं।",
    img: "/images/aarti.jpg",
  },
  {
    title: "नया कार्ड 8",
    desc: "धर्म और समाज के लिए शिक्षा का प्रसार। बच्चों और युवाओं को संस्कार देना।",
    img: "/images/hero.jpg",
  },
  {
    title: "नया कार्ड 9",
    desc: "स्वास्थ्य शिविर और सामाजिक कल्याण में योगदान। समाज के लिए जागरूकता अभियान।",
    img: "/images/aarti.jpg",
  },
  {
    title: "नया कार्ड 10",
    desc: "भजन, कीर्तन और धार्मिक आयोजन। समाज में सांस्कृतिक और धार्मिक चेतना बढ़ाना।",
    img: "/images/deep.jpg",
  },
];

const ServicesSlider = () => {
  const [current, setCurrent] = useState(0);
  const servicesLength = services.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % servicesLength);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + servicesLength) % servicesLength);

  const VISIBLE_CARDS = 5;

  return (
    <section className="bg-[#ffeed8] py-16">
      <h2 className="text-center text-3xl md:text-5xl font-semibold mb-12">
        हमारी <span className="text-orange-500">मुख्य सेवाएँ</span>
        <div className="mx-auto mt-5 h-1 w-40 bg-gradient-to-r from-transparent via-black to-transparent"></div>
      </h2>

      <div className="relative max-w-6xl mx-auto h-[500px] md:h-[450px] flex justify-center items-center">
        {services.map((item, i) => {
          const position = (i - current + servicesLength) % servicesLength;

          if (position >= VISIBLE_CARDS) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
              />
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ y: -400, opacity: 0 }}
              animate={{
                y: -position * 20,
                scale: 1 - position * 0.05,
                opacity: 1 - position * 0.15,
                zIndex: servicesLength - position,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full mt-10 md:mt-20 max-w-5xl"
            >
              <div className="bg-white rounded-xl shadow-xl flex flex-col-reverse md:flex-row overflow-hidden h-auto md:h-[400px]">
                {/* Left (Text) */}
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-4xl font-semibold mb-4 text-black">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                  <button
                    className="px-6 md:px-8 py-2 md:py-3 w-fit cursor-pointer rounded-lg 
                    bg-orange-500 text-white text-base md:text-lg font-md flex items-center gap-3
                    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600"
                  >
                    दान करें अभी <FaArrowRight />
                  </button>
                </div>

                {/* Right (Image) */}
                <div className="md:w-1/2 h-52 md:h-auto">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={prevSlide}
          className="bg-white border border-orange-500 text-orange-500 p-4 rounded-full hover:bg-orange-500 hover:text-white transition cursor-pointer"
        >
          <ChevronUp size={28} strokeWidth={1.5} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white border border-orange-500 text-orange-500 p-4 rounded-full hover:bg-orange-500 hover:text-white transition cursor-pointer"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
};

export default ServicesSlider;
