import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../component/AuthContext'; // Adjust the path as needed
import mlBackground from '/GameWeb/credify/public/images/ml.jpg'; // Adjust the path as needed
import '../css/topup.css';

const MobileLegends = () => {
  const [amount, setAmount] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTopUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/topup', { username: user.username, amount });
      alert(response.data.message);
      setUser({ ...user, points: user.points + response.data.points });
    } catch (error) {
      console.error('Top-up error:', error.response ? error.response.data : error.message);
      alert(`Top-up failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${mlBackground})` }}
      ></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="p-16 bg-dark-transparent text-white rounded-lg shadow-lg max-w-lg w-full">
          <button onClick={handleBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
          <h2 className="text-3xl font-bold mb-6">Mobile Legends Top-Up</h2>
          <form onSubmit={handleTopUp}>
            <div className="mb-4">
              <label className="block text-white mb-2">Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full p-2 border-2 border-green-500 rounded bg-light text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-black font-bold rounded hover:bg-green-600 transition duration-300"
            >
              Top-Up
            </button>
          </form>
          {user && (
            <div className="mt-4">
              <h3 className="text-xl font-bold">Current Points: {user.points}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileLegends;