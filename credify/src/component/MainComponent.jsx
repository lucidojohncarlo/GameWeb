import React, { useState } from 'react';
import Nav from './Nav';
import RightMain from './RightMain';
import Profile from './Profile'; // Import Profile component

const MainComponent = ({ isAuthenticated, setIsAuthenticated }) => {
  const [activeNav, setActiveNav] = useState(0);
  const [isSidebarActive, setSidebarActive] = useState(false);

  const handleNavClick = (index) => {
    setActiveNav(index);
  };

  const handleHamburgerClick = () => {
    setSidebarActive(!isSidebarActive);
  };

  return (
    <div className="container mx-auto p-4">
      <Nav activeIndex={activeNav} onNavClick={handleNavClick} />
      {activeNav === 2 ? (
        <Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> // Pass props to Profile
      ) : (
        <RightMain
          isSidebarActive={isSidebarActive}
          onHamburgerClick={handleHamburgerClick}
        />
      )}
    </div>
  );
};

export default MainComponent;