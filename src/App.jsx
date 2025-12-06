import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomeSection from './components/HomeSection';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RegistrationPage from './components/RegistrationPage';

import AdminPage from './components/AdminPage';
import HostSection from './components/HostSection';
import HostedPage from './components/HostedPage';
import SplashScreen from './components/SplashScreen'; // ⬅ Add this import

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500); // Duration of Splash Screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <HomeSection />
                <HostedPage />
                <AboutSection />
                <ContactSection />
              </>
            } />
            <Route path="/register" element={<RegistrationPage />} />
            
            <Route path="/host" element={<HostSection />} />
            <Route 
              path="/admin-iste" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
