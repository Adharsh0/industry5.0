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

  /* ================= MAIN EVENTS DATA ================= */
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
        "/builder_brain.webp", "/calli.webp"
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

  /* ================= PRE-EVENTS DATA ================= */
  const allEvents = [
    { id: 0, title: "CAMPUS AMBASSADOR PROGRAM", poster: "/campus_a.jpeg", date: "Open Registration", time: "Flexible", venue: "Across Campuses", category: "Ambassador Program", description: "Ready to elevate your leadership and marketing skills? Become a Campus Ambassador for NEXORA 2026.", registerLink: "https://forms.gle/BPmHy4FQx3nrJS1L9" },
    { id: 0.5, title: "CALL FOR PAPERS: PATHRIKA", poster: "/paper.jpeg", date: "Jan 31, 2026", time: "9:00 AM", venue: "MBCET", category: "Research Conference", description: "Submit original research papers for presentation at NEXORA 2026.", registerLink: "https://forms.gle/bbChoVven462q6vp9" },
    { id: 1, title: "BGMI SHOWDOWN", poster: "/bgmi.jpg", date: "Dec 13, 2025", time: "7:00 PM", venue: "Online", category: "Gaming", description: "The battlegrounds are calling! Assemble your elite squad for the ultimate showdown.", registerLink: "https://forms.gle/Jc7dT9FTkeNQhL3s8" },
    { id: 2, title: "DEBUGGING DASH", poster: "/dash.jpg", date: "Dec 11, 2025", time: "7:00 PM", venue: "Online", category: "Coding", description: "A fast-paced online MCQ challenge designed to test your logic and debugging instincts.", registerLink: "https://forms.gle/NBVUCpZm39DHFQhv9" },
    { id: 3, title: "TECHFUSION POSTER CHALLENGE", poster: "tech.jpg", date: "Dec 11, 2025", time: "Online", venue: "Online", category: "Design", description: "Unleash your creativity! Redefine innovation with Human + Tech.", registerLink: "https://forms.gle/uogRE3LgwmHHXUtG8" },
    { id: 4, title: "TECH for Her: Ideathon", poster: "/idea.jpg", date: "Dec 14-15, 2025", time: "Online", venue: "Online", category: "Ideathon", description: "Innovative tech solutions for Women's Safety, Health, and Career Growth.", registerLink: "https://forms.gle/eK5JTEM8iuMifXXw6" },
    { id: 5, title: "TECH MEME CONTEST", poster: "/meme.jpeg", date: "Jan 2026", time: "Online", venue: "Online", category: "Creative", description: "Show off your humor and creativity with tech-themed memes!", registerLink: "https://forms.gle/3pD2Edh4NZZdzen47" },
    { id: 6, title: "OPEN CARROMS TOURNAMENT", poster: "/carrom.jpeg", date: "Jan 3, 2026", time: "9:00 AM", venue: "MBCET", category: "Sports", description: "Show off your skill and precision in our state-level Open Carroms Tournament.", registerLink: "https://forms.gle/mik89Xyvr76e7J1HA" },
    { id: 7, title: "SELF DEFENCE WORKSHOP", poster: "/martial.jpeg", date: "Jan 17, 2026", time: "10:00 AM", venue: "OAT, MBCET", category: "Workshop", description: "Interactive martial arts workshop designed to equip women with essential self-defence skills.", registerLink: "https://forms.gle/6XPV4Yquyw7bygYm7" },
    { id: 8, title: "PRODUCT PHOTOGRAPHY", poster: "/photography.jpeg", date: "Jan 15, 2026", time: "Online", venue: "Online", category: "Photography", description: "Showcase your creativity by clicking aesthetic product shots.", registerLink: "https://forms.gle/9tVyXzbBVFcrEG3d7" },
    { id: 9, title: "WEB DEVELOPMENT WORKSHOP", poster: "/web.jpeg", date: "Jan 3-7, 2026", time: "7:00 PM", venue: "Online", category: "Workshop", description: "Learn fundamentals of HTML, CSS, and React in this 5-day hands-on workshop.", registerLink: "https://hosturl.link/tpbxYe" },
    { id: 11, title: "FUSION 360 WORKSHOP", poster: "/fusion.jpg", date: "Jan 10-11, 2026", time: "9:00 AM", venue: "MBCET", category: "Workshop", description: "Autodesk certified CAD training program on Fusion 360.", registerLink: "https://forms.gle/htsEyvkPvYPFtXyc9" }
  ];

  const downloadableResources = [
    { id: 1, title: 'NEXORA Brochure', description: 'Complete event details', fileName: 'NEXORA_Brochure_2026.pdf', downloadLink: '/brochure.pdf', icon: '📄', color: '#4A90E2' },
    { id: 2, title: 'Event Rulebook', description: 'Guidelines for all events', fileName: 'NEXORA_Rulebook_2026.pdf', downloadLink: 'rulebook.pdf', icon: '📘', color: '#6C63FF' },
    { id: 3, title: 'Engineering Schedule', description: 'Schedule for Engineering', fileName: 'Engineering_Schedule.pdf', downloadLink: '/schedules/Engineering_Schedule.pdf', icon: '📅', color: '#FF6B6B' },
    { id: 4, title: 'Polytechnic Schedule', description: 'Schedule for Polytechnic', fileName: 'Polytechnic_Schedule.pdf', downloadLink: '/schedules/Polytechnic_Schedule.pdf', icon: '📅', color: '#4ECDC4' }
  ];

  /* ================= EFFECTS ================= */

  useEffect(() => {
    // Fill background posters for collage
    const posters = allEvents.map(e => e.poster);
    const shuffled = [...posters, ...posters, ...posters].sort(() => 0.5 - Math.random());
    setBackgroundPosters(shuffled.slice(0, 20));
    
    // Typing effect
    const fullText = "NEXORA EVENTS";
    let cur = 0;
    const interval = setInterval(() => {
      if (cur <= fullText.length) {
        setTitleText(fullText.substring(0, cur));
        cur++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('section-visible'); });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach(s => { if (s) sectionObserver.observe(s); });
    if (downloadSectionRef.current) sectionObserver.observe(downloadSectionRef.current);
    return () => sectionObserver.disconnect();
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
      {/* Hero Section */}
      <div className="events-hero">
        <div className="hero-poster-collage">
          {backgroundPosters.map((poster, index) => (
            <div key={index} className="collage-poster" style={{
                top: `${Math.random() * 80}%`, left: `${Math.random() * 85}%`,
                width: `${120}px`, opacity: 0.08, transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}>
              <img src={poster} alt="" />
            </div>
          ))}
        </div>
        <div className="hero-content">
          <span className="hero-subtitle">Discover & Register</span>
          <h1 className="hero-title">
            {titleText}
            {isTyping && <span className="typing-cursor">|</span>}
          </h1>
        </div>
      </div>

      {/* Main Events Button */}
      <div className="simple-main-events">
        <h2 className="main-events-heading">Register Now For Events</h2>
        <button className="creative-main-events-btn" onClick={() => window.open('https://www.playbook.com/s/johan-s-varughese-graphics/nexora-26-event-list', '_blank')}>
          <span className="btn-text">Event Spotlight</span>
          <ExternalLink size={20} />
        </button>
      </div>

      <div className="events-wrapper">
        {/* Main Events Section */}
        <section ref={el => sectionRefs.current[0] = el} className="events-section main-events-section">
          <div className="section-header">
            <div className="section-badge">Main Events</div>
            <h2 className="section-title1">NEXORA 2026 – MAIN EVENTS</h2>
          </div>
          {mainEventCategories.map((cat, idx) => (
            <div key={idx} className="main-event-category">
              <h3 className="main-event-title">{cat.title}</h3>
              <p className="main-event-subtitle">{cat.subtitle}</p>
              <div className="main-event-posters">
                {cat.posters.map((p, i) => (
                  <div key={i} className="main-event-poster">
                    <img src={p} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* All/Pre-Events Section */}
        <section ref={el => sectionRefs.current[1] = el} className="events-section">
          <div className="section-header">
            <div className="section-badge">Pre-Events</div>
            <h2 className="section-title1">NEXORA PRE-EVENTS</h2>
          </div>
          <div className="events-grid">
            {allEvents.map((event, index) => (
              <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
                <div className="event-card-inner">
                  <div className="event-image">
                    <img src={event.poster} alt={event.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section ref={downloadSectionRef} className="events-section">
          <div className="section-header">
            <div className="section-badge">Resources</div>
            <h2 className="section-title1">Download Resources</h2>
          </div>
          <div className="download-resources-grid">
            {downloadableResources.map((res) => (
              <div key={res.id} className="resource-card" onClick={() => window.open(res.downloadLink)}>
                <div className="resource-card-inner">
                  <div className="resource-icon" style={{ background: res.color }}>{res.icon}</div>
                  <div className="resource-content">
                    <h3 className="resource-title">{res.title}</h3>
                    <p className="resource-description">{res.description}</p>
                  </div>
                  <Download size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal - CLEAN VERSION (No detail lists) */}
      {selectedEvent && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-container">
              <div className="modal-poster">
                <img src={selectedEvent.poster} alt="" />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedEvent.category}</span>
                <h2 className="modal-title">{selectedEvent.title}</h2>
                <div className="modal-details">
                  <div className="detail-row">
                    <strong>Date:</strong> <span>{selectedEvent.date}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Time:</strong> <span>{selectedEvent.time}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Venue:</strong> <span>{selectedEvent.venue}</span>
                  </div>
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
