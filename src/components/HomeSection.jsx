import React, { useEffect, useState, useRef } from 'react';
import './HomeSection.css';

const HomeSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [positionClass, setPositionClass] = useState('bee-position-1');
  const beeRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate which position to use based on scroll position
      let newPosition = 'bee-position-1';
      
      if (currentScrollY > 400) {
        newPosition = 'bee-position-5'; // Far scrolled - top center small
      } else if (currentScrollY > 300) {
        newPosition = 'bee-position-4'; // Bottom right
      } else if (currentScrollY > 200) {
        newPosition = 'bee-position-3'; // Right side
      } else if (currentScrollY > 100) {
        newPosition = 'bee-position-2'; // Left side
      }
      
      setPositionClass(newPosition);
      
      // Smooth interpolation between positions
      if (beeRef.current) {
        const bee = beeRef.current;
        const scrollProgress = Math.min(currentScrollY / 500, 1);
        
        // Calculate intermediate values for smooth movement
        let top, left, width, opacity;
        
        if (currentScrollY <= 100) {
          // Position 1 to 2
          const progress = currentScrollY / 100;
          top = 120 - (progress * 40); // 120px to 80px
          left = 50 + (progress * -40); // 50% to 10%
          width = 30 - (progress * 10); // 30% to 20%
          opacity = 1;
        } else if (currentScrollY <= 200) {
          // Position 2 to 3
          const progress = (currentScrollY - 100) / 100;
          top = 80 - (progress * 20); // 80px to 60px
          left = 10 + (progress * 75); // 10% to 85%
          width = 20 - (progress * 5); // 20% to 15%
          opacity = 1 - (progress * 0.1);
        } else if (currentScrollY <= 300) {
          // Position 3 to 4
          const progress = (currentScrollY - 200) / 100;
          top = 60 + (progress * 25); // 60px to 85px
          left = 85 + (progress * 5); // 85% to 90%
          width = 15 - (progress * 3); // 15% to 12%
          opacity = 0.9 - (progress * 0.1);
        } else {
          // Position 4 to 5
          const progress = (currentScrollY - 300) / 100;
          top = 85 - (progress * 65); // 85px to 20px
          left = 90 - (progress * 40); // 90% to 50%
          width = 12 - (progress * 4); // 12% to 8%
          opacity = 0.8 - (progress * 0.1);
        }
        
        // Apply smooth transformations
        bee.style.top = `${top}px`;
        bee.style.left = `${left}%`;
        bee.style.width = `${width}%`;
        bee.style.opacity = opacity;
        bee.style.transform = currentScrollY > 300 ? `translateX(-50%)` : 'translateX(0)';
      }

      // Subtitle fade effect on scroll
      if (subtitleRef.current) {
        const subtitle = subtitleRef.current;
        const subtitleProgress = Math.min(currentScrollY / 300, 1);
        const subtitleOpacity = 1 - subtitleProgress;
        const subtitleScale = 1 - (subtitleProgress * 0.2);
        
        subtitle.style.opacity = subtitleOpacity;
        subtitle.style.transform = `translateY(${subtitleProgress * 20}px) scale(${subtitleScale})`;
      }
    };

    // Smooth scrolling with requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="hero-container" id='home'>
      <div className="center-content">
        <div className="image-container">
          {/* Bee image with dynamic positioning */}
          <div 
            className={`bee-parallax ${positionClass}`}
            ref={beeRef}
            style={{
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img 
              src="bee.png" 
              alt="Bee"
              className="bee-image"
            />
          </div>
          
          {/* Main Nova image */}
          <img 
            src="nex.png" 
            alt="AI Robot holding Earth"
            className="center-image"
          />
        </div>
      </div>

      {/* Animated Subtitle - Positioned below the main content */}
      <div className="subtitle-wrapper" ref={subtitleRef}>
        <div className="subtitle-container1">
          <div className="subtitle-line1"></div>
          <h2 className="hero-subtitle1">
            Where <span className="highlight-text">humans</span> meet <span className="highlight-text">machines</span>
          </h2>
          <div className="subtitle-line1"></div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="decoration-dot dot-1"></div>
          <div className="decoration-dot dot-2"></div>
          <div className="decoration-dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;