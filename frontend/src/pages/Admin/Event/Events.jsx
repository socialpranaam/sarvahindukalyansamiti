import React, { useState, useEffect } from "react";
import { Bell, Calendar, Clock } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const tagColors = {
    festival: "bg-purple-100 text-purple-600",
    educational: "bg-blue-100 text-blue-600",
    cultural: "bg-orange-100 text-orange-600",
  };
  const tagColor = tagColors[event.tag] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white border rounded-lg shadow-sm p-5 flex flex-col">
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full self-start mb-3 ${tagColor}`}
      >
        {event.tag}
      </span>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
        {event.title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-4">{event.description}</p>

      <div className="flex items-center text-sm sm:text-base text-gray-600 mb-2">
        <IoLocationOutline size={20} className="mr-2" />
        <span>{event.location}</span>
      </div>

      <div className="flex items-center text-sm sm:text-base text-gray-600 mb-2">
        <Calendar size={20} className="mr-2" />
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>

      <div className="flex items-center text-sm sm:text-base text-gray-600 mb-4">
        <Clock size={20} className="mr-2" />
        <span>{event.time}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
          <span>Registration Progress</span>
          <span>{event.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${event.progress}%` }}
          ></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.attendees}</p>
      </div>

      <p className="flex items-center text-sm sm:text-base gap-2 text-gray-500">
        <FaUser /> PM: {event.pm}
      </p>
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/events");
        const data = await res.json();
        const sortedEvents = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen  sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Events</h1>
          <p className="text-sm sm:text-lg text-gray-600">
            Welcome back! Here’s what’s happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium text-sm sm:text-base">
            ● System Online
          </div>
          <button className="relative">
            <Bell size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Subheader */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4 sm:gap-0">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Temple Events</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage upcoming festivals, ceremonies and community gatherings
          </p>
        </div>
        <button
          className="px-4 sm:px-5 py-2 sm:py-3 flex justify-center items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600 text-sm sm:text-base"
          onClick={() => navigate("add-event")}
        >
          <FiPlus size={18} /> New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
