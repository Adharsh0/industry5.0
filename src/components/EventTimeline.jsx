import React, { useState, useEffect, useRef } from 'react';
import { FaCalendar, FaArrowDown } from 'react-icons/fa';
import './EventTimeline.css';

const EventTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  const timeline = [
    {
      day: 1,
      events: [
        { title: 'Inauguration', time: '09:00 AM', side: 'left' },
        { title: 'Automotive Business Conclave 2026', subtitle: 'Panel Meet', time: '10:00 AM', side: 'right' },
        { title: 'AUTOVERSE - Yantradristi', subtitle: 'Round Table', time: '11:30 AM', side: 'left' },
        { title: 'Ethical Hacking Workshop', time: '01:00 PM', side: 'right' },
        { title: 'Workshop on Drone Technology', time: '02:30 PM', side: 'left' },
        { title: 'CAD Drawing Competition', time: '03:30 PM', side: 'right' },
        { title: 'Circuit Designing Competition', time: '04:00 PM', side: 'left' },
        { title: 'Prompt Competition', time: '04:30 PM', side: 'right' },
        { title: 'BattleBots Arena', time: '05:00 PM', side: 'left' }
      ]
    },
    {
      day: 2,
      events: [
        { title: 'Patrika', subtitle: 'Paper Presentation', time: '09:00 AM', side: 'right' },
        { title: 'Cloud Computing Workshop', time: '10:30 AM', side: 'left' },
        { title: 'Workshop on Data Analytics', time: '12:00 PM', side: 'right' },
        { title: 'IoT Useless Projects Competition', time: '02:00 PM', side: 'left' },
        { title: 'Treasure Hunt', time: '03:30 PM', side: 'right' },
        { title: 'Debate', time: '04:30 PM', side: 'left' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const element = timelineRef.current;
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        
        // Calculate progress based on how much of the timeline is scrolled
        const scrollY = window.scrollY;
        const elementScrollTop = element.offsetTop;
        const maxScroll = elementHeight - windowHeight;
        const currentScroll = Math.max(0, Math.min(scrollY - elementScrollTop, maxScroll));
        const progress = (currentScroll / maxScroll) * 100;
        
        setScrollProgress(Math.max(0, Math.min(progress, 100)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="timeline-wrapper" ref={timelineRef}>
      <div className="timeline-header">
        <div className="timeline-badge">
          <FaCalendar className="badge-icon" />
          <span>Event Schedule</span>
        </div>
        <h1 className="page-title">Convention Timeline</h1>
        <p className="page-subtitle">Scroll to explore the two-day journey of innovation and learning</p>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="center-bar">
          <div 
            className="bar-fill" 
            style={{ height: `${scrollProgress}%` }}
          >
            <div className="fill-glow"></div>
          </div>
          <div className="bar-background"></div>
        </div>

        <div className="timeline-events">
          {timeline.map((day, dayIndex) => (
            <div key={dayIndex} className="day-section">
              <div className="day-marker">
                <div className="marker-circle">
                  <span className="marker-day">Day {day.day}</span>
                </div>
              </div>

              {day.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`event-row ${event.side}`}
                >
                  <div>
                    
                    <div className="card-content">
                      <h3 className="card-title">{event.title}</h3>
                      {event.subtitle && (
                        <p className="card-subtitle">{event.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="event-dot">
                    <div className="dot-ring"></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default EventTimeline;