import React from "react";

const Card = ({ image, title, text, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 my-14`}
    >
      {/* Image Section */}
      <div
        className={`relative w-full md:w-1/2 ${
          reverse ? "flex justify-end" : ""
        }`}
      >
        <div
          className={`absolute ${
            reverse ? "-bottom-4 -right-4" : "-bottom-4 -left-4"
          } w-32 h-20 bg-orange-500 rounded-md`}
        ></div>
        <img
          src={image}
          alt={title}
          className="rounded-xl shadow-lg w-[430px] h-70 object-cover relative z-10"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl md:text-5xl font-medium leading-snug">
          {title}
          <div
  className="h-1 mt-4 "
  style={{
    width: "8rem", // original w-32
    background: "linear-gradient(to right, black 60%, rgba(0,0,0,0) 100%)",
  }}
></div>

        </h2>
        <p className="text-gray-700 mt-4 text-base md:text-lg">{text}</p>
      </div>
    </div>
  );
};

const AboutCard = () => {
  return (
    <div className="bg-orange-50 min-h-screen px-6 md:px-20 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Card 1 */}
        <Card
          image="/images/hero.jpg"
          title={
            <>
              हर <span className="text-orange-400">गाँव</span> और{" "}
              <span className="text-orange-400">नगर</span> में मंदिर{" "}
              <span className="text-orange-400">निर्माण</span>
            </>
          }
          text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
        />

        {/* Card 2 (Image Right) */}
        <Card
          reverse
          image="/images/deep.jpg"
          title={
            <>
              हिंदू समाज को{" "}
              <span className="text-orange-400">संगठित</span> और{" "}
              <span className="text-orange-400">सशक्त</span> करना
            </>
          }
          text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
        />

        {/* Card 3 */}
        <Card
          image="/images/aarti.jpg"
          title={
            <>
              धर्म के साथ-साथ{" "}
              <span className="text-orange-400">समाज सेवा</span> का विस्तार
            </>
          }
          text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
        />
      </div>
    </div>
  );
};

export default AboutCard;
