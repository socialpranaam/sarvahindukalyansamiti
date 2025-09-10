import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // 🔹 Auto Slide Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds delay
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#fff2e5] py-12 font-sans">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold ">
          <span className="text-orange-600">सामाजिक </span>कार्य
        </h2>
        <div className="w-16 h-[3px] bg-black mx-auto "></div><br />
        <p className="text-gray-700 mt-2 max-w-2xl mx-auto px-4">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
          सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Slider */}
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="bg-orange-500 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-all duration-700 ease-in-out">
          {/* Left Image */}
          <div className="w-full md:w-1/2 p-3">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/2 text-white p-6 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold leading-snug mb-4">
              {slides[current].title}
            </h3>
            <p className="text-sm md:text-base mb-6">{slides[current].text}</p>
            <button className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold cursor-pointer shadow-md hover:bg-gray-100 flex items-center gap-2">
              {slides[current].button}
              <ArrowRight size={24} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <ChevronLeft className="w-8 h-8 text-orange-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
        >
          <ChevronRight className="w-8 h-8 text-orange-600" />
        </button>
      </div>
    </div>
  );
};

export default SocialWork;
