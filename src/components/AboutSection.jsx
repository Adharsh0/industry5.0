import React from 'react';
import './AboutSection.css';
const AboutSection = () => {
  return (
    <section className="about-container" id="about" aria-labelledby="about-title">
      <div className="about-content">
        <header className="section-header">
          <h2 className="section-title" id="about-title">
            What is <span className="title-highlight">ISTE INDUSTRY 5.0 </span>?
          </h2>
          <div className="title-divider" role="presentation"></div>
        </header>

        <div className="about-grid">
          <div className="about-text">
            <p className="about-paragraph">
              The ISTE Annual State Convention is one of Kerala's most prestigious student-driven technical gatherings.
              Over the past 23 editions, it has evolved into a dynamic platform for learning, collaboration, and fostering
              long-term partnerships between academia and industry.
            </p>

            <p className="about-paragraph">
              The 2026 edition will unite over a thousand participants, including students, researchers, entrepreneurs,
              policymakers, and industry leaders. This two-day event will feature keynote sessions, expert panels,
              exhibitions, ideathons, and startup showcases.
            </p>

            <p className="about-paragraph">
              Hosted by the ISTE Kerala Section in collaboration with MBCET, the 24th Annual State Students Convention
              is a landmark event that brings together diverse stakeholders in innovation and education.
            </p>

            <div className="highlight-box">
              <p className="highlight-text">
                Themed <strong>"Smart and Sustainable: Engineering a Better Tomorrow with AI"</strong>, the convention
                explores Industry 5.0—where human ingenuity and intelligent automation converge for a sustainable future.
              </p>
            </div>

            <p className="about-paragraph">
              For industry partners and sponsors, this convention offers a unique opportunity to showcase brand leadership
              and engage directly with innovation, sustainability, and next-generation talent.
            </p>
          </div>

          <aside className="about-stats" aria-label="Event statistics">
            <div className="stat-item">
              <div className="stat-number">24<sup>th</sup></div>
              <div className="stat-label">Edition</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Participants</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Days</div>
            </div>

            <div className="stat-item">
              <div className="stat-number">23+</div>
              <div className="stat-label">Years Legacy</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;