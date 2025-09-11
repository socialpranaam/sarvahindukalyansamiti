import { useState } from 'react'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWorks from './pages/OurWorks';
import Donation from './pages/Donation';
import ContactUs from './pages/ContactUs';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/ourworks' element={<OurWorks/>}/>
          <Route path='/donation' element={<Donation/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
        </Routes>
     
      </BrowserRouter>
     
    </>
  )
}

export default App
