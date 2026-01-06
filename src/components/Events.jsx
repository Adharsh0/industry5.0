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
      id: 0,
      title: "CAMPUS AMBASSADOR PROGRAM",
      poster: "/campus_a.jpeg", 
      date: "Open Registration",
      time: "Flexible",
      venue: "Across Campuses",
      description: "Ready to elevate your leadership and marketing skills? Become a Campus Ambassador for NEXORA 2026 - ISTE All Kerala Annual Students Convention. Join us in inspiring, connecting, and empowering our campuses, and be the vehicle for change in your community!",
      registerLink: "https://forms.gle/BPmHy4FQx3nrJS1L9",
      category: "Ambassador Program",
      isHighlighted: true,
      details: {
        eligibility: "Open to ISTE Members",
        rewards: "Fantastic prizes and premium gifts for top 3 ambassadors",
        criteria: "Based on effort and number of registrations",
        benefits: "Leadership experience, networking opportunities, certificates"
      },
      note: "The Ambassador with the strongest effort and highest returns will be rewarded for their resourcefulness and exceptional promotional work. Climb to the top! The three Ambassadors with the maximum registrations will win fantastic prizes and premium gifts.",
      contact: {
        name1: "Sidharth Sumitra Gireesh",
        phone1: "8714814292",
        name2: "Adhithya Mohan",
        phone2: "9539066643"
      }
    },
    {
      id: 0.5,
      title: "CALL FOR PAPERS: PATHRIKA",
      poster: "/paper.jpeg",
      date: "Submission: 01 Jan 2026 - 09 Jan 2026",
      time: "Paper Presentation: 31 Jan 2026",
      venue: "ISTE Annual State Students' Convention 2026, NEXORA",
      description: "We invite undergraduate and postgraduate students to submit original research papers for presentation at NEXORA 2026. Present your research, get published in our convention souvenir, and connect with the technical education community.",
      registerLink: "https://forms.gle/bbChoVven462q6vp9",
      category: "Special Event",
      isHighlighted: true,
      details: {
        themes: "20+ research themes including AI, IoT, Robotics, Renewable Energy, Cybersecurity & more",
        submission: "Abstract: 01 Jan 2026 | Full Paper: 09 Jan 2026",
        presentation: "31 January 2026",
        publication: "All presented papers published in ISTE Annual Convention Souvenir",
        eligibility: "Undergraduate & Postgraduate Students",
        registrationFee: "ISTE members: ₹200 | Non-members: ₹250"
      },
      note: "Submit your original research papers to ISTE mail: istestudentchapter@mbcet.ac.in",
      contact: {
        name1: "Ms Poorna BR",
        phone1: "94463 56114",
        name2: "Dr Lekshmi Chandran M",
        phone2: "94963 35333",
        name3: "Ms Amritha BJ",
        phone3: "94968 17349"
      },
      themes: [
        "Industrial Robotics and Automation",
        "Sustainable Waste Management",
        "Industry–Academia Synergetic Systems",
        "Bio-Inspired Production Techniques",
        "Systems for Net–Zero Emission",
        "Internet of Things (IoT)",
        "Renewable Energy Extraction & Utilization Systems",
        "Advanced Communication & Alert Systems",
        "Smart Energy Grids & Power Systems",
        "Cyber-Physical Systems for Next-Generation Industries",
        "Digital Twins for Industrial Systems",
        "Fault–Tolerant Industrial Electronics for Resilient Factories",
        "Smart & Sustainable Infrastructure",
        "Circular Economy Models for Industry 5.0",
        "Disaster–Resilient Industrial & Residential Layouts",
        "AI in Sustainability",
        "Advances in AI, Machine Learning & Deep Learning",
        "AI in Teaching, Education and Research",
        "Cybersecurity & Blockchain",
        "Cloud Computing & Edge Computing"
      ]
    },
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
        name2: "Aarya Ramesh",
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
      title: "TECH MEME CONTEST: When Humans Meet Tech",
      poster: "/meme.jpeg",
      date: "Submission by January 2026",
      time: "Online Submission",
      venue: "Online",
      description: "If memes are your love language ❤️😂 and you've got some hilarious tech vs human moments saved in your brain, this is your sign to finally let them out 😎💥 Show off your humor and creativity with tech-themed memes!",
      registerLink: "https://forms.gle/3pD2Edh4NZZdzen47",
      category: "Creative Competition",
      details: {
        theme: "When Humans Meet Tech 👤🤖",
        submission: "Final meme submissions via Google Form",
        format: "Digital Meme (Image)",
        registrationFee: "Free",
        prize: "Cash prizes 💸, certificates, shoutouts & bragging rights",
        activityPoints: "Yes"
      },
      note: "Final meme submissions will be collected via a Google Form later, shared in the WhatsApp group after registration. Open to all students!",
      contact: {
        name1: "Aparna R",
        phone1: "77367 84412",
        name2: "Devikrishna",
        phone2: "85901 80017"
      }
    },
    {
      id: 6,
      title: "STATE-LEVEL OPEN CARROMS TOURNAMENT",
      poster: "/carrom.jpeg",
      date: "January 3rd 2026",
      time: "9:00 AM onwards",
      venue: "Mar Baselios College of Engineering and Technology (MBCET), Nalanchira, Trivandrum",
      description: "Show off your skill, precision, and strategy in Kerala's exciting state-level Open Carroms Tournament! Whether you're a beginner, casual player, or seasoned striker—this event welcomes passionate players ready to compete. Aim sharp. Strike smart. Pocket your victory!",
      registerLink: "https://forms.gle/mik89Xyvr76e7J1HA",
      category: "Sports Tournament",
      details: {
        tournamentLevel: "State-level Open Tournament",
        venue: "MBCET, Nalanchira, Trivandrum",
        openTo: "All ages across Kerala",
        registrationFee: "₹100 per participant",
        format: "Knockout Tournament",
        benefits: "Certificates to all participants + Activity Points"
      },
      note: "Participants from across Kerala—of any age—are welcome to join!",
      contact: {
        name1: "Dr. Deepak Raj",
        phone1: "9048522229",
        name2: "Mr. Melvin Jacob",
        phone2: "94976 13790",
        name3: "Vishwabala P",
        phone3: "8590652130",
        name4: "Aarya Ramesh",
        phone4: "9567182239"
      }
    },
    {
      id: 7,
      title: "SELF DEFENCE WORKSHOP: Martial Arts for Women",
      poster: "/martial.jpeg",
      date: "January 17th 2026",
      time: "10:00 AM – 12:30 PM",
      venue: "Open Air Theatre (OAT)",
      description: "Join us for an empowering and interactive martial arts workshop designed to equip participants with essential self-defence skills and situation-specific responses. Learn practical techniques inspired by Kalaripayattu, wrestling, wushu, and other effective martial art forms.",
      registerLink: "https://forms.gle/6XPV4Yquyw7bygYm7",
      category: "Workshop",
      details: {
        duration: "2.5 Hours",
        focus: "Practical self-defence techniques for real-world scenarios",
        inspiration: "Kalaripayattu, wrestling, wushu, and other martial arts",
        resourcePerson: "Vincent Peter, Founder, Ayodhana Centre for Martial Arts Study and Research",
        registrationFee: "₹100",
        includes: "Hands-on session, doubt clearing, practical demonstrations"
      },
      note: "This workshop focuses on real-world scenarios, helping women understand how to react confidently and safely in challenging situations.",
      contact: {
        name1: "Aishwarya Balakrishnan Menon",
        phone1: "77365 67382",
        name2: "Aarya Ramesh",
        phone2: "95671 82239"
      }
    },
    {
      id: 8,
      title: "PRODUCT PHOTOGRAPHY CONTEST",
      poster: "/photography.jpeg",
      date: "December 15th 2025 - January 15th 2026",
      time: "Online Submission Window",
      venue: "Online",
      description: "Got an eye for detail? Love capturing aesthetic product shots? Showcase your creativity by clicking product photos and stand a chance to win exciting prizes! Let your camera turn everyday objects into stunning frames!",
      registerLink: "https://forms.gle/9tVyXzbBVFcrEG3d7",
      category: "Photography Competition",
      details: {
        theme: "Product Photography",
        submissionPeriod: "December 15th 2025 to January 15th 2026",
        format: "Single photograph submission",
        equipment: "Phone or Camera",
        requirement: "Proper editing allowed",
        registrationFee: "₹50",
        participants: "Individual participation only"
      },
      note: "Participants have to submit a photograph (via phone or camera) of any household product with proper editing within a time frame of one month. Winners will be selected based on creativity and execution.",
      contact: {
        name1: "Rohin",
        phone1: "9846395097",
        name2: "Adithya",
        phone2: "9539066643"
      }
    },
    {
      "id": 9,
      "title": "WEB DEVELOPMENT WORKSHOP – NEXORA '26",
      "poster": "/web.jpeg",
      "date": "January 3 – January 7",
      "time": "7:00 PM – 8:00 PM",
      "venue": "Online",
      "description": "Kickstart your journey into the world of web development with our 5-day hands-on online workshop! Learn the fundamentals of HTML, CSS, explore frontend development, and build real-world applications using React. Perfect for beginners and tech enthusiasts looking to upskill and build strong web foundations.",
      "registerLink": "https://hosturl.link/tpbxYe",
      "category": "Workshop",
      "isHighlighted": true,
      "details": {
        "mode": "Online",
        "fee": "₹200",
        "lastDate": "December 31",
        "certificate": "Certificates will be provided to all participants",
        "seats": "Limited seats available"
      },
      "note": "Limited seats – register now and build your web presence!",
      "contact": {
        "name1": "Dhiya K",
        "phone1": "9400441415",
        "name2": "Kiran Biju",
        "phone2": "7909208609"
      }
    },
    {
      "id": 10,
      "title": "SELF DEFENSE WORKSHOP – NEXORA '26",
      "poster": "/sd.jpeg",
      "date": "03 January 2026",
      "time": "10:00 AM onwards",
      "venue": "Mar Baselios College of Engineering and Technology (MBCET)",
      "description": "Empower yourself with the skills, confidence, and awareness needed to protect yourself in real-life situations. This hands-on self-defense workshop focuses on practical techniques, situational awareness, and personal safety, helping participants build confidence, strength, and self-discipline.",
      "registerLink": "https://forms.gle/J7FqCp1rmhvLpwEx8",
      "category": "Workshop",
      "isHighlighted": true,
      "details": {
        "mode": "Offline",
        "fee": "Registration fees apply",
        "lastDate": "02 January 2026",
        "certificate": "Activity points will be rewarded",
        "seats": "Limited seats available"
      },
      "note": "Take a step towards becoming stronger, safer, and more confident. Don't miss this opportunity to learn a life-saving skill!",
      "presentedBy": "24th Annual ISTE State Student Convention",
      "inAssociationWith": "Department of Physical Education, MBCET",
      "contact": {
        "name1": "Kiran Biju",
        "phone1": "7909208609",
        "name2": "Jithin Joy",
        "phone2": "7994716579"
      }
    },
    {
      "id": 11,
      "title": "FUSION 360 - AUTODESK CERTIFIED CAD WORKSHOP",
      "poster": "/fusion.jpg",
      "date": "10 & 11 January 2026",
      "time": "9:00 AM – 5:00 PM",
      "venue": "Mar Baselios College of Engineering and Technology, Nalanchira, Thiruvananthapuram",
      "description": "Turn your ideas into industry-ready designs with a 2-day Autodesk-certified CAD training program on Fusion 360. Learn directly from certified professionals through hands-on design workflows and real engineering applications.",
      "registerLink": "https://forms.gle/htsEyvkPvYPFtXyc9",
      "category": "Workshop",
      "isHighlighted": true,
      "details": {
        "mode": "Offline",
        "fee": "₹1200",
        "lastDate": "Limited seats registration",
        "duration": "10 Hours",
        "certificate": "Autodesk certificate on successful completion",
        "seats": "80 participants only"
      },
      "note": "Whether you’re here to learn, create, or master CAD—this is your chance to level up!",
      "presentedBy": "ISTE MBCET Student Chapter",
      "inAssociationWith": "InterCAD Systems Pvt. Ltd, ASME MBCET Chapter, CPDL, AUTOMATA",
      "contact": {
        "name1": "Dr. Jishnu Chandran R",
        "phone1": "9447929116",
        "name2": "Vishwabala P",
        "phone2": "8590652130"
      }
    }
  ];

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 1);
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

  // Initialize background posters
  useEffect(() => {
    const allPosters = [];
    for (let i = 0; i < 3; i++) {
      allPosters.push(...allEvents.map(event => event.poster));
    }
    const shuffledPosters = shuffleArray(allPosters);
    setBackgroundPosters(shuffledPosters.slice(0, 20));
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
            <div className="section-badge">All Events</div>
            <h2 className="section-title1">NEXORA EVENTS 2025-26</h2>
            <p className="section-subtitle1">Explore all our exciting events happening this season</p>
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
                <span className={`modal-category ${selectedEvent.id === 0.5 ? 'special-category' : ''}`}>
                  {selectedEvent.id === 0.5 ? '📄 Research Conference' : selectedEvent.category}
                </span>
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
                  
                  {/* Special Event - Call for Papers */}
                  {selectedEvent.id === 0.5 && (
                    <div className="event-special-details">
                      <h4>Important Dates:</h4>
                      <ul>
                        <li><strong>Abstract Submission:</strong> 01 January 2026</li>
                        <li><strong>Acceptance of Abstract:</strong> 03 January 2026</li>
                        <li><strong>Full Paper Submission:</strong> 09 January 2026</li>
                        <li><strong>Full Paper Acceptance:</strong> 14 January 2026</li>
                        <li><strong>Paper Presentation:</strong> 31 January 2026</li>
                      </ul>
                      
                      <h4>Research Themes:</h4>
                      <div className="themes-grid">
                        {selectedEvent.themes.map((theme, index) => (
                          <div key={index} className="theme-chip">
                            {theme}
                          </div>
                        ))}
                      </div>
                      
                      <div className="important-note">
                        <h4>📢 Important Information:</h4>
                        <ul>
                          <li>Soft copy of papers should be sent to: <strong>istestudentchapter@mbcet.ac.in</strong></li>
                          <li>All presented papers will be published in ISTE Annual Convention Souvenir</li>
                          <li>Organized by: ISTE MBCET Chapter, Mar Baselios College of Engineering and Technology, Nalanchira</li>
                          <li>Registration Fee: ISTE members: ₹200 | Non-members: ₹250</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Other events details */}
                  {selectedEvent.id !== 0.5 && selectedEvent.details && (
                    <div className="event-extra-details">
                      <h4>Event Details:</h4>
                      <ul>
                        {/* Event 0 */}
                        {selectedEvent.id === 0 && (
                          <>
                            <li><strong>Eligibility:</strong> {selectedEvent.details.eligibility}</li>
                            <li><strong>Rewards:</strong> {selectedEvent.details.rewards}</li>
                            <li><strong>Selection Criteria:</strong> {selectedEvent.details.criteria}</li>
                            <li><strong>Benefits:</strong> {selectedEvent.details.benefits}</li>
                          </>
                        )}
                        
                        {/* Event 1 */}
                        {selectedEvent.id === 1 && (
                          <>
                            <li><strong>Tournament:</strong> {selectedEvent.details.tournament}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Prize Pool:</strong> {selectedEvent.details.prizePool}</li>
                            <li><strong>Entry Fee:</strong> {selectedEvent.details.entryFee}</li>
                          </>
                        )}
                        
                        {/* Event 2 */}
                        {selectedEvent.id === 2 && (
                          <>
                            <li><strong>Platform:</strong> {selectedEvent.details.platform}</li>
                            <li><strong>Format:</strong> {selectedEvent.details.format}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Prize:</strong> {selectedEvent.details.prize}</li>
                            <li><strong>Features:</strong> {selectedEvent.details.features}</li>
                          </>
                        )}
                        
                        {/* Event 3 */}
                        {selectedEvent.id === 3 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Submission Deadline:</strong> {selectedEvent.details.submissionDeadline}</li>
                          </>
                        )}
                        
                        {/* Event 4 */}
                        {selectedEvent.id === 4 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Prize Pool:</strong> {selectedEvent.details.prizePool}</li>
                            <li><strong>Requirement:</strong> {selectedEvent.details.requirement}</li>
                          </>
                        )}
                        
                        {/* Event 5 */}
                        {selectedEvent.id === 5 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Format:</strong> {selectedEvent.details.format}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Prize:</strong> {selectedEvent.details.prize}</li>
                            <li><strong>Activity Points:</strong> {selectedEvent.details.activityPoints}</li>
                          </>
                        )}
                        
                        {/* Event 6 */}
                        {selectedEvent.id === 6 && (
                          <>
                            <li><strong>Tournament Level:</strong> {selectedEvent.details.tournamentLevel}</li>
                            <li><strong>Venue:</strong> {selectedEvent.details.venue}</li>
                            <li><strong>Open To:</strong> {selectedEvent.details.openTo}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Format:</strong> {selectedEvent.details.format}</li>
                            <li><strong>Benefits:</strong> {selectedEvent.details.benefits}</li>
                          </>
                        )}
                        
                        {/* Event 7 */}
                        {selectedEvent.id === 7 && (
                          <>
                            <li><strong>Duration:</strong> {selectedEvent.details.duration}</li>
                            <li><strong>Focus:</strong> {selectedEvent.details.focus}</li>
                            <li><strong>Inspiration:</strong> {selectedEvent.details.inspiration}</li>
                            <li><strong>Resource Person:</strong> {selectedEvent.details.resourcePerson}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Includes:</strong> {selectedEvent.details.includes}</li>
                          </>
                        )}
                        
                        {/* Event 8 */}
                        {selectedEvent.id === 8 && (
                          <>
                            <li><strong>Theme:</strong> {selectedEvent.details.theme}</li>
                            <li><strong>Submission Period:</strong> {selectedEvent.details.submissionPeriod}</li>
                            <li><strong>Format:</strong> {selectedEvent.details.format}</li>
                            <li><strong>Equipment:</strong> {selectedEvent.details.equipment}</li>
                            <li><strong>Requirement:</strong> {selectedEvent.details.requirement}</li>
                            <li><strong>Registration Fee:</strong> {selectedEvent.details.registrationFee}</li>
                            <li><strong>Participants:</strong> {selectedEvent.details.participants}</li>
                          </>
                        )}
                        
                        {/* Event 9 */}
                        {selectedEvent.id === 9 && (
                          <>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Fee:</strong> {selectedEvent.details.fee}</li>
                            <li><strong>Last Date:</strong> {selectedEvent.details.lastDate}</li>
                            <li><strong>Certificate:</strong> {selectedEvent.details.certificate}</li>
                            <li><strong>Seats:</strong> {selectedEvent.details.seats}</li>
                          </>
                        )}
                        
                        {/* Event 10 */}
                        {selectedEvent.id === 10 && (
                          <>
                            <li><strong>Mode:</strong> {selectedEvent.details.mode}</li>
                            <li><strong>Fee:</strong> {selectedEvent.details.fee}</li>
                            <li><strong>Last Date:</strong> {selectedEvent.details.lastDate}</li>
                            <li><strong>Certificate:</strong> {selectedEvent.details.certificate}</li>
                            <li><strong>Seats:</strong> {selectedEvent.details.seats}</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Event 4 Fees */}
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

                  {/* Event 9 & 10 - Presented By */}
                  {selectedEvent.presentedBy && (
                    <div className="event-presented-by">
                      <p><strong>Presented by:</strong> {selectedEvent.presentedBy}</p>
                      {selectedEvent.inAssociationWith && (
                        <p><strong>In association with:</strong> {selectedEvent.inAssociationWith}</p>
                      )}
                    </div>
                  )}

                  {/* Note for all events */}
                  {selectedEvent.note && (
                    <div className="event-note">
                      <p><strong>📝 Note:</strong> {selectedEvent.note}</p>
                    </div>
                  )}

                  {/* Contact for all events */}
                  {selectedEvent.contact && (
                    <div className="event-contact">
                      <h4>Contact for Enquiries:</h4>
                      <ul>
                        <li><strong>{selectedEvent.contact.name1}:</strong> {selectedEvent.contact.phone1}</li>
                        {selectedEvent.contact.name2 && (
                          <li><strong>{selectedEvent.contact.name2}:</strong> {selectedEvent.contact.phone2}</li>
                        )}
                        {selectedEvent.contact.name3 && (
                          <li><strong>{selectedEvent.contact.name3}:</strong> {selectedEvent.contact.phone3}</li>
                        )}
                        {selectedEvent.contact.name4 && (
                          <li><strong>{selectedEvent.contact.name4}:</strong> {selectedEvent.contact.phone4}</li>
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
                  onClick={(e) => {
                    if (selectedEvent.registerLink === '#') {
                      e.preventDefault();
                      // Optional: Show a message that registration link is coming soon
                      alert('Registration link will be available soon!');
                    }
                  }}
                >
                  <span>
                    {selectedEvent.registerLink === '#' ? 'Registration Coming Soon' : 'Register Now'}
                  </span>
                  {selectedEvent.registerLink !== '#' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
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