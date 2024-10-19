import React from 'react';
import axios from 'axios';

const TopUpButton = ({ email, token, amount, onPointsUpdate }) => {
  const handleTopUp = async () => {
    try {
      // Generate random points between 1 and 10
      const randomPoints = Math.floor(Math.random() * 10) + 1;

      // Top-up API call
      const response = await axios.post('http://localhost:5002/api/topup', { amount }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);

      // Update points in the database
      const updateResponse = await axios.post('http://localhost:5003/api/points/update', { email, points: randomPoints });
      alert(updateResponse.data.message);

      // Update points in the parent component
      onPointsUpdate(randomPoints);
    } catch (error) {
      console.error('Error during top-up:', error);
      alert('Top-up failed');
    }
  };

  return (
    <button onClick={handleTopUp} className="top-up-btn">
      Top Up
    </button>
  );
};

export default TopUpButton;