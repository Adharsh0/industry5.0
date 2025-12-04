import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleHomeClick = () => {
    closeMenu();
    navigate('/');
    // Scroll to top when going home
    window.scrollTo(0, 0);
  };

  const handleSectionClick = (sectionId) => {
    closeMenu();
    navigate('/');
    // Small delay to ensure navigation happens before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHostClick = () => {
    closeMenu();
    navigate('/host'); // Navigate to separate host page
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        {/* Logo with Image */}
        <div className="logo" onClick={handleHomeClick} style={{cursor: 'pointer'}}>
          <div className="logo-container">
            <img 
              src="iste1.png" 
              alt="Industry 5.0 Logo" 
              className="logo-image1"
            />
            <div className="logo-text">
              <div className="logo-tagline">Indian Society of Technical Education</div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <button className="nav-link-btn" onClick={handleHomeClick}>Home</button>
          <button className="nav-link-btn" onClick={() => handleSectionClick('about')}>About</button>
          <button className="nav-link-btn" onClick={() => handleSectionClick('events')}>Events</button>
          <button className="nav-link-btn" onClick={() => handleSectionClick('schedule')}>Schedule</button>
          <button className="nav-link-btn" onClick={handleHostClick}>Host</button> {/* Updated */}
          <button className="nav-link-btn" onClick={() => handleSectionClick('sponsors')}>Sponsors</button>
          <button className="nav-link-btn" onClick={() => handleSectionClick('contact')}>Contact</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <button className="mobile-link-btn" onClick={handleHomeClick}>Home</button>
          <button className="mobile-link-btn" onClick={() => handleSectionClick('about')}>About</button>
          <button className="mobile-link-btn" onClick={() => handleSectionClick('events')}>Events</button>
          <button className="mobile-link-btn" onClick={() => handleSectionClick('schedule')}>Schedule</button>
          <button className="mobile-link-btn" onClick={handleHostClick}>Host</button> {/* Updated */}
          <button className="mobile-link-btn" onClick={() => handleSectionClick('sponsors')}>Sponsors</button>
          <button className="mobile-link-btn" onClick={() => handleSectionClick('contact')}>Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;