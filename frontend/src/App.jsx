import { useState } from 'react'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWorks from './pages/OurWorks';
import Donation from './pages/Donation';

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
        </Routes>
     
      </BrowserRouter>
     
    </>
  )
}

export default App
