import React from 'react';
import LibraryCard from './LibraryCard';
import SocialCard from './SocialCard';

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

  const socialUsers = [
    {
      avatar: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
      name: 'Adramelech',
      status: 'Playing Resident Evil Village',
      online: true,
    },
    {
      avatar: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man4-512.png',
      name: 'Phase Runner',
      status: 'Offline',
      online: false,
    },
    {
      avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png',
      name: 'Elena',
      status: 'Playing The Witcher 3: Wild Hunt',
      online: true,
    },
  ];

  return (
    <aside className={`p-4  text-secondary ${isActive ? 'block' : 'hidden'} md:block`}>
      <div className="library">
        <h3 className="text-xl font-bold mb-4 text-secondary">Recent visit</h3>
        {libraryGames.map((game, index) => (
          <LibraryCard key={index} game={game} />
        ))}
        <hr className="my-4" />
        <h3 className="text-xl font-bold mb-4 text-secondary">Social</h3>
        {socialUsers.map((user, index) => (
          <SocialCard key={index} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;