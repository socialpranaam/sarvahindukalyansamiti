
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

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
    desc: "स्वास्थ्य शिविर और सामाजिक कल्याण में योगदान। समाज के लिए जागरूकता अभियान।",
    img: "/images/hero.jpg",
  },
  {
    title: "नया कार्ड 7",
    desc: "धर्म और समाज के लिए शिक्षा का प्रसार। बच्चों और युवाओं को संस्कार देना।",
    img: "/images/aarti.jpg",
  },
  {
    title: "नया कार्ड 8",
    desc: "धर्म और समाज के लिए शिक्षा का प्रसार। बच्चों और युवाओं को संस्कार देना।",
    img: "/images/hero.jpg",
  },
];

export default function AnimatedServices({ autoplay = true }) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + services.length) % services.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="bg-[#ffeed8]">
    <div className="mx-auto  max-w-sm px-4 py-20 md:max-w-5xl md:px-8 lg:px-12">
      <h2 className="text-center text-3xl md:text-5xl font-semibold mb-12">
         हमारी <span className="text-orange-500">मुख्य सेवाएँ</span>
         <div className="mx-auto mt-5 h-1 w-40 bg-gradient-to-r from-transparent via-black to-transparent"></div>
       </h2>
      <div className="relative  max-w-6xl rounded-3xl grid grid-cols-1 gap-30 md:grid-cols-2">
        {/* Left Image Section */}
        <div>
          <div className="relative h-90 w-full">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={service.img}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : services.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-between py-16">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-3xl font-medium text-black dark:text-white">
              {services[active].title}
            </h3>
            <p className="mt-4 text-lg text-gray-500 dark:text-neutral-300">
              {services[active].desc}
            </p>
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-4 mt-32 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous service"
              className="group/button flex bg-white h-15 w-15 items-center justify-center rounded-full  dark:bg-neutral-800"
            >
              <ArrowLeft size={30} className=" text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next service"
              className="group/button flex bg-white h-15 w-15 items-center justify-center rounded-full  dark:bg-neutral-800"
            >
              <ArrowRight size={30} className=" text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
