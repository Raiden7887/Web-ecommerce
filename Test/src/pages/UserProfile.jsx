import React from 'react';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>Profil Pengguna</h1>
        <div className="profile-info">
          <div className="profile-field">
            <label>Nama:</label>
            <span>{user?.name}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 