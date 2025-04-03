import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah ada user yang tersimpan di localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const cred = JSON.stringify(userData)
    const response = await axios.post('http://127.0.0.1:8000/api/login', cred, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setUser(response.data.userData);
    localStorage.setItem('userData', JSON.stringify(response.data.userData));
    localStorage.setItem('userToken', response.data.token);
  };

  const register = async (userData) => {
    const cred = JSON.stringify(userData);
    const response = await axios.post('http://127.0.0.1:8000/api/register', cred, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 