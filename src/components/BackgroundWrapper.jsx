import React from 'react';
import './BackgroundWrapper.css';

const BackgroundWrapper = ({ children, className = '' }) => {
  return (
    <div className={`background-wrapper ${className}`}>
      {/* Animated Grid Background */}
      <div className="bg-grid"></div>
      
      {/* Floating Particles */}
      <div className="bg-particles">
        <div className="bg-particle particle-1"></div>
        <div className="bg-particle particle-2"></div>
        <div className="bg-particle particle-3"></div>
        <div className="bg-particle particle-4"></div>
        <div className="bg-particle particle-5"></div>
        <div className="bg-particle particle-6"></div>
      </div>
      
      {/* Glow Effects */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>
      
      {/* Content */}
      <div className="bg-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;