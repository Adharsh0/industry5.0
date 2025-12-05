import React, { useEffect, useRef } from 'react';
import { 
  FaUsers,
  FaClock,
  FaHistory,
  FaStar,
  FaArrowRight
} from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
          } else {
            entry.target.classList.add('animate-out');
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

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

  const handleRegisterInterest = () => {
    const registerSection = document.getElementById('contact-section');
    if (registerSection) {
      registerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className="about-section" 
      id="about-section" 
      aria-labelledby="about-main-title"
      ref={sectionRef}
    >
      <div className="about-content">
        {/* Header Section */}
        <div className="about-header">
         
          
          <h1 
            className="about-title" 
            ref={addToRefs}
          >
            About <span className="highlight-text">ISTE INDUSTRY 5.0</span>
          </h1>
          
          <p 
            className="about-subtitle" 
            ref={addToRefs}
          >
            Where innovation meets sustainability in the age of AI
          </p>
        </div>

        <div className="about-grid">
          {/* Main Content */}
          <div className="about-main">
            <div 
              className="about-card0" 
              ref={addToRefs}
            >
              <div className="card-header">
                <h2 className="card-title">ISTE INDUSTRY 5.0</h2>
                <p className="card-subtitle">Kerala's Premier Student Technical Convention</p>
              </div>

              <div className="card-content">
                <p 
                  className="card-text" 
                  ref={addToRefs}
                >
                  The ISTE Annual State Convention is Kerala's most prestigious student-driven technical gathering, 
                  bringing together the brightest minds in engineering and technology. With over 23 successful editions, 
                  it has evolved into a dynamic platform for learning and collaboration.
                </p>

                <p 
                  className="card-text" 
                  ref={addToRefs}
                >
                  The 2026 edition unites over 1,000 participants including students, researchers, entrepreneurs, 
                  and industry leaders. This immersive two-day event features keynote sessions, expert panels, 
                  innovative exhibitions, and competitive ideathons.
                </p>

                <div 
                  className="card-highlight" 
                  ref={addToRefs}
                >
                  <FaStar className="highlight-icon" />
                  <p className="highlight-text">
                    Themed <strong>"Smart and Sustainable: Engineering a Better Tomorrow with AI"</strong>
                  </p>
                </div>

                <p 
                  className="card-text" 
                  ref={addToRefs}
                >
                  Hosted by ISTE Kerala Section in collaboration with Mar Baselios College of Engineering and Technology, 
                  this landmark event brings together stakeholders in innovation and education.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="about-sidebar">
            {/* Stats Card */}
            <div 
              className="stats-card0" 
              ref={addToRefs}
            >
              <div className="card-header">
                <h3 className="card-title">Convention Highlights</h3>
              </div>
              
              <div className="stats-grid">
                <div 
                  className="stat-item" 
                  ref={addToRefs}
                >
                  <div className="stat-icon">
                    <FaHistory />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Edition</div>
                    <div className="stat-number">24<sup>th</sup></div>
                    <div className="stat-desc">Prestigious</div>
                  </div>
                </div>

                <div 
                  className="stat-item" 
                  ref={addToRefs}
                >
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Participants</div>
                    <div className="stat-number">1000+</div>
                    <div className="stat-desc">Innovators</div>
                  </div>
                </div>

                <div 
                  className="stat-item" 
                  ref={addToRefs}
                >
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Duration</div>
                    <div className="stat-number">2</div>
                    <div className="stat-desc">Action Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div 
              className="cta-card0" 
              ref={addToRefs}
            >
              <div className="card-header">
                <h3 className="card-title">Join Us</h3>
              </div>
              
              <div className="cta-content">
                <p className="cta-text">
                  Shape the future of Industry 5.0 with Kerala's brightest minds
                </p>
                
                <button className="cta-button" onClick={handleRegisterInterest}>
                  <span>Register Interest</span>
                  <FaArrowRight className="button-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;