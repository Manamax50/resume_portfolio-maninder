import React from 'react';
import './WhoAmI.css';

const WhoAmI: React.FC = () => {
  return (
    <section id="who-am-i" className="who-am-i-container">
      <div className="who-am-i-inner">
        <div className="who-am-i-layout">
          {/* Image Placeholder */}
          <div className="who-am-i-image-wrapper">
            <div className="who-am-i-image-border">
              <div className="who-am-i-image-content">
                <img className='my-image' src='https://media.licdn.com/dms/image/v2/D5603AQHIh7r4-U1ZSQ/profile-displayphoto-scale_400_400/B56ZpsCtPEI0Ao-/0/1762749240772?e=1765411200&v=beta&t=xe-RxpA-Mp1YO_WwCWo9o9Ygvo6b7t2af4dar3guxQE' />
                
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="who-am-i-text">
            <div className="who-am-i-label">
              <span className="who-am-i-line"></span>
              <span className="who-am-i-label-text">Who Am I</span>
            </div>
            <h2 className="who-am-i-title">Full-Stack Developer</h2>
            <p className="who-am-i-desc">
                I’m a recent Computer Engineering graduate with a passion for building clean, scalable, 
                and user focused software. I enjoy creating full-stack applications, 
                ranging from intuitive interfaces to reliable backend systems. 
            </p>
            <p className="who-am-i-desc">
                I’m driven by the goal of building products that not only peak my interest, 
                but also ideally solve real world problems and make people’s lives easier.
            </p>
            <p className="who-am-i-desc">
                My top top three programming languages are Java, Python, and JavaScript (with React).
            </p>

            {/* Quick Stats */}
            <div className="who-am-i-stats">
              <div className="who-am-i-stat">
                <h4 className="who-am-i-stat-number">200+</h4>
                <p className="who-am-i-stat-label">Hours Spent On projects</p>
              </div>
              <div className="who-am-i-stat">
                <h4 className="who-am-i-stat-number">15+</h4>
                <p className="who-am-i-stat-label">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
