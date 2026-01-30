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
import CustomCursor from './components/CustomCursor';
import CountdownTimer from './components/CountdownTimer';
import SchedulePage from './components/SchedulePage'; // Import SchedulePage
import RankList from './components/RankList';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile/tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);

    // Splash screen timer
    const timer = setTimeout(() => setShowSplash(false), 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {/* Only show custom cursor on desktop */}
          {!isMobile && <CustomCursor />}
          
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <HomeSection />
                  <CountdownTimer />
                  <HostedPage />
                  <AboutSection />
                  <ContactSection />
                </>
              } />
              <Route path="/schedule" element={<SchedulePage />} /> {/* Schedule Route */}
              <Route path="/events" element={<Events />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/host" element={<HostSection />} />
              <Route path="/admin-iste-qwert" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/rankings" element={<RankList />} />
            </Routes>
            <Footer />
          </div>
        </>
      )}
    </Router>
  );
}

export default App;