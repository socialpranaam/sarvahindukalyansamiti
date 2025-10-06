import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // ✅ import axios

const AddEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    tag: "festival",
    title: "",
    description: "", // backend me description ka field name same rakho
    location: "",
    date: "",
    time: "",
    progress: 0,
    attendees: 0,
    pm: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend POST request
      const response = await axios.post("http://localhost:8000/events", eventData);

      if (response.status === 201) {
        Swal.fire("Success", "Event added successfully!", "success").then(() => {
          navigate("/admin/events");
        });
      }
    } catch (error) {
      console.error("Error adding event:", error.response?.data || error.message);
      Swal.fire("Error", error.response?.data?.error || "Failed to add event", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6">Add New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              name="tag"
              value={eventData.tag}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="festival">Festival</option>
              <option value="educational">Educational</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description" 
              value={eventData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium mb-1">Progress (%)</label>
            <input
              type="number"
              name="progress"
              value={eventData.progress}
              onChange={handleChange}
              placeholder="Enter progress (0-100)"
              min="0"
              max="100"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* PM Name */}
          <div>
            <label className="block text-sm font-medium mb-1">PM Name</label>
            <input
              type="text"
              name="pm"
              value={eventData.pm}
              onChange={handleChange}
              placeholder="Enter PM name"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;





// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const AddEvent = () => {
//   const [formData, setFormData] = useState({
//     type: "",
//     title: "",
//     description: "",
//     venue: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     registeredAttendees: "",
//     totalAttendees: "",
//     organizer: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // handle input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title || !formData.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Title and description are required!",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:8000/events", formData);

//       Swal.fire({
//         icon: "success",
//         title: "Event Added!",
//         text: "Your event has been created successfully.",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       setFormData({
//         type: "",
//         title: "",
//         description: "",
//         venue: "",
//         date: "",
//         startTime: "",
//         endTime: "",
//         registeredAttendees: "",
//         totalAttendees: "",
//         organizer: "",
//       });
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: err.response?.data?.error || err.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl">
//       <h2 className="text-2xl font-bold text-center mb-5 text-gray-700">
//         🎉 Add Event
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Event Type */}
//         <input
//           type="text"
//           name="type"
//           placeholder="Event Type (e.g., Festival)"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Event Title */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Event Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Event Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 min-h-[100px]"
//         />

//         {/* Venue */}
//         <input
//           type="text"
//           name="venue"
//           placeholder="Venue (e.g., Main Temple Hall)"
//           value={formData.venue}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Date */}
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Start & End Time */}
//         <div className="flex gap-2">
//           <input
//             type="time"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleChange}
//             placeholder="Start Time"
//             className="w-1/2 border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//           />
//           <input
//             type="time"
//             name="endTime"
//             value={formData.endTime}
//             onChange={handleChange}
//             placeholder="End Time"
//             className="w-1/2 border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//           />
//         </div>

//         {/* Registration Progress */}
//         <div className="flex gap-2">
//           <input
//             type="number"
//             name="registeredAttendees"
//             placeholder="Registered Attendees"
//             value={formData.registeredAttendees}
//             onChange={handleChange}
//             className="w-1/2 border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//           />
//           <input
//             type="number"
//             name="totalAttendees"
//             placeholder="Total Attendees"
//             value={formData.totalAttendees}
//             onChange={handleChange}
//             className="w-1/2 border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//           />
//         </div>

//         {/* Organizer */}
//         <input
//           type="text"
//           name="organizer"
//           placeholder="Organizer / Pandit Name"
//           value={formData.organizer}
//           onChange={handleChange}
//           className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-lg text-white font-semibold ${
//             loading
//               ? "bg-orange-400 cursor-not-allowed"
//               : "bg-orange-500 hover:bg-orange-600 transition"
//           }`}
//         >
//           {loading ? "Adding..." : "Add Event"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddEvent;
