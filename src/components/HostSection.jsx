import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaUniversity, 
  FaGraduationCap, 
  FaAward,
  FaUsers,
  FaCalendarAlt,
  FaStar
} from 'react-icons/fa';
import './HostSection.css';

const HostSection = () => {
  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/p8PJqvzm5Ug9T4LNA', '_blank');
  };

  const collegeStats = [
    { icon: <FaUniversity />, label: 'Established', value: '2002' },
    { icon: <FaGraduationCap />, label: 'Programs', value: '10+' },
    { icon: <FaUsers />, label: 'Students', value: '3000+' },
    { icon: <FaAward />, label: 'Accreditations', value: 'NBA, NAAC' }
  ];

  const highlights = [
    {
      icon: <FaStar />,
      title: 'Technical Excellence',
      description: 'Renowned for producing industry-ready engineers with cutting-edge technical skills'
    },
    {
      icon: <FaStar />,
      title: 'Industry Partnerships',
      description: 'Strong collaborations with leading tech companies and research organizations'
    },
    {
      icon: <FaStar />,
      title: 'Innovation Hub',
      description: 'State-of-the-art labs and research centers fostering innovation and entrepreneurship'
    },
    {
      icon: <FaStar />,
      title: 'Sustainable Campus',
      description: 'Eco-friendly campus with green initiatives and sustainable practices'
    }
  ];

  return (
    <section className="host-container" id="host">
      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="host-content">
        {/* Header Section */}
        <div className="host-header">
          <h1 className="main-heading">
            Hosted by <span className="gradient-text">Mar Baselios</span>
          </h1>
          <p className="header-description">
            Premier institution of technical education committed to excellence, innovation, and sustainable development
          </p>
        </div>

        <div className="host-layout">
          {/* Main Content */}
          <div className="host-main">
            <div className="host-card">
              <div className="host-intro">
                <div className="college-badge">
                  <div className="college-logo">
                    <img 
                      src="/images/mbcet-logo.png" 
                      alt="Mar Baselios College Logo" 
                      className="logo-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="logo-fallback" style={{display: 'none'}}>
                      <FaUniversity size={40} />
                    </div>
                  </div>
                  <div className="college-info">
                    <h2 className="college-name">Mar Baselios College of Engineering and Technology</h2>
                    <p className="college-motto">"Where Innovation Meets Excellence"</p>
                  </div>
                </div>

                <div className="college-description">
                  <p>
                    Mar Baselios College of Engineering and Technology (MBCET) stands as a beacon of technical education 
                    in Kerala, established under the Mar Baselios Christian College of Engineering and Technology Trust. 
                    The institution is named after the late Archbishop Mar Baselios Marthoma Mathews I, the Supreme Head 
                    of the Malankara Orthodox Syrian Church.
                  </p>
                  
                  <p>
                    Located in the capital city of Thiruvananthapuram, MBCET has been at the forefront of engineering 
                    education, consistently producing graduates who excel in their respective fields and contribute 
                    significantly to technological advancement and societal development.
                  </p>
                </div>

                {/* College Stats */}
                <div className="stats-grid">
                  {collegeStats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-icon">
                        {stat.icon}
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* College Highlights */}
              <div className="highlights-section">
                <h3 className="section-title">Why MBCET?</h3>
                <div className="highlights-grid">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="highlight-card">
                      <div className="highlight-icon">
                        {highlight.icon}
                      </div>
                      <div className="highlight-content">
                        <h4 className="highlight-title">{highlight.title}</h4>
                        <p className="highlight-description">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div className="location-section">
                <h3 className="section-title">Visit Our Campus</h3>
                <div className="location-content">
                  <div className="location-info">
                    <div className="address-details">
                      <FaMapMarkerAlt className="location-icon" />
                      <div className="address-text">
                        <p className="campus-name">Mar Baselios College of Engineering and Technology</p>
                        <p className="campus-address">
                          Mar Ivanios Vidya Nagar, Nalanchira,<br />
                          Thiruvananthapuram, Kerala - 695015
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="location-map">
                    <div 
                      className="map-placeholder"
                      onClick={handleLocationClick}
                    >
                      <div className="map-overlay"></div>
                      <div className="map-marker">
                        <div className="marker-dot"></div>
                      </div>
                      <div className="map-text">
                        <p>Click to view campus location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="host-sidebar">
            {/* Quick Facts Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Quick Facts</h3>
              </div>
              <div className="facts-list">
                <div className="fact-item">
                  <span className="fact-label">Founded</span>
                  <span className="fact-value">2002</span>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Location</span>
                  <span className="fact-value">Thiruvananthapuram</span>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Affiliation</span>
                  <span className="fact-value">KTU</span>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Approval</span>
                  <span className="fact-value">AICTE</span>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Accreditations</span>
                  <span className="fact-value">NBA, NAAC</span>
                </div>
              </div>
            </div>

            {/* Departments Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Departments</h3>
              </div>
              <div className="departments-list">
                <div className="department-item">Computer Science & Engineering</div>
                <div className="department-item">Electronics & Communication</div>
                <div className="department-item">Electrical & Electronics</div>
                <div className="department-item">Mechanical Engineering</div>
                <div className="department-item">Civil Engineering</div>
                <div className="department-item">Artificial Intelligence & Data Science</div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Campus Contact</h3>
              </div>
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Nalanchira, TVM, Kerala</span>
                </div>
                <div className="contact-item">
                  <FaUniversity className="contact-icon" />
                  <a href="tel:+914712545432">+91 471 254 5432</a>
                </div>
                <div className="contact-item">
                  <FaGraduationCap className="contact-icon" />
                  <a href="mailto:info@mbcet.ac.in">info@mbcet.ac.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;