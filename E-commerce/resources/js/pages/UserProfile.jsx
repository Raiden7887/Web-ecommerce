import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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
        {/* Tombol Create Product */}
        <Link to="/product/create" className="create-product-button">
          Buat Produk
        </Link>
        {/* Tombol Logout */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;