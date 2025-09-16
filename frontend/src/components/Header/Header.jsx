import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClasses = (path) =>
    `transition ${
      location.pathname === path
        ? "text-orange-500 border-b-2 border-orange-500"
        : "hover:text-orange-600"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* -------- Desktop Header -------- */}
        <div className="hidden md:flex justify-between items-center w-full text-white">
          {/* Logo */}
          <div className="text-2xl font-md cursor-pointer">
            <Link to="/">LOGO</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex space-x-8 font-sm gap-6">
            <Link to="/" className={getLinkClasses("/")}>मुख्य पृष्ठ</Link>
            <Link to="/about" className={getLinkClasses("/about")}>हमारे बारे में</Link>
            <Link to="/ourworks" className={getLinkClasses("/ourworks")}>हमारे कार्य</Link>
            <Link to="/donation" className={getLinkClasses("/donation")}>दान करें</Link>
            <Link to="/news" className={getLinkClasses("/news")}>समाचार</Link>
            <Link to="/cart" className={`${getLinkClasses("/cart")} text-2xl`}>
              <IoCartOutline />
            </Link>
            <div className="h-5 border-l border-gray-400"></div>
            <Link to="/contact" className={`${getLinkClasses("/contact")} flex items-center gap-2`}>
              <IoMdCall className="text-xl" />
              संपर्क करें
            </Link>
          </nav>

          {/* Donate Button */}
          <div>
            <Link
              to="/donation"
              className="px-5 py-3 rounded-lg bg-orange-400 text-white font-semibold
                transform transition-all duration-300 ease-in-out
                hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:bg-orange-600"
            >
              दान करें
            </Link>
          </div>
        </div>

       {/* -------- Mobile Header -------- */}
<div className="flex md:hidden items-center justify-between w-full text-white">
  {/* Left Section (Menu + Logo) */}
  <div className="flex items-center gap-6">
    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-2xl focus:outline-none"
    >
      <FaBars />
    </button>

    {/* Logo */}
    <div className="text-xl font-bold cursor-pointer">
      <Link to="/">LOGO</Link>
    </div>
  </div>

  {/* Right Section (Cart + Contact + Donate Button) */}
  <div className="flex items-center gap-4">
    {/* Cart */}
    <Link
      to="/cart"
      className={`${getLinkClasses("/cart")} text-2xl flex items-center`}
    >
      <IoCartOutline />
    </Link>

    {/* Divider */}
    <div className="h-6 border-l border-gray-400"></div>

    {/* Phone Icon */}
    <Link
      to="/contact"
      className={`${getLinkClasses(
        "/contact"
      )} flex items-center gap-1 text-lg`}
    >
      <IoMdCall />
    </Link>

    {/* Donate Button */}
    <Link
      to="/donation"
      className="px-3 py-2 rounded-lg bg-orange-400 text-white font-semibold
        transform transition-all duration-300 ease-in-out
        hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:bg-orange-600"
    >
      दान करें
    </Link>
  </div>
</div>
</div>
        
    

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white font-medium flex  flex-col space-y-4 px-6 py-6 relative">
          {/* Close button top-right */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-2xl focus:outline-none"
          >
            <FaTimes />
          </button>

          <Link
            to="/"
            className={getLinkClasses("/")}
            onClick={() => setIsOpen(false)}
          >
            मुख्य पृष्ठ
          </Link>
          <Link
            to="/about"
            className={getLinkClasses("/about")}
            onClick={() => setIsOpen(false)}
          >
            हमारे बारे में
          </Link>
          <Link
            to="/ourworks"
            className={getLinkClasses("/ourworks")}
            onClick={() => setIsOpen(false)}
          >
            हमारे कार्य
          </Link>
          <Link
            to="/donation"
            className={getLinkClasses("/donation")}
            onClick={() => setIsOpen(false)}
          >
            दान करें
          </Link>
          <Link
            to="/news"
            className={getLinkClasses("/news")}
            onClick={() => setIsOpen(false)}
          >
            समाचार
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
