import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaArrowRight, FaInstagram } from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const animationElements = useRef(new Set());

  useEffect(() => {
    // Initialize Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('scroll-reveal-visible');
            
            // Add specific directional classes
            if (entry.target.classList.contains('scroll-reveal-left')) {
              entry.target.classList.add('scroll-reveal-left-visible');
            }
            if (entry.target.classList.contains('scroll-reveal-right')) {
              entry.target.classList.add('scroll-reveal-right-visible');
            }
            
            // Stop observing after animation
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe main section
    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    // Observe all animation elements
    animationElements.current.forEach(element => {
      if (element) observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const addToAnimationElements = (el) => {
    if (el && !animationElements.current.has(el)) {
      animationElements.current.add(el);
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    
    // Show success message
    setTimeout(() => {
      alert('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '' });
      setIsSubmitted(false);
    }, 100);
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      className="contact-section-container scroll-reveal" 
      id="contact"
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
          <div 
            className="contact-header-tag scroll-reveal" 
            ref={addToAnimationElements}
          >
            <span className="tag-line"></span>
            <span>Contact Us</span>
            <span className="tag-line"></span>
          </div>
          
          <h1 
            className="contact-main-heading scroll-reveal" 
            ref={addToAnimationElements}
            style={{ animationDelay: '0.2s' }}
          >
            Get In <span className="contact-gradient-text">Touch</span>
          </h1>
          <p 
            className="contact-header-description scroll-reveal" 
            ref={addToAnimationElements}
            style={{ animationDelay: '0.4s' }}
          >
            Reach out to us for partnerships, sponsorships, or any inquiries about ISTE INDUSTRY 5.0
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Main Contact Form */}
          <div className="contact-form-section">
            <div 
              className="contact-form-card scroll-reveal-left hover-glow" 
              ref={addToAnimationElements}
            >
              <div className="contact-form-header">
                <div className="form-icon hover-lift">
                  <FaEnvelope />
                </div>
                <h2 className="contact-form-title">Get in <span>Touch</span></h2>
                <p className="contact-form-subtitle">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form className="contact-form-content" onSubmit={handleSubmit}>
                <div 
                  className="contact-form-group scroll-reveal" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.1s' }}
                >
                  <input
                    type="text"
                    className="contact-form-input"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div 
                  className="contact-form-group scroll-reveal" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.2s' }}
                >
                  <input
                    type="email"
                    className="contact-form-input"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div 
                  className="contact-form-group scroll-reveal" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.3s' }}
                >
                  <input
                    type="tel"
                    className="contact-form-input"
                    placeholder="PHONE NUMBER (EG: +919876543210)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    pattern="[+][0-9]{10,15}"
                    title="Please enter a valid phone number with country code (e.g., +919876543210)"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="contact-submit-btn scroll-reveal hover-lift" 
                  ref={addToAnimationElements}
                  disabled={isSubmitted}
                  style={{ animationDelay: '0.4s' }}
                >
                  <span>{isSubmitted ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  {!isSubmitted && <FaArrowRight className="contact-btn-icon" />}
                  <div className="button-overlay"></div>
                </button>
              </form>

              <div className="contact-methods-grid stagger-animate" ref={addToAnimationElements}>
                <div 
                  className="contact-method-item hover-lift" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="contact-method-icon">
                    <FaPhone />
                  </div>
                  <div>
                    <div className="contact-method-label">Phone</div>
                    <div className="contact-method-value">+91 98765 43210</div>
                  </div>
                </div>

                <div 
                  className="contact-method-item hover-lift" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.6s' }}
                >
                  <div className="contact-method-icon">
                    <FaInstagram />
                  </div>
                  <div>
                    <div className="contact-method-label">Instagram</div>
                    <div className="contact-method-value">@istembcet</div>
                  </div>
                </div>

                <div 
                  className="contact-method-item hover-lift" 
                  ref={addToAnimationElements}
                  style={{ animationDelay: '0.7s' }}
                >
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
            <div 
              className="contact-info-card scroll-reveal-right hover-glow" 
              ref={addToAnimationElements}
            >
              <div className="contact-card-header">
                <div className="contact-card-glow"></div>
                <div className="card-icon hover-lift">
                  <FaArrowRight />
                </div>
                <h3 className="contact-card-title">Visit Our Venue</h3>
              </div>
              
              <div 
                className="contact-map-container scroll-reveal hover-lift" 
                ref={addToAnimationElements}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="contact-map-overlay"></div>
                <div 
                  className="contact-map-marker" 
                  onClick={handleLocationClick} 
                  title="Click to open in Google Maps"
                  aria-label="Open location in Google Maps"
                >
                  <div className="contact-marker-dot"></div>
                </div>
              </div>
              
              <div className="contact-location-info">
                <p className="contact-location-text scroll-reveal" ref={addToAnimationElements}>
                  Mar Baselios College of Engineering and Technology
                </p>
              </div>
            </div>

            {/* Quick Info Card */}
            <div 
              className="contact-event-card scroll-reveal hover-glow" 
              ref={addToAnimationElements}
            >
              <div className="contact-card-header">
                <div className="contact-card-glow"></div>
                <h3 className="contact-event-title">Quick Response</h3>
              </div>
              
              <div className="contact-event-details stagger-animate" ref={addToAnimationElements}>
                <div className="response-features">
                  <div className="response-feature scroll-reveal" ref={addToAnimationElements}>
                    <div className="feature-dot"></div>
                    <span>24-hour response time</span>
                  </div>
                  <div className="response-feature scroll-reveal" ref={addToAnimationElements} style={{ animationDelay: '0.1s' }}>
                    <div className="feature-dot"></div>
                    <span>Direct phone support</span>
                  </div>
                  <div className="response-feature scroll-reveal" ref={addToAnimationElements} style={{ animationDelay: '0.2s' }}>
                    <div className="feature-dot"></div>
                    <span>Priority partnership inquiries</span>
                  </div>
                </div>
                
                <p className="contact-cta-description scroll-reveal" ref={addToAnimationElements} style={{ animationDelay: '0.3s' }}>
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