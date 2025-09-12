import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const team = [
    {
      name: "आदित्य शर्मा",
      role: "संस्थापक एवं अध्यक्ष",
      img: "/images/boy1.jpg",
    },
    {
      name: "मनोज सिंह",
      role: "महासचिव",
      img: "/images/boy2.jpg",
    },
    {
      name: "प्रिया जायसवाल",
      role: "धार्मिक कार्य प्रमुख",
      img: "/images/girl1.jpeg",
    },
    {
      name: "सोनी वर्मा",
      role: "धार्मिक कार्य प्रमुख",
      img: "/images/girl2.jpg",
    },
    {
      name: "शाक्षी सिंह",
      role: "महासचिव",
      img: "/images/girl3.jpeg",
    },
  ];

  return (
    <section className="bg-orange-50 py-12">
      {/* Heading */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h2 className="text-5xl font-medium">
          हमारी <span className="text-orange-400">टीम</span> से मिलिए
          <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </h2>
        <p className="text-[#222222] mt-6 max-w-lg text-xl mx-auto">
          सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
          जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को सशक्त बनाने के लिए कार्यरत है।
        </p>
      </div>

      {/* Team Members */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 mt-20">
        {team.map((member, index) => (
          <div
            key={index}
            className="text-center"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative w-full overflow-hidden rounded-t-xl">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover custom-shape rounded-t-xl transform transition duration-500 hover:scale-105 hover:-translate-y-2"
              />
            </div>
            <h3 className="mt-4 text-xl text-gray-800 font-semibold">
              {member.name}
            </h3>
            <p className="text-gray-500 text-sm font-md">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
