import React, { useState,useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css'; // Import custom CSS for additional styling
import { AuthContext } from '../component/AuthContext';

const Login = ({ setIsAuthenticated }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5002/api/login', { email, password });
      login(response.data.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert(`Login failed: ${error.response ? error.response.data.message : error.message}`);
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