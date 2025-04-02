import './bootstrap';
import React from 'react';

import { StrictMode } from 'react'
import ReactDOM  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './components/main'

const root = document.getElementById('app');
if (root) {
  const Index = ReactDOM.createRoot(root)
  Index.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
} else {
    console.error("Element with id 'app' not found");
}