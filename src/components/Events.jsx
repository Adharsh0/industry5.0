import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import './Events.css';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [titleText, setTitleText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [backgroundPosters, setBackgroundPosters] = useState([]);
  const [isMainEventsHovered, setIsMainEventsHovered] = useState(false);
  
  // Refs for scroll animations
  const sectionRefs = useRef([]);
  const eventCardRefs = useRef([]);
  const downloadSectionRef = useRef(null);

  /* ================= MAIN EVENTS ================= */
  const mainEventCategories = [
    {
      title: "Hackathon",
      subtitle: "24-Hour Flagship Innovation Challenge",
      posters: ["/hack1.jpeg", "/hack2.jpeg", "/hack3.jpeg"]
    },
    {
      title: "Workshops @ Nexora",
      subtitle: "Hands-on Technical & Skill Sessions",
      posters: ["/cludburst.jpeg", "/drone.jpeg", "/ethical.jpeg", "/clay.jpeg", "/data.jpeg"]
    },
    {
      title: "Competitions – 2 Days",
      subtitle: "30 & 31 January 2026",
      posters: [
        "/2wheeler.jpeg", "/builditright.jpeg", "/Circuit Decathlon.jpeg", "/mazerunner.jpeg",
        "/lathemaster.jpeg", "/minnal.jpeg", "/pro_debugging.jpeg", "/prompt master.jpeg",
        "/sodeso.jpeg", "/terra.jpeg", "/treassurhunt.jpeg", "/wiringDeca.jpeg",
        "/builder_brain.jpeg", "/calli.jpeg"
      ]
    },
    {
      title: "Competitions – 30 January",
      subtitle: "One-Day Events",
      posters: ["/0g.jpeg", "/cad wizard.jpeg", "/debate.jpeg", "/ideaorbit.jpeg", "/mazeescape.jpeg", "/rj_hunt.jpeg", "/robowar.jpeg", "/x.jpeg"]
    },
    {
      title: "Competitions – 31 January",
      subtitle: "Final Day Events",
      posters: ["/pp.jpeg", "/carroms.jpeg", "/quiz.jpeg"]
    }
  ];

  const allEvents = [
    {
      id: 0,
      title: "CAMPUS AMBASSADOR PROGRAM",
      poster: "/campus_a.jpeg", 
      date: "Open Registration",
      time: "Flexible",
      venue: "Across Campuses",
      description: "Ready to elevate your leadership and marketing skills? Become a Campus Ambassador for NEXORA 2026 - ISTE All Kerala Annual Students Convention.",
      registerLink: "https://forms.gle/BPmHy4FQx3nrJS1L9",
      category: "Ambassador Program"
    },
    {
      id: 0.5,
      title: "CALL FOR PAPERS: PATHRIKA",
      poster: "/paper.jpeg",
      date: "31 Jan 2026",
      time: "Paper Presentation",
      venue: "ISTE Annual State Students' Convention 2026, NEXORA",
      description: "We invite undergraduate and postgraduate students to submit original research papers for presentation at NEXORA 2026.",
      registerLink: "https://forms.gle/bbChoVven462q6vp9",
      category: "Special Event"
    },
    {
      id: 1,
      title: "BGMI SHOWDOWN",
      poster: "/bgmi.jpg",
      date: "December 13th 2025",
      time: "7:00 PM - 9:00 PM",
      venue: "Online Tournament",
      description: "The battlegrounds are calling! Assemble your elite squad for the most intense BGMI Showdown.",
      registerLink: "https://forms.gle/Jc7dT9FTkeNQhL3s8",
      category: "Gaming Tournament"
    },
    {
      id: 2,
      title: "DEBUGGING DASH",
      poster: "/dash.jpg",
      date: "December 11th 2025",
      time: "7:00 PM",
      venue: "Online (Quizizz)",
      description: "Get ready for a thrilling coding face-off! Debugging Dash is a fast-paced online MCQ challenge.",
      registerLink: "https://forms.gle/NBVUCpZm39DHFQhv9",
      category: "Coding Challenge"
    },
    {
      id: 3,
      title: "TECHFUSION POSTER CHALLENGE",
      poster: "tech.jpg",
      date: "Dec 11th 2025",
      time: "Online Submission",
      venue: "Online",
      description: "Unleash your creativity! Redefine innovation with Human + Tech.",
      registerLink: "https://forms.gle/uogRE3LgwmHHXUtG8",
      category: "Design Competition"
    },
    {
      id: 4,
      title: "TECH for Her: Online Ideathon",
      poster: "/idea.jpg",
      date: "Dec 14th & 15th 2025",
      time: "Online Submission",
      venue: "Online",
      description: "Innovative tech solutions for Women's Safety, Health, Career Growth & Sustainability.",
      registerLink: "https://forms.gle/eK5JTEM8iuMifXXw6",
      category: "Ideathon"
    },
    {
      id: 5,
      title: "TECH MEME CONTEST",
      poster: "/meme.jpeg",
      date: "January 2026",
      time: "Online Submission",
      venue: "Online",
      description: "Show off your humor and creativity with tech-themed memes!",
      registerLink: "https://forms.gle/3pD2Edh4NZZdzen47",
      category: "Creative Competition"
    },
    {
      id: 6,
      title: "STATE-LEVEL OPEN CARROMS TOURNAMENT",
      poster: "/carrom.jpeg",
      date: "January 3rd 2026",
      time: "9:00 AM onwards",
      venue: "MBCET, Trivandrum",
      description: "Show off your skill, precision, and strategy in Kerala's exciting state-level tournament!",
      registerLink: "https://forms.gle/mik89Xyvr76e7J1HA",
      category: "Sports Tournament"
    },
    {
      id: 7,
      title: "SELF DEFENCE WORKSHOP",
      poster: "/martial.jpeg",
      date: "January 17th 2026",
      time: "10:00 AM – 12:30 PM",
      venue: "Open Air Theatre (OAT)",
      description: "Empowering martial arts workshop designed to equip participants with essential skills.",
      registerLink: "https://forms.gle/6XPV4Yquyw7bygYm7",
      category: "Workshop"
    },
    {
      id: 8,
      title: "PRODUCT PHOTOGRAPHY CONTEST",
      poster: "/photography.jpeg",
      date: "Dec 15th 2025 - Jan 15th 2026",
      time: "Online Submission",
      venue: "Online",
      description: "Got an eye for detail? Let your camera turn everyday objects into stunning frames!",
      registerLink: "https://forms.gle/9tVyXzbBVFcrEG3d7",
      category: "Photography Competition"
    },
    {
      id: 9,
      title: "WEB DEVELOPMENT WORKSHOP",
      poster: "/web.jpeg",
      date: "January 3 – January 7",
      time: "7:00 PM – 8:00 PM",
      venue: "Online",
      description: "Kickstart your journey into web development with our 5-day hands-on online workshop!",
      registerLink: "https://hosturl.link/tpbxYe",
      category: "Workshop"
    },
    {
      id: 11,
      title: "FUSION 360 - AUTODESK WORKSHOP",
      poster: "/fusion.jpg",
      date: "10 & 11 January 2026",
      time: "9:00 AM – 5:00 PM",
      venue: "MBCET, Thiruvananthapuram",
      description: "Turn your ideas into industry-ready designs with a 2-day Autodesk-certified program.",
      registerLink: "https://forms.gle/htsEyvkPvYPFtXyc9",
      category: "Workshop"
    }
  ];

  const downloadableResources = [
    { id: 1, title: 'NEXORA Brochure', fileName: 'NEXORA_Brochure_2026.pdf', downloadLink: '/brochure.pdf', icon: '📄', color: '#4A90E2', description: 'Complete event brochure' },
    { id: 2, title: 'Event Rulebook', fileName: 'NEXORA_Rulebook_2026.pdf', downloadLink: 'rulebook.pdf', icon: '📘', color: '#6C63FF', description: 'Detailed rules and guidelines' },
    { id: 3, title: 'Engineering Schedule', fileName: 'Engineering_Schedule.pdf', downloadLink: '/schedules/Engineering_Schedule.pdf', icon: '📅', color: '#FF6B6B', description: 'Schedule for Engineering events' },
    { id: 4, title: 'Polytechnic Schedule', fileName: 'Polytechnic_Schedule.pdf', downloadLink: '/schedules/Polytechnic_Schedule.pdf', icon: '📅', color: '#4ECDC4', description: 'Schedule for Polytechnic events' }
  ];

  useEffect(() => {
    eventCardRefs.current = eventCardRefs.current.slice(0, allEvents.length);
  }, [allEvents]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('section-visible');
      });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach((section) => { if (section) sectionObserver.observe(section); });
    if (downloadSectionRef.current) sectionObserver.observe(downloadSectionRef.current);

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const fullText = "NEXORA EVENTS";
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTitleText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="events-container">
      <div className="events-hero">
        <div className="hero-content">
          <span className="hero-subtitle">Discover & Register</span>
          <h1 className="hero-title">
            {titleText.split(' ').map((word, index) => (
              <span key={index} className={index === 0 ? 'word-nexora' : 'word-events'}>
                {word}{index === 0 ? ' ' : ''}
                {isTyping && index === 1 && <span className="typing-cursor"></span>}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="events-wrapper">
        {/* Main Events Section */}
        <section className="events-section main-events-section">
          <div className="section-header">
            <div className="section-badge">Main Events</div>
            <h2 className="section-title1">NEXORA 2026 – MAIN EVENTS</h2>
          </div>
          {mainEventCategories.map((category, index) => (
            <div key={index} className="main-event-category">
              <h3 className="main-event-title">{category.title}</h3>
              <p className="main-event-subtitle">{category.subtitle}</p>
              <div className="main-event-posters">
                {category.posters.map((poster, i) => (
                  <div key={i} className="main-event-poster">
                    <img src={poster} alt={category.title} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Pre-Events Section */}
        <section ref={el => sectionRefs.current[0] = el} className="events-section">
          <div className="section-header">
            <div className="section-badge">All Events</div>
            <h2 className="section-title1">NEXORA PRE-EVENTS 2025-26</h2>
          </div>
          <div className="events-grid">
            {allEvents.map((event, index) => (
              <div
                key={event.id}
                ref={el => eventCardRefs.current[index] = el}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-card-inner">
                  <div className="event-image">
                    <img src={event.poster} alt={event.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section ref={downloadSectionRef} className="events-section">
          <div className="section-header">
            <h2 className="section-title1">Download Resources</h2>
          </div>
          <div className="download-resources-grid">
            {downloadableResources.map((resource) => (
              <div key={resource.id} className="resource-card" onClick={() => window.open(resource.downloadLink)}>
                <div className="resource-card-inner">
                  <div className="resource-icon" style={{ background: resource.color }}>{resource.icon}</div>
                  <div className="resource-content">
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                  </div>
                  <Download size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Simplified Modal */}
      {selectedEvent && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-container">
              <div className="modal-poster">
                <img src={selectedEvent.poster} alt={selectedEvent.title} />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedEvent.category}</span>
                <h2 className="modal-title">{selectedEvent.title}</h2>
                <div className="modal-details">
                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                    <p><strong>Time:</strong> {selectedEvent.time}</p>
                    <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                </div>
                <div className="modal-description">
                  <h3>About Event</h3>
                  <p>{selectedEvent.description}</p>
                </div>
                <a href={selectedEvent.registerLink} className="register-btn1" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
