import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

// Komponen Register untuk menangani proses pendaftaran pengguna baru
const Register = () => {
  // Hook untuk navigasi dan autentikasi
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // State untuk menyimpan data form dan pesan error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi kecocokan password
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    // Validasi kelengkapan form
    if (!formData.name || !formData.email || !formData.password) {
      setError('Semua field harus diisi');
      return;
    }

    // Melakukan proses registrasi
    register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    // Navigasi ke halaman produk setelah registrasi berhasil
    navigate('/products');
  };

  // Render komponen Register
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Daftar</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Form input nama */}
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Form input email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Form input password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Form input konfirmasi password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {/* Tombol submit */}
          <button type="submit" className="auth-button">
            Daftar
          </button>
        </form>
        {/* Link ke halaman login */}
        <p className="auth-link">
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 