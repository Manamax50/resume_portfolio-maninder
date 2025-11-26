import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="contact-container">
        <div className="contact-inner">
          <div className="contact-header">
            <h2 className="contact-title">Let's Work Together</h2>
            <p className="contact-subtitle">Get in touch for collaborations or just a friendly hello</p>
          </div>

          <div className="contact-content">
            <div className="contact-methods">
              <a href="mailto:maninderaat@gmail.com" className="contact-link">
                <i className="fas fa-envelope"></i>
                <span>maninderaat@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/maninder-arora-6303a2296/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Manamax50" target="_blank" rel="noopener noreferrer" className="contact-link">
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-container">
        <p className="footer-text"></p>
      </footer>
    </>
  );
};

export default Footer;
