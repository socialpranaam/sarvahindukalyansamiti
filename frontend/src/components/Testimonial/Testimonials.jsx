import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    id: 1,
    name: "राजेश शर्मा",
    text: "सर्व हिन्दू कल्याण समिति का कार्य अत्यंत सराहनीय है। मंदिर निर्माण से लेकर गरीबों की सेवा तक, हर क्षेत्र में उनका योगदान अमूल्य है!",
    avatar: "/images/deep.jpg",
  },
  {
    id: 2,
    name: "अंजलि गुप्ता",
    text: "इस समिति से जुड़कर मुझे समाज सेवा का सही अर्थ समझने का अवसर मिला। शिक्षा के क्षेत्र में इनका प्रयास काबिले तारीफ है।",
    avatar: "/images/aarti.jpg",
  },
  {
    id: 3,
    name: "रवि कुमार",
    text: "गौशाला की सेवा और गौ माता के प्रति इनका समर्पण देखकर मन प्रसन्न हो जाता है। मैं सभी से इस पुण्य कार्य में सहयोग करने का आग्रह करता हूँ।",
    avatar: "/images/boy3.jpg",
  },
  {
    id: 4,
    name: "प्रिया सिंह",
    text: "स्वास्थ्य शिविरों के माध्यम से जरूरतमंदों तक चिकित्सा पहुंचाना एक महान कार्य है। समिति का यह कदम बहुतों के लिए जीवनदान है।",
    avatar: "/images/girl3.jpeg",
  },
  {
    id: 5,
    name: "सुरेश वर्मा",
    text: "धार्मिक कार्यक्रमों के आयोजन से हमारी संस्कृति और संस्कार जीवित रहते हैं। यह समिति हमारी जड़ों को मजबूत कर रही है।",
    avatar: "/images/boy1.jpg",
  },
  {
    id: 6,
    name: "कविता मिश्रा",
    text: "समाज के कमजोर वर्ग के लिए इस समिति का काम प्रेरणादायक है। मैं इनके प्रयासों की सराहना करती हूँ।",
    avatar: "/images/girl2.jpg",
  },
  {
    id: 7,
    name: "मोहन अग्रवाल",
    text: "पारदर्शिता और समर्पण इस संगठन की पहचान है। दिया गया हर दान सही हाथों में और सही काम में लगता है।",
    avatar: "/images/boy2.jpg",
  },
  {
    id: 8,
    name: "साक्षी चौहान",
    text: "युवाओं को सनातन धर्म और संस्कृति से जोड़ने का जो प्रयास यह समिति कर रही है, वह अद्भुत है।",
    avatar: "/images/girl1.jpeg",
  },
];

const Testimonial = () => {
  const [currentMainTestimonial, setCurrentMainTestimonial] = useState(
    testimonials[0]
  );

  // ✅ Auto change functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainTestimonial((prev) => {
        const currentIndex = testimonials.findIndex((t) => t.id === prev.id);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex];
      });
    }, 4000); // 4 second me auto change hoga

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-[#fff6eb] py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
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
          {/* Main Image */}
          <div className="relative w-60 h-60" data-aos="flip-left">
            <div
              className="absolute -top-6 -right-7 w-16 h-16"
              style={{
                backgroundImage: "radial-gradient(#d1d5db 2px, transparent 2px)",
                backgroundSize: "0.75rem 0.75rem",
              }}
            ></div>
            <div className="absolute -bottom-2  w-16 h-16 border-2 border-orange-500 rounded-full z-0"></div>
            <div
              className="w-full h-full overflow-hidden shadow-xl relative z-10"
              style={{ borderRadius: "50% 0 50% 50%" }}
            >
              <img
                src={currentMainTestimonial.avatar}
                alt={currentMainTestimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-md" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {currentMainTestimonial.name}
            </h3>
            <p className="text-black leading-relaxed text-lg">
              {currentMainTestimonial.text}
            </p>
            <div className="w-7 h-3 bg-orange-500 mt-4 rounded-xl"></div>
          </div>

          {/* Small Avatars Below */}
          <div
            className="relative w-full flex justify-center items-center flex-wrap gap-4 mt-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {testimonials
              .filter((t) => t.id !== currentMainTestimonial.id)
              .map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => setCurrentMainTestimonial(testimonial)}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
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
            {/* Main Image */}
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
                    src={currentMainTestimonial.avatar}
                    alt={currentMainTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div
              className="ml-10 max-w-md"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {currentMainTestimonial.name}
              </h3>
              <p className="text-black leading-relaxed text-lg">
                {currentMainTestimonial.text}
              </p>
              <div className="w-7 h-3 bg-orange-500 mt-4 rounded-xl"></div>
            </div>
          </div>

          {/* Right Side (Rotating Avatars) */}
          <div
            className="w-1/3 xl:w-1/4 flex justify-center items-center"
            data-aos="fade-left"
          >
            <div className="relative w-[250px] h-[250px] flex justify-center items-center group">
              <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-orange-400 shadow-lg z-20">
                <img
                  src={currentMainTestimonial.avatar}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rotating Avatars */}
              <div className="absolute inset-0 animate-spin-slow group-hover:paused flex justify-center items-center">
                {testimonials
                  .filter((t) => t.id !== currentMainTestimonial.id)
                  .map((testimonial, index, filteredArray) => {
                    const angle = (index / filteredArray.length) * 2 * Math.PI;
                    const radius = 140;
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                      <div
                        key={testimonial.id}
                        className="absolute w-18 h-18 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        onClick={() => setCurrentMainTestimonial(testimonial)}
                        data-aos="zoom-in"
                      >
                        {/* 👇 yaha fix kiya - image seedhi रहेगी */}
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          style={{ transform: "rotate(calc(-1 * var(--tw-rotate)))" }}
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

export default Testimonial;
