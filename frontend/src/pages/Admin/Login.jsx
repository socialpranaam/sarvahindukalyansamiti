import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fixedEmail = "admin@example.com";
  const fixedPassword = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === fixedEmail && password === fixedPassword) {
      localStorage.setItem("authToken", "adminToken123"); // store token
      alert("Login Successful!");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Login</h1>

        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          placeholder="Enter email"
          required
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          required
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
