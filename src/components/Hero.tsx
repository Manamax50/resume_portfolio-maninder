import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <header className="hero-container">
      {/* Background decorative blobs */}
      <div className="hero-blob-1"></div>
      <div className="hero-blob-2"></div>

      <div className="hero-content">
        <div className="hero-label">Portfolio</div>
        <h1 className="hero-title">
          Maninder <br />
          <span className="hero-gradient">Arora</span>
        </h1>
        <p className="hero-subtitle">
          A simple introduction to who I am and a showcase of some projects that I am proud of.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="hero-btn hero-btn-primary">
            View My Work
          </a>
          <a href="#who-am-i" className="hero-btn hero-btn-secondary">
            About Me
          </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
