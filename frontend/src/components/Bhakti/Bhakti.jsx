import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Bhakti = () => {
  return (
    <section className="bg-[#fdf6ef] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl md:text-5xl font-semibold leading-snug">
            धर्म, सेवा और <br />
            <span className="text-orange-500">कल्याण</span> की ओर
          </h1>

          <p className="mt-6 text-gray-700 text-xl max-w-lg leading-relaxed">
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का 
            प्रसार पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा 
            का प्रसार मंदिर निर्माण, गौशाला, शिक्षा और समाज सेवा के लिए दान दें।
          </p><br />

          <button className="px-8 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-md flex items-center gap-3">
                              स्वयंसेवक बने <FaArrowRight />
                            </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col md:flex-row items-center gap-8 relative ml-28">
          {/* Main Image */}
          <div className="relative">
             <img
            src="/images/aarti.jpg"
            alt="Hero"
            className="rounded-lg shadow-lg object-cover w-[250px] h-[400px]"/>

            {/* White floating card */}
            <div className="absolute bottom-0 -left-38 bg-white shadow-lg  p-2 max-w-[15rem] text-sm leading-relaxed rounded-t-lg rounded-bl-lg">
              <div className="bg-gray-200 p-[1px] inline-block ">              
                 <p className="bg-white text-sm leading-relaxed p-2">
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
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <h2 className="text-5xl font-md">56+</h2>
              <p className="text-gray-600">पारंपरिक वास्तुकला</p><br />
              <span className="text-orange-500 text-5xl font-bold font-devnagari">ॐ</span>
            </div>

            <img
              src="/images/deep.jpg"
              alt="Lamp"
              className="rounded-lg shadow-md w-[160px] h-[180px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bhakti;
