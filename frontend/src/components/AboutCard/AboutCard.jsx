import React from "react";

const Card = ({ image, title, text, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 my-14`}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/2">
        <div
          className={`absolute ${
            reverse ? "-bottom-4 -right-4" : "-bottom-4 -left-4"
          } w-24 h-16 bg-orange-500 rounded-md`}
        ></div>
        <img
          src={image}
          alt={title}
          className="rounded-xl shadow-lg w-[450px] h-60 object-cover relative z-10"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
          {title}
        </h2>
        <p className="text-gray-700 mt-4 text-base md:text-lg">{text}</p>
      </div>
    </div>
  );
};

const AboutCrad = () => {
  return (
    <div className="bg-orange-50 min-h-screen px-6 md:px-20 py-12 font-sans">
      {/* Card 1 */}
      <Card
        image="/images/hero.jpg"
        title={
          <>
            हर <span className="text-orange-600">गाँव</span> और{" "}
            <span className="text-orange-600">नगर</span> में मंदिर{" "}
            <span className="text-orange-600">निर्माण</span>
          </>
        }
        text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
      />

      {/* Card 2 */}
      <div className="w-fit ml-auto mr-6">
        <Card
          reverse
          image="/images/deep.jpg"
          title={
            <>
              हिंदू समाज को{" "}
              <span className="text-orange-600">संगठित</span> और{" "}
              <span className="text-orange-600">सशक्त</span> करना
            </>
          }
          text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
        />
      </div>

      {/* Card 3 */}
      <Card
        image="/images/aarti.jpg"
        title={
          <>
            धर्म के साथ-साथ{" "}
            <span className="text-orange-600">समाज सेवा</span> का विस्तार
          </>
        }
        text="मंदिर केवल ईश्वर की उपासना का स्थान नहीं, बल्कि यह हमारी संस्कृति, परंपरा और सामाजिक एकता का प्रतीक है। हर गाँव और नगर में मंदिर निर्माण से न सिर्फ श्रद्धा का वातावरण बनेगा, बल्कि लोगों के बीच आपसी सहयोग और संबंधों की मजबूती होगी।"
      />
    </div>
  );
};

export default AboutCrad;
