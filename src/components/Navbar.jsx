import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, Info, Calendar, Users, Award, Mail, UserCheck, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleHomeClick = () => {
    closeMenu();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId) => {
    closeMenu();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} />, action: handleHomeClick },
    { id: 'about', label: 'About', icon: <Info size={18} />, action: () => handleSectionClick('about') },
    { 
      id: 'events', 
      label: 'Events', 
      icon: <Award size={18} />, 
      action: () => { 
        closeMenu(); 
        navigate('/events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
    },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={18} />, action: () => handleSectionClick('schedule') },
    { id: 'host', label: 'Host', icon: <UserCheck size={18} />, action: () => { closeMenu(); navigate('/host'); } },
    { id: 'sponsors', label: 'Sponsors', icon: <Users size={18} />, action: () => handleSectionClick('sponsors') },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} />, action: () => handleSectionClick('contact') },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo Section */}
          <div className="logo-section" onClick={handleHomeClick}>
            <div className="logo-wrapper">
              <img
                src="logosp.png"
                alt="ISTE Logo"
                className="logo-image"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-items">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="nav-item"
                  onClick={item.action}
                  aria-label={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-indicator"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Registration Button */}
          <Link to="/register" className="register-btn">
            <span className="btn-text">Register Now</span>
            <span className="btn-glow"></span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu} />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-items">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className="mobile-menu-item"
                onClick={item.action}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="mobile-item-icon">{item.icon}</span>
                <span className="mobile-item-label">{item.label}</span>
              </button>
            ))}
          </div>
          
          <Link 
            to="/register" 
            className="mobile-menu-register"
            onClick={closeMenu}
          >
            <span>Register Now</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;