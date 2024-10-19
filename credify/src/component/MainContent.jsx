import React from 'react';
import { Link } from 'react-router-dom';
import SlidingGallery from './SlidingGallery';

const MainContent = () => {
  const gameIcons = [
    { icon: '/images/codm.png', name: 'CODM', path: '/codm' },
    { icon: '/images/csgo.png', name: 'CSGO', path: '/csgo' },
    { icon: '/images/dota.png', name: 'DOTA 2', path: '/dota2' },
    { icon: '/images/ml.jpg', name: 'Mobile Legends', path: '/mobilelegends' },
    { icon: '/images/valorant.jpg', name: 'Valorant', path: '/valorant' },
    { icon: '/images/lol.png', name: 'League of Legends', path: '/leagueoflegends' },
  ];

  return (
    <main className="p-4 bg-dark text-secondary">
      <header className="mb-8">
        <SlidingGallery />
      </header>
      <div className="game-icons grid grid-cols-1 md:grid-cols-3 gap-4">
        {gameIcons.map((game, index) => (
          <Link to={game.path} key={index} className="game-icon bg-light text-white p-4 rounded flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 flex items-center justify-center">
              <img src={game.icon} alt={game.name} className="w-full h-full object-contain rounded" />
            </div>
            <p className="mt-2">{game.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MainContent;