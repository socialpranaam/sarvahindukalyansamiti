import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-transparent fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer">
          <Link to="/">Logo</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-white font-medium gap-6">
          <Link to="/" className="hover:text-orange-600 transition">मुख्य पृष्ठ</Link>
          <Link to="/about" className="hover:text-orange-600 transition">हमारे बारे में</Link>
          <Link to="/work" className="hover:text-orange-600 transition">हमारे कार्य</Link>
          <Link to="/donation" className="hover:text-orange-600 transition">दान करें</Link>
          <Link to="/news" className="hover:text-orange-600 transition">समाचार</Link>
          <Link to="/cart" className="hover:text-orange-600 transition text-2xl">
            <IoCartOutline />
          </Link>
          <div className="h-5 border-l border-gray-400"></div>
          <Link to="/contact" className="hover:text-orange-600 transition flex items-center gap-2">
            <IoMdCall className="text-xl" />
            संपर्क करें
          </Link>
        </nav>

        {/* Login Button (Desktop only) */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-orange-400 text-white font-semibold transition"
          >
            दान करें
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 text-white font-medium flex flex-col space-y-4 px-6 py-6">
          <Link to="/" className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>मुख्य पृष्ठ</Link>
          <Link to="/about" className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>हमारे बारे में</Link>
          <Link to="/work" className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>हमारे कार्य</Link>
          <Link to="/donation" className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>दान करें</Link>
          <Link to="/news" className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>समाचार</Link>
          <Link to="/cart" className="hover:text-orange-600 transition flex items-center gap-2 text-xl" onClick={() => setIsOpen(false)}>
            <IoCartOutline /> कार्ट
          </Link>
          <Link to="/contact" className="hover:text-orange-600 transition flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <IoMdCall className="text-xl" />
            संपर्क करें
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-orange-400 text-white font-semibold text-center transition"
            onClick={() => setIsOpen(false)}
          >
            दान करें
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
