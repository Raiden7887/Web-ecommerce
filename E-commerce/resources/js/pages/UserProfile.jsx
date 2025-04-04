import React from 'react';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

// Komponen untuk menampilkan dan mengelola profil pengguna
const UserProfile = () => {
  // Hook untuk mengakses data dan fungsi autentikasi
  const { user, logout } = useAuth();

  // Fungsi untuk menangani proses logout
  const handleLogout = () => {
    logout();
  };

  // Render komponen UserProfile
  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1>Profil Pengguna</h1>
        {/* Menampilkan informasi profil pengguna */}
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
        {/* Tombol logout */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 