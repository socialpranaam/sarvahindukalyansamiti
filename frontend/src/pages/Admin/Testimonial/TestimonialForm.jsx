import React, { useState } from "react";
import Swal from "sweetalert2";

const TestimonialForm = ({ addTestimonial }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !text || !avatar) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "सभी फ़ील्ड भरना ज़रूरी है!",
      });
      return;
    }

    const newTestimonial = {
      id: Date.now(), // unique id
      name,
      text,
      avatar: URL.createObjectURL(avatar), // temporary preview
    };

    addTestimonial(newTestimonial);

    Swal.fire({
      icon: "success",
      title: "धन्यवाद!",
      text: "आपका Testimonial जोड़ दिया गया है।",
    });

    // Reset form
    setName("");
    setText("");
    setAvatar(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Testimonial Submit करें</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="आपका नाम"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <textarea
          placeholder="आपका संदेश"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
          rows="4"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="border border-gray-300 p-2 rounded-md"
        />
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt="preview"
            className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
          />
        )}
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
