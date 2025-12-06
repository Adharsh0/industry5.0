import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Home, Info, Calendar, Users, Award, Mail, UserCheck } from 'lucide-react';
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

  // Lock scroll when radial menu is open
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
    { id: 'events', label: 'Events', icon: <Award size={18} />, action: () => handleSectionClick('events') },
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
                src="iste1.png"
                alt="ISTE Logo"
                className="logo-image"
              />
              <div className="logo-text">
                <span className="logo-main">ISTE</span>
                <span className="logo-sub">Industry 5.0</span>
              </div>
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

          {/* Mobile Registration Button */}
          <Link to="/register" className="mobile-register-btn">
            <span className="btn-text">Register</span>
            <span className="btn-glow"></span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;