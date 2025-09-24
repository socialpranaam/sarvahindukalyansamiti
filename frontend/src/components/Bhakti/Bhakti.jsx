import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Bhakti = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-[#fdf6ef] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-2 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div
          className="order-2 md:order-1 text-center md:text-left"
          data-aos="fade-right"
        >
          <h1 className="text-5xl md:text-5xl font-medium leading-snug">
            धर्म, सेवा और <br />
            <span className="text-orange-500">कल्याण</span> की ओर
          </h1>

          <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-lg  mx-auto md:mx-0 leading-relaxed">
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का 
            प्रसार पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा 
            का प्रसार मंदिर निर्माण, गौशाला, शिक्षा और समाज सेवा के लिए दान दें।
          </p><br />

          <button
            className="px-8 py-3 w-fit mx-auto md:mx-0 cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3 
          transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600"
            data-aos="zoom-in"
          >
            स्वयंसेवक बने <FaArrowRight />
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div
          className="flex items-center justify-center md:flex-row gap-8 relative ml-0 md:ml-28 order-1 md:order-2"
          data-aos="fade-left"
        >
          {/* Main Image */}
          <div className="relative" data-aos="zoom-in-up">
            <img
              src="/images/aarti.jpg"
              alt="Hero"
              className="rounded-lg shadow-lg object-cover w-[280px] h-[450px]"
            />

            {/* White floating card */}
            <div
              className="absolute bottom-0 -left-4 md:-left-45 bg-white shadow-lg  
              p-1 md:p-2 max-w-[15rem] md:max-w-[17rem] text-sm md:text-md   
              leading-relaxed rounded-tl-lg rounded-bl-lg"
              data-aos="fade-up"
            >
              <div className="bg-gray-200 p-[1px] inline-block">
                <p className="bg-white leading-relaxed p-2 md:p-3">
                  सामूहिक <span className="text-orange-500 font-medium">अनुष्ठान</span>, 
                  भजन और यज्ञ से समाज में सामूहिक अनुष्ठान,{" "}
                  <span className="text-orange-500 font-medium">भजन</span> और यज्ञ से समाज में 
                  सामूहिक अनुष्ठान।  
                  <span className="text-orange-500 font-medium">भजन</span> और यज्ञ से समाज में 
                  सामूहिक अनुष्ठान।
                </p>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="flex flex-col items-center justify-center" data-aos="flip-left">
            <div className="text-center">
              <h2 className="text-5xl font-medium">56+</h2>
              <p className="text-gray-500 text-lg mt-2">पारंपरिक वास्तुकला</p>
              <img src="/images/mdi_om.png" alt="" className="h-30 w-30 mb-5 md:ml-5 " />
            </div>

            <img
              src="/images/deep.jpg"
              alt=""
              className="rounded-lg shadow-md w-[170px] h-[200px] object-cover"
              data-aos="zoom-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bhakti;
