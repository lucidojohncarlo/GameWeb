// credify/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './component/Profile';
import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/MainComponent';
import CODM from './component/CODM';
import CSGO from './component/CSGO';
import DOTA2 from './component/DOTA2';
import MobileLegends from './component/MobileLegends';
import Valorant from './component/Valorant';
import LeagueOfLegends from './component/LeagueOfLegends';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ component: Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute component={() => <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/profile" element={<PrivateRoute component={() => <Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/codm" element={<PrivateRoute component={CODM} />} />
        <Route path="/csgo" element={<PrivateRoute component={CSGO} />} />
        <Route path="/dota2" element={<PrivateRoute component={DOTA2} />} />
        <Route path="/mobilelegends" element={<PrivateRoute component={MobileLegends} />} />
        <Route path="/valorant" element={<PrivateRoute component={Valorant} />} />
        <Route path="/leagueoflegends" element={<PrivateRoute component={LeagueOfLegends} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;