import React from 'react';
import { 
  FaArrowRight
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const handleRegisterClick = () => {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/register';
    }
  };

  return (
    <footer className="footer" id="footer">
      {/* CTA Section */}
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
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 ISTE MBCET - Industry 5.0 Convention. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;