import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

// Komponen Login untuk menangani proses autentikasi pengguna
const Login = () => {
  // Hook untuk navigasi dan autentikasi
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State untuk menyimpan data form dan pesan error
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (formData.email && formData.password) {
      // Melakukan proses login
      login({
        email: formData.email,
        password: formData.password
      });
      // Navigasi ke halaman produk setelah login berhasil
      navigate('/products');
    } else {
      setError('Email dan password harus diisi');
    }
  };

  // Render komponen Login
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          {/* Tombol submit */}
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        {/* Link ke halaman registrasi */}
        <p className="auth-link">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 