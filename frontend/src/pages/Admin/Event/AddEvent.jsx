// EventsFormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    tag: "festival",
    title: "",
    desc: "",
    location: "",
    date: "",
    time: "",
    progress: 0,
    attendees: "",
    pm: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend call or state update logic here
    console.log("New Event:", eventData);

    Swal.fire("Success", "Event added successfully!", "success").then(() => {
      navigate("/admin/events"); 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6">Add New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="desc"
              value={eventData.desc}
              onChange={handleChange}
              placeholder="Enter event description"
              className="w-full border rounded-md p-2"
              required
            />
          </div>

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
                type="text"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                placeholder="Enter event time"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>

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
