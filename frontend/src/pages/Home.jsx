import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Bhakti from '../components/Bhakti/Bhakti'
import ServicesSlider from '../components/Service/ServicesSlider'
import TestimonialSection from '../components/Testimonial/Testimonials'
import Prachar from '../components/Prachar/Prachar'
import NewsUpdates from '../components/News&Updates/News&Updates'


const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Bhakti/>
      <ServicesSlider/>
      <TestimonialSection/>
      <Prachar/>
      <NewsUpdates/>
      
    </div>
  )
}

export default Home
