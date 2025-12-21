import React, { useEffect, useRef } from 'react';
import { FaPhone, FaEnvelope, FaInstagram, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
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
            if (entry.target.classList.contains('scroll-reveal-up')) {
              entry.target.classList.add('scroll-reveal-up-visible');
            }
            if (entry.target.classList.contains('scroll-reveal-scale')) {
              entry.target.classList.add('scroll-reveal-scale-visible');
            }
            if (entry.target.classList.contains('scroll-reveal-fade')) {
              entry.target.classList.add('scroll-reveal-fade-visible');
            }
            
            // Stop observing after animation
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px' // More sensitive trigger
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

    // Observe all elements with scroll-reveal classes
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up, .scroll-reveal-scale, .scroll-reveal-fade').forEach(el => {
      if (!animationElements.current.has(el)) {
        animationElements.current.add(el);
        observerRef.current.observe(el);
      }
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
      phone: "+91 9048522229",
      email: "soumya.av@mbcet.ac.in",
      category: "faculty"
    },
    {
      name: "Mr. Melvin Jacob",
      role: "ISTE Faculty Coordinator",
      phone: "+91 9497613790",
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
      {/* Background Shapes with animations */}
      <div className="contact-bg-shapes">
        <div className="contact-shape shape-1 scroll-reveal-scale"></div>
        <div className="contact-shape shape-2 scroll-reveal-scale" style={{animationDelay: '0.5s'}}></div>
        <div className="contact-shape shape-3 scroll-reveal-scale" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="contact-section-content">
        {/* Header Section */}
        <div className="contact-section-header">
          <div 
            className="contact-header-tag scroll-reveal-up" 
            ref={addToAnimationElements}
          >
            <span className="tag-line"></span>
            <span>Get In Touch</span>
            <span className="tag-line"></span>
          </div>
          
          <h1 
            className="contact-main-heading scroll-reveal-up" 
            ref={addToAnimationElements}
          >
            Contact <span className="contact-gradient-text scroll-reveal-scale">Coordinators</span>
          </h1>
          <p 
            className="contact-header-description scroll-reveal-up" 
            ref={addToAnimationElements}
          >
            Reach out to our student coordinators and faculty advisors for any queries about NEXORA 2026 events
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column - Student Coordinators */}
          <div className="contact-form-section">
            <div 
              className="contact-form-card scroll-reveal-left hover-glow" 
              ref={addToAnimationElements}
            >
              <div className="contact-form-header">
                <div className="form-icon hover-lift scroll-reveal-scale">
                  <FaUserTie />
                </div>
                <h2 className="contact-form-title scroll-reveal-up">
                  Student <span className="scroll-reveal-scale">Coordinators</span>
                </h2>
                <p className="contact-form-subtitle scroll-reveal-up">
                  Contact our student coordinators for event registrations, queries, and general information
                </p>
              </div>

              <div className="coordinators-grid stagger-animate" ref={addToAnimationElements}>
                {coordinators.map((coordinator, index) => (
                  <div 
                    key={index}
                    className="coordinator-card hover-lift scroll-reveal-up" 
                    ref={addToAnimationElements}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    onClick={() => handlePhoneClick(coordinator.phone)}
                  >
                    <div className="coordinator-header">
                      <div className="coordinator-avatar scroll-reveal-scale">
                        <FaUserTie />
                      </div>
                      <div className="coordinator-info">
                        <h3 className="coordinator-name scroll-reveal-up">{coordinator.name}</h3>
                        <p className="coordinator-role scroll-reveal-up">{coordinator.role}</p>
                      </div>
                    </div>
                    
                    <div className="coordinator-contact-details">
                      <div className="contact-item scroll-reveal-up">
                        <FaPhone className="contact-icon scroll-reveal-scale" />
                        <span 
                          className="contact-value clickable scroll-reveal-up"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePhoneClick(coordinator.phone);
                          }}
                        >
                          {coordinator.phone}
                        </span>
                      </div>
                      <div className="contact-item scroll-reveal-up">
                        <FaEnvelope className="contact-icon scroll-reveal-scale" />
                        <span 
                          className="contact-value clickable scroll-reveal-up"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmailClick(coordinator.email);
                          }}
                        >
                          {coordinator.email}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-contact-section scroll-reveal-up" ref={addToAnimationElements}>
                <h3 className="social-title scroll-reveal-up">Social Media</h3>
                <div 
                  className="social-item hover-lift scroll-reveal-up" 
                  onClick={handleInstagramClick}
                >
                  <div className="social-icon scroll-reveal-scale">
                    <FaInstagram />
                  </div>
                  <div className="social-info">
                    <div className="social-label scroll-reveal-up">Instagram</div>
                    <div className="social-value scroll-reveal-up">@nexora.live</div>
                  </div>
                </div>
              </div>
            </div>

            {/* College Location Card - Now below Student Coordinators */}
            <div 
              className="contact-info-card scroll-reveal-left hover-glow" 
              ref={addToAnimationElements}
              style={{ marginTop: '40px' }}
            >
              <div className="contact-card-header">
                <div className="contact-card-glow scroll-reveal-scale"></div>
                <h3 className="contact-card-title scroll-reveal-up">College Location</h3>
              </div>
              
              <div 
                className="contact-map-container scroll-reveal-scale hover-lift" 
                ref={addToAnimationElements}
              >
                <div className="contact-map-overlay"></div>
                <div 
                  className="contact-map-marker scroll-reveal-scale" 
                  onClick={handleLocationClick} 
                  title="Click to open in Google Maps"
                  aria-label="Open location in Google Maps"
                >
                  <div className="contact-marker-dot"></div>
                </div>
              </div>
              
              <div className="contact-location-info">
                <p className="contact-location-text scroll-reveal-up" ref={addToAnimationElements}>
                  Mar Baselios College of Engineering and Technology
                </p>
                <p className="contact-location-address scroll-reveal-up" ref={addToAnimationElements}>
                  Nalanchira, Trivandrum, Kerala
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Faculty Advisors Only */}
          <div className="contact-info-section">
            {/* Faculty Advisors Card */}
            <div 
              className="contact-info-card scroll-reveal-right hover-glow" 
              ref={addToAnimationElements}
            >
              <div className="contact-card-header">
                <div className="contact-card-glow scroll-reveal-scale"></div>
                <div className="card-icon hover-lift scroll-reveal-scale">
                  <FaChalkboardTeacher />
                </div>
                <h3 className="contact-card-title scroll-reveal-up">Faculty Advisors</h3>
              </div>
              
              <div className="faculty-grid stagger-animate" ref={addToAnimationElements}>
                {faculty.map((facultyMember, index) => (
                  <div 
                    key={index}
                    className="faculty-card hover-lift scroll-reveal-up" 
                    ref={addToAnimationElements}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    onClick={() => handlePhoneClick(facultyMember.phone)}
                  >
                    <div className="faculty-avatar scroll-reveal-scale">
                      <FaChalkboardTeacher />
                    </div>
                    <div className="faculty-info">
                      <h4 className="faculty-name scroll-reveal-up">{facultyMember.name}</h4>
                      <p className="faculty-role scroll-reveal-up">{facultyMember.role}</p>
                    </div>
                    <div className="faculty-contact">
                      <div 
                        className="contact-action clickable scroll-reveal-up"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhoneClick(facultyMember.phone);
                        }}
                      >
                        <FaPhone className="scroll-reveal-scale" /> Call
                      </div>
                      <div 
                        className="contact-action clickable scroll-reveal-up"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmailClick(facultyMember.email);
                        }}
                      >
                        <FaEnvelope className="scroll-reveal-scale" /> Email
                      </div>
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