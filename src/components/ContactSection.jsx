import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaArrowRight, FaInstagram } from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank');
  };

  return (
    <section className="contact-container" id="contact">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="contact-content">
        {/* Header Section */}
        <div className="registration-header">
          <h1 className="main-heading">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="header-description">
            Reach out to us for partnerships, sponsorships, or any inquiries about ISTE INDUSTRY 5.0
          </p>
        </div>

        <div className="contact-layout">
          {/* Main Contact Form */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">Get in <span>Touch</span></h2>
                <p className="form-subtitle">
                  Enter Lorem ipsum dolor sit amet consectetur adipisicing. Et sllm necessitatibus sed excepturi libero illum.
                </p>
              </div>

              <div className="form-content">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="E-MAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="PHONE (EG:+919876543210)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                <button type="button" onClick={handleSubmit} className="submit-btn">
                  <span>SEND MESSAGE</span>
                  <FaArrowRight className="btn-icon" />
                </button>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <FaPhone />
                  </div>
                  <div>
                    <div className="method-label">Phone</div>
                    <div className="method-value">+919876543210</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FaInstagram />
                  </div>
                  <div>
                    <div className="method-label">Instagram</div>
                    <div className="method-value">istembcet</div>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="method-label">Email</div>
                    <div className="method-value">istestudentchapter@mbcet.ac.in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Sidebar */}
          <div className="info-section">
            <div className="info-card">
              <div className="card-header">
                <div className="card-glow"></div>
                <h3 className="card-title">Visit Our Venue</h3>
              </div>
              
              <div className="map-container">
                <div className="map-overlay"></div>
                <div className="map-marker" onClick={handleLocationClick} title="Click to open in Google Maps">
                  <div className="marker-dot"></div>
                </div>
              </div>
              
              <div className="location-info">
                <p className="location-text">
                  Mar Baselios College of Engineering and Technology
                </p>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="event-card">
              <div className="card-header">
                <div className="card-glow"></div>
                <h3 className="event-title">Quick Response</h3>
              </div>
              
              <div className="event-details">
                <p className="cta-description">
                  We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;