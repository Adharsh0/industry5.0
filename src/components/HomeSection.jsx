import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HomeSection.css';

const HomeSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Set loading state to true
    setIsRegisterLoading(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      navigate('/register');
      // Note: The loading state will reset when component unmounts during navigation
    }, 1000);
  };

  const handleKnowMore = () => {
    // Scroll to about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-container" id='home'>
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="hero-subtitle">ISTE MBCET Presents</span>
          </div>
          
          <div className="main-title-section">
            <h1 className="main-title">
              <span className="industry-black">INDUSTRY</span>
              <span className="industry-green">5.0</span>
            </h1>
            <p className="main-subtitle">Human-Centric Smart Engineering</p>
          </div>
          
          <div className="convention-info">
            <h2 className="convention-title">24th Annual State Students' Convention</h2>
            <p className="convention-subtitle">of the ISTE Kerala Section</p>
          </div>

          <div className="cta-buttons">
            <button 
              className={`cta-button btn-primary ${isRegisterLoading ? 'loading' : ''}`} 
              onClick={handleRegister}
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? (
                <>
                  <FaSpinner className="btn-icon spinner" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Register Now</span>
                  <FaArrowRight className="btn-icon" />
                </>
              )}
            </button>
            <button className="cta-button btn-secondary" onClick={handleKnowMore}>
              <span>Know More</span>
              <FaInfoCircle className="btn-icon" />
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-container">
            <div className="image-glow"></div>
            <img 
              src="robo.png" 
              alt="AI Robot holding Earth"
              className="hero-image"
            />
            <div className="floating-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-banner">
        <div className="marquee">
          <div className="marquee-content">
            <span className="marquee-text">
              <FaCalendarAlt className="marquee-icon" />
              Event Date: 9th & 10th January 2026
            </span>
            <span className="marquee-text">
              <FaMapMarkerAlt className="marquee-icon" />
              MBCET Trivandrum
            </span>
            <span className="marquee-text">
              <FaCalendarAlt className="marquee-icon" />
              Event Date: 9th & 10th January 2026
            </span>
            <span className="marquee-text">
              <FaMapMarkerAlt className="marquee-icon" />
              MBCET Trivandrum
            </span>
            <span className="marquee-text">
              <FaCalendarAlt className="marquee-icon" />
              Event Date: 9th & 10th January 2026
            </span>
            <span className="marquee-text">
              <FaMapMarkerAlt className="marquee-icon" />
              MBCET Trivandrum
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;