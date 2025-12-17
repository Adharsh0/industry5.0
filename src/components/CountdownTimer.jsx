import React, { useEffect, useRef, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);

  const startDate = new Date('December 1, 2025 00:00:00').getTime();
  const endDate = new Date('January 10, 2026 00:00:00').getTime();
  const totalDuration = endDate - startDate;

  /* TIMER LOGIC */
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const elapsed = Math.max(0, now - startDate);
        const percent = (elapsed / totalDuration) * 100;
        setProgress(Math.min(Math.max(percent, 0), 100));

        return { days, hours, minutes, seconds };
      }

      setProgress(100);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    calculateTimeLeft();
    return () => clearInterval(interval);
  }, []);

  /* 🔥 SCROLL ANIMATION — REPEAT EVERY TIME */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          entry.target.classList.remove('scroll-hidden');
        } else {
          entry.target.classList.remove('scroll-visible');
          entry.target.classList.add('scroll-hidden');
        }
      },
      {
        threshold: 0.25
      }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

  return (
    <div ref={containerRef} className="countdown-container scroll-hidden">
      <div className="countdown-header scroll-item">
        <span className="countdown-label">Launching In</span>
      </div>

      <div className="countdown-timer">
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
          <React.Fragment key={label}>
            <div
              className="countdown-item scroll-item"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="countdown-value">
                {timeLeft[label.toLowerCase()].toString().padStart(2, '0')}
              </div>
              <div className="countdown-label-small">{label}</div>
            </div>
            {i !== 3 && <div className="countdown-separator">:</div>}
          </React.Fragment>
        ))}
      </div>

      <div className="countdown-progress-container scroll-item" style={{ transitionDelay: '0.6s' }}>
        <div className="progress-info">
          <span className="progress-label">Countdown Progress</span>
          <span className="progress-percentage">{progress.toFixed(1)}%</span>
        </div>

        <div className="countdown-progress">
          <div
            className="countdown-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="progress-dates">
          <span className="start-date">{formatDate(startDate)}</span>
          <span className="end-date">{formatDate(endDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
