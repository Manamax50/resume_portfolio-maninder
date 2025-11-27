import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import ProjectSidebar from './ProjectSidebar';
import './Projects.css';

const PROJECTS_DATA: Project[] = [
  {
    id: 0,
    title: 'Real Time ATC system',
    icon: 'fa-plane',
    tags: ['Python', 'React', 'Azure'],
    demo: 'https://example.com/demo',
    code: 'https://github.com/Manamax50/Real-Time-Air-Traffic-Control-ATC-System',
    showDemo: false,

    // ATC description 
    desc: 'A fully interactive Air Traffic Control system built with dedicated frontend and backend. This app was designed to automate the ATC systems in airports to help reduce human error, and simulations were used as a proof of concept. The platform streams real-time aircraft state to a React dashboard using WebSockets, while RabbitMQ handles all inter-service communication.',

    features: [
      'Live aircraft state updates',
      'RabbitMQ-driven event architecture',
      'Real-time operator command handling',
      'Interactive React dashboard'
    ],
  },

  {
    id: 1,
    title: 'Secure Banking System',
    icon: 'fa-mobile-alt',
    tags: ['Python', 'CyberSecurity', 'Full-Stack'],
    demo: 'https://example.com/demo',
    code: 'https://github.com/Manamax50/Secure-Banking-System',
    showDemo: false,

    // UPDATED description
    desc: 'A secure, multi-user Python banking platform implementing encrypted transactions, safe concurrency, and fraud detection logic. Features AES encryption, HMAC validation, secure password hashing, and thread-safe operations to simulate real-world financial systems.',

    // UPDATED features
    features: [
      'AES-encrypted transactions',
      'HMAC message integrity checks',
      'Hashed and salted passwords',
    ],
  },

  {
    id: 2,
    title: '3D Renderer',
    icon: 'fa-cube',
    tags: ['Java', 'Swing', '3D Graphics'],
    demo: 'https://example.com/demo',
    code: 'https://github.com/Manamax50/3D-renderer-in-java',
    showDemo: false,

    // UPDATED description
    desc: 'A custom-built Java 3D rendering engine implementing the full graphics pipeline manually, It includes matrix transforms, rasterization, barycentric interpolation, and depth buffering, all visualized through a real-time Swing window.',

    // UPDATED features
    features: [
      'Custom 3D rendering pipeline',
      'Matrix transformations & perspective projection',
      'Barycentric interpolation shading',
      'Z-buffer depth handling'
    ],
  },
];

const Projects: React.FC = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const projectRefsArray = useRef<(HTMLDivElement | null)[]>([]);

  // Ensure we start at the top when the page refreshes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenProject = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handleCloseProject = () => {
    setSelectedProjectIndex(null);
  };

  return (
    <>
      <section id="projects" className="projects-container">
        <div className="projects-inner">
          <div className="projects-header">
            <span className="projects-header-label">My Work</span>
            <h2 className="projects-header-title">Featured Projects</h2>
          </div>

          <div className="projects-grid">
            {PROJECTS_DATA.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectRefsArray.current[index] = el;
                }}
                onClick={() => handleOpenProject(index)}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProjectIndex !== null && (
        <ProjectSidebar
          project={PROJECTS_DATA[selectedProjectIndex]}
          sourceElement={projectRefsArray.current[selectedProjectIndex]}
          onClose={handleCloseProject}
        />
      )}
    </>
  );
};

export default Projects;
