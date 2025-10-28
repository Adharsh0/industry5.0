import React from 'react';
import { 
  FaRocket, 
  FaLightbulb, 
  FaHandsHelping, 
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaHistory,
  FaStar,
  FaArrowRight,
  FaInfoCircle
} from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const handleRegisterInterest = () => {
    // Scroll to registration section or navigate
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-container" id="about" aria-labelledby="about-title">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="about-content">
        {/* Header Section */}
        <div className="registration-header">
         
          
          <h1 className="main-heading">
            About <span className="gradient-text">ISTE INDUSTRY 5.0</span>
          </h1>
          
          <p className="header-description">
            Pioneering the future of human-centric smart engineering and sustainable innovation
          </p>
        </div>

        <div className="registration-layout">
          {/* Main Content */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">What is ISTE INDUSTRY 5.0?</h2>
                <p className="form-subtitle">Kerala's Premier Student Technical Convention</p>
              </div>

              <div className="about-text-content">
                <p className="about-paragraph">
                  The ISTE Annual State Convention stands as one of Kerala's most prestigious student-driven technical gatherings, 
                  bringing together the brightest minds in engineering and technology. Over the past 23 editions, it has evolved 
                  into a dynamic platform for learning, collaboration, and fostering long-term partnerships between academia and industry.
                </p>

                <p className="about-paragraph">
                  The 2026 edition promises to unite over a thousand passionate participants, including students, researchers, 
                  entrepreneurs, policymakers, and industry leaders. This immersive two-day event will feature cutting-edge 
                  keynote sessions, thought-provoking expert panels, innovative exhibitions, competitive ideathons, and 
                  inspiring startup showcases.
                </p>

                <div className="highlight-box">
                  <FaStar className="highlight-icon" />
                  <p className="highlight-text">
                    Themed <strong>"Smart and Sustainable: Engineering a Better Tomorrow with AI"</strong>, the convention 
                    explores Industry 5.0—where human ingenuity and intelligent automation converge to create a more 
                    sustainable and equitable future for all.
                  </p>
                </div>

                <p className="about-paragraph">
                  Hosted by the ISTE Kerala Section in collaboration with Mar Baselios College of Engineering and Technology, 
                  the 24th Annual State Students Convention represents a landmark event that brings together diverse 
                  stakeholders in innovation and education.
                </p>

                <p className="about-paragraph">
                  For industry partners and sponsors, this convention offers an unparalleled opportunity to showcase brand 
                  leadership, demonstrate technological excellence, and engage directly with the next generation of 
                  innovators, thinkers, and change-makers in the fields of sustainability and artificial intelligence.
                </p>
              </div>

              {/* Features Grid */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="info-section">
            {/* Stats Card */}
            <div className="info-card">
              <div className="card-header">
                <div className="card-glow"></div>
                <h3 className="card-title">Convention Highlights</h3>
              </div>
              
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaHistory />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Prestigious Edition</div>
                    <div className="stat-number">24<sup>th</sup></div>
                    <div className="stat-description">Years of excellence</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Innovative Minds</div>
                    <div className="stat-number">1000+</div>
                    <div className="stat-description">Students & leaders</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Action-Packed Days</div>
                    <div className="stat-number">2</div>
                    <div className="stat-description">Learning & collaboration</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Years Legacy</div>
                    <div className="stat-number">23+</div>
                    <div className="stat-description">Building technologists</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="event-card">
              <div className="card-header">
                <div className="card-glow"></div>
                <h3 className="event-title">Join the Revolution</h3>
              </div>
              
              <div className="event-details">
                <p className="cta-description">
                  Be part of Kerala's largest student technical convention and shape the future of Industry 5.0
                </p>
                
                <button className="submit-btn" onClick={handleRegisterInterest}>
                  <span>Register Your Interest</span>
                  <FaArrowRight className="btn-icon" />
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