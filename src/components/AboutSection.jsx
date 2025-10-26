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
  FaArrowRight
} from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-container" id="about" aria-labelledby="about-title">
      <div className="about-content">
        <header className="section-header">
     
          <h2 className="section-title" id="about-title">
            What is <span className="title-highlight">ISTE INDUSTRY 5.0</span>?
          </h2>
          <div className="title-divider" role="presentation"></div>
          <p className="section-subtitle">
            Pioneering the future of human-centric smart engineering and sustainable innovation
          </p>
        </header>

        <div className="about-grid">
          <div className="about-main">
            <div className="about-text">
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

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaLightbulb />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Vision</h3>
                  <p className="feature-description">
                    To create a collaborative ecosystem where academia and industry converge to shape the future of smart engineering
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaRocket />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Mission</h3>
                  <p className="feature-description">
                    Empower students with industry insights, foster innovation, and build sustainable solutions for tomorrow's challenges
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaHandsHelping />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Impact</h3>
                  <p className="feature-description">
                    Creating lasting partnerships and driving meaningful change through technology and collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="about-sidebar">
            <div className="stats-container">
              <h3 className="stats-title">Convention Highlights</h3>
              <div className="about-stats" aria-label="Event statistics">
                <div className="stat-item">
                  <div className="stat-icon">
                    <FaHistory />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">24<sup>th</sup></div>
                    <div className="stat-label">Prestigious Edition</div>
                    <div className="stat-description">Years of excellence in technical education</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Innovative Minds</div>
                    <div className="stat-description">Students, experts, and industry leaders</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">2</div>
                    <div className="stat-label">Action-Packed Days</div>
                    <div className="stat-description">Of learning and collaboration</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">23+</div>
                    <div className="stat-label">Years Legacy</div>
                    <div className="stat-description">Building future technologists</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cta-card">
              <h3 className="cta-title">Join the Revolution</h3>
              <p className="cta-description">
                Be part of Kerala's largest student technical convention and shape the future of Industry 5.0
              </p>
              <button className="cta-button">
                Register Your Interest <FaArrowRight className="btn-icon" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;