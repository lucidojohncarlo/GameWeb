import React from 'react';
import LibraryCard from './LibraryCard';

const Sidebar = ({ isActive }) => {
  const libraryGames = [
    {
      logo: 'images/valorant.jpg',
      platform: 'Valorant',
    },
    {
      logo: 'images/codm.png',
      platform: 'CODM',
    },
    {
      logo: 'images/dota.png',
      platform: 'DOTA 2',
    },
  ];

  return (
    <aside className={`p-4 text-secondary ${isActive ? 'block' : 'hidden'} md:block`}>
      <div className="library">
        <h3 className="text-xl font-bold mb-4 text-secondary">Recent visit</h3>
        {libraryGames.map((game, index) => (
          <LibraryCard key={index} game={game} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;