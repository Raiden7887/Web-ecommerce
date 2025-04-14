import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Provider component untuk autentikasi
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan data user dan status loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect untuk mengecek data user yang tersimpan di localStorage saat aplikasi dimuat
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('userData');
        const token = localStorage.getItem('userToken');
        
        if (userData && token) {
          // Parse data user dari localStorage
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          // Set default header untuk axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          setUser(null);
          // Hapus header authorization jika tidak ada token
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        // Jika terjadi error, hapus data yang mungkin rusak
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Fungsi untuk melakukan login
  const login = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('http://127.0.0.1:8000/api/login', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Menyimpan data user dan token ke state dan localStorage
        setUser(response.data.userData);
        localStorage.setItem('userData', JSON.stringify(response.data.userData));
        localStorage.setItem('userToken', response.data.token);
        
        // Set default header untuk axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        return true;
      } else {
        setError(response.data.message || 'Login gagal');
        return false;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat login';
      setError(errorMessage);
      return false;
    }
  };

  // Fungsi untuk melakukan registrasi
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Registrasi gagal');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat registrasi';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Fungsi untuk melakukan logout
  const logout = () => {
    setUser(null);
    setError(null);
    // Menghapus data user dan token dari localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    Cookies.remove('laravel_session');
    Cookies.remove('XSRF-TOKEN');
    // Hapus header authorization
    delete axios.defaults.headers.common['Authorization'];
  };

  // Menentukan status autentikasi user
  const isAuthenticated = !!user;

  // Render provider dengan value yang berisi fungsi-fungsi autentikasi
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        isAuthenticated, 
        loading,
        error 
      }}
    >
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