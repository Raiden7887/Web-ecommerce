import './bootstrap';
import React from 'react';
import { StrictMode } from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './components/main'

// Mendapatkan elemen root dari DOM
const root = document.getElementById('app');

// Mengecek keberadaan elemen root
if (root) {
  // Membuat root React dan merender aplikasi
  const Index = ReactDOM.createRoot(root)
  Index.render(
    // Menggunakan BrowserRouter untuk navigasi
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  // Menampilkan pesan error jika elemen root tidak ditemukan
  console.error("Element with id 'app' not found");
}