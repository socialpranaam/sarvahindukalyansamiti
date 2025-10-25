    import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNews = () => {
  const { id } = useParams(); // URL se news ID
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch news details on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/news/${id}`);
        const news = res.data;
        setTitle(news.title || "");
        setDescription(news.description || "");
        setDate(news.date ? news.date.split("T")[0] : "");
        setPreview(news.img || null);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch news details.",
        });
      }
    };
    fetchNews();
  }, [id]);

  // 🔹 Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Update news submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Title and Description cannot be empty.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (date) formData.append("date", date);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "News updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/admin/newslist");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Update failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-5 text-gray-700">
        ✏️ Update News
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <textarea
          placeholder="News Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[120px]"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer"
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 transition"
          }`}
        >
          {loading ? "Updating..." : "Update News"}
        </button>
      </form>
    </div>
  );
};

export default UpdateNews;
