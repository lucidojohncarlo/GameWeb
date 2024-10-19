import React from 'react';

const LibraryCard = ({ game }) => {
  return (
    <div className="library-card flex items-center p-4 bg-white rounded shadow mb-4">
      <div className="game-logo w-16 h-16 mr-4">
        <img src={game.logo} alt={game.title} className="w-full h-full object-cover rounded" />
      </div>
      <div className="game-details flex-1">
        <h4 className="text-lg font-bold">{game.title}</h4>
        <p className="text-gray-500">{game.platform}</p>
      </div>
      <span className="text-gray-500">{game.icon}</span>
    </div>
  );
};

export default LibraryCard;