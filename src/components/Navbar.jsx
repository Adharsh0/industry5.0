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

  // Radial menu gets all nav items + Register
  const radialItems = [
    ...navItems,
    {
      id: 'register',
      label: 'Register',
      icon: <Award size={18} />,
      action: () => {
        closeMenu();
        navigate('/register');
      },
    },
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
        </div>
      </nav>

      {/* Floating Orb (Mobile Command Button) */}
      <div className="nav-orb-wrapper">
        <button
          className={`nav-orb ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation"
        >
          <div className="nav-orb-ring" />
          <div className="nav-orb-core">
            <Menu size={18} />
          </div>
          <div className="nav-orb-pulse" />
        </button>
      </div>

      {/* Radial Command Overlay */}
      <div
        className={`nav-orb-overlay ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      >
        <div
          className="radial-menu"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <div className="radial-center">
            <span className="radial-center-main">ISTE</span>
            <span className="radial-center-sub">Industry 5.0</span>
          </div>

          <div className="radial-items">
            {radialItems.map((item, index) => (
              <button
                key={item.id}
                className="radial-item"
                onClick={item.action}
                style={{ '--i': index }}
              >
                <div className="radial-icon">{item.icon}</div>
                <div className="radial-label">{item.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
