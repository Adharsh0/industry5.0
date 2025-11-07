import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaInfoCircle,
  FaUserShield
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const handleRegisterClick = () => {
    // Scroll to registration section or navigate to register page
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/register';
    }
  };

  const handleLearnMoreClick = () => {
    // Scroll to about section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      {/* CTA Section - Hidden on mobile */}
      <div className="footer-top">
        <div className="footer-cta">
          <div className="cta-content">
            <div className="cta-badge">
              <span className="cta-badge-dot"></span>
              <span className="cta-badge-text">Join Us</span>
            </div>
            <h2 className="cta-title">
              Ready to Shape <span>the Future?</span>
            </h2>
            <p className="cta-description">
              Be part of the revolution in human-centric smart engineering. Register now for Industry 5.0 Convention 2026.
            </p>
          </div>
          <div className="cta-buttons">
            <button 
              className="cta-button btn-primary"
              onClick={handleRegisterClick}
            >
              Register Now <FaArrowRight className="btn-icon" />
            </button>
            <button 
              className="cta-button btn-secondary"
              onClick={handleLearnMoreClick}
            >
              Learn More <FaInfoCircle className="btn-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="iste1.png" 
                alt="ISTE Logo" 
                className="footer-logo-image"
              />
              <div className="footer-logo-text">
                <div className="footer-logo-title">INDUSTRY 5.0</div>
                <div className="footer-logo-subtitle">ISTE Kerala Section</div>
              </div>
            </div>
            <p className="footer-description">
              Empowering the next generation of engineers and innovators through cutting-edge technology and sustainable innovation.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links - Hidden on mobile */}
          <div className="footer-section footer-links-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#events" className="footer-link">Events</a>
              <a href="#schedule" className="footer-link">Schedule</a>
              <Link to="/register" className="footer-link">Register</Link>
            </div>
          </div>

          {/* Contact Info - Always visible */}
          <div className="footer-section footer-contact-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="footer-links">
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="footer-contact-icon" />
                <span>Mar Baselios College of Engineering & Technology</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" />
                <a href="mailto:info@istekerala.org" className="footer-contact-link">
                  info@istekerala.org
                </a>
              </div>
              <div className="footer-contact-item">
                <FaPhone className="footer-contact-icon" />
                <a href="tel:+919876543210" className="footer-contact-link">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile CTA - Only visible on mobile */}
        <div className="mobile-cta">
          <button 
            className="mobile-cta-button btn-primary"
            onClick={handleRegisterClick}
          >
            Register Now <FaArrowRight className="btn-icon" />
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 ISTE Kerala Section - Industry 5.0 Convention. All rights reserved.
          </p>
          <div className="footer-credits">
            <a href="#" className="footer-credit-link">Privacy Policy</a>
            <a href="#" className="footer-credit-link">Terms of Service</a>
            <a href="#" className="footer-credit-link">Cookie Policy</a>
            
            {/* Admin Link */}
            <Link to="/admin-login" className="footer-admin-link">
              <FaUserShield className="admin-icon" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;