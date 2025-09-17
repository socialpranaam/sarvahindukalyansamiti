import React from "react";

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
        className={`px-3 py-1 text-xs font-medium rounded-full self-start mb-3 ${event.tagColor}`}
      >
        {event.tag}
      </span>

      {/* Title & Desc */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {event.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{event.desc}</p>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="mr-2">📍</span> {event.location}
      </div>

      {/* Date */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="mr-2">📅</span> {event.date}
      </div>

      {/* Time */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-2">⏰</span> {event.time}
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
        <span className="mr-2">👤</span> PM: {event.pm}
      </div>
    </div>
  );
};

const EventsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header */}
      <div className="flex items-center bg-white justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Events</h1>
          <p className="text-sm text-gray-600">
            Welcome back! Here’s what’s happening with your organization.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            ● System Online
          </span>
          <button className="relative">
            🔔
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
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
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600">
          + New Event
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

export default EventsPage;
