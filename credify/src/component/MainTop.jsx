import React from 'react';

const MainTop = ({ onSearchClick, onHamburgerClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-dark text-secondary shadow-md">
      <div className="search flex items-center space-x-2" onClick={onSearchClick}>
        <span className="text-secondary">🔍</span>
        <label htmlFor="main-search-input" className="sr-only">Search</label>
        <input 
          type="text" 
          placeholder="Search..." 
          className="p-2 border rounded bg-light text-white focus:outline-none focus:ring-2 focus:ring-secondary" 
          id="main-search-input" 
          name="main-search"
        />
      </div>
    </div>
  );
};

export default MainTop;