import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prepare FormData for image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:8000/services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Service Created Successfully 🎉",
        text: "Your service has been added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);

      // ✅ Redirect to service list page
      navigate("/admin/services");

      console.log("✅ Service added:", res.data);
    } catch (err) {
      console.error("❌ Upload error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Service",
        text: "Something went wrong while adding the service.",
      });
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "50px auto",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#111",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
      minHeight: "100px",
      marginBottom: "16px",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#FFA500",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading} className="text-2xl font-bold">
        Add New Service
      </h2>
      <form
        onSubmit={handleSubmit}
        onMouseOver={(e) => {
          if (e.target.tagName === "BUTTON") e.target.style.backgroundColor = "#FF8C00";
        }}
        onMouseOut={(e) => {
          if (e.target.tagName === "BUTTON") e.target.style.backgroundColor = "#FFA500";
        }}
      >
        <div>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          ></textarea>
        </div>
        <div>
          <label style={styles.label}>Image (optional):</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Add Service
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
