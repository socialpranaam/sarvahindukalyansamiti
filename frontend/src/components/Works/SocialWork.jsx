import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const slides = [
  {
    image: "/images/aarti.jpg",
    title: "सामूहिक कन्या विवाह (1001 कन्याओं का वैदिक विवाह)",
    text: "हमारा संकल्प है कि आने वाले 12 महीनों में 100 मंदिरों का निर्माण प्राचीन शिल्पकला और वैदिक परंपराओं के अनुरूप किया जाएगा। इन मंदिरों में नियमित रूप से धार्मिक अनुष्ठान का आयोजन होगा।",
    button: "दान करें अभी",
  },
  {
    image: "/images/deep.jpg",
    title: "धार्मिक उत्सव",
    text: "हर वर्ष भव्य धार्मिक उत्सवों का आयोजन किया जाएगा, जिससे समाज में भक्ति और संस्कृति का वातावरण बने।",
    button: "जुड़ें अभी",
  },
  {
    image: "/images/mahadev.webp",
    title: "सामूहिक कन्या विवाह (1001 कन्याओं का वैदिक विवाह)",
    text: "हमारा संकल्प है कि आने वाले 12 महीनों में 100 मंदिरों का निर्माण प्राचीन शिल्पकला और वैदिक परंपराओं के अनुरूप किया जाएगा। इन मंदिरों में नियमित रूप से धार्मिक अनुष्ठान का आयोजन होगा।",
    button: "दान करें अभी",
  },
  {
    image: "/images/hero.jpg",
    title: "धार्मिक उत्सव",
    text: "हर वर्ष भव्य धार्मिक उत्सवों का आयोजन किया जाएगा, जिससे समाज में भक्ति और संस्कृति का वातावरण बने।",
    button: "जुड़ें अभी",
  },
];

const SocialWork = () => {
  const [current, setCurrent] = useState(0);

  // AOS Init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#ffeed8] py-12">
      <div className="text-center mb-8" data-aos="fade-down">
        <h2 className="text-3xl md:text-5xl font-medium ">
          <span className="text-orange-400">सामाजिक </span>कार्य
        </h2>
        <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <p
          className="text-gray-700 mt-6 max-w-4xl text-lg mx-auto px-4"
          data-aos="fade-up"
        >
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Slider */}
      <div
        className="relative max-w-5xl mx-auto mt-20 px-6"
        data-aos="zoom-in-up"
      >
        <div className="bg-orange-500 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center
         transition-all duration-200 ease-in-out h-[600px] md:h-[350px]">
          {/* Image Section */}
          <div
            className="w-full md:w-1/2 h-full p-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Content Section */}
          <div
            className="w-full md:w-1/2 text-white p-6 md:p-10 mt-4 md:mt-0"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <h3 className="text-xl md:text-4xl font-semibold leading-snug mb-4">
              {slides[current].title}
            </h3>
            <p className="text-sm md:text-base max-w-4xl mb-6">
              {slides[current].text}
            </p>
            <button
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold cursor-pointer shadow-md hover:bg-gray-100 flex items-center gap-2
            transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              {slides[current].button}
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 
             left-4 md:-left-14 
             bg-white shadow p-3 rounded-full z-20"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-10 h-10 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 
             right-4 md:-right-14 
             bg-white shadow p-3 rounded-full z-20"
          data-aos="fade-left"
        >
          <ChevronRight className="w-10 h-10 text-black" />
        </button>
      </div>
    </div>
  );
};

export default SocialWork;
