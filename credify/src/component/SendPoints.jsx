import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../component/AuthContext';
import '../css/modal.css';

const SendPoints = () => {
  const { user } = useContext(AuthContext);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendPoints = async () => {
    try {
      const response = await axios.post('http://localhost:5003/api/points/send', {
        senderEmail: user.email,
        receiverEmail,
        points,
      });
      console.log('Points sent successfully:', response.data);
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('Error: No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        setError(`Error: ${error.message}`);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="send-points-form">
      <h2>Send Points</h2>
      <input
        type="email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        placeholder="Receiver's Email"
        className="mb-4 p-2 border rounded bg-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        placeholder="Points"
        className="mb-4 p-2 border rounded bg-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button onClick={handleSendPoints} className="send-points-btn">
        Send Points
      </button>
      {error && <p className="error-message">{error}</p>}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Success</h2>
            <p>Points sent successfully!</p>
            <button onClick={closeModal} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendPoints;