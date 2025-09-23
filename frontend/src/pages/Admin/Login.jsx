import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fixedEmail = "admin@example.com";
  const fixedPassword = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === fixedEmail && password === fixedPassword) {
      localStorage.setItem("authToken", "adminToken123"); 
      alert("Login Successful!");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Animated Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 10px 30px rgba(249, 115, 22, 0.6)",
        }}
        className="relative z-10 bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm mx-4"
      >
        <h1 className="text-4xl font-medium mb-8 text-center text-gray-800">
          Admin Login
        </h1>

        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          required
          className="w-full mb-4 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          required
          className="w-full mb-6 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 20px rgba(249, 115, 22, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
