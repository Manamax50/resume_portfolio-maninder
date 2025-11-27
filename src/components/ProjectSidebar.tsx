import React, { useEffect, useRef } from 'react';
import type { Project } from '../types';
import './ProjectSidebar.css';

interface ProjectSidebarProps {
  project: Project;
  sourceElement: HTMLElement | null;
  onClose: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project, sourceElement, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const morpherRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Perform morphing animation
    if (sourceElement && morpherRef.current) {
      const rect = sourceElement.getBoundingClientRect();
      const sidebarWidth = window.innerWidth < 768 ? window.innerWidth : 600;
      const finalLeft = window.innerWidth - sidebarWidth;

      // Step 1: Position morpher over source card (no transition)
      morpherRef.current.style.transition = 'none';
      morpherRef.current.style.top = `${rect.top}px`;
      morpherRef.current.style.left = `${rect.left}px`;
      morpherRef.current.style.width = `${rect.width}px`;
      morpherRef.current.style.height = `${rect.height}px`;
      morpherRef.current.style.display = 'block';

      // Show overlay and backdrop
      if (overlayRef.current) {
        overlayRef.current.classList.add('sidebar-overlay-visible');
      }

      // Step 2: Trigger slide-right + width expansion animation
      requestAnimationFrame(() => {
        if (morpherRef.current) {
          morpherRef.current.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          morpherRef.current.style.left = `${finalLeft}px`;
          morpherRef.current.style.width = `${sidebarWidth}px`;
        }
      });

      // Step 3: Expand vertically (after slide+width completes)
      const expandTimeoutId = setTimeout(() => {
        if (morpherRef.current) {
          morpherRef.current.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          morpherRef.current.style.top = '0px';
          morpherRef.current.style.height = '100%';
          morpherRef.current.style.borderRadius = '0px';
          morpherRef.current.style.backgroundColor = '#0f172a';
          morpherRef.current.style.borderColor = '#0f172a';
          morpherRef.current.classList.add('sidebar-morpher-visible');
        }

        // Step 4: Show real panel and content (while expanding)
        const showContentTimeoutId = setTimeout(() => {
          if (panelRef.current) {
            panelRef.current.classList.add('sidebar-panel-visible');
          }
          if (contentRef.current) {
            contentRef.current.classList.add('sidebar-content-visible');
          }
          // Hide morpher after expansion completes
          const hideTimeoutId = setTimeout(() => {
            if (morpherRef.current) {
              morpherRef.current.style.display = 'none';
            }
          }, 500);
          return () => clearTimeout(hideTimeoutId);
        }, 150);

        return () => clearTimeout(showContentTimeoutId);
      }, 300);

      return () => clearTimeout(expandTimeoutId);
    }
  }, [sourceElement]);

  const handleClose = () => {
    if (overlayRef.current) overlayRef.current.classList.remove('sidebar-overlay-visible');
    if (panelRef.current) panelRef.current.classList.remove('sidebar-panel-visible');
    if (contentRef.current) contentRef.current.classList.remove('sidebar-content-visible');
    setTimeout(() => {
      // Restore body scroll
      document.body.style.overflow = '';
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close if clicking directly on the backdrop or overlay (not the sidebar panel)
    if (e.target === backdropRef.current || (e.target === overlayRef.current && !panelRef.current?.contains(e.target as Node))) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <div ref={morpherRef} className="sidebar-morpher"></div>
      <div ref={overlayRef} className="sidebar-overlay" onClick={handleBackdropClick}>
        <div ref={backdropRef} className="sidebar-backdrop"></div>
        <div ref={panelRef} className="sidebar-panel">
          <div className="sidebar-close-btn-wrapper">
            <button onClick={handleClose} className="sidebar-close-btn">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div ref={contentRef} className="sidebar-content">
            <div className="sidebar-icon-wrapper">
              <div className="sidebar-icon-box">
                <i className={`fas ${project.icon}`}></i>
              </div>
            </div>
            <div className="sidebar-header">
              <h2 className="sidebar-title">{project.title}</h2>
              <div className="sidebar-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="sidebar-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="sidebar-buttons">
              {project.showDemo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="sidebar-btn sidebar-btn-primary">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              )}
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="sidebar-btn sidebar-btn-secondary">
                <i className="fab fa-github"></i> Source Code
              </a>
            </div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-description">
              <h3 className="sidebar-section-title">About the Project</h3>
              <p>{project.desc}</p>
              <h3 className="sidebar-section-title sidebar-section-title-offset">Key Features</h3>
              <ul className="sidebar-features-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSidebar;
