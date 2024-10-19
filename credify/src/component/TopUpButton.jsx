import React from 'react';
import axios from 'axios';

const TopUpButton = () => {
  const handleTopUp = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/topup', { amount: 10 }); // Example amount
      alert(response.data.message);
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