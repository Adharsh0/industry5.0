import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. IMPORT AOS CSS STYLES (MANDATORY)
import 'aos/dist/aos.css'; 
// 2. IMPORT AOS LIBRARY
import AOS from 'aos';

// 3. INITIALIZE AOS GLOBALLY
AOS.init({
  duration: 1000, // Animation duration
     // Whether animation should happen only once - true by default
  // You can set other options here like offset: 50, delay: 0, etc.
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)