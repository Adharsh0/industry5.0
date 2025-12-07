import React, { useState, useEffect, useRef } from 'react';
import './Events.css';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [titleText, setTitleText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [backgroundPosters, setBackgroundPosters] = useState([]);
  
  // Refs for scroll animations
  const sectionRefs = useRef([]);
  const eventCardRefs = useRef([]);

  const allEvents = [
    {
      id: 1,
      title: "BGMI SHOWDOWN: The Ultimate Nexora Face-Off!",
      poster: "/bgmi.jpg",
      date: "December 13th 2025",
      time: "7:00 PM - 9:00 PM",
      venue: "Online Tournament",
      description: "The battlegrounds are calling! Assemble your elite squad, sharpen your strategies, and prepare for the most intense BGMI Showdown of the convention. Only the strongest survive!",
      registerLink: "https://forms.gle/Jc7dT9FTkeNQhL3s8",
      category: "Gaming Tournament",
      details: {
        tournament: "Battlegrounds Mobile India (BGMI)",
        mode: "Squad Format",
        prizePool: "₹2000",
        entryFee: "₹200 per squad",
        rules: "Standard BGMI tournament rules apply. All participants must follow fair play guidelines."
      }
    },
    {
      id: 2,
      title: "DEBUGGING DASH: Coding Face-Off Challenge",
      poster: "/dash.jpg",
      date: "December 11th 2025",
      time: "7:00 PM",
      venue: "Online (Quizizz Platform)",
      description: "Get ready for a thrilling coding face-off! Debugging Dash is a fast-paced online MCQ challenge designed to test your logic, accuracy, and quick debugging instincts. Think fast, spot the bugs, and climb the leaderboard!",
      registerLink: "https://forms.gle/NBVUCpZm39DHFQhv9",
      category: "Coding Challenge",
      details: {
        platform: "Quizizz (Online)",
        format: "MCQ Challenge",
        registrationFee: "₹50",
        prize: "Exciting cash prizes",
        features: "Certificates & Activity points will be awarded!"
      },
      contact: {
        name1: "Sneha A Oommen",
        phone1: "9072102057",
        name2: "Aarya Ramesh",
        phone2: "95671 82239"
      }
    },
    {
      id: 3,
      title: "TECHFUSION POSTER CHALLENGE: Redefining Innovation",
      poster: "tech.jpg",
      date: "Submission by December 11th 2025",
      time: "Online Submission",
      venue: "Online",
      description: "Unleash your creativity! Redefine innovation with Human + Tech. Show off your design skills and stand a chance to win exciting prizes! Don't just imagine the future — design it! Your poster could be the next big thing!",
      registerLink: "https://forms.gle/uogRE3LgwmHHXUtG8",
      category: "Design Competition",
      details: {
        theme: "Redefining Innovation: Human + Tech",
        mode: "Online",
        registrationFee: "₹50",
        submissionDeadline: "December 11th 2025",
        guidelines: "All poster guidelines and rules are detailed in the Google Form"
      },
      note: "Final poster submissions will be done via a Google Drive link, which will be shared in the WhatsApp group after registration.",
      contact: {
        name1: "Devi",
        phone1: "8891385391",
        name2: "Aparna",
        phone2: "7736784412"
      }
    },
    {
      id: 4,
      title: "TECH for Her: Online Ideathon",
      poster: "/idea.jpg",
      date: "December 14th & 15th 2025",
      time: "Online Submission",
      venue: "Online",
      description: "Innovative tech solutions for Women's Safety, Health, Career Growth & Sustainability. If you're passionate about building tech that empowers women, now is the perfect time to join!",
      registerLink: "https://forms.gle/eK5JTEM8iuMifXXw6",
      category: "Ideathon",
      details: {
        theme: "Tech solutions for Women's Safety, Health, Career Growth & Sustainability",
        mode: "Online",
        requirement: "Create a 5–7 slide pitch deck and present your idea in a 10-minute session",
        submission: "Submit your deck via Google Drive",
        prizePool: "₹2000",
        judging: "Based on uniqueness, feasibility & real-world impact"
      },
      fees: {
        solo: "₹100",
        duo: "₹150 (2 Members)",
        trio: "₹250 (3 Members)",
        quad: "₹300 (4 Members)"
      },
      contact: {
        name1: "Angel Rose Prince",
        phone1: "95131 02015",
        name2: "Aarya Ramesh",
        phone2: "95671 82239"
      }
    },
    {
      id: 5,
      title: "Workshop on AI/ML",
      poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop",
      date: "March 10, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Tech Hall A",
      description: "Deep dive into artificial intelligence and machine learning fundamentals with industry experts.",
      registerLink: "#register-ai-workshop",
      category: "Workshop"
    },
    {
      id: 6,
      title: "Code Sprint Championship",
      poster: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=1000&fit=crop",
      date: "March 22, 2024",
      time: "10:00 AM - 10:00 PM",
      venue: "Computer Center",
      description: "24-hour coding marathon to solve real-world problems and win exciting prizes.",
      registerLink: "#register-code-sprint",
      category: "Competition"
    },
    {
      id: 7,
      title: "Innovation Expo",
      poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1000&fit=crop",
      date: "March 25, 2024",
      time: "11:00 AM - 5:00 PM",
      venue: "Exhibition Hall",
      description: "Showcase your projects and innovations to industry leaders and venture capitalists.",
      registerLink: "#register-innovation-expo",
      category: "Exhibition"
    }
  ];

  const preEvents = allEvents.slice(0, 4);
  const mainEvents = allEvents.slice(4);

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 2);
    eventCardRefs.current = eventCardRefs.current.slice(0, allEvents.length);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, observerOptions);

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px'
    });

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    // Observe all event cards
    eventCardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize background posters - USING YOUR EVENT POSTERS
  useEffect(() => {
    // Create duplicates of your event posters to have enough for collage
    const allPosters = [];
    for (let i = 0; i < 3; i++) { // Create 3 copies of each poster
      allPosters.push(...allEvents.map(event => event.poster));
    }
    const shuffledPosters = shuffleArray(allPosters);
    setBackgroundPosters(shuffledPosters.slice(0, 20)); // Use 20 posters for collage
  }, []);

  // Typing effect for title
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
        {/* Poster Collage Background */}
        <div className="hero-poster-collage">
          {backgroundPosters.map((poster, index) => (
            <div 
              key={index} 
              className="collage-poster"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 85}%`,
                width: `${100 + Math.random() * 150}px`,
                height: `${120 + Math.random() * 150}px`,
                opacity: 0.05 + (Math.random() * 0.05),
                transform: `rotate(${Math.random() * 15 - 7.5}deg)`,
                animationDelay: `${index * 0.15}s`,
                animationDuration: `${20 + Math.random() * 20}s`
              }}
            >
              <img src={poster} alt={`Collage ${index}`} loading="lazy" />
              <div className="poster-overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <span className="hero-subtitle">Discover & Register</span>
          <h1 className="hero-title">
            {titleText.split(' ').map((word, index) => (
              <span 
                key={index} 
                className={index === 0 ? 'word-nexora' : 'word-events'}
              >
                {word}{index === 0 ? ' ' : ''}
                {isTyping && <span className="typing-cursor"></span>}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="events-wrapper">
        <section 
          ref={el => sectionRefs.current[0] = el}
          className="events-section"
        >
          <div className="section-header">
            <div className="section-badge">Featured Events</div>
            <h2 className="section-title">Upcoming Attractions</h2>
            <p className="section-subtitle">Experience the pinnacle of technology and innovation</p>
          </div>
          <div className="events-grid">
            {preEvents.map((event, index) => (
              <div
                key={event.id}
                ref={el => eventCardRefs.current[index] = el}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-card-inner">
                  <div className="event-image">
                    <img 
                      src={event.poster} 
                      alt={event.title}
                      style={{ 
                        objectFit: 'cover',
                        backgroundColor: event.id === 1 ? '#000' : 'transparent'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => sectionRefs.current[1] = el}
          className="events-section main-events"
        >
          <div className="section-header">
            <div className="section-badge featured">Main Events</div>
            <h2 className="section-title">Festival Highlights</h2>
            <p className="section-subtitle">Don't miss these flagship events of NEXORA 2026</p>
          </div>
          <div className="events-grid">
            {mainEvents.map((event, index) => (
              <div
                key={event.id}
                ref={el => eventCardRefs.current[preEvents.length + index] = el}
                className="event-card featured"
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
      </div>

      {selectedEvent && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="modal-container">
              <div className="modal-poster">
                <img 
                  src={selectedEvent.poster} 
                  alt={selectedEvent.title}
                  style={{ 
                    objectFit: 'contain',
                    backgroundColor: '#000'
                  }}
                />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedEvent.category}</span>
                <h2 className="modal-title">{selectedEvent.title}</h2>
                
                <div className="modal-details">
                  {selectedEvent.details ? (
                    <>
                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M3 10H21M8 3V6M16 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Date</span>
                          <span className="detail-value">{selectedEvent.date}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Time</span>
                          <span className="detail-value">{selectedEvent.time}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Venue</span>
                          <span className="detail-value">{selectedEvent.venue}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M3 10H21M8 3V6M16 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Date</span>
                          <span className="detail-value">{selectedEvent.date}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Time</span>
                          <span className="detail-value">{selectedEvent.time}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="detail-text">
                          <span className="detail-label">Venue</span>
                          <span className="detail-value">{selectedEvent.venue}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-description">
                  <h3>About Event</h3>
                  <p>{selectedEvent.description}</p>
                  
                  {selectedEvent.details && (
                    <div className="event-extra-details">
                      <h4>Event Details:</h4>
                      <ul>
                        {selectedEvent.id === 1 && (
                          <>
                            <li><strong>Tournament:</strong> {selectedEvent.details.tournament}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Prize Pool:</strong> {selectedEvent.details.prizePool}</li>
                            <li><strong>Entry Fee:</strong> {selectedEvent.details.entryFee}</li>
                          </>
                        )}
                        {selectedEvent.id === 2 && (
                          <>
                            <li><strong>Platform:</strong> {selectedEvent.details.platform}</li>
                            <li><strong>Format:</strong> {selectedEvent.details.format}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Prize:</strong> {selectedEvent.details.prize}</li>
                            <li><strong>Features:</strong> {selectedEvent.details.features}</li>
                          </>
                        )}
                        {selectedEvent.id === 3 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Submission Deadline:</strong> {selectedEvent.details.submissionDeadline}</li>
                          </>
                        )}
                        {selectedEvent.id === 4 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Prize Pool:</strong> {selectedEvent.details.prizePool}</li>
                            <li><strong>Requirement:</strong> {selectedEvent.details.requirement}</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {selectedEvent.id === 4 && selectedEvent.fees && (
                    <div className="event-fees">
                      <h4>Registration Fees:</h4>
                      <ul>
                        <li><strong>Solo:</strong> {selectedEvent.fees.solo}</li>
                        <li><strong>Team of 2:</strong> {selectedEvent.fees.duo}</li>
                        <li><strong>Team of 3:</strong> {selectedEvent.fees.trio}</li>
                        <li><strong>Team of 4:</strong> {selectedEvent.fees.quad}</li>
                      </ul>
                    </div>
                  )}

                  {selectedEvent.note && (
                    <div className="event-note">
                      <p><strong>📝 Note:</strong> {selectedEvent.note}</p>
                    </div>
                  )}

                  {selectedEvent.contact && (
                    <div className="event-contact">
                      <h4>Contact for Enquiries:</h4>
                      <ul>
                        <li><strong>{selectedEvent.contact.name1}:</strong> {selectedEvent.contact.phone1}</li>
                        {selectedEvent.contact.name2 && (
                          <li><strong>{selectedEvent.contact.name2}:</strong> {selectedEvent.contact.phone2}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <p className="event-callout">
                    <strong>✨ Ready to join?</strong> Register now and be part of this amazing event!
                  </p>
                </div>

                <a 
                  href={selectedEvent.registerLink} 
                  className="register-btn1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>
                    {selectedEvent.id === 1 ? 'Register Your Squad Now' : 
                     selectedEvent.id === 4 ? 'Register Your Team Now' : 
                     'Register Now'}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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