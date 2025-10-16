import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const EventForm = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    tag: "festival",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    period: "AM",
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
      const eventToSend = {
        ...eventData,
        time: `${eventData.time} ${eventData.period}`,
      };

      const response = await axios.post("http://localhost:8000/events", eventToSend);

      if (response.status === 201) {
        Swal.fire("Success", "Event added successfully!", "success").then(() => {
          navigate("/contact");
        });
      }
    } catch (error) {
      console.error("Error adding event:", error.response?.data || error.message);
      Swal.fire("Error", error.response?.data?.error || "Failed to add event", "error");
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Event Booking</h1>
          <p className="text-gray-600 mt-1">Enter the details of your event.</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl w-full mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
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
          <div className="flex flex-col sm:flex-row gap-2">
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
              <div className="flex gap-2">
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                  required
                />
                <select
                  name="period"
                  value={eventData.period}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
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
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
