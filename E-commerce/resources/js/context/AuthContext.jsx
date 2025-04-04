import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Provider component untuk autentikasi
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan data user dan status loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect untuk mengecek data user yang tersimpan di localStorage saat aplikasi dimuat
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.stringify(userData));
    }
    setLoading(false);
  }, []);

  // Fungsi untuk melakukan login
  const login = async (userData) => {
    const cred = JSON.stringify(userData)
    // Melakukan request ke API login
    const response = await axios.post('http://127.0.0.1:8000/api/login', cred, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Menyimpan data user dan token ke state dan localStorage
    setUser(response.data.userData);
    localStorage.setItem('userData', JSON.stringify(response.data.userData));
    localStorage.setItem('userToken', response.data.token);
  };

  // Fungsi untuk melakukan registrasi
  const register = async (userData) => {
    const cred = JSON.stringify(userData);
    // Melakukan request ke API register
    const response = await axios.post('http://127.0.0.1:8000/api/register', cred, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  // Fungsi untuk melakukan logout
  const logout = () => {
    setUser(null);
    // Menghapus data user dan token dari localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  };

  // Menentukan status autentikasi user
  const isAuthenticated = !!user;

  // Render provider dengan value yang berisi fungsi-fungsi autentikasi
  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context autentikasi
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 