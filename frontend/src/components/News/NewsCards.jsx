import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const news = [
  { id: 1, date: "30 Nov 2021", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार, पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार, पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/aarti.jpg" },
  { id: 2, date: "30 Nov 2021", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/temple.jpg" },
  { id: 3, date: "10 Nov 2022", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/aarti.jpg" },
  { id: 4, date: "20 June 2023", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/deep.jpg" },
  { id: 5, date: "25 Sep 2024", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/hero.jpg" },
  { id: 6, date: "28 May 2025", title: "12 माह में 100 मंदिर निर्माण", desc: "पारंपरिक वास्तुकला के साथ भव्य मंदिरों का निर्माण और धार्मिक शिक्षा का प्रसार", img: "/images/temple.jpg" },
];

const NewsCards = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="bg-[#fff6eb] py-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="absolute bg-white/80 m-2 shadow-md rounded-sm px-3 py-2 text-center z-10">
              <p className="text-sm font-bold">{item.date.split(" ")[0]}</p>
              <p className="text-xs">{item.date.split(" ")[1]}</p>
              <p className="text-xs">{item.date.split(" ")[2]}</p>
            </div>

            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover "
              data-aos="zoom-in"
              data-aos-delay={idx * 200}
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.desc.length > 100 ? item.desc.substring(0, 100) + "..." : item.desc}</p>
              <Link
                to={`/news/${item.id}`}
                className="text-orange-400 font-medium hover:text-orange-600"
              >
                अधिक जानें...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsCards;
export { news }; 
