import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFeedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });
  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("message", formData.message);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:8000/feedbacks", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit feedback");

      Swal.fire("Success", "Feedback submitted successfully", "success");
      setFormData({ name: "", message: "", image: null });

      // Redirect to feedback list page
      navigate("/admin/feedbacks");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to submit feedback", "error");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="w-full border rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
