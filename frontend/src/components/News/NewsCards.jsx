import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const NewsCards = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });

    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/news");
        setNews(response.data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
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
              <p className="text-sm font-bold">{new Date(item.date).getDate()}</p>
              <p className="text-xs">{new Date(item.date).toLocaleString("default", { month: "short" })}</p>
              <p className="text-xs">{new Date(item.date).getFullYear()}</p>
            </div>

            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover"
              data-aos="zoom-in"
              data-aos-delay={idx * 200}
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description}
              </p>
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
