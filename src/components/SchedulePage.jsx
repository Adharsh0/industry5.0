import React, { useEffect, useState } from 'react';
import { Download, ArrowLeft, Calendar, Trophy } from 'lucide-react';
import './SchedulePage.css';

const SchedulePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const schedules = [
    {
      id: 'engineering',
      title: 'Engineering',
      subtitle: 'Event Schedule',
      fileName: 'engineering_schedule.pdf',
      downloadLink: '/flyer/Engineering Flyer.pdf',
      details: 'Download to view details',
      color: '#4A90E2',
      icon: Calendar
    },
    {
      id: 'polytechnic',
      title: 'Polytechnic',
      subtitle: 'Event Schedule',
      fileName: 'polytechnic_schedule.pdf',
      downloadLink: '/flyer/Polytechnical Flyer.pdf',
      details: 'Download to view the details',
      color: '#6C63FF',
      icon: Calendar
    },
    {
      id: 'prize',
      title: 'Points & Prizes',
      subtitle: 'Distribution Details',
      fileName: 'points_prizes_distribution.pdf',
      downloadLink: '/flyer\Points and Prize distribution.pdf', // Update this with your actual PDF path
      details: 'Download points and prize distribution details',
      color: '#FF6B6B',
      icon: Trophy,
      isNew: true
    }
  ];

  const handleDownload = (schedule) => {
    const link = document.createElement('a');
    link.href = schedule.downloadLink;
    link.download = schedule.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show success message
    console.log(`Downloading ${schedule.title} schedule...`);
  };

  return (
    <div className="schedule-page-container">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="grid-overlay"></div>

      <div className="content-wrapper">
        <div className="page-header">
          <div className="header-badge">
            <Calendar size={14} />
            <span className="badge-text">EVENT SCHEDULES & DETAILS</span>
          </div>
          
          <h1 className="main-title">
            Download <span className="title-gradient">Event Details</span>
          </h1>
          
          <p className="header-description">
            Hover over the folders to view and download event schedules, points system, and prize distribution details.
          </p>
        </div>

        <div className="folders-container">
          {schedules.map((schedule, index) => (
            <div
              key={schedule.id}
              className="folder-wrapper"
              style={{ animationDelay: `${index * 100}ms` }}
            >
             
              
              {/* Folder */}
              <div className="folder">
                <div className="folder-tab" style={{ background: schedule.color }}>
                  <div className="folder-icon">
                    <schedule.icon size={20} />
                  </div>
                </div>
                <div className="folder-body">
                  <div className="folder-content">
                    <div className="folder-title-container">
                      <h3 className="folder-title">{schedule.title}</h3>
                      {schedule.isNew && (
                        <span className="folder-new-indicator">●</span>
                      )}
                    </div>
                    <p className="folder-subtitle">{schedule.subtitle}</p>
                    <p className="folder-details">{schedule.details}</p>
                  </div>
                </div>
              </div>

              {/* PDF Document (slides out on hover) */}
              <div className="pdf-file">
                <div className="pdf-paper">
                  <div className="pdf-corner"></div>
                  <div className="pdf-red-bar" style={{ 
                    background: schedule.id === 'prize' 
                      ? 'linear-gradient(135deg, #FF6B6B, #C53030)' 
                      : 'linear-gradient(135deg, #e53e3e, #c53030)' 
                  }}>
                    PDF
                  </div>
                  <div className="pdf-content">
                    <div className="pdf-title-section">
                      <h4>{schedule.title}</h4>
                      <p>{schedule.subtitle}</p>
                    </div>
                    <div className="pdf-lines">
                      <div className="pdf-text-line"></div>
                      <div className="pdf-text-line"></div>
                      <div className="pdf-text-line short"></div>
                      {schedule.id === 'prize' && (
                        <>
                          <div className="pdf-text-line"></div>
                          <div className="pdf-text-line short"></div>
                          <div className="pdf-text-line"></div>
                        </>
                      )}
                    </div>
                    {schedule.id === 'prize' && (
                      <div className="prize-indicator">
                        <Trophy size={14} />
                        <span>Points & Prize Details</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(schedule)}
                  className="pdf-download-btn"
                  style={{ 
                    background: schedule.id === 'prize' 
                      ? 'linear-gradient(135deg, #FF6B6B, #C53030)' 
                      : 'linear-gradient(135deg, var(--accent), var(--accent-dark))' 
                  }}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="info-section">
          <div className="info-card">
            <h4>Important Notes</h4>
            <ul>
              <li>All schedules are in PDF format</li>
              <li>Points & Prizes folder contains distribution details</li>
              <li>Download all files for complete information</li>
              <li>Contact organizers for any clarifications</li>
            </ul>
          </div>
        </div>

        <div className="bottom-info">
          <p>Hover over folders to preview and download schedules & details</p>
        </div>
      </div>

      <div className="bottom-line"></div>
    </div>
  );
};

export default SchedulePage;