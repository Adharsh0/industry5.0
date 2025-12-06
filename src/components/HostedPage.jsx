import React from 'react';
import './HostedPage.css';

const HostedPage = () => {
  return (
    // The main container can also have an animation
    <div className="hosted-page" data-aos="fade-in"> 
      
      <div className="hosted-content"> 
        
        {/* Image slides in from the left */}
        <div 
          className="image-container"
          data-aos="slide-right"
          data-aos-duration="1000"
        >
          <img src="mbcet.jpg" alt="College" className="college-image" />
        </div>
        
        {/* Details slide in from the right after a short delay */}
        <div 
          className="details-container"
          data-aos="slide-left"
          data-aos-duration="1000"
          data-aos-delay="300" // Starts 300ms after the image
        >
          {/* Title fades in from the top - NOW INSIDE THE CARD */}
          <div 
            className="hosted-text large-title" 
            data-aos="fade-down" 
            data-aos-duration="800"
          >
            Hosted <span className="highlight-text">By</span>
          </div>
          
          <div className="college-name">
            Mar Baselios College of Engineering and Technology
          </div>
          {/* Add more animated elements here if needed */}
        </div>
      </div>
      
    </div>
  );
};

export default HostedPage;