import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../component/AuthContext';
import codmBackground from '/GameWeb/credify/public/images/dota.png';
import '../css/topup.css';

const DOTA2 = () => {
  const [amount, setAmount] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User object:', user);
  }, [user]);

  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to top up.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/topup', { amount }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      alert(response.data.message);
      setUser({ ...user, points: user.points + response.data.points });
    } catch (error) {
      console.error('Top-up error:', error.response ? error.response.data : error.message);
      alert(`Top-up failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${codmBackground})` }}
      ></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="p-16 bg-dark-transparent text-white rounded-lg shadow-lg max-w-lg w-full">
          <button onClick={handleBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
          <h2 className="text-3xl font-bold mb-6">Dota 2 Top-Up</h2>
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
        </div>
      </div>
    </div>
  );
};

export default DOTA2;