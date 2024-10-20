import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';
import { AuthContext } from '../component/AuthContext';
import SendPoints from '../component/SendPoints';

const Profile = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handlePointsUpdate = (newPoints) => {
    setUser({ ...user, points: newPoints });
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-page p-8 bg-dark text-white rounded-lg shadow-lg mt-16">
      <div className="flex items-center space-x-4 mb-8">
        <img src={user.avatar || 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} alt={user.username} className="w-24 h-24 rounded-full shadow-md" />
        <div>
          <h2 className="text-3xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-400">Points: {user.points}</p>
        </div>
      </div>
      <div className="user-details">
        <SendPoints onPointsUpdate={handlePointsUpdate} />
      </div>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Profile;