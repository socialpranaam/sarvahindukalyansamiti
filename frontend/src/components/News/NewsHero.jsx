import React from 'react'

const NewsHero= () => {
  return (
    <div className='bg-[#fff6eb]'>
      <div
        className="absolute top-0 left-0 w-full h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/deep.jpg')", 
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Triangle Heading */}
      <div className="relative z-10 text-center pt-48 md:pt-80 pb-12">
        <div className="bg-[#fff6eb] relative inline-block w-full">
          {/* Triangle */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
            w-0 h-0 border-l-[150px] md:border-l-[250px] border-r-[150px] md:border-r-[250px] border-b-[100px] md:border-b-[180px] 
            border-l-transparent border-r-transparent border-b-[#fff6eb]"
          ></div>

          {/* Heading + Line */}
          <div className="relative mt-[-30px] md:mt-[-60px] flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 whitespace-nowrap">
              समाचार
            </h2>
            <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-transparent via-black to-transparent"></div>
          </div>
           <div className="max-w-4xl mx-auto text-center mt-6 px-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              सर्व हिन्दू कल्याण समिति एक धार्मिक एवं सामाजिक ट्रस्ट है,
              जो भारत की सनातन परंपरा, संस्कृति और आध्यात्मिकता को
              सशक्त बनाने के लिए कार्यरत है।
            </p>
          </div>
    </div>
    </div>
    </div>
  )
}

export default NewsHero
