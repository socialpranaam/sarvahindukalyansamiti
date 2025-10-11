"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnimatedServices({ autoplay = true }) {
  const [services, setServices] = useState([]);
  const [active, setActive] = useState(0);

  // ✅ Fetch services from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleNext = () => setActive((prev) => (prev + 1) % services.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + services.length) % services.length);
  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay && services.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, services]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  if (services.length === 0) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#ffeed8]">
      <div className="mx-auto max-w-sm px-4 py-20 md:max-w-5xl md:px-8 lg:px-12">
        <h2 className="text-center text-3xl md:text-5xl font-semibold mb-12">
          हमारी <span className="text-orange-500">मुख्य सेवाएँ</span>
          <div className="mx-auto mt-5 h-1 w-40 bg-gradient-to-r from-transparent via-black to-transparent"></div>
        </h2>

        <div className="relative max-w-6xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Image Section */}
          <div className="relative h-96 w-full">
            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : services.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={services[active].image}                   
                    className="h-full w-full rounded-4xl object-cover object-center"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Text Section */}
          <div className="flex flex-col justify-between py-16">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-3xl font-medium text-black">
                {services[active].title}
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                {services[active].description}
              </p>
            </motion.div>

            <div className="flex gap-4 mt-16">
              <button
                onClick={handlePrev}
                className="group/button flex bg-white h-14 w-14 items-center justify-center rounded-full shadow"
              >
                <ArrowLeft
                  size={30}
                  className="text-black transition-transform duration-300 group-hover/button:rotate-12"
                />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex bg-white h-14 w-14 items-center justify-center rounded-full shadow"
              >
                <ArrowRight
                  size={30}
                  className="text-black transition-transform duration-300 group-hover/button:-rotate-12"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
