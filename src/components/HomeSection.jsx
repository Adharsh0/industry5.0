import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import './HomeSection.css';

const HomeSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-subtitle">ISTE MBCET presents</p>
          
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
          <div className="date-section">
            <div className="date-container">
              <div className="date-icon">
                <FaCalendarAlt />
              </div>
              <div className="date-content">
                <span className="date-label">Event Date</span>
                <span className="date-value">9th & 10th January 2026</span>
              </div>
              <div className="coming-soon-tag">Coming Soon</div>
            </div>
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
      <br/>
      <br/>
      <div className="footer-banner">
        <p>Bridging AI, Automation and Sustainability</p>
      </div>
    </div>
  );
};
export default HomeSection;