import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomeSection from './components/HomeSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import AdminPage from './components/AdminPage'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HomeSection />
              <AboutSection />
              <ContactSection />
            </>
          } />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin-login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App