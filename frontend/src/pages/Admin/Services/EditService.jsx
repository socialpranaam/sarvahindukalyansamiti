import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditService = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch single service details
  const fetchService = async () => {
    try {
      const res = await fetch(`http://localhost:8000/services/${id}`);
      if (!res.ok) throw new Error("Failed to fetch service details");
      const data = await res.json();
      setFormData({
        title: data.title || "",
        description: data.description || "",
        image: data.image || "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load service data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (update service)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update service");

      Swal.fire("Success!", "Service updated successfully!", "success");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update service.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading service details...
      </div>
    );
  }

  return (
    <section className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
          Edit Service
        </h1>
        <p className="text-gray-500 mb-6">Update the service details below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter service title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter service description"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter image URL"
            />
            {formData.image && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg border shadow-sm object-cover"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Update Service
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditService;
