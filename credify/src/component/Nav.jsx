import React, { useState, useContext } from 'react';
import { FaHome, FaUser, FaStore } from 'react-icons/fa'; // Import FaStore icon
import axios from 'axios';
import { AuthContext } from '../component/AuthContext'; // Assuming you have an AuthContext
import '../css/nav.css'; // Import custom CSS

const Nav = ({ activeIndex, onNavClick, onSearchClick }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const navItems = [
    { icon: <FaHome />, label: 'Home' },
    { icon: <FaUser />, label: 'Profile' },
    { icon: <FaStore />, label: 'Store' }, // Add Store item
  ];

  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setLoginOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-primary text-black shadow-lg z-50">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-white">Credify</div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="search flex items-center space-x-2" onClick={onSearchClick}>
            <label htmlFor="nav-search-input" className="sr-only">Search</label>
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 border rounded bg-light text-white focus:outline-none focus:ring-2 focus:ring-secondary" 
              id="nav-search-input" 
              name="nav-search"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="points-display text-white">Points: {user ? user.points : 0}</span>
          </div>
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer flex items-center space-x-2 ${activeIndex === index ? 'text-secondary' : 'text-black'} hover:text-secondary transition-colors duration-300`}
                onClick={() => {
                  console.log(`Nav item ${index} clicked`); // Debugging log
                  onNavClick(index);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {isLoginOpen && <Login onClose={toggleLogin} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default Nav;