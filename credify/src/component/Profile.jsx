import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css'; // Import custom CSS

const Profile = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const user = {
    username: 'testuser',
    email: 'test@example.com',
    avatar: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
    bio: 'Gamer, Developer, and Tech Enthusiast',
    location: 'San Francisco, CA',
    joined: 'January 2021',
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="profile-page p-8 bg-dark text-white rounded-lg shadow-lg mt-16">
      <div className="flex items-center space-x-4 mb-8">
        <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full shadow-md" />
        <div>
          <h2 className="text-3xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="user-details">
        <p className="text-gray-400">{user.bio}</p>
        <p className="text-gray-400">{user.location}</p>
        <p className="text-gray-400">Joined: {user.joined}</p>
      </div>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
};

export default Profile;