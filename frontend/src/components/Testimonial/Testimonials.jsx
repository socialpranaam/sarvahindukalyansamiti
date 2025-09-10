import React, { useState } from 'react';

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
    const [currentMainTestimonial, setCurrentMainTestimonial] = useState(testimonials[0]);

    return (
        <section className="bg-[#fff6eb] py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                    लोग क्या <span className="text-orange-500">कहते हैं</span>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
                </h2>

                <div className="relative flex flex-col lg:flex-row items-center justify-center p-8  max-w-7xl mx-auto min-h-[450px]">

                    {/* Left Side Main Display */}
                    <div className="relative flex flex-col md:flex-row items-center lg:items-start text-center lg:text-left p-6 lg:p-0 w-full lg:w-2/3 xl:w-3/4">
                        <div className="relative -mt-24 md:-mt-12 lg:mt-0 flex-shrink-0">
                            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl border-6 border-orange-400 z-10">
                                <img
                                    src={currentMainTestimonial.avatar}
                                    alt={currentMainTestimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-orange-500 opacity-70"
                                style={{
                                    clipPath: 'path("M 0 50 A 50 50 0 0 1 50 0 L 50 0 A 50 50 0 0 1 100 50 L 100 50 A 50 50 0 0 1 50 100 L 50 100 A 50 50 0 0 1 0 50 Z")',
                                    transform: 'scale(1.2) rotate(10deg)',
                                }}></div>
                        </div>
                        <div className="md:ml-8 mt-6 md:mt-0 max-w-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentMainTestimonial.name}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{currentMainTestimonial.text}</p>
                            <div className="w-16 h-1 bg-orange-500 mt-4 mx-auto lg:mx-0"></div>
                        </div>
                    </div>

                    {/* Right Side Clickable Avatars */}
                    <div className="absolute lg:relative w-full lg:w-1/3 xl:w-1/4 mt-12 lg:mt-0 flex justify-center items-center h-full">
                        <div className="relative w-full h-full max-w-[350px] max-h-[350px] flex justify-center items-center">
                            
                           
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-400 shadow-lg z-10">
                                <img 
                                    src={currentMainTestimonial.avatar} 
                                    alt="Selected" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                           
                            {testimonials
                                .filter(testimonial => testimonial.id !== currentMainTestimonial.id)
                                .map((testimonial, index, filteredArray) => {
                                    const angle = (index / filteredArray.length) * 2 * Math.PI;
                                    
                                    const radius = 120;
                                    const x = radius * Math.cos(angle);
                                    const y = radius * Math.sin(angle);

                                    return (
                                        <div
                                            key={testimonial.id}
                                            
                                            className="absolute w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-300 z-20"
                                            style={{ transform: `translate(${x}px, ${y}px)` }}
                                            onClick={() => setCurrentMainTestimonial(testimonial)}
                                        >
                                            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;