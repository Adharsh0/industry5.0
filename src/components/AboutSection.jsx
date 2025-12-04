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
    const registerSection = document.getElementById('registration-section');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-section-container" id="about-section" aria-labelledby="about-main-title">
      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="about-main-content">
        {/* Header Section */}
        <div className="section-header-wrapper">
          <div className="section-badge">
            <FaStar className="badge-icon" />
            <span>Kerala's Premier Tech Convention</span>
          </div>
          
          <h1 className="main-section-title">
            About <span className="blue-gradient-text">ISTE INDUSTRY 5.0</span>
          </h1>
          
          <p className="section-description">
            Pioneering the future of human-centric smart engineering and sustainable innovation
          </p>
        </div>

        <div className="content-layout-grid">
          {/* Main Content */}
          <div className="main-content-section">
            <div className="content-card">
              <div className="content-header">
                <h2 className="content-title">What is ISTE INDUSTRY 5.0?</h2>
                <p className="content-subtitle">Kerala's Premier Student Technical Convention</p>
              </div>

              <div className="text-content-wrapper">
                <p className="description-paragraph">
                  The ISTE Annual State Convention stands as one of Kerala's most prestigious student-driven technical gatherings, 
                  bringing together the brightest minds in engineering and technology. Over the past 23 editions, it has evolved 
                  into a dynamic platform for learning, collaboration, and fostering long-term partnerships between academia and industry.
                </p>

                <p className="description-paragraph">
                  The 2026 edition promises to unite over a thousand passionate participants, including students, researchers, 
                  entrepreneurs, policymakers, and industry leaders. This immersive two-day event will feature cutting-edge 
                  keynote sessions, thought-provoking expert panels, innovative exhibitions, competitive ideathons, and 
                  inspiring startup showcases.
                </p>

                <div className="highlight-content-box">
                  <FaStar className="highlight-box-icon" />
                  <p className="highlight-box-text">
                    Themed <strong>"Smart and Sustainable: Engineering a Better Tomorrow with AI"</strong>, the convention 
                    explores Industry 5.0—where human ingenuity and intelligent automation converge to create a more 
                    sustainable and equitable future for all.
                  </p>
                </div>

                <p className="description-paragraph">
                  Hosted by the ISTE Kerala Section in collaboration with Mar Baselios College of Engineering and Technology, 
                  the 24th Annual State Students Convention represents a landmark event that brings together diverse 
                  stakeholders in innovation and education.
                </p>

                <p className="description-paragraph">
                  For industry partners and sponsors, this convention offers an unparalleled opportunity to showcase brand 
                  leadership, demonstrate technological excellence, and engage directly with the next generation of 
                  innovators, thinkers, and change-makers in the fields of sustainability and artificial intelligence.
                </p>
              </div>

              {/* Features Grid can be added here */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-section">
            {/* Stats Card */}
            <div className="stats-info-card">
              <div className="card-title-header">
                <div className="card-title-glow"></div>
                <h3 className="card-main-title">Convention Highlights</h3>
              </div>
              
              <div className="stats-container">
                <div className="stat-item-card">
                  <div className="stat-item-icon">
                    <FaHistory />
                  </div>
                  <div className="stat-item-info">
                    <div className="stat-item-label">Prestigious Edition</div>
                    <div className="stat-item-number">24<sup>th</sup></div>
                    <div className="stat-item-description">Years of excellence</div>
                  </div>
                </div>

                <div className="stat-item-card">
                  <div className="stat-item-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-item-info">
                    <div className="stat-item-label">Innovative Minds</div>
                    <div className="stat-item-number">1000+</div>
                    <div className="stat-item-description">Students & leaders</div>
                  </div>
                </div>

                <div className="stat-item-card">
                  <div className="stat-item-icon">
                    <FaClock />
                  </div>
                  <div className="stat-item-info">
                    <div className="stat-item-label">Action-Packed Days</div>
                    <div className="stat-item-number">2</div>
                    <div className="stat-item-description">Learning & collaboration</div>
                  </div>
                </div>

                <div className="stat-item-card">
                  <div className="stat-item-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="stat-item-info">
                    <div className="stat-item-label">Years Legacy</div>
                    <div className="stat-item-number">23+</div>
                    <div className="stat-item-description">Building technologists</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="cta-action-card">
              <div className="card-title-header">
                <div className="card-title-glow"></div>
                <h3 className="card-main-title">Join the Revolution</h3>
              </div>
              
              <div className="cta-content">
                <p className="cta-description-text">
                  Be part of Kerala's largest student technical convention and shape the future of Industry 5.0
                </p>
                
                <button className="action-button" onClick={handleRegisterInterest}>
                  <span>Register Your Interest</span>
                  <FaArrowRight className="button-action-icon" />
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