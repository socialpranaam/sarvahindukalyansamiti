import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image: formData.image ? formData.image.name : null,
      };

      const response = await axios.post("http://localhost:8000/services", payload, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Service Created",
        text: "Your service has been added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ title: "", description: "", image: null });

      // ✅ Redirect to ServicesList page after submission
      navigate("/admin/services"); // <-- yahan aapka services list ka route daalein

      console.log(response.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Create",
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
      <h2 style={styles.heading} className="text-2xl font-bold">Add New Service</h2>
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
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>
        </div>
        <div>
          <label style={styles.label}>Image (optional):</label>
          <input type="file" name="image" onChange={handleChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>
          Add Service
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
