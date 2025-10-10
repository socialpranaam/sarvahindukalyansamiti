import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeedBacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentMainfeedback, setCurrentMainfeedback] = useState(null);
  const indexRef = useRef(0); // Auto rotation ke liye stable index

  // Backend se data fetch karna
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:8000/feedbacks");
        const data = await res.json();

        // Sirf 8 feedbacks hi frontend me dikhane hain
        const limitedData = data.slice(0, 8);

        setFeedbacks(limitedData);
        if (limitedData.length > 0) setCurrentMainfeedback(limitedData[0]);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Auto change functionality (infinite loop fix)
  useEffect(() => {
    if (feedbacks.length === 0) return;

    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % feedbacks.length;
      setCurrentMainfeedback(feedbacks[indexRef.current]);
    }, 4000);

    return () => clearInterval(interval);
  }, [feedbacks]);

  // AOS initialization
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  if (!currentMainfeedback) {
    return (
      <div className="py-20 text-center text-gray-600 text-xl">
        Feedback लोड हो रहा है...
      </div>
    );
  }

  return (
    <section className="bg-[#fff6eb] py-20">
      <div className="container mx-auto px-4">
        <h2
          className="text-center text-3xl md:text-5xl font-semibold mb-12"
          data-aos="fade-up"
        >
          लोग क्या <span className="text-orange-500">कहते हैं</span>
          <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </h2>

        {/* -------- Mobile Layout -------- */}
        <div
          className="flex flex-col lg:hidden items-center space-y-6"
          data-aos="zoom-in"
        >
          <div className="relative w-60 h-60" data-aos="flip-left">
            <div
              className="absolute -top-6 -right-7 w-16 h-16"
              style={{
                backgroundImage: "radial-gradient(#d1d5db 2px, transparent 2px)",
                backgroundSize: "0.75rem 0.75rem",
              }}
            ></div>
            <div className="absolute -bottom-2 w-16 h-16 border-2 border-orange-500 rounded-full z-0"></div>
            <div
              className="w-full h-full overflow-hidden shadow-xl relative z-10"
              style={{ borderRadius: "50% 0 50% 50%" }}
            >
              <img
                src={currentMainfeedback.image}
                alt={currentMainfeedback.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-md" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {currentMainfeedback.name}
            </h3>
            <p className="text-black leading-relaxed text-lg">
              {currentMainfeedback.message}
            </p>
            <div className="w-7 h-3 bg-orange-500 mt-4 rounded-xl"></div>
          </div>

          <div
            className="relative w-full flex justify-center items-center flex-wrap gap-4 mt-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {feedbacks
              .filter((t) => t.id !== currentMainfeedback.id)
              .map((feedback) => (
                <div
                  key={feedback.id}
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => setCurrentMainfeedback(feedback)}
                >
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* -------- Desktop Layout -------- */}
        <div className="hidden lg:flex relative flex-row items-center justify-center p-8 max-w-7xl mx-auto min-h-[500px]">
          <div
            className="flex flex-row items-center text-left w-2/3 xl:w-3/4"
            data-aos="fade-right"
          >
            <div className="flex-shrink-0">
              <div className="relative w-80 h-80" data-aos="zoom-in">
                <div
                  className="absolute -top-8 -right-8 w-32 h-32"
                  style={{
                    backgroundImage:
                      "radial-gradient(#d1d5db 2px, transparent 2px)",
                    backgroundSize: "1rem 1rem",
                  }}
                ></div>
                <div className="absolute -bottom-5 -left-5 w-32 h-32 border-4 border-orange-500 rounded-full z-0"></div>
                <div
                  className="w-full h-full overflow-hidden shadow-xl relative z-10"
                  style={{ borderRadius: "50% 0 50% 50%" }}
                >
                  <img
                    src={currentMainfeedback.image}
                    alt={currentMainfeedback.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              className="ml-10 max-w-md"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {currentMainfeedback.name}
              </h3>
              <p className="text-black leading-relaxed text-lg">
                {currentMainfeedback.message}
              </p>
              <div className="w-7 h-3 bg-orange-500 mt-4 rounded-xl"></div>
            </div>
          </div>

          <div
            className="w-1/3 xl:w-1/4 flex justify-center items-center"
            data-aos="fade-left"
          >
            <div className="relative w-[250px] h-[250px] flex justify-center items-center group">
              <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-orange-400 shadow-lg z-20">
                <img
                  src={currentMainfeedback.image}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 animate-spin-slow group-hover:paused flex justify-center items-center">
                {feedbacks
                  .filter((t) => t.id !== currentMainfeedback.id)
                  .map((feedback, index, filteredArray) => {
                    const angle = (index / filteredArray.length) * 2 * Math.PI;
                    const radius = 140;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                      <div
                        key={feedback.id}
                        className="absolute w-18 h-18 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        onClick={() => setCurrentMainfeedback(feedback)}
                        data-aos="zoom-in"
                      >
                        <img
                          src={feedback.image}
                          alt={feedback.name}
                          className="w-full h-full object-cover"
                          style={{
                            transform: "rotate(calc(-1 * var(--tw-rotate)))",
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBacks;
