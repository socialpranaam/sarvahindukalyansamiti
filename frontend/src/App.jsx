import { useState } from 'react'
import Header from './components/Navbar/Header'
import { BrowserRouter } from "react-router-dom";
import Hero from './components/Hero/Hero';
import Bhakti from './components/Bhakti/Bhakti';
import ServicesSlider from './components/Service/ServicesSlider';
import Testimonials from './components/Testimonial/Testimonials';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Hero/>
      <Bhakti/>
      <ServicesSlider/>
      <Testimonials/>
      </BrowserRouter>
     
    </>
  )
}

export default App
