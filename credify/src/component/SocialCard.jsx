import React from 'react';

const SocialCard = ({ user }) => {
  return (
    <div className="library-card flex items-center p-4 bg-white rounded shadow mb-4">
      <div className="game-logo w-16 h-16 mr-4">
        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded" />
      </div>
      <div className="game-details flex-1">
        <h4 className="text-lg font-bold">{user.name}</h4>
        <p className="text-gray-500">{user.status}</p>
      </div>
      <div className={`${user.online ? 'bg-green-500' : 'bg-gray-500'} w-4 h-4 rounded-full`}></div>
    </div>
  );
};

export default SocialCard;