import React from 'react';
import Paragraph from '../Paragraph/Paragraph';

const HeaderHeroContent = () => {
  return (
    <div className="header-hero">
      <div className="container" style={{background:"#0A3E30"}}>
        <div className="hero-content-container">
          <Paragraph text="Internal Medicine Services" className="hero-content-heading"/>
          <Paragraph text="Updated October 10, 2023 by ZCMC" className="hero-content-date"/>
        </div>
      </div>
    </div>
  );
};

export default HeaderHeroContent;
