import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, Award, TrendingUp, ChevronRight, Sparkles, Crown } from 'lucide-react';
import './RankList.css';

const RankList = () => {
  const [activeTab, setActiveTab] = useState('engineering');
  const [titleText, setTitleText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const engineeringColleges = [
    { rank: 1, name: "Government Engineering College Thrissur", points: 1730, color: '#FFD700' },
    { rank: 2, name: "Government Engineering College Wayanad", points: 400, color: '#C0C0C0' },
    { rank: 3, name: "Government College of Engineering Kannur", points: 335, color: '#CD7F32', shared: true },
    { rank: 3, name: "Government Engineering College Barton Hill", points: 335, color: '#CD7F32', shared: true }
  ];

  const polytechnicColleges = [
    { rank: 1, name: "JDT Islam Polytechnic College", points: 190, color: '#FFD700' },
    { rank: 2, name: "Model Polytechnic College Vadakara", points: 80, color: '#C0C0C0' },
    { rank: 3, name: "Seethi Sahib Memorial Polytechnic College Tirur", points: 15, color: '#CD7F32' }
  ];

  useEffect(() => {
    const fullText = "NEXORA RANKINGS";
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setIsVisible(true);
          e.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown size={28} className="rank-icon" />;
      case 2: return <Medal size={28} className="rank-icon" />;
      case 3: return <Award size={28} className="rank-icon" />;
      default: return <TrendingUp size={28} className="rank-icon" />;
    }
  };

  const currentData = activeTab === 'engineering' ? engineeringColleges : polytechnicColleges;
  const totalPoints = currentData.reduce((sum, c) => sum + c.points, 0);
  
  // Get podium data
  const firstPlace = currentData.find(c => c.rank === 1);
  const secondPlace = currentData.find(c => c.rank === 2);
  const thirdPlaceColleges = currentData.filter(c => c.rank === 3);
  const hasSharedThird = thirdPlaceColleges.length > 1;

  return (
    <div className="ranklist-container">
      {/* Hero Section */}
      <div className="ranklist-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <span className="hero-subtitle">NEXORA 2026 Performance</span>
          <h1 className="hero-title">
            {titleText}
            {isTyping && <span className="typing-cursor">|</span>}
          </h1>
          <p className="hero-description">Celebrating Excellence & Innovation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`ranklist-wrapper ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
        {/* Category Header */}
        <div className="category-header">
          <div className="header-content">
            <h2 className="section-title">
              <Trophy size={28} className="section-icon" />
              Top Colleges Rankings
            </h2>
            <p className="section-subtitle">Select category to view rankings</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`tab-button ${activeTab === 'engineering' ? 'active' : ''}`}
            onClick={() => setActiveTab('engineering')}
          >
            <div className="tab-button-content">
              <div className="tab-icon-wrapper">
                <div className="tab-icon-bg">
                  <span className="tab-icon">🎓</span>
                </div>
                <div className="tab-indicator"></div>
              </div>
              <div className="tab-text-content">
                <span className="tab-text">Engineering Colleges</span>
              </div>
            </div>
          </button>
          <button 
            className={`tab-button ${activeTab === 'polytechnic' ? 'active' : ''}`}
            onClick={() => setActiveTab('polytechnic')}
          >
            <div className="tab-button-content">
              <div className="tab-icon-wrapper">
                <div className="tab-icon-bg">
                  <span className="tab-icon">🏫</span>
                </div>
                <div className="tab-indicator"></div>
              </div>
              <div className="tab-text-content">
                <span className="tab-text">Polytechnic Colleges</span>
              </div>
            </div>
          </button>
        </div>

        {/* Podium Section - Top 3 */}
        <div className="podium-section">
          <div className="section-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-star">★</div>
            <div className="decoration-line"></div>
          </div>
          
          <div className="podium-container">
            {/* 2nd Place */}
            <div className="podium-card podium-second" style={{ '--delay': '0.2s' }}>
              <div className="podium-rank-badge" style={{ background: secondPlace.color }}>
                {getRankIcon(2)}
                <div className="badge-glow"></div>
              </div>
              <div className="podium-position">2nd Place</div>
              <h3 className="podium-college-name">{secondPlace.name}</h3>
              <div className="podium-points">
                <span className="points-number">{secondPlace.points}</span>
                <span className="points-label">Points</span>
              </div>
              <div className="podium-stand stand-silver">
                <div className="stand-glow"></div>
                <div className="stand-top"></div>
                <div className="stand-number">2</div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="podium-card podium-first" style={{ '--delay': '0s' }}>
              <div className="crown-wrapper">
                <Crown size={24} className="crown-icon" />
              </div>
              <div className="podium-rank-badge champion" style={{ background: firstPlace.color }}>
                {getRankIcon(1)}
                <div className="champion-glow"></div>
                <div className="sparkle"></div>
              </div>
              <div className="podium-position champion-text">
                <span>Champion</span>
              </div>
              <h3 className="podium-college-name">{firstPlace.name}</h3>
              <div className="podium-points champion-points">
                <span className="points-number">{firstPlace.points}</span>
                <span className="points-label">Points</span>
              </div>
              <div className="podium-stand stand-gold">
                <div className="stand-glow"></div>
                <div className="stand-top"></div>
                <div className="stand-number">1</div>
                <div className="champion-shine"></div>
              </div>
            </div>

            {/* 3rd Place - Shows both if shared */}
            <div className={`podium-card podium-third ${hasSharedThird ? 'shared-position' : ''}`} style={{ '--delay': '0.4s' }}>
              <div className="podium-rank-badge" style={{ background: thirdPlaceColleges[0].color }}>
                {getRankIcon(3)}
                <div className="badge-glow"></div>
              </div>
              <div className="podium-position">
                3rd Place {hasSharedThird && <span className="shared-badge">Shared</span>}
              </div>
              {hasSharedThird ? (
                <div className="shared-colleges-container">
                  {thirdPlaceColleges.map((college, idx) => (
                    <div key={idx} className="shared-college-item">
                      <div className="shared-college-bullet">•</div>
                      <h3 className="podium-college-name shared-college-name">{college.name}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <h3 className="podium-college-name">{thirdPlaceColleges[0].name}</h3>
              )}
              <div className="podium-points">
                <span className="points-number">{thirdPlaceColleges[0].points}</span>
                <span className="points-label">Points {hasSharedThird && '(Each)'}</span>
              </div>
              <div className="podium-stand stand-bronze">
                <div className="stand-glow"></div>
                <div className="stand-top"></div>
                <div className="stand-number">3</div>
              </div>
            </div>
          </div>

          {/* Podium Legend */}
          <div className="podium-legend">
            <div className="legend-item">
              <div className="legend-color gold"></div>
              <span className="legend-text">Champion</span>
            </div>
            <div className="legend-item">
              <div className="legend-color silver"></div>
              <span className="legend-text">Runner-up</span>
            </div>
            <div className="legend-item">
              <div className="legend-color bronze"></div>
              <span className="legend-text">Third Place</span>
            </div>
          </div>
        </div>

        {/* Complete Rankings Section */}
        <div className="complete-rankings-section">
          <div className="rankings-header">
            <h2 className="rankings-title">
              <Sparkles size={24} />
              Complete Rankings
            </h2>
            <p className="rankings-subtitle">Full leaderboard for {activeTab === 'engineering' ? 'Engineering' : 'Polytechnic'} colleges</p>
          </div>

          <div className="rankings-table">
            {currentData.map((college, index) => (
              <div 
                key={index}
                className={`ranking-row ${college.shared ? 'shared-rank' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="rank-badge" style={{ background: college.color }}>
                  <span className="rank-number-large">{college.rank}</span>
                  {college.shared && <span className="shared-indicator">*</span>}
                </div>
                
                <div className="college-info">
                  <h3 className="college-name-full">{college.name}</h3>
                  {college.shared && <span className="shared-label">Tied for 3rd Place</span>}
                </div>

                <div className="points-display">
                  <span className="points-value-large">{college.points}</span>
                  <span className="points-text-small">points</span>
                </div>

                <div className="rank-icon-wrapper">
                  {getRankIcon(college.rank)}
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default RankList;