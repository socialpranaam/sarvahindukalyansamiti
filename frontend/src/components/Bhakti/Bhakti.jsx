import React from "react";
import { ArrowRight } from "lucide-react";

const Bhakti = () => {
  return (
    <section className="bg-[#fdf6ef] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            धर्म, सेवा और <br />
            <span className="text-orange-500">कल्याण</span> की ओर
          </h1>

          <p className="mt-6 text-gray-700 leading-relaxed">
            पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का 
            प्रसार पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा 
            का प्रसार मंदिर निर्माण, गौशाला, शिक्षा और समाज सेवा के लिए दान दें।
          </p>

          <button className="mt-8 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 cursor-pointer rounded-md flex items-center gap-2 shadow-md">
            स्वयंसेवक बनें 
            <ArrowRight size={18} />
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
            <div className="absolute bottom-1 -left-35 bg-white shadow-lg rounded-md p-4 max-w-[14rem] text-sm leading-relaxed">
                 <p>
                सामूहिक <span className="text-orange-500 font-medium">अनुष्ठान</span>, 
                भजन और यज्ञ से समाज में सामूहिक अनुष्ठान,{" "}
                <span className="text-orange-500 font-medium">भजन</span> और यज्ञ से समाज में 
                सामूहिक अनुष्ठान।
                <span className="text-orange-500 font-medium">भजन</span> और यज्ञ से समाज में 
                सामूहिक अनुष्ठान।
            </p>
            </div>
          </div>

          {/* Side Content */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-5xl">56+</h2>
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
