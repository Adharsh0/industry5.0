import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        {/* Logo with Image */}
        <div className="logo">
          <div className="logo-container">
            <img 
              src="iste1.png" 
              alt="Industry 5.0 Logo" 
              className="logo-image"
            />
            <div className="logo-text">
              <div className="logo-tagline">Indian Society of Technical Education</div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#events" onClick={closeMenu}>Events</a>
          <a href="#schedule" onClick={closeMenu}>Schedule</a>
          <a href="#speakers" onClick={closeMenu}>Speakers</a>
          <a href="#sponsors" onClick={closeMenu}>Sponsors</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
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
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#events" onClick={closeMenu}>Events</a>
          <a href="#schedule" onClick={closeMenu}>Schedule</a>
          <a href="#speakers" onClick={closeMenu}>Speakers</a>
          <a href="#sponsors" onClick={closeMenu}>Sponsors</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;