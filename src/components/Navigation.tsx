import React, { useState, useEffect } from 'react';
import { smoothScroll } from '../utils/smoothScroll';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'who-am-i' | 'projects' | 'contact'>('who-am-i');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'who-am-i', element: document.getElementById('who-am-i') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'contact', element: document.getElementById('contact') },
      ];

      const windowHeight = window.innerHeight;

      // Find which section is currently visible
      let currentActive: 'who-am-i' | 'projects' | 'contact' = 'who-am-i';
      let maxVisibility = 0;

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          // Calculate how much of this section is visible (0 to 1)
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          let visibility = 0;

          if (sectionTop < windowHeight && sectionBottom > 0) {
            // Section is partially or fully visible
            const visibleTop = Math.max(0, sectionTop);
            const visibleBottom = Math.min(windowHeight, sectionBottom);
            const visibleHeight = visibleBottom - visibleTop;
            visibility = visibleHeight / windowHeight;
          }

          // Update active tab to the most visible section
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentActive = section.id as 'who-am-i' | 'projects' | 'contact';
          }
        }
      }

      setActiveTab(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    smoothScroll(sectionId);
    setActiveTab(sectionId as 'who-am-i' | 'projects' | 'contact');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScroll('top');
    setActiveTab('who-am-i'); // keep first tab highlighted after returning to top
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        {/* Logo / Name */}
        <a href="#" onClick={(e) => handleLogoClick(e)} className="nav-logo">
          Maninder<span className="nav-logo-accent"> Arora</span>
        </a>

        {/* Desktop Tabs */}
        <div className="nav-tabs">
          <a
            href="#who-am-i"
            onClick={(e) => handleNavClick(e, 'who-am-i')}
            className={`nav-link ${activeTab === 'who-am-i' ? 'nav-link-active' : ''}`}
          >
            Who Am I
            <span className="nav-link-underline"></span>
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, 'projects')}
            className={`nav-link ${activeTab === 'projects' ? 'nav-link-active' : ''}`}
          >
            Projects
            <span className="nav-link-underline"></span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`nav-link ${activeTab === 'contact' ? 'nav-link-active' : ''}`}
          >
            Contact
            <span className="nav-link-underline"></span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="nav-mobile-btn" onClick={() => setIsMobileMenuOpen((prev) => !prev)} aria-label="Toggle navigation">
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu ${isMobileMenuOpen ? 'nav-mobile-menu-open' : ''}`}>
        <a
          href="#who-am-i"
          onClick={(e) => handleNavClick(e, 'who-am-i')}
          className={`nav-mobile-link ${activeTab === 'who-am-i' ? 'nav-mobile-link-active' : ''}`}
        >
          Who Am I
        </a>
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, 'projects')}
          className={`nav-mobile-link ${activeTab === 'projects' ? 'nav-mobile-link-active' : ''}`}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className={`nav-mobile-link ${activeTab === 'contact' ? 'nav-mobile-link-active' : ''}`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
