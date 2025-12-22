import React, { useEffect, useRef, useCallback } from 'react';
import { FaPhone, FaEnvelope, FaInstagram, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const hasAnimatedRef = useRef(new Set());

  // Intersection Observer callback
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const id = target.id || target.className;
        
        // Only animate once
        if (!hasAnimatedRef.current.has(id)) {
          requestAnimationFrame(() => {
            target.classList.add('visible');
            target.classList.add('scroll-reveal-visible');
            
            // Add specific directional classes
            if (target.classList.contains('scroll-reveal-left')) {
              target.classList.add('scroll-reveal-left-visible');
            }
            if (target.classList.contains('scroll-reveal-right')) {
              target.classList.add('scroll-reveal-right-visible');
            }
            if (target.classList.contains('scroll-reveal-up')) {
              target.classList.add('scroll-reveal-up-visible');
            }
            if (target.classList.contains('scroll-reveal-fade')) {
              target.classList.add('scroll-reveal-fade-visible');
            }
            
            hasAnimatedRef.current.add(id);
          });
        }
        
        // Unobserve after animation
        observerRef.current?.unobserve(target);
      }
    });
  }, []);

  useEffect(() => {
    // Initialize Intersection Observer
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe main section
    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    // Observe all elements with scroll-reveal classes after a delay
    setTimeout(() => {
      const revealElements = document.querySelectorAll(
        '.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-fade'
      );
      
      revealElements.forEach((el, index) => {
        setTimeout(() => {
          if (observerRef.current) {
            observerRef.current.observe(el);
          }
        }, index * 50);
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  const addToAnimationElements = useCallback((el) => {
    if (el && observerRef.current) {
      setTimeout(() => {
        observerRef.current.observe(el);
      }, 100);
    }
  }, []);

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/nexora.live', '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const coordinators = [
    {
      name: "Mr. Kiran Biju",
      role: "Student Coordinator",
      phone: "+91 7909208609",
      email: "kiranbiju.b22cs1130@mbcet.ac.in",
      category: "student"
    },
    {
      name: "Mr. Bijoy B Sekar",
      role: "Student Coordinator",
      phone: "+91 7907088749",
      email: "bijoybsekar.m25me1002@mbcet.ac.in",
      category: "student"
    },
  ];

  const faculty = [
    {
      name: "Dr. Soumya",
      role: "ISTE Faculty Coordinator",
    
      email: "soumya.av@mbcet.ac.in",
      category: "faculty"
    },
    {
      name: "Mr. Melvin Jacob",
      role: "ISTE Faculty Coordinator",
  
      email: "melvin.jacob@mbcet.ac.in",
      category: "faculty"
    },
    {
      name: "Dr. Jishnu Chandran",
      role: "ISTE Faculty Coordinator",
      phone: "+91 9497613790",
      email: "jishnuchandran.r@mbcet.ac.in",
      category: "faculty"
    }
  ];

  return (
    <section
      className="contact-section-container scroll-reveal-fade"
      id="contact"
      ref={sectionRef}
    >
      {/* Background Shapes */}
      <div className="contact-bg-shapes">
        <div className="contact-shape shape-1"></div>
        <div className="contact-shape shape-2"></div>
      </div>
  
      <div className="contact-section-content">
        {/* Header */}
        <div className="contact-section-header">
          <span 
            className="contact-pill scroll-reveal-up" 
            ref={addToAnimationElements}
          >
            Get In Touch
          </span>
  
          <h1 
            className="contact-main-heading scroll-reveal-up" 
            ref={addToAnimationElements}
          >
            Contact <span className="contact-gradient-text">Coordinators</span>
          </h1>
  
          <p
            className="contact-header-description scroll-reveal-up"
            ref={addToAnimationElements}
          >
            Reach out to student coordinators and faculty advisors for any queries
            related to NEXORA 2026.
          </p>
        </div>
  
        <div className="contact-layout-grid">
          {/* LEFT COLUMN - Student Coordinators + Location Card */}
          <div className="contact-form-section">
            {/* Student Coordinators */}
            <div 
              className="simple-card scroll-reveal-left" 
              ref={addToAnimationElements}
            >
              <h2 className="section-title">
                <FaUserTie /> Student Coordinators
              </h2>
  
              <div className="simple-grid">
                {coordinators.map((c, i) => (
                  <div
                    key={i}
                    className="person-card scroll-reveal-up"
                    ref={addToAnimationElements}
                  >
                    <div className="person-header">
                      <FaUserTie />
                      <div>
                        <h3>{c.name}</h3>
                        <span>{c.role}</span>
                      </div>
                    </div>
  
                    <div className="person-actions">
                      <button onClick={() => handlePhoneClick(c.phone)}>
                        <FaPhone /> Call
                      </button>
                      <button onClick={() => handleEmailClick(c.email)}>
                        <FaEnvelope /> Email
                      </button>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Social */}
              <div 
                className="social-row" 
                onClick={handleInstagramClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleInstagramClick()}
              >
                <FaInstagram />
                <span>@nexora.live</span>
              </div>
            </div>
  
            {/* Location Card - Inside left column for desktop */}
            <div
              className="contact-info-card scroll-reveal-left"
              ref={addToAnimationElements}
            >
              <div className="contact-card-header">
                <h3 className="contact-card-title">College Location</h3>
              </div>
  
              <div
                className="contact-map-container"
                onClick={handleLocationClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleLocationClick()}
              >
                <div className="contact-map-overlay"></div>
                <div className="contact-map-marker">
                  <div className="contact-marker-dot"></div>
                </div>
              </div>
  
              <div className="contact-location-info">
                <p className="contact-location-text">
                  Mar Baselios College of Engineering and Technology
                </p>
                <p className="contact-location-address">
                  Nalanchira, Trivandrum, Kerala
                </p>
              </div>
            </div>
          </div>
  
          {/* RIGHT COLUMN - Faculty Advisors */}
          <div className="contact-info-section">
            <div 
              className="simple-card scroll-reveal-right" 
              ref={addToAnimationElements}
            >
              <h2 className="section-title">
                <FaChalkboardTeacher /> Faculty Advisors
              </h2>
  
              <div className="simple-list">
                {faculty.map((f, i) => (
                  <div
                    key={i}
                    className="faculty-row scroll-reveal-up"
                    ref={addToAnimationElements}
                  >
                    <FaChalkboardTeacher />
                    <div className="faculty-text">
                      <h4>{f.name}</h4>
                      <span>{f.role}</span>
                    </div>
  
                    <div className="faculty-actions">
                      
                      <FaEnvelope 
                        onClick={() => handleEmailClick(f.email)} 
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleEmailClick(f.email)}
                        aria-label={`Email ${f.name}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;