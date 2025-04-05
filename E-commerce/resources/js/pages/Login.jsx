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
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' atau 'error'

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menampilkan popup
  const showNotification = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    
    // Sembunyikan popup setelah 3 detik
    setTimeout(() => {
      setShowPopup(false);
      // Jika login berhasil, arahkan ke halaman produk
      if (type === 'success') {
        navigate('/products');
      }
    }, 3000);
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validasi input
      if (!formData.email || !formData.password) {
        setError('Email dan password harus diisi');
        showNotification('Email dan password harus diisi', 'error');
        setIsLoading(false);
        return;
      }

      // Melakukan proses login
      const loginSuccess = await login({
        email: formData.email,
        password: formData.password
      });

      if (loginSuccess) {
        showNotification('Login berhasil! Mengalihkan...', 'success');
      } else {
        showNotification('Email atau password salah', 'error');
      }
    } catch (err) {
      showNotification('Terjadi kesalahan saat login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Render komponen Login
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        {/* Popup Notifikasi */}
        {showPopup && (
          <div className={`popup-notification ${popupType}`}>
            {popupMessage}
          </div>
        )}

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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          {/* Tombol submit */}
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sedang Login...' : 'Login'}
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