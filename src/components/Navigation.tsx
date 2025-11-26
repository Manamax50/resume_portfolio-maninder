import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'who-am-i' | 'projects' | 'contact'>('who-am-i');

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionId as 'who-am-i' | 'projects' | 'contact');
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        {/* Logo / Name */}
        <a href="#" className="nav-logo">
          Maninder<span className="nav-logo-accent">Arora</span>.
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
        <button className="nav-mobile-btn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
