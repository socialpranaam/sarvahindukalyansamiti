import React, { useState, useEffect } from "react";
import { Bell, Calendar, Clock } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const events = [
  {
    tag: "festival",
    tagColor: "bg-purple-100 text-purple-600",
    title: "Krishna Janmashtami Celebration",
    desc: "Annual celebration of Lord Krishna's",
    location: "Main Temple Hall",
    date: "August 15, 2024",
    time: "6:00 PM – 12:00 AM",
    progress: 80,
    attendees: "350 / 500 attendees",
    pm: "Pandit Ramesh Sharma",
  },
  {
    tag: "educational",
    tagColor: "bg-blue-100 text-blue-600",
    title: "Vedic Knowledge Workshop",
    desc: "Learn about ancient Vedic wisdom and",
    location: "Educational Complex",
    date: "September 3, 2024",
    time: "10:00 AM – 4:00 PM",
    progress: 20,
    attendees: "30 / 100 attendees",
    pm: "Dr. Sunil Joshi",
  },
  {
    tag: "cultural",
    tagColor: "bg-orange-100 text-orange-600",
    title: "Navratri Garba Night",
    desc: "Traditional Garba and Dandiya night",
    location: "Temple Grounds",
    date: "October 7, 2024",
    time: "7:00 PM – 1:00 AM",
    progress: 45,
    attendees: "120 / 400 attendees",
    pm: "Meena Patel",
  },
];

const EventCard = ({ event }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-5 flex flex-col">
      {/* Tag */}
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full self-start mb-3 ${event.tagColor}`}
      >
        {event.tag}
      </span>

      {/* Title & Desc */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {event.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{event.desc}</p>

      {/* Location */}
      <div className="flex items-center  text-sm text-gray-600 mb-2">
        <IoLocationOutline size={20} className="mr-2" />
        <span>{event.location}</span>
      </div>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Calendar size={20} className="mr-2" />
        <span>{event.date}</span>
      </div>

      {/* Time */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Clock size={20} className="mr-2" />
        <span>{event.time}</span>
      </div>

      {/* Registration */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Registration Progress</span>
          <span>{event.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${event.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">{event.attendees}</p>
      </div>

      {/* PM */}
      <div className="flex items-center text-sm text-gray-700">
        <FaRegUserCircle size={20} className="mr-2" />
        <span>{event.pm}</span> PM:
      </div>
    </div>
  );
};

const Events = () => {
  const navigate = useNavigate();

  // 🔔 Notifications ke liye state
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // API se fetch (demo ke liye ek dummy API banayi hai)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
        const data = await res.json();
        // Maan lo har ek post ek notification hai
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header */}
      <div className="flex items-center bg-white justify-between mb-6 p-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Events</h1>
          <p className="text-lg text-gray-600">
            Welcome back! Here’s what’s happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
              ● System Online
            </div>
          </div>

          {/* 🔔 Bell with dynamic notifications */}
          <button className="relative" onClick={() => setNotifications([])}>
            <Bell size={30} className="text-gray-600" />
            {!loading && notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>
      <hr />

      {/* Sub Header */}
      <div className="flex bg-gray-50 items-center justify-between mt-8 ">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Temple Events</h2>
          <p className="text-sm text-gray-600">
            Manage upcoming festivals, ceremonies and community gatherings
          </p>
        </div>
        <button
          className="px-5 py-3 flex justify-between items-center gap-2 rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600"
          onClick={() => navigate("add-event")}
        >
          <FiPlus size={20} /> New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid mt-8 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
