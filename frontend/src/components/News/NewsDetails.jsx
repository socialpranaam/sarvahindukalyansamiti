import React from "react";
import { useParams, Link } from "react-router-dom";
import { news } from "./NewsCards";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const NewsDetails = () => {
  const { id } = useParams();
  const item = news.find((n) => n.id === parseInt(id));

  if (!item) return <p>News not found</p>;

  return (
    <div className="bg-[#ffeedd]">
    <section className="w-full mx-auto py-12 px-6">
      
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <p className="text-gray-500 mb-6">{item.date}</p>
      <img src={item.img} alt={item.title} className="w-full h-96 object-contain w-full rounded-lg mb-6" />
      <p className="text-gray-700 text-lg">{item.desc}</p>
      <p className="text-gray-700 text-lg mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p><br />

      <Link to="/news" className="px-6 md:px-6 py-2 md:py-3 w-fit cursor-pointer rounded-lg 
                    bg-orange-500 text-white text-base md:text-lg font-md flex items-center gap-3
                    transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600">
        <ArrowLeft size={20}/> Back to News
      </Link>
    </section>
    </div>
  );
};

export default NewsDetails;
