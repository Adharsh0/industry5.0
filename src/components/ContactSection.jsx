import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaArrowRight, FaInstagram } from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank');
  };

  return (
    <section 
      className="contact-section-container" 
      id="contact-section"
      ref={sectionRef}
    >
      {/* Background Shapes */}
      <div className="contact-bg-shapes">
        <div className="contact-shape shape-1"></div>
        <div className="contact-shape shape-2"></div>
        <div className="contact-shape shape-3"></div>
      </div>

      <div className="contact-section-content">
        {/* Header Section */}
        <div className="contact-section-header">
          <div className="contact-header-tag fade-in-up" ref={addToRefs}>
            <span className="tag-line"></span>
            <span>Contact Us</span>
            <span className="tag-line"></span>
          </div>
          
          <h1 className="contact-main-heading fade-in-up" ref={addToRefs}>
            Get In <span className="contact-gradient-text">Touch</span>
          </h1>
          <p className="contact-header-description fade-in-up" ref={addToRefs}>
            Reach out to us for partnerships, sponsorships, or any inquiries about ISTE INDUSTRY 5.0
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Main Contact Form */}
          <div className="contact-form-section">
            <div className="contact-form-card slide-in-left" ref={addToRefs}>
              <div className="contact-form-header">
                <div className="form-icon">
                  <FaEnvelope />
                </div>
                <h2 className="contact-form-title">Get in <span>Touch</span></h2>
                <p className="contact-form-subtitle">
                  Enter Lorem ipsum dolor sit amet consectetur adipisicing. Et sllm necessitatibus sed excepturi libero illum.
                </p>
              </div>

              <div className="contact-form-content">
                <div className="contact-form-group">
                  <input
                    type="text"
                    className="contact-form-input"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <input
                    type="email"
                    className="contact-form-input"
                    placeholder="E-MAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <input
                    type="tel"
                    className="contact-form-input"
                    placeholder="PHONE (EG:+919876543210)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                <button type="button" onClick={handleSubmit} className="contact-submit-btn scale-in" ref={addToRefs}>
                  <span>SEND MESSAGE</span>
                  <FaArrowRight className="contact-btn-icon" />
                  <div className="button-overlay"></div>
                </button>
              </div>

              <div className="contact-methods-grid">
                <div className="contact-method-item fade-in-up" ref={addToRefs} style={{ animationDelay: '0.1s' }}>
                  <div className="contact-method-icon">
                    <FaPhone />
                  </div>
                  <div>
                    <div className="contact-method-label">Phone</div>
                    <div className="contact-method-value">+919876543210</div>
                  </div>
                </div>

                <div className="contact-method-item fade-in-up" ref={addToRefs} style={{ animationDelay: '0.2s' }}>
                  <div className="contact-method-icon">
                    <FaInstagram />
                  </div>
                  <div>
                    <div className="contact-method-label">Instagram</div>
                    <div className="contact-method-value">istembcet</div>
                  </div>
                </div>

                <div className="contact-method-item fade-in-up" ref={addToRefs} style={{ animationDelay: '0.3s' }}>
                  <div className="contact-method-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <div className="contact-method-label">Email</div>
                    <div className="contact-method-value">istestudentchapter@mbcet.ac.in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Sidebar */}
          <div className="contact-info-section">
            <div className="contact-info-card slide-in-right" ref={addToRefs}>
              <div className="contact-card-header">
                <div className="contact-card-glow"></div>
                <div className="card-icon">
                  <FaArrowRight />
                </div>
                <h3 className="contact-card-title">Visit Our Venue</h3>
              </div>
              
              <div className="contact-map-container scale-in" ref={addToRefs}>
                <div className="contact-map-overlay"></div>
                <div className="contact-map-marker" onClick={handleLocationClick} title="Click to open in Google Maps">
                  <div className="contact-marker-dot"></div>
                </div>
              </div>
              
              <div className="contact-location-info">
                <p className="contact-location-text">
                  Mar Baselios College of Engineering and Technology
                </p>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="contact-event-card fade-in-up" ref={addToRefs}>
              <div className="contact-card-header">
                <div className="contact-card-glow"></div>
                <h3 className="contact-event-title">Quick Response</h3>
              </div>
              
              <div className="contact-event-details">
                <div className="response-features">
                  <div className="response-feature">
                    <div className="feature-dot"></div>
                    <span>24-hour response time</span>
                  </div>
                  <div className="response-feature">
                    <div className="feature-dot"></div>
                    <span>Direct phone support</span>
                  </div>
                  <div className="response-feature">
                    <div className="feature-dot"></div>
                    <span>Priority partnership inquiries</span>
                  </div>
                </div>
                
                <p className="contact-cta-description">
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