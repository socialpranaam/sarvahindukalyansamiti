import React from "react";

const newsData = [
  {
    id: 1,
    title: "नया मंदिर उद्घाटन",
    desc: "गुड़गांव में नवनिर्मित श्री राम मंदिर का भव्य उद्घाटन समारोह।",
    date: "15 जनवरी 2024",
    img: "/images/aarti.jpg",
  },
  {
    id: 2,
    title: "निःशुल्क स्वास्थ्य शिविर",
    desc: "दिल्ली के 10 केंद्रों में निःशुल्क चिकित्सा जांच और परामर्श।",
    date: "20–22 जनवरी 2024",
    img: "/images/aarti.jpg",
  },
];

const NewsSection = () => {
  return (
    <div className="bg-[#fff4ec] py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          ताजा <span className="text-orange-500">समाचार</span> और{" "}
          <span className="text-orange-500">अपडेट</span>
        </h2>
        <div className="mt-2 w-20 h-[2px] bg-black mx-auto rounded"></div>
      </div>

      {/* News Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {newsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col p-6"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="p-6 flex flex-col justify-between flex-1">
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-orange-500 font-semibold">{item.date}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 cursor-pointer rounded-md text-sm font-medium">
                  अधिक जानें
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
