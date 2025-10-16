import React from 'react'

const ContactHero = () => {
  return (
    <div className="relative bg-[#fdf3e7] overflow-x-hidden">
       {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/deep.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Heading Section */}
      <div className="relative z-10 text-center pt-48 md:pt-80 pb-12">
        <div className="bg-[#fdf3e7] relative inline-block w-full">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[150px] md:border-l-[250px] border-r-[150px] md:border-r-[250px] border-b-[100px] md:border-b-[180px] 
            border-l-transparent border-r-transparent border-b-[#fdf3e7]"
          ></div>

          <div className="relative mt-[-30px] md:mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 whitespace-nowrap">
              <span className="text-orange-500">संपर्क</span> करें
            </h2>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>

          <div className="max-w-xl mx-auto text-center mt-6 px-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              हमसे जुड़ें और अपने सवाल, सुझाव या सेवा संबंधी जानकारी के लिए संपर्क करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactHero
