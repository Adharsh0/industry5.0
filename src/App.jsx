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
import SplashScreen from './components/SplashScreen';
import Events from './components/Events';
import EventTimeline from './components/EventTimeline';
import CountdownTimer from './components/CountdownTimer';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
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
                <CountdownTimer />
                <HostedPage />
                <AboutSection />
                <EventTimeline />
                <ContactSection />
                
              </>
            } />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/host" element={<HostSection />} />
            <Route path="/admin-iste-qwert" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;