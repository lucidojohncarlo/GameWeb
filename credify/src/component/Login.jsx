import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css'; // Import custom CSS for additional styling

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/login', { email, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark">
      <div className="login-modal p-8 bg-gradient-to-r from-black to-green-500 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-500">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded"
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Login</button>
        </form>
        <p className="mt-4 text-white">
          Don't have an account? <Link to="/signup" className="text-green-300">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;