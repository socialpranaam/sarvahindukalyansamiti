import React from "react";

const Team = () => {
  const team = [
    {
      name: "आदित्य शर्मा",
      role: "संस्थापक एवं अध्यक्ष",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "आदित्य शर्मा",
      role: "महासचिव",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "आदित्य शर्मा",
      role: "धार्मिक कार्य प्रमुख",
      img: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      name: "आदित्य शर्मा",
      role: "धार्मिक कार्य प्रमुख",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "आदित्य शर्मा",
      role: "महासचिव",
      img: "https://randomuser.me/api/portraits/women/52.jpg",
    },
  ];

  return (
    <section className="bg-orange-50 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          हमारी <span className="text-orange-600">टीम</span> से मिलिए
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Team Members */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="bg-orange-200 relative w-full rounded-t-[50%] rounded-b-[50%] overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
