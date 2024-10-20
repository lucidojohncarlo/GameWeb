import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './component/AuthContext';
import CODM from './component/CODM';
import Login from './component/Login'; // Assuming you have a Login component
import Signup from './component/Signup'; // Assuming you have a Signup component
import Dashboard from './component/MainComponent'; // Assuming you have a Dashboard component
import Profile from './component/Profile'; // Assuming you have a Profile component
import CSGO from './component/CSGO'; // Assuming you have a CSGO component
import DOTA2 from './component/DOTA2'; // Assuming you have a DOTA2 component
import MobileLegends from './component/MobileLegends'; // Assuming you have a MobileLegends component
import Valorant from './component/Valorant'; // Assuming you have a Valorant component
import LeagueOfLegends from './component/LeagueOfLegends'; // Assuming you have a LeagueOfLegends component
import Store from './component/Store'; // Import Store component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ component: Component }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
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
          <Route path="/store" element={<PrivateRoute component={Store} />} /> {/* Add Store route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;