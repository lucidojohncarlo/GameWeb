import React from 'react';
import MainTop from './MainTop';
import MainFlex from './MainFlex';

const RightMain = ({ isSidebarActive, onSearchClick, onHamburgerClick }) => {
  return (
    <div className="right-main flex-1">
      <MainTop onSearchClick={onSearchClick} onHamburgerClick={onHamburgerClick} />
      <MainFlex isSidebarActive={isSidebarActive} />
    </div>
  );
};

export default RightMain;