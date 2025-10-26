import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import './HomeSection.css';

const HomeSection = () => {
  const handleRegister = () => {
    console.log('Register clicked');
  };

  const handleKnowMore = () => {
    console.log('Know more clicked');
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
            <button className="cta-button btn-primary" onClick={handleRegister}>
              <span>Register Now</span>
              <FaArrowRight className="btn-icon" />
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
            
            {/* Desktop Image */}
            <img 
              src="robo.png" 
              alt="AI Robot representing Industry 5.0"
              className="hero-image desktop-image"
            />
            
            {/* Mobile Image */}
            <img 
              src="mobile.png" 
              alt="AI Robot representing Industry 5.0"
              className="hero-image mobile-image"
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
            {/* Repeat for seamless animation */}
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