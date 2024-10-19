import React from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

const MainFlex = ({ isSidebarActive }) => {
  return (
    <div className="main-flex flex">
      <MainContent />
      <Sidebar isActive={isSidebarActive} />
    </div>
  );
};

export default MainFlex;