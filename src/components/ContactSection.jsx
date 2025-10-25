import React, { useState } from 'react';
import { FaPhone, FaFax, FaEnvelope } from 'react-icons/fa';
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
    <section className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-form-side">
          <h2 className="form-title">
            Get in <span>Touch</span>
          </h2>
          <p className="form-subtitle">
            Enter Lorem ipsum dolor sit amet consectetur adipisicing. Et sllm necessitatibus sed excepturi libero illum.
          </p>

          <div>
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
              SEND
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
                <FaFax />
              </div>
              <div>
                <div className="method-label">Fax</div>
                <div className="method-value">info@mbcet.ac.in</div>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <FaEnvelope />
              </div>
              <div>
                <div className="method-label">Email</div>
                <div className="method-value">info@istekerala.org</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-map-side">
          <div className="map-container">
            <div className="map-overlay"></div>
            <div className="map-marker" onClick={handleLocationClick} title="Click to open in Google Maps">
              <div className="marker-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;