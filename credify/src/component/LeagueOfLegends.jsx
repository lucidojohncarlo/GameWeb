import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../component/AuthContext';
import lolBackground from '/GameWeb/credify/public/images/lol.png';
import '../css/topup.css';
import TopUpButton from './TopUpButton';

const LeagueOfLegends = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    console.log('User object:', user);
  }, [user]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePointsUpdate = (points) => {
    setUser({ ...user, points: user.points + points });
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${lolBackground})` }}
      ></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="p-16 bg-dark-transparent text-white rounded-lg shadow-lg max-w-lg w-full">
          <button onClick={handleBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back</button>
          <h2 className="text-3xl font-bold mb-6">League of Legends Top-Up</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mb-4 p-2 border rounded bg-light text-black focus:outline-none focus:ring-2 focus:ring-secondary topup-input"
            placeholder="Enter amount"
          />
          <TopUpButton email={user.email} token={user.token} amount={amount} onPointsUpdate={handlePointsUpdate} />
        </div>
      </div>
    </div>
  );
};

export default LeagueOfLegends;