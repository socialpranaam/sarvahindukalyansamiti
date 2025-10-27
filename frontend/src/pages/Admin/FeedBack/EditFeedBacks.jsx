import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditFeedbacks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // 🟠 Fetch existing feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:8000/feedbacks/${id}`);
        if (!res.ok) throw new Error("Failed to fetch feedback");
        const data = await res.json();
        setFormData({
          name: data.name || "",
          message: data.message || "",
          image: data.image || "",
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load feedback data.", "error");
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  // 🟢 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟣 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/feedbacks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update feedback");

      Swal.fire("Success!", "Feedback updated successfully.", "success");
      navigate("/admin/feedbacks");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Failed to update feedback.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading feedback data...
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Edit Feedback</h2>
        <p className="text-gray-500 mb-6 text-sm">Update the feedback details below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 🟠 Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* 🟠 Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Enter feedback message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          {/* 🟠 Image URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* 🖼️ Image Preview */}
          {formData.image && (
            <div className="flex justify-center mb-4">
              <img
                src={formData.image}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full border object-cover shadow-sm"
              />
            </div>
          )}

          {/* 🔘 Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/feedbacks")}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
            >
              Update Feedback
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditFeedbacks;
