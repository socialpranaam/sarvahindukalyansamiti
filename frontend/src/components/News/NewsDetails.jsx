import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const NewsDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/news/${id}`);
        setItem(response.data);
      } catch (err) {
        setError("News not found");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (error) return <p className="text-center py-12">{error}</p>;

  return (
    <div className="bg-[#ffeedd]">
      <section className="w-full mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <p className="text-gray-500 mb-6">{new Date(item.date).toLocaleDateString("hi-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
        <img src={item.img} alt={item.title} className="w-full h-96 object-contain rounded-lg mb-6" />
        <p className="text-gray-700 text-lg">{item.description}</p>
        <Link 
          to="/news" 
          className="px-6 py-3 w-fit cursor-pointer rounded-lg bg-orange-500 text-white text-lg font-medium flex items-center gap-3
                     transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-orange-600 mt-6">
          <ArrowLeft size={20}/> Back to News
        </Link>
      </section>
    </div>
  );
};

export default NewsDetails;
